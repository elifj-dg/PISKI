// MIS OBJETIVOS — cambiar el objetivo (bajar grasa / ganar músculo / mantener
// / comer mejor). Recalcula calorías/proteína al guardar, vía /api/perfil.

import { createClient } from '@/lib/supabase/server';
import { MisObjetivos } from '@/components/app/MisObjetivos';

export default async function ObjetivoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: perfil } = await supabase.from('profiles').select('objetivo').eq('user_id', user!.id).maybeSingle();

  return <MisObjetivos objetivoActual={(perfil?.objetivo as string | null) ?? null} />;
}
