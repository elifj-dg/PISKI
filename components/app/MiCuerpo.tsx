'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CampoNumero, ChipOpcion, CtaFijo } from '@/components/onboarding/ui';

const OPCIONES_ACTIVIDAD = [
  { value: 'sentado', label: 'Sentado la mayor parte del día' },
  { value: 'movimiento', label: 'Me muevo algo (caminar, parado a ratos)' },
  { value: 'de_pie', label: 'De pie casi todo el día' },
  { value: 'fisico', label: 'Trabajo físico o muy activo' },
];

export function MiCuerpo({
  peso,
  estatura,
  edad,
  actividad,
  pesoObjetivo,
  caloriasObjetivo,
  proteinaObjetivo,
}: {
  peso: number | null;
  estatura: number | null;
  edad: number | null;
  actividad: string | null;
  pesoObjetivo: number | null;
  caloriasObjetivo: number | null;
  proteinaObjetivo: number | null;
}) {
  const router = useRouter();
  const [vPeso, setVPeso] = useState(peso ? String(peso) : '');
  const [vEstatura, setVEstatura] = useState(estatura ? String(estatura) : '');
  const [vEdad, setVEdad] = useState(edad ? String(edad) : '');
  const [vActividad, setVActividad] = useState(actividad ?? '');
  const [vPesoObjetivo, setVPesoObjetivo] = useState(pesoObjetivo ? String(pesoObjetivo) : '');
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const guardar = async () => {
    if (guardando) return;
    setGuardando(true);
    setGuardado(false);
    try {
      const res = await fetch('/api/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          peso: vPeso ? Number(vPeso) : undefined,
          estatura: vEstatura ? Number(vEstatura) : undefined,
          edad: vEdad ? Number(vEdad) : undefined,
          actividad: vActividad || undefined,
          pesoObjetivo: vPesoObjetivo ? Number(vPesoObjetivo) : null,
        }),
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
        Mi cuerpo
      </h1>
      <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Esto nos ayuda a ajustar tu plan.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <CampoNumero label="Peso actual" unidad="kg" value={vPeso} onChange={setVPeso} min={30} max={250} />
          </div>
          <div className="flex-1">
            <CampoNumero label="Estatura" unidad="cm" value={vEstatura} onChange={setVEstatura} min={100} max={230} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <CampoNumero label="Edad" unidad="años" value={vEdad} onChange={setVEdad} min={14} max={100} />
          </div>
          <div className="flex-1">
            <CampoNumero label="Meta de peso" unidad="kg" value={vPesoObjetivo} onChange={setVPesoObjetivo} min={30} max={250} />
          </div>
        </div>

        <div>
          <span className="text-[13px] font-semibold text-[var(--text-secondary)]">Tu nivel de actividad diaria</span>
          <div className="mt-2 flex flex-col gap-2">
            {OPCIONES_ACTIVIDAD.map((o) => (
              <ChipOpcion key={o.value} label={o.label} selected={vActividad === o.value} onClick={() => setVActividad(o.value)} />
            ))}
          </div>
        </div>

        {caloriasObjetivo && proteinaObjetivo && (
          <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]">
            <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Tu plan actual</p>
            <p className="mt-1 text-[14px] text-[var(--text-primary)]">
              <span className="font-bold">{caloriasObjetivo}</span> kcal/día ·{' '}
              <span className="font-bold">{proteinaObjetivo}g</span> proteína/día
            </p>
            <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">Se recalcula al guardar cambios.</p>
          </div>
        )}

        {guardado && !guardando && (
          <p className="text-center text-[13px] font-medium text-[var(--accent)]">Guardado.</p>
        )}
      </div>

      <div className="mt-auto pt-6">
        <CtaFijo label="Guardar cambios" onClick={guardar} loading={guardando} loadingLabel="Guardando…" />
      </div>
    </div>
  );
}
