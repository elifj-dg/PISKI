'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import type { BasicoId } from '@/lib/recomendaciones';

const TODOS_LOS_BASICOS: { id: BasicoId; label: string }[] = [
  { id: 'huevo', label: 'Huevo' },
  { id: 'pollo', label: 'Pollo' },
  { id: 'frijoles', label: 'Frijoles' },
  { id: 'tortillas', label: 'Tortillas' },
  { id: 'arroz', label: 'Arroz' },
  { id: 'atun', label: 'Atún' },
  { id: 'aguacate', label: 'Aguacate' },
  { id: 'queso', label: 'Queso' },
];

export function MisBasicos({ seleccionados }: { seleccionados: string[] }) {
  const router = useRouter();
  const [activos, setActivos] = useState(new Set(seleccionados));
  const [pendiente, setPendiente] = useState<string | null>(null);

  const alternar = async (alimento: string) => {
    if (pendiente) return;
    const yaActivo = activos.has(alimento);
    setPendiente(alimento);
    setActivos((prev) => {
      const siguiente = new Set(prev);
      if (yaActivo) siguiente.delete(alimento);
      else siguiente.add(alimento);
      return siguiente;
    });
    try {
      await fetch('/api/mis-basicos', {
        method: yaActivo ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alimento }),
      });
      router.refresh();
    } finally {
      setPendiente(null);
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
        Mis básicos
      </h1>
      <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
        Toca lo que siempre tienes en casa — así el Motor te da opciones que de verdad puedes cocinar.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {TODOS_LOS_BASICOS.map((b) => {
          const activo = activos.has(b.id);
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => alternar(b.id)}
              disabled={pendiente === b.id}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[14px] font-semibold [touch-action:manipulation] disabled:opacity-60 ${
                activo
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)] text-[var(--text-primary)]'
              }`}
            >
              {activo && <Check size={14} aria-hidden="true" />}
              {b.label}
            </button>
          );
        })}
      </div>

      {activos.size === 0 && (
        <p className="mt-6 text-center text-[13px] text-[var(--text-tertiary)]">
          Sin básicos, el Motor te muestra opciones generales para empezar.
        </p>
      )}
    </div>
  );
}
