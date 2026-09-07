'use client';

// Piezas compartidas del funnel de onboarding/paywall (no es parte del kit de
// landing) — construidas sobre los mismos tokens de FICHA-ARTE (globals.css).
// Blueprints: docs/sistema/50-DISENO-ONBOARDING-PAYWALL.md

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check, ChevronLeft, Loader2 } from 'lucide-react';

/* ── Header del funnel: logo + atrás + barra de progreso (línea fina, % real, endowed progress) ── */
export function FunnelHeader({
  progreso,
  onBack,
  showBack = true,
}: {
  /** 0-100. Nunca menor a 5 (endowed progress). */
  progreso: number;
  onBack?: () => void;
  showBack?: boolean;
}) {
  const pct = Math.max(5, Math.min(100, progreso));
  return (
    <div className="flex items-center gap-2 px-2 py-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Atrás"
        className={`flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] [touch-action:manipulation] ${
          showBack ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)]">
        <motion.div
          className="h-full rounded-full bg-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ── Wrapper de pantalla: logo arriba, contenido centrado, safe-area abajo.
   Degradado radial sutil (mismo patrón que Hero.tsx de la landing) para dar
   profundidad y firma de marca, en vez de un fondo plano de un solo nivel. ── */
export function FunnelScreen({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-dvh flex-col bg-[var(--bg)] px-5 pt-2 pb-[max(20px,env(safe-area-inset-bottom))]"
      style={{
        backgroundImage:
          'radial-gradient(900px 480px at 50% -10%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%)',
      }}
    >
      {children}
    </div>
  );
}

/* ── Título + subtítulo de pregunta ── */
export function PreguntaTitulo({ titulo, sub }: { titulo: string; sub?: string }) {
  return (
    <div className="mt-6">
      <h1 className="text-balance text-[28px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
        {titulo}
      </h1>
      {sub && <p className="mt-2 text-[14px] leading-snug text-[var(--text-secondary)]">{sub}</p>}
    </div>
  );
}

/* ── Variantes de entrada escalonada para grupos de opciones (baseline de movimiento, DESIGN-CORE) ── */
const gruposOpcionesContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const opcionItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Contenedor de una lista/grilla de ChipOpcion: escalona la entrada de sus hijos ── */
export function OpcionesGrupo({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? undefined : gruposOpcionesContainer}
      initial={reduce ? undefined : 'hidden'}
      animate={reduce ? undefined : 'show'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Chip de opción (selección única o múltiple) — ancho completo, 56-64px ── */
export function ChipOpcion({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={opcionItemVariants}
      whileTap={{ scale: 0.97 }}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-button)] border px-4 py-3 text-left text-[16px] font-medium transition-colors duration-150 [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        selected
          ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--text-primary)] shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_18%,transparent)]'
          : 'border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[0_2px_8px_color-mix(in_oklab,var(--text-primary)_8%,transparent)]'
      }`}
    >
      {icon && <span className="shrink-0 text-[var(--accent)]">{icon}</span>}
      <span className="flex-1">{label}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
        >
          <Check size={13} color="var(--bg)" strokeWidth={3} aria-hidden="true" />
        </motion.span>
      )}
    </motion.button>
  );
}

/* ── CTA fijo abajo (selección múltiple / formularios) ── */
export function CtaFijo({
  label,
  onClick,
  disabled,
  disabledHint,
  loading,
  loadingLabel,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  /** Qué le falta completar al usuario — se muestra debajo cuando `disabled` es true. */
  disabledHint?: string;
  /** Bloquea el botón y muestra un spinner — evita doble-tap en acciones que tardan (pago, envío). */
  loading?: boolean;
  loadingLabel?: string;
}) {
  const bloqueado = disabled || loading;
  return (
    <div className="mt-6">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={bloqueado}
        whileTap={bloqueado ? undefined : { scale: 0.97 }}
        className={`flex h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] text-[16px] font-semibold transition-opacity duration-200 [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)] ${
          bloqueado
            ? 'bg-[var(--accent)] text-[var(--bg)] opacity-50'
            : 'bg-[var(--accent)] text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)]'
        }`}
      >
        {loading && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {loading ? loadingLabel ?? 'Un momento…' : label}
      </motion.button>
      {disabled && disabledHint && (
        <p className="mt-2 text-center text-[12px] text-[var(--text-tertiary)]">{disabledHint}</p>
      )}
    </div>
  );
}

/* ── Transición entre pasos (entrada/salida horizontal). El título se ancla
   arriba con un margen fijo (ver PreguntaTitulo) en vez de centrarse en el
   viewport — evita el hueco variable entre header y título en pasos cortos. ── */
export function PasoTransicion({ children, stepKey }: { children: ReactNode; stepKey: string | number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={stepKey}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}

/* ── Input numérico simple (datos básicos) ── */
export function CampoNumero({
  label,
  value,
  onChange,
  unidad,
  placeholder,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unidad?: string;
  placeholder?: string;
  /** Rango razonable del dato (peso, estatura, edad, etc.) — evita valores absurdos. */
  min?: number;
  max?: number;
}) {
  const fueraDeRango = value !== '' && ((min !== undefined && Number(value) < min) || (max !== undefined && Number(value) > max));
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-[var(--text-secondary)]">{label}</span>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-[var(--radius-button)] border bg-[var(--surface)] px-4 ${
          fueraDeRango ? 'border-[var(--danger)]' : 'border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)]'
        }`}
      >
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            if (e.target.value === '') return;
            const n = Number(e.target.value);
            if (min !== undefined && n < min) onChange(String(min));
            else if (max !== undefined && n > max) onChange(String(max));
          }}
          className="h-14 w-full bg-transparent text-[17px] font-semibold text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)] placeholder:font-normal"
        />
        {unidad && <span className="text-[14px] text-[var(--text-tertiary)]">{unidad}</span>}
      </div>
      {fueraDeRango && (
        <span className="mt-1 block text-[12px] text-[var(--danger)]">
          Debe estar entre {min} y {max}
        </span>
      )}
    </label>
  );
}
