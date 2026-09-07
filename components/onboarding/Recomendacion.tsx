'use client';

// LA PRIMERA VICTORIA REAL (Constitución del producto, ver ESTADO.md): antes
// de pedir pago, el usuario vive el mecanismo "¿Qué Como Ahora?" con una
// respuesta concreta — no solo un número de calorías. "¿Te late?" / "Dame
// otra" es el gesto de aprendizaje que define a Piski frente a un contador.
//
// Sin fotografía real de comida todavía (sin pipeline de assets, ver
// 20-ASSETS-VISUALES.md) — el ícono grande por categoría de ingrediente es el
// ancla visual de transición hasta que exista esa foto real.

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Clock, DollarSign, Flame, ThumbsUp, RotateCcw, Egg, Beef, Leaf, Wheat, Sparkles, Zap } from 'lucide-react';
import type { Combo } from '@/lib/recomendaciones';
import { labelCosto } from '@/lib/recomendaciones';
import { CtaFijo } from './ui';

function iconoPorCombo(combo: Combo) {
  if (combo.ingredientes.includes('huevo')) return Egg;
  if (combo.ingredientes.includes('pollo') || combo.ingredientes.includes('atun')) return Beef;
  if (combo.ingredientes.includes('frijoles') || combo.ingredientes.includes('aguacate')) return Leaf;
  return Wheat;
}

export function Recomendacion({
  combos,
  onTeLate,
  onContinuar,
}: {
  combos: Combo[];
  onTeLate: (combo: Combo, reaccion: 'le_late' | 'otra') => void;
  onContinuar: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [elegido, setElegido] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const reduce = useReducedMotion();
  const combo = combos[idx % combos.length];
  const Icono = iconoPorCombo(combo);

  // Conteo animado de la proteína — el dato que más importa en este combo —
  // cada vez que cambia (entrada inicial y cada "Dame otra").
  const [proteinaMostrada, setProteinaMostrada] = useState(reduce ? combo.proteina : 0);
  useEffect(() => {
    if (reduce) {
      setProteinaMostrada(combo.proteina);
      return;
    }
    setProteinaMostrada(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      setProteinaMostrada(Math.min(n, combo.proteina));
      if (n >= combo.proteina) window.clearInterval(id);
    }, 20);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo.id]);

  const darOtra = () => {
    if (procesando) return;
    onTeLate(combo, 'otra');
    setIdx((i) => (i + 1) % combos.length);
  };

  const meLate = () => {
    if (procesando) return;
    setProcesando(true);
    onTeLate(combo, 'le_late');
    setElegido(true);
  };

  return (
    <div className="flex flex-1 flex-col justify-center">
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[15px] font-semibold text-[var(--text-secondary)]"
      >
        Esto te puede latir ahora
      </motion.p>

      <motion.div
        key={combo.id}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]"
        style={{ boxShadow: '0 16px 40px -12px color-mix(in oklab, var(--text-primary) 22%, transparent)' }}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]">
          <Icono size={30} aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-balance text-[26px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
          {combo.nombre}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-3 py-1.5 text-[13px] font-semibold text-[var(--accent)]">
            <Flame size={14} aria-hidden="true" />
            {proteinaMostrada}g proteína
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
            <Zap size={14} aria-hidden="true" />
            {combo.calorias} kcal
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
            <Clock size={14} aria-hidden="true" />
            {combo.tiempoMin} min
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
            <DollarSign size={14} aria-hidden="true" />
            {labelCosto(combo.costo)}
          </span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!elegido ? (
          <motion.div key="botones" exit={{ opacity: 0 }} className="mt-6 flex gap-3">
            <motion.button
              type="button"
              onClick={darOtra}
              disabled={procesando}
              whileTap={procesando ? undefined : { scale: 0.97 }}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--text-secondary)] [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50"
            >
              <RotateCcw size={17} aria-hidden="true" />
              Dame otra
            </motion.button>
            <motion.button
              type="button"
              onClick={meLate}
              disabled={procesando}
              whileTap={procesando ? undefined : { scale: 0.97 }}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)] disabled:opacity-50"
            >
              <ThumbsUp size={17} aria-hidden="true" />
              Sí, me late
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebracion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex flex-col items-center text-center"
          >
            <motion.span
              initial={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)]"
            >
              <Sparkles size={26} aria-hidden="true" />
            </motion.span>
            <p className="mt-3 text-[14px] leading-snug text-[var(--text-secondary)]">
              Así se siente Piski decidiendo por ti. Todos los días, en segundos.
            </p>
            <div className="w-full">
              <CtaFijo label="Continuar" onClick={onContinuar} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
