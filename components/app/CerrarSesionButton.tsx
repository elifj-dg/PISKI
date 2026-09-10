'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function CerrarSesionButton({ className }: { className?: string }) {
  const router = useRouter();

  const cerrarSesion = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={cerrarSesion}
      className={className ?? 'text-[13px] font-medium text-[var(--text-tertiary)] underline underline-offset-2 [touch-action:manipulation]'}
    >
      Cerrar sesión
    </button>
  );
}
