// BFF: actualiza el perfil del usuario (cuerpo y/o objetivo) y recalcula el
// plan (calorías/proteína) con la misma fórmula del onboarding — nunca se
// confía en un user_id del body, la sesión decide de quién es la fila.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { calcularPlan, type DatosPlan } from '@/lib/plan';

const esquema = z.object({
  peso: z.number().min(30).max(300).optional(),
  estatura: z.number().min(100).max(230).optional(),
  edad: z.number().min(14).max(100).optional(),
  actividad: z.enum(['sentado', 'movimiento', 'de_pie', 'fisico']).optional(),
  pesoObjetivo: z.number().min(30).max(300).nullable().optional(),
  objetivo: z.enum(['bajar_grasa', 'ganar_musculo', 'mantener', 'comer_mejor']).optional(),
});

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'no_autenticado' }, { status: 401 });
  }

  const cuerpo = esquema.safeParse(await request.json());
  if (!cuerpo.success) {
    return NextResponse.json({ error: 'datos_invalidos' }, { status: 400 });
  }
  const d = cuerpo.data;

  const { data: actual } = await supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle();
  if (!actual) {
    return NextResponse.json({ error: 'perfil_no_encontrado' }, { status: 404 });
  }

  const preferencias = (actual.preferencias as Record<string, unknown>) ?? {};
  const peso = d.peso ?? actual.peso;
  const estatura = d.estatura ?? actual.estatura;
  const edad = d.edad ?? actual.edad;
  const actividad = d.actividad ?? actual.actividad;
  const objetivo = d.objetivo ?? actual.objetivo;
  const pesoObjetivo = d.pesoObjetivo !== undefined ? d.pesoObjetivo : preferencias.pesoObjetivo;

  const cambios: Record<string, unknown> = {};
  if (d.peso !== undefined) cambios.peso = d.peso;
  if (d.estatura !== undefined) cambios.estatura = d.estatura;
  if (d.edad !== undefined) cambios.edad = d.edad;
  if (d.actividad !== undefined) cambios.actividad = d.actividad;
  if (d.objetivo !== undefined) cambios.objetivo = d.objetivo;
  if (d.pesoObjetivo !== undefined) {
    cambios.preferencias = { ...preferencias, pesoObjetivo: d.pesoObjetivo };
  }

  const datosCompletos = peso && estatura && edad && actual.sexo && preferencias.entrenamiento && actividad && objetivo;
  if (datosCompletos) {
    const plan = calcularPlan({
      peso,
      estatura,
      edad,
      sexo: actual.sexo as DatosPlan['sexo'],
      entrenamiento: preferencias.entrenamiento as DatosPlan['entrenamiento'],
      actividadDiaria: actividad as DatosPlan['actividadDiaria'],
      objetivo: objetivo as DatosPlan['objetivo'],
    });
    cambios.calorias_objetivo = plan.caloriasObjetivo;
    cambios.proteina_objetivo = plan.proteinaObjetivo;
  }

  if (Object.keys(cambios).length === 0) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from('profiles').update(cambios).eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: 'error_guardando' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
