// El "recibidor" de Hotmart: escucha cada compra/cancelación/reembolso y
// crea o actualiza el acceso del usuario en la app. Ver docs/sistema/
// 18-VENTA-HOTMART.md — pipeline: autenticidad -> frescura -> parse ->
// idempotencia -> transición de estado -> email de acceso.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'node:crypto';
import { verifyHotmart } from '@/lib/hotmart-verify';
import { statusForEvent, PLAN_CHANGE_EVENT } from '@/lib/membership-fsm';

export const runtime = 'nodejs'; // necesitamos node:crypto y el raw body

const REPLAY_WINDOW_MS = 5 * 60 * 1000;

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  const supabase = admin();
  const rawBody = await req.text();

  // 1. Autenticidad — el hottok viaja en el header o en el body, según la
  //    configuración de la cuenta; se acepta cualquiera de los dos.
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const hottok = req.headers.get('x-hotmart-hottok') ?? (payload.hottok as string | undefined);
  let autorizado: boolean;
  try {
    autorizado = verifyHotmart(hottok);
  } catch (e) {
    console.error('hotmart webhook: falta configuración', e);
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }
  if (!autorizado) {
    await supabase.from('webhook_log').insert({ result: 'unauthorized' });
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // 2. Frescura (anti-replay)
  const data = (payload.data as Record<string, any>) ?? {};
  const ts = Number(payload.creation_date ?? data.purchase?.approved_date ?? 0);
  if (ts && Date.now() - ts > REPLAY_WINDOW_MS) {
    return NextResponse.json({ error: 'stale' }, { status: 400 });
  }

  // 3. Datos del evento — el correo del comprador viaja en `buyer` en compras,
  //    pero en eventos de suscripción (cancelación, cambio de plan) Hotmart
  //    lo manda dentro de `subscriber` en su lugar.
  const event = String(payload.event ?? '');
  const email: string | undefined =
    data.buyer?.email ?? data.subscriber?.email ?? data.subscription?.subscriber?.email ?? (payload.email as string | undefined);
  const subscriberCode: string | undefined =
    data.subscriber?.code ?? data.subscription?.subscriber?.code;
  const eventId =
    (payload.id as string) ??
    (payload.event_id as string) ??
    data.purchase?.transaction ??
    `${event}:${email}:${ts || ''}`;

  if (event === PLAN_CHANGE_EVENT) {
    // Cambio de plan mensual<->anual: no transiciona el estado, solo se
    // registra por ahora (el mapeo completo de límites por plan se agrega
    // cuando el producto tenga más de un nivel de acceso).
    await supabase.from('webhook_log').insert({ event_id: eventId, type: event, result: 'applied' });
    return NextResponse.json({ received: true });
  }

  const newStatus = statusForEvent(event);
  if (!newStatus) {
    return NextResponse.json({ received: true, ignored: event });
  }
  if (!email) {
    await supabase.from('webhook_log').insert({ event_id: eventId, type: event, result: 'error' });
    return NextResponse.json({ error: 'sin correo del comprador' }, { status: 400 });
  }

  const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

  // 4. Encontrar o crear el usuario en Supabase Auth (Modelo 2A: el pago
  //    crea la cuenta si todavía no existe — el onboarding local se sube
  //    solo cuando esa persona entre desde el mismo navegador/dispositivo).
  let userId: string | undefined;
  const { data: existentes } = await supabase.auth.admin.listUsers();
  const existente = existentes?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (existente) {
    userId = existente.id;
  } else {
    const { data: creado, error: errorCreado } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (errorCreado || !creado.user) {
      await supabase.from('webhook_log').insert({ event_id: eventId, type: event, result: 'error' });
      return NextResponse.json({ error: 'no se pudo crear el usuario' }, { status: 500 });
    }
    userId = creado.user.id;
  }

  const trialEndsAt =
    newStatus === 'trialing' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null;

  // 5. Idempotencia + transición de estado, atómico en una función de Postgres.
  const { data: resultado, error } = await supabase.rpc('apply_hotmart_event', {
    p_event_id: eventId,
    p_event_type: event,
    p_payload_hash: payloadHash,
    p_user_id: userId,
    p_new_status: newStatus,
    p_trial_ends_at: trialEndsAt,
    p_access_until: null,
    p_subscriber_code: subscriberCode ?? null,
  });

  if (error) {
    console.error('hotmart webhook error', { event, code: error.code });
    await supabase.from('webhook_log').insert({ event_id: eventId, type: event, result: 'error' });
    return NextResponse.json({ error: 'error interno' }, { status: 500 });
  }

  await supabase
    .from('webhook_log')
    .insert({ event_id: eventId, type: event, result: resultado === 'duplicate' ? 'duplicate' : resultado === 'illegal' ? 'illegal' : 'applied' });

  // 6. Correo de acceso (solo en compras/inicio de trial nuevos, no en
  //    cancelaciones/reembolsos) — reutiliza el magic link + Resend ya
  //    conectados en /entrar.
  if (resultado === 'applied' && (newStatus === 'trialing' || newStatus === 'active')) {
    const anonClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
    await anonClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piski.vercel.app'}/auth/callback?siguiente=/hoy` },
    });
  }

  return NextResponse.json({ received: true });
}
