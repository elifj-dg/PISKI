'use client';

// Historial semanal: tira de 7 días (Lun-Dom) con navegación real entre
// semanas (regla UX #13), un día seleccionado con su resumen de proteína y
// la lista de comidas de ese día (mismo patrón visual de Hoy).

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, UtensilsCrossed, Clock, X } from 'lucide-react';

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

const LABEL_DIA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const HOY_ISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

function claveDia(iso: string) {
  return iso.slice(0, 10);
}

export function Historial({
  comidas,
  lunesIso,
  offset,
  proteinaObjetivo,
}: {
  comidas: Comida[];
  lunesIso: string;
  offset: number;
  proteinaObjetivo: number;
}) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState<string | null>(null);

  const dias = useMemo(() => {
    const lunes = new Date(lunesIso);
    return Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(lunes);
      fecha.setDate(lunes.getDate() + i);
      const clave = fecha.toISOString().slice(0, 10);
      const delDia = comidas.filter((c) => claveDia(c.created_at) === clave);
      const proteina = delDia.reduce((sum, c) => sum + (c.proteina_aprox ?? 0), 0);
      return { fecha, clave, comidas: delDia, proteina: Math.round(proteina) };
    });
  }, [comidas, lunesIso]);

  const claveHoy = claveDia(HOY_ISO());
  const indiceHoy = dias.findIndex((d) => d.clave === claveHoy);
  const [seleccionado, setSeleccionado] = useState(indiceHoy >= 0 ? indiceHoy : 0);
  const dia = dias[seleccionado];

  const lunes = new Date(lunesIso);
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  const rangoLabel = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' });
  const periodo = `${rangoLabel.format(lunes)} – ${rangoLabel.format(domingo)}`;

  const eliminar = async (id: string) => {
    if (eliminando) return;
    setEliminando(id);
    try {
      await fetch(`/api/registrar-comida/${id}`, { method: 'DELETE' });
    } finally {
      router.refresh();
    }
  };

  const irASemana = (nuevoOffset: number) => {
    router.push(`/historial?semana=${nuevoOffset}`);
  };

  return (
    <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-[var(--text-tertiary)]">{periodo}</p>
          <h1 className="mt-1 text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tu historial
          </h1>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => irASemana(offset - 1)}
            aria-label="Semana anterior"
            className="flex size-11 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] text-[var(--text-secondary)] [touch-action:manipulation]"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => irASemana(offset + 1)}
            disabled={offset >= 0}
            aria-label="Semana siguiente"
            className="flex size-11 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] text-[var(--text-secondary)] [touch-action:manipulation] disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-1.5">
        {dias.map((d, i) => {
          const activo = i === seleccionado;
          const esHoy = d.clave === claveHoy;
          const proporcion = proteinaObjetivo > 0 ? Math.min(1, d.proteina / proteinaObjetivo) : 0;
          return (
            <motion.button
              key={d.clave}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSeleccionado(i)}
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-[var(--radius-card)] py-2.5 [touch-action:manipulation] ${
                activo ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface)] text-[var(--text-secondary)]'
              }`}
            >
              <span className="text-[11px] font-medium">{LABEL_DIA[i]}</span>
              <span className={`text-[15px] font-bold ${esHoy && !activo ? 'text-[var(--accent)]' : ''}`}>
                {d.fecha.getDate()}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  d.comidas.length === 0
                    ? 'bg-transparent'
                    : activo
                    ? 'bg-[var(--bg)]'
                    : proporcion >= 1
                    ? 'bg-[var(--accent)]'
                    : 'bg-[color-mix(in_oklab,var(--accent)_45%,transparent)]'
                }`}
                aria-hidden="true"
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={dia.clave}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]"
        >
          <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Proteína ese día</p>
          <p className="mt-1 text-[22px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            {dia.proteina}g <span className="text-[15px] font-medium text-[var(--text-tertiary)]">de {proteinaObjetivo}g</span>
          </p>
        </motion.div>
      </AnimatePresence>

      {dia.comidas.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] px-6 py-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
            <UtensilsCrossed size={26} aria-hidden="true" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
            {dia.clave === claveHoy ? 'Aún no registras nada hoy' : 'No registraste nada este día'}
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {dia.comidas.map((c, i) => (
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
                  aria-label={`Quitar ${c.descripcion} de tu registro`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--text-tertiary)] [touch-action:manipulation] hover:text-[var(--danger)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
