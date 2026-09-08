// Cliente de Supabase para el navegador — usa la publishable key (pública por
// diseño, protegida por RLS). Nunca importar `admin.ts` desde código que
// corre en el cliente.

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
