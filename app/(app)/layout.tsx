// Shell del área autenticada — Sesión 6 (app interna). Verifica sesión real
// (RLS ya protege los datos, esto solo evita que alguien sin sesión vea la
// pantalla) y monta el mismo shell (nav inferior) en Hoy/Historial/Perfil.

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AppShell } from '@/components/app/AppShell';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/entrar');
  }

  return <AppShell>{children}</AppShell>;
}
