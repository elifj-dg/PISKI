// EL MOTOR ¿QUÉ COMO AHORA? real — usa los básicos y el objetivo guardados
// de verdad en la cuenta del usuario (mismo motor determinista del
// onboarding, lib/recomendaciones.ts). "Modo rescate" es la misma pantalla
// con framing más urgente (Constitución del producto: un solo mecanismo).

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ordenarRecomendaciones, type BasicoId } from '@/lib/recomendaciones';
import type { Objetivo } from '@/lib/plan';
import { Motor } from '@/components/app/Motor';

export default async function MotorPage({ searchParams }: { searchParams: Promise<{ modo?: string }> }) {
  const { modo } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/entrar');

  const [{ data: perfil }, { data: basicosFilas }] = await Promise.all([
    supabase.from('profiles').select('objetivo').eq('user_id', user.id).maybeSingle(),
    supabase.from('mis_basicos').select('alimento').eq('user_id', user.id),
  ]);

  const basicos = (basicosFilas ?? []).map((b) => b.alimento as BasicoId);
  const objetivo = (perfil?.objetivo as Objetivo) ?? 'comer_mejor';
  const combos = ordenarRecomendaciones(basicos, objetivo);

  return <Motor combos={combos} sinBasicos={basicos.length === 0} rescate={modo === 'rescate'} />;
}
