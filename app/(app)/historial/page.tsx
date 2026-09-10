// HISTORIAL — proteína y calorías día por día, con navegación real entre
// semanas (regla UX #13: fechas reales, no "Esta semana"). Pantalla
// secundaria (no es de las 4 que deciden el dinero) — medición + checklist,
// sin revisor-visual obligatorio.

import { createClient } from '@/lib/supabase/server';
import { Historial } from '@/components/app/Historial';

function inicioDeSemana(offsetSemanas: number) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const diaSemana = (hoy.getDay() + 6) % 7; // 0 = lunes
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - diaSemana + offsetSemanas * 7);
  return lunes;
}

export default async function HistorialPage({
  searchParams,
}: {
  searchParams: Promise<{ semana?: string }>;
}) {
  const { semana } = await searchParams;
  const offset = Math.min(0, Number.parseInt(semana ?? '0', 10) || 0);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: perfil } = await supabase.from('profiles').select('*').eq('user_id', user!.id).maybeSingle();

  const lunes = inicioDeSemana(offset);
  const domingoSiguiente = new Date(lunes);
  domingoSiguiente.setDate(lunes.getDate() + 7);

  const { data: comidasSemana } = await supabase
    .from('comidas_registradas')
    .select('*')
    .eq('user_id', user!.id)
    .gte('created_at', lunes.toISOString())
    .lt('created_at', domingoSiguiente.toISOString())
    .order('created_at', { ascending: true });

  return (
    <Historial
      comidas={comidasSemana ?? []}
      lunesIso={lunes.toISOString()}
      offset={offset}
      proteinaObjetivo={perfil?.proteina_objetivo ?? 130}
    />
  );
}
