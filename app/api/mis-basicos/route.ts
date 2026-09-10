// BFF: agrega o quita un alimento de "mis básicos". RLS decide qué fila
// puede tocar cada usuario — la sesión es la única fuente del user_id.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const esquema = z.object({ alimento: z.string().trim().min(1).max(40) });

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'no_autenticado' }, { status: 401 });

  const cuerpo = esquema.safeParse(await request.json());
  if (!cuerpo.success) return NextResponse.json({ error: 'datos_invalidos' }, { status: 400 });

  const { error } = await supabase
    .from('mis_basicos')
    .upsert({ user_id: user.id, alimento: cuerpo.data.alimento.toLowerCase() }, { onConflict: 'user_id,alimento' });
  if (error) return NextResponse.json({ error: 'error_guardando' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'no_autenticado' }, { status: 401 });

  const cuerpo = esquema.safeParse(await request.json());
  if (!cuerpo.success) return NextResponse.json({ error: 'datos_invalidos' }, { status: 400 });

  const { error } = await supabase
    .from('mis_basicos')
    .delete()
    .eq('user_id', user.id)
    .eq('alimento', cuerpo.data.alimento.toLowerCase());
  if (error) return NextResponse.json({ error: 'error_borrando' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
