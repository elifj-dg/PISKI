'use client';

// Lista de lo que el usuario ya registró hoy. Empty state ilustrado (no
// "No hay datos") con CTA hacia el Motor — regla UX #7/#11 del SO.

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { UtensilsCrossed, Clock, X } from 'lucide-react';

interface Comida {
  id: string;
  descripcion: string;
  proteina_aprox: number | null;
  calorias_aprox: number | null;
  momento: string | null;
  created_at: string;
}

const LABEL_MOMENTO: Record<string, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
  snack: 'Snack',
};

export function ListaComidasHoy({ comidas }: { comidas: Comida[] }) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState<string | null>(null);

  const eliminar = async (id: string) => {
    if (eliminando) return;
    setEliminando(id);
    try {
      await fetch(`/api/registrar-comida/${id}`, { method: 'DELETE' });
    } finally {
      router.refresh();
    }
  };

  if (comidas.length === 0) {
    return (
      <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] px-6 py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
          <UtensilsCrossed size={26} aria-hidden="true" />
        </span>
        <p className="mt-4 text-[15px] font-semibold text-[var(--text-primary)]">Aún no registras nada hoy</p>
        <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-[var(--text-secondary)]">
          Usa "¿Qué como ahora?" para tu primera comida del día.
        </p>
        <button
          type="button"
          onClick={() => router.push('/hoy/motor')}
          className="mt-4 text-[13px] font-semibold text-[var(--accent)] underline underline-offset-2 [touch-action:manipulation]"
        >
          Empezar ahora
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 pb-6">
      <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Hoy registraste</p>
      <AnimatePresence initial={false}>
        {comidas.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="flex items-center gap-3 overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
              <UtensilsCrossed size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-[var(--text-primary)]">{c.descripcion}</p>
              <div className="mt-0.5 flex items-center gap-2 text-[12px] text-[var(--text-tertiary)]">
                {c.momento && <span>{LABEL_MOMENTO[c.momento] ?? c.momento}</span>}
                <span className="flex items-center gap-1">
                  <Clock size={11} aria-hidden="true" />
                  {new Date(c.created_at).toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[13px] font-bold text-[var(--accent)]">{Math.round(c.proteina_aprox ?? 0)}g</p>
              <p className="text-[11px] text-[var(--text-tertiary)]">{Math.round(c.calorias_aprox ?? 0)} kcal</p>
            </div>
            <button
              type="button"
              onClick={() => eliminar(c.id)}
              disabled={eliminando === c.id}
              aria-label={`Quitar ${c.descripcion} de tu registro de hoy`}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--text-tertiary)] [touch-action:manipulation] hover:text-[var(--danger)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
