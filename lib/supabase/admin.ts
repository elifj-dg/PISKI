// Cliente de Supabase con la SECRET key — salta RLS. SOLO se importa desde
// código de servidor que de verdad lo necesita (webhook de Hotmart, tareas
// administrativas). JAMÁS desde una ruta que responda directamente a un
// usuario sin validar antes su identidad y permisos.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
