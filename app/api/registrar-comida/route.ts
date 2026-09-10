// BFF: registra la comida que el usuario eligió en el Motor ¿Qué Como
// Ahora?. Escribe en comidas_registradas (lo que comió) y en recomendaciones
// (la elección + el feedback) — esta segunda tabla es la semilla del loop de
// retención real: el registro de hoy debe poder cambiar lo que el Motor
// sugiere mañana (pendiente: ponderar por historial, ver ESTADO.md).

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const esquema = z.object({
  comboId: z.string(),
  descripcion: z.string(),
  proteina: z.number(),
  calorias: z.number(),
  fuente: z.enum(['casa', 'fuera', 'pedido']).default('casa'),
});

function momentoActual(): 'desayuno' | 'comida' | 'cena' | 'snack' {
  const hora = new Date().getHours();
  if (hora < 11) return 'desayuno';
  if (hora < 17) return 'comida';
  if (hora < 21) return 'cena';
  return 'snack';
}

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
  const momento = momentoActual();

  const { error: errorComida } = await supabase.from('comidas_registradas').insert({
    user_id: user.id,
    descripcion: d.descripcion,
    proteina_aprox: d.proteina,
    calorias_aprox: d.calorias,
    momento,
    fuente: d.fuente,
  });

  if (errorComida) {
    return NextResponse.json({ error: 'error_guardando_comida' }, { status: 500 });
  }

  await supabase.from('recomendaciones').insert({
    user_id: user.id,
    contexto: { momento },
    opciones: [d.comboId],
    elegida: d.comboId,
    feedback: 'me_late',
  });

  return NextResponse.json({ ok: true });
}
