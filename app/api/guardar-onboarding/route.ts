// BFF: sube las respuestas del onboarding anónimo (guardadas en localStorage)
// a la cuenta recién creada. Usa el cliente de servidor con la sesión del
// usuario — RLS decide qué puede escribir, nunca se confía en un user_id
// que venga en el body (25-BASE-DE-DATOS.md).

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const esquema = z.object({
  objetivo: z.string().optional(),
  actividadDiaria: z.string().optional(),
  entrenamiento: z.string().optional(),
  peso: z.string().optional(),
  estatura: z.string().optional(),
  edad: z.string().optional(),
  sexo: z.string().optional(),
  pesoObjetivo: z.string().optional(),
  dificultad: z.string().optional(),
  estiloVida: z.string().optional(),
  organizacion: z.string().optional(),
  precision: z.string().optional(),
  restricciones: z.array(z.string()).default([]),
  presupuesto: z.string().optional(),
  basicos: z.array(z.string()).default([]),
  compromiso: z.number().optional(),
  caloriasObjetivo: z.number().optional(),
  proteinaObjetivo: z.number().optional(),
});

export async function POST(request: Request) {
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

  const { error: errorPerfil } = await supabase
    .from('profiles')
    .update({
      objetivo: d.objetivo,
      actividad: d.actividadDiaria,
      peso: d.peso ? Number(d.peso) : null,
      estatura: d.estatura ? Number(d.estatura) : null,
      edad: d.edad ? Number(d.edad) : null,
      sexo: d.sexo,
      presupuesto: d.presupuesto,
      calorias_objetivo: d.caloriasObjetivo || null,
      proteina_objetivo: d.proteinaObjetivo || null,
      restricciones: d.restricciones,
      preferencias: {
        pesoObjetivo: d.pesoObjetivo || null,
        dificultad: d.dificultad || null,
        estiloVida: d.estiloVida || null,
        organizacion: d.organizacion || null,
        precision: d.precision || null,
        compromiso: d.compromiso ?? null,
        entrenamiento: d.entrenamiento || null,
      },
    })
    .eq('user_id', user.id);

  if (errorPerfil) {
    return NextResponse.json({ error: 'error_guardando_perfil' }, { status: 500 });
  }

  if (d.basicos.length > 0) {
    // Reemplaza la lista completa — idempotente si el usuario repite el sync.
    await supabase.from('mis_basicos').delete().eq('user_id', user.id);
    const { error: errorBasicos } = await supabase
      .from('mis_basicos')
      .insert(d.basicos.map((alimento) => ({ user_id: user.id, alimento })));
    if (errorBasicos) {
      return NextResponse.json({ error: 'error_guardando_basicos' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
