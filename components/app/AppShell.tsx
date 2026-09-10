'use client';

// Shell de la app interna: nav inferior fija (Hoy/Historial/Perfil) — mismo
// patrón que el ejemplo canónico del SO (53-PANTALLA-CANONICA.md): indicador
// activo que se desliza entre tabs (layoutId), safe-area, ≥44px táctil.

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Sparkles, CalendarDays, CircleUserRound } from 'lucide-react';
import { SincronizarOnboarding } from './SincronizarOnboarding';

const NAV = [
  { id: 'hoy', href: '/hoy', label: 'Hoy', icono: Sparkles },
  { id: 'historial', href: '/historial', label: 'Historial', icono: CalendarDays },
  { id: 'perfil', href: '/perfil', label: 'Perfil', icono: CircleUserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Rutas hijas de una sección (ej. /hoy/motor) mantienen esa pestaña activa.
  const activo = NAV.find((n) => pathname === n.href || pathname.startsWith(`${n.href}/`))?.id ?? 'hoy';

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)]">
      <SincronizarOnboarding />
      <main className="flex flex-1 flex-col">{children}</main>

      <nav
        aria-label="Navegación principal"
        className="sticky bottom-0 border-t border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
          {NAV.map(({ id, href, label, icono: Icono }) => {
            const activa = activo === id;
            return (
              <motion.button
                key={id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(href)}
                aria-current={activa ? 'page' : undefined}
                className="relative flex min-w-16 flex-col items-center justify-center gap-1 [touch-action:manipulation]"
              >
                {activa && (
                  <motion.span
                    layoutId="tab-activa"
                    aria-hidden="true"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-[var(--accent)]"
                  />
                )}
                <Icono size={22} aria-hidden="true" color={activa ? 'var(--accent)' : 'var(--text-tertiary)'} strokeWidth={activa ? 2.4 : 2} />
                <span className={`text-[11px] font-medium ${activa ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`}>{label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
