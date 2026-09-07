'use client';

// C1. PAYWALL (50 → C) — pantalla de PRIMERA CLASE (Regla de Oro 6). Blueprint:
// X cerrar, headline con meta real, costo hundido visible ("hecho con tus N
// respuestas"), value stack ≤3, timeline C4 (Hoy/Día 5/Día 7), 2 planes
// (anual destacado / mensual), CTA en 1ª persona, trust row, salida "Ahora no".
// Precios y plazos: FICHA-MERCADO.md (trial 7 días, garantía 15 días).

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, Sparkles, ShieldCheck, Zap, Ban, Check } from 'lucide-react';
import { CtaFijo } from './ui';

const PLANES = [
  {
    id: 'anual',
    nombre: 'Anual',
    precioMes: '$82.50',
    precioTotal: '$990 al año',
    ahorro: 'Ahorras 2 meses',
    destacado: true,
  },
  {
    id: 'mensual',
    nombre: 'Mensual',
    precioMes: '$99',
    precioTotal: 'por mes',
    ahorro: null,
    destacado: false,
  },
];

const BENEFICIOS = [
  { icon: Zap, texto: 'Se acabó el "¿y ahora qué como?": el Motor decide por ti' },
  { icon: Sparkles, texto: 'Modo rescate para el día que se te complica' },
  { icon: ShieldCheck, texto: 'Aprende de tus gustos cada semana' },
];

const FOCO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

export function Paywall({
  objetivoLabel,
  caloriasObjetivo,
  proteinaObjetivo,
  nRespuestas,
  onCerrar,
  onContinuarGratis,
  onComprar,
}: {
  objetivoLabel: string;
  caloriasObjetivo: number;
  proteinaObjetivo: number;
  nRespuestas: number;
  onCerrar: () => void;
  onContinuarGratis: () => void;
  onComprar: (planId: string) => void;
}) {
  const [planId, setPlanId] = useState('anual');
  const [confirmandoSalida, setConfirmandoSalida] = useState(false);
  const [comprando, setComprando] = useState(false);
  const [errorCompra, setErrorCompra] = useState(false);
  const reduce = useReducedMotion();
  const inicial = (y = 8) => (reduce ? { opacity: 0 } : { opacity: 0, y });
  const animado = { opacity: 1, y: 0 };

  const empezar = () => {
    if (comprando) return; // evita doble-tap mientras se procesa
    setErrorCompra(false);
    setComprando(true);
    try {
      onComprar(planId);
    } catch {
      setComprando(false);
      setErrorCompra(true);
    }
  };

  return (
    <div
      className="relative flex min-h-dvh flex-col bg-[var(--bg)] px-5 pb-[max(20px,env(safe-area-inset-bottom))]"
      style={{
        backgroundImage:
          'radial-gradient(900px 480px at 50% -10%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%)',
      }}
    >
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => setConfirmandoSalida(true)}
          aria-label="Cerrar"
          className={`flex size-11 items-center justify-center rounded-full text-[var(--text-secondary)] [touch-action:manipulation] ${FOCO}`}
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      <motion.div initial={inicial()} animate={animado} transition={{ duration: 0.3 }}>
        <span className="inline-block rounded-full border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-3 py-1 text-[12px] font-semibold text-[var(--accent)]">
          Hecho con tus {nRespuestas} respuestas
        </span>
        <h1 className="mt-3 text-balance text-[28px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
          Tu plan para {objetivoLabel} <span className="text-[var(--accent)]">está listo</span>
        </h1>
        <p className="mt-2 text-[14px] leading-snug text-[var(--text-secondary)]">
          Meta diaria: <strong className="text-[var(--accent)]">{caloriasObjetivo} kcal</strong> ·{' '}
          <strong className="text-[var(--accent)]">{proteinaObjetivo}g</strong> de proteína
        </p>
      </motion.div>

      <motion.ul
        initial={inicial(0)}
        animate={animado}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-6 flex flex-col gap-3"
      >
        {BENEFICIOS.map(({ icon: Icon, texto }) => (
          <li key={texto} className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]">
              <Icon size={16} aria-hidden="true" />
            </span>
            <span className="pt-1 text-[14px] leading-snug text-[var(--text-primary)]">{texto}</span>
          </li>
        ))}
      </motion.ul>

      <motion.div
        initial={inicial(0)}
        animate={animado}
        transition={{ duration: 0.3, delay: 0.16 }}
        className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]"
      >
        <div className="flex justify-between text-[12px] font-semibold text-[var(--text-tertiary)]">
          <span>Hoy</span>
          <span>Día 5</span>
          <span>Día 7</span>
        </div>
        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: '35%' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-3 text-[13px] leading-snug text-[var(--text-secondary)]">
          Empiezas gratis hoy. Te avisamos por correo un día antes del Día 7, cuando termina tu prueba. Cancela cuando
          quieras desde tu perfil, sin llamadas ni preguntas.
        </p>
      </motion.div>

      <p className="mt-6 text-[12px] text-[var(--text-tertiary)]">Elegimos el anual porque te sale más barato al mes. Toca el plan mensual si lo prefieres.</p>
      <div className="mt-2 flex flex-col gap-3">
        {PLANES.map((plan) => {
          const selected = planId === plan.id;
          return (
            <motion.button
              key={plan.id}
              type="button"
              onClick={() => setPlanId(plan.id)}
              whileTap={{ scale: 0.97 }}
              style={
                plan.destacado
                  ? {
                      borderImage: 'linear-gradient(135deg, var(--accent), var(--accent-2)) 1',
                    }
                  : undefined
              }
              className={`relative flex w-full items-center gap-3 rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors duration-150 [touch-action:manipulation] ${FOCO} ${
                plan.destacado ? 'border-2' : ''
              } ${
                selected
                  ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_18%,transparent)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)]'
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[11px] font-semibold text-[var(--bg)]">
                  Mejor valor
                </span>
              )}
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                  selected ? 'bg-[var(--accent)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)]'
                }`}
              >
                {selected && <Check size={13} color="var(--bg)" strokeWidth={3} aria-hidden="true" />}
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-[var(--text-primary)]">{plan.nombre}</p>
                <p className="text-[13px] text-[var(--text-secondary)]">{plan.precioTotal}</p>
              </div>
              <div className="text-right">
                <p className="text-[17px] font-bold text-[var(--text-primary)]">{plan.precioMes}</p>
                <p className="text-[12px] text-[var(--text-tertiary)]">/mes</p>
                {plan.ahorro && <p className="mt-0.5 text-[11px] font-semibold text-[var(--accent)]">{plan.ahorro}</p>}
              </div>
            </motion.button>
          );
        })}
      </div>

      <CtaFijo
        label="Empezar mis 7 días gratis"
        onClick={empezar}
        loading={comprando}
        loadingLabel="Llevándote a tu pago…"
      />
      {errorCompra && (
        <p className="mt-2 text-center text-[12px] text-[var(--danger)]">
          Algo falló al llevarte al pago. Inténtalo de nuevo.
        </p>
      )}

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
        <ShieldCheck size={14} aria-hidden="true" />
        <span>Garantía de 15 días · cancela cuando quieras</span>
      </div>

      <button
        type="button"
        onClick={onContinuarGratis}
        className={`mt-4 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium text-[var(--text-tertiary)] [touch-action:manipulation] ${FOCO}`}
      >
        <Ban size={13} aria-hidden="true" />
        Ahora no, seguir sin plan
      </button>

      <AnimatePresence>
        {confirmandoSalida && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_oklab,var(--text-primary)_45%,transparent)] px-5 pb-8"
            onClick={() => setConfirmandoSalida(false)}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[18px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
                ¿Seguro que quieres salir?
              </h2>
              <p className="mt-2 text-[14px] leading-snug text-[var(--text-secondary)]">
                Vas a perder tu plan y las {nRespuestas} respuestas que ya diste.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmandoSalida(false)}
                  className={`flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] [touch-action:manipulation] ${FOCO}`}
                >
                  Seguir viendo mi plan
                </button>
                <button
                  type="button"
                  onClick={onCerrar}
                  className={`flex h-14 w-full items-center justify-center text-[14px] font-medium text-[var(--text-tertiary)] [touch-action:manipulation] ${FOCO}`}
                >
                  Salir sin guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
