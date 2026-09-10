'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flame, Dumbbell, Heart, Leaf } from 'lucide-react';
import { CtaFijo } from '@/components/onboarding/ui';
import { LABEL_OBJETIVO, type Objetivo } from '@/lib/plan';

const OPCIONES: { value: Objetivo; icon: typeof Flame }[] = [
  { value: 'bajar_grasa', icon: Flame },
  { value: 'ganar_musculo', icon: Dumbbell },
  { value: 'mantener', icon: Heart },
  { value: 'comer_mejor', icon: Leaf },
];

export function MisObjetivos({ objetivoActual }: { objetivoActual: string | null }) {
  const router = useRouter();
  const [seleccion, setSeleccion] = useState<Objetivo | null>((objetivoActual as Objetivo) ?? null);
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const guardar = async () => {
    if (guardando || !seleccion) return;
    setGuardando(true);
    setGuardado(false);
    try {
      const res = await fetch('/api/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objetivo: seleccion }),
      });
      if (!res.ok) throw new Error('fallo');
      setGuardado(true);
      router.refresh();
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-4 pb-[max(24px,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Volver a tu perfil"
        className="flex size-11 items-center justify-center rounded-full text-[var(--text-secondary)] [touch-action:manipulation]"
      >
        <ArrowLeft size={22} aria-hidden="true" />
      </button>

      <h1 className="mt-2 text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
        ¿Qué quieres lograr?
      </h1>
      <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Esto cambia tus recomendaciones y tu meta diaria.</p>

      <div className="mt-6 flex flex-col gap-2.5">
        {OPCIONES.map(({ value, icon: Icono }) => {
          const activo = seleccion === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setSeleccion(value)}
              className={`flex items-center gap-3 rounded-[var(--radius-button)] border p-4 text-left [touch-action:manipulation] ${
                activo
                  ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                  activo ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface-2)] text-[var(--text-secondary)]'
                }`}
              >
                <Icono size={18} aria-hidden="true" />
              </span>
              <span className="text-[15px] font-semibold capitalize text-[var(--text-primary)]">{LABEL_OBJETIVO[value]}</span>
            </button>
          );
        })}
      </div>

      {guardado && !guardando && (
        <p className="mt-4 text-center text-[13px] font-medium text-[var(--accent)]">Guardado.</p>
      )}

      <div className="mt-auto pt-6">
        <CtaFijo label="Guardar objetivo" onClick={guardar} disabled={!seleccion} loading={guardando} loadingLabel="Guardando…" />
      </div>
    </div>
  );
}
