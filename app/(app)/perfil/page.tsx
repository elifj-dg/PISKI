// PERFIL — objetivo, plan calculado, mis básicos y cerrar sesión. Datos
// reales del usuario (ESTADO.md → Mapa de pantallas, pantalla 8).

import { createClient } from '@/lib/supabase/server';
import { LABEL_OBJETIVO } from '@/lib/plan';
import { CerrarSesionButton } from '@/components/app/CerrarSesionButton';
import { Flame, Beef, ShoppingBasket, Ruler, Weight, Calendar } from 'lucide-react';

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: perfil }, { data: basicos }] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user!.id).maybeSingle(),
    supabase.from('mis_basicos').select('alimento').eq('user_id', user!.id),
  ]);

  const objetivoLabel = perfil?.objetivo ? LABEL_OBJETIVO[perfil.objetivo as keyof typeof LABEL_OBJETIVO] : 'Sin definir';
  const preferencias = (perfil?.preferencias as { pesoObjetivo?: string | null } | null) ?? null;
  const pesoObjetivo = preferencias?.pesoObjetivo ? Number(preferencias.pesoObjetivo) : null;

  return (
    <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
      <h1 className="text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
        Tu perfil
      </h1>
      <p className="mt-1 text-[13px] text-[var(--text-tertiary)]">{user?.email}</p>

      <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Tu objetivo</p>
        <p className="mt-1 text-[18px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">{objetivoLabel}</p>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Flame size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.calorias_objetivo ?? '—'}</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">kcal/día</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Beef size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.proteina_objetivo ?? '—'}g</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">proteína/día</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Tu cuerpo</p>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Calendar size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.edad ?? '—'}</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">años</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Ruler size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.estatura ?? '—'}</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">cm</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <Weight size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[var(--text-primary)]">{perfil?.peso ?? '—'}</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">kg actual</p>
            </div>
          </div>
        </div>
        {pesoObjetivo && (
          <p className="mt-4 text-[13px] text-[var(--text-secondary)]">
            Tu meta de peso: <span className="font-bold text-[var(--text-primary)]">{pesoObjetivo}kg</span>
          </p>
        )}
      </div>

      <div className="mt-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text-secondary)]">
          <ShoppingBasket size={14} aria-hidden="true" />
          Mis básicos
        </p>
        {basicos && basicos.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {basicos.map((b) => (
              <span key={b.alimento} className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-primary)] capitalize">
                {b.alimento}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">Todavía no agregas básicos.</p>
        )}
      </div>

      <div className="mt-auto pt-6 text-center">
        <CerrarSesionButton />
      </div>
    </div>
  );
}
