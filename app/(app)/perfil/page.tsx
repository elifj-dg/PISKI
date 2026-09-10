// PERFIL — pantalla principal tipo menú (contrato visual del usuario): resumen
// arriba + lista de accesos a las secciones editables. Datos reales.

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { CerrarSesionButton } from '@/components/app/CerrarSesionButton';
import { Weight, Flame, User2, Target, ShoppingBasket, ChevronRight, LogOut } from 'lucide-react';

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const inicioHoy = new Date();
  inicioHoy.setHours(0, 0, 0, 0);

  const [{ data: perfil }, { data: comidasHoy }] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user!.id).maybeSingle(),
    supabase.from('comidas_registradas').select('proteina_aprox').eq('user_id', user!.id).gte('created_at', inicioHoy.toISOString()),
  ]);

  const proteinaHoy = Math.round((comidasHoy ?? []).reduce((sum, c) => sum + (c.proteina_aprox ?? 0), 0));
  const nombre = user!.email?.split('@')[0] ?? '';
  const inicial = nombre.charAt(0).toUpperCase();

  const MENU = [
    { href: '/perfil/cuerpo', label: 'Mi cuerpo', descripcion: 'Peso, estatura, meta', Icono: User2 },
    { href: '/perfil/objetivo', label: 'Mis objetivos', descripcion: 'Qué quieres lograr', Icono: Target },
    { href: '/perfil/basicos', label: 'Mis básicos', descripcion: 'Lo que siempre tienes en casa', Icono: ShoppingBasket },
  ];

  return (
    <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
      <div className="flex items-center gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[20px] font-bold text-[var(--accent)] [font-family:var(--font-display)]">
          {inicial}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-balance text-[20px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)] capitalize">
            {nombre}
          </h1>
          <p className="truncate text-[13px] text-[var(--text-tertiary)]">{user?.email}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]">
          <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
            <Weight size={16} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.peso ?? '—'} kg</p>
            <p className="text-[11px] text-[var(--text-tertiary)]">Peso actual</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]">
          <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
            <Flame size={16} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-[var(--text-primary)]">{proteinaHoy}g</p>
            <p className="text-[11px] text-[var(--text-tertiary)]">Proteína hoy</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-1)]">
        {MENU.map(({ href, label, descripcion, Icono }, i) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 p-4 [touch-action:manipulation] active:bg-[var(--surface-2)] ${
              i > 0 ? 'border-t border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)]' : ''
            }`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Icono size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[var(--text-primary)]">{label}</p>
              <p className="truncate text-[12px] text-[var(--text-tertiary)]">{descripcion}</p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-[var(--radius-card)] py-3">
        <LogOut size={15} className="text-[var(--text-tertiary)]" aria-hidden="true" />
        <CerrarSesionButton className="text-[13px] font-medium text-[var(--text-tertiary)] [touch-action:manipulation]" />
      </div>
    </div>
  );
}
