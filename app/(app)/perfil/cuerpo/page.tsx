// MI CUERPO — ver y editar peso, estatura, edad, actividad y meta de peso.
// Al guardar, recalcula calorías/proteína objetivo con la misma fórmula del
// onboarding (lib/plan.ts) vía /api/perfil.

import { createClient } from '@/lib/supabase/server';
import { MiCuerpo } from '@/components/app/MiCuerpo';

export default async function MiCuerpoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: perfil } = await supabase.from('profiles').select('*').eq('user_id', user!.id).maybeSingle();

  const preferencias = (perfil?.preferencias as { pesoObjetivo?: string | null } | null) ?? null;

  return (
    <MiCuerpo
      peso={perfil?.peso ?? null}
      estatura={perfil?.estatura ?? null}
      edad={perfil?.edad ?? null}
      actividad={(perfil?.actividad as string | null) ?? null}
      pesoObjetivo={preferencias?.pesoObjetivo ? Number(preferencias.pesoObjetivo) : null}
      caloriasObjetivo={perfil?.calorias_objetivo ?? null}
      proteinaObjetivo={perfil?.proteina_objetivo ?? null}
    />
  );
}
