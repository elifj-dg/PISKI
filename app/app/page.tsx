// Checkpoint post-login (Sesión 5): confirma que Supabase Auth + RLS
// funcionan de punta a punta. La app interna real (Home/¿Qué Como Ahora?/
// Modo rescate/Perfil) es la Sesión 6 — esto NO es esa pantalla, es la
// prueba de que el login real deja al usuario en un lugar seguro.

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CerrarSesionButton } from './CerrarSesionButton';
import { SincronizarOnboarding } from './SincronizarOnboarding';

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/entrar');
  }

  const { data: perfil } = await supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[var(--bg)] px-6 text-center">
      <SincronizarOnboarding />
      <h1 className="text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
        Ya entraste, {user.email}
      </h1>
      <p className="max-w-sm text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Tu cuenta y tu plan quedaron guardados de forma segura. La app completa (Home, el Motor ¿Qué Como
        Ahora?, Modo rescate y tu perfil) llega en la próxima sesión de construcción.
      </p>
      {perfil?.objetivo && (
        <p className="text-[13px] text-[var(--text-tertiary)]">
          Objetivo guardado: <strong className="text-[var(--text-secondary)]">{perfil.objetivo}</strong>
        </p>
      )}
      <CerrarSesionButton />
    </main>
  );
}
