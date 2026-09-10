// MIS BÁSICOS — agregar/quitar los alimentos que el usuario siempre tiene en
// casa. Alimenta el Motor (lib/recomendaciones.ts).

import { createClient } from '@/lib/supabase/server';
import { MisBasicos } from '@/components/app/MisBasicos';

export default async function BasicosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: basicos } = await supabase.from('mis_basicos').select('alimento').eq('user_id', user!.id);

  return <MisBasicos seleccionados={(basicos ?? []).map((b) => b.alimento)} />;
}
