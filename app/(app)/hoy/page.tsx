// HOY — la pantalla principal (protagonista, Regla de Oro 7: una de las 4
// que deciden el dinero). Objeto principal: el anillo de proteína del día.
// Acento en el CTA del Motor y en el dato de proteína restante.

import { createClient } from '@/lib/supabase/server';
import { LABEL_OBJETIVO } from '@/lib/plan';
import { AnilloDelDia } from '@/components/app/AnilloDelDia';
import { ListaComidasHoy } from '@/components/app/ListaComidasHoy';
import { BotonesMotor } from '@/components/app/BotonesMotor';
import { EncabezadoHoy } from '@/components/app/EncabezadoHoy';

function saludoPorHora(hora: number) {
  if (hora < 12) return 'Buenos días';
  if (hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export default async function HoyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: perfil } = await supabase.from('profiles').select('*').eq('user_id', user!.id).maybeSingle();

  const inicioHoy = new Date();
  inicioHoy.setHours(0, 0, 0, 0);

  const { data: comidasHoy } = await supabase
    .from('comidas_registradas')
    .select('*')
    .eq('user_id', user!.id)
    .gte('created_at', inicioHoy.toISOString())
    .order('created_at', { ascending: false });

  const comidas = comidasHoy ?? [];
  const proteinaConsumida = comidas.reduce((sum, c) => sum + (c.proteina_aprox ?? 0), 0);
  const caloriasConsumidas = comidas.reduce((sum, c) => sum + (c.calorias_aprox ?? 0), 0);

  const proteinaObjetivo = perfil?.proteina_objetivo ?? 130;
  const caloriasObjetivo = perfil?.calorias_objetivo ?? 1900;
  const objetivoLabel = perfil?.objetivo ? LABEL_OBJETIVO[perfil.objetivo as keyof typeof LABEL_OBJETIVO] : 'comer mejor';

  const nombre = user!.email?.split('@')[0] ?? '';
  const hora = new Date().getHours();

  return (
    <div className="flex flex-1 flex-col px-5 pt-6">
      <EncabezadoHoy
        saludo={`${saludoPorHora(hora)}${nombre ? `, ${nombre}` : ''}`}
        meta={`Tu meta hoy: ${objetivoLabel}`}
      />

      <AnilloDelDia
        proteinaConsumida={Math.round(proteinaConsumida)}
        proteinaObjetivo={proteinaObjetivo}
        caloriasConsumidas={Math.round(caloriasConsumidas)}
        caloriasObjetivo={caloriasObjetivo}
      />

      <BotonesMotor />

      <ListaComidasHoy comidas={comidas} />
    </div>
  );
}
