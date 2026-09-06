'use client';

// Mini-demo VIVO del dispositivo ownable de Piski (el anillo de progreso, ver
// FICHA-ARTE.md) — no es parte del kit de landing (components/landing/), es un
// añadido propio del proyecto que refuerza el mecanismo "el Motor ¿Qué Como
// Ahora?" con una animación real (conteo + anillo dibujándose), no solo un
// screenshot estático. Vive fuera del kit para no tocar sus .tsx.

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const RADIO = 24;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;
const PORCENTAJE_FINAL = 61;

export function AnimatedRingDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const enVista = useInView(ref, { once: true, margin: '-10%' });
  const reduce = useReducedMotion();
  const [porcentaje, setPorcentaje] = useState(reduce ? PORCENTAJE_FINAL : 0);

  useEffect(() => {
    if (!enVista || reduce) return;
    const inicio = performance.now();
    const duracionMs = 900;
    let frame: number;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracionMs);
      // ease-out cúbico, coherente con --ease del kit
      const easeOut = 1 - Math.pow(1 - t, 3);
      setPorcentaje(Math.round(easeOut * PORCENTAJE_FINAL));
      if (t < 1) frame = requestAnimationFrame(paso);
    };
    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
  }, [enVista, reduce]);

  const offset = CIRCUNFERENCIA * (1 - porcentaje / 100);

  return (
    <div ref={ref} className="flex items-center gap-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-4">
      <div className="relative size-16 shrink-0">
        <svg width={64} height={64} viewBox="0 0 64 64" role="img" aria-label={`${porcentaje} por ciento de tu día en Piski`}>
          <circle cx={32} cy={32} r={RADIO} fill="none" stroke="var(--surface-2)" strokeWidth={8} />
          <motion.circle
            cx={32}
            cy={32}
            r={RADIO}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            style={{ strokeDashoffset: offset, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[16px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
          {porcentaje}%
        </div>
      </div>
      <div className="text-left">
        <p className="text-[11.5px] font-semibold text-[var(--text-secondary)]">Tu día en Piski</p>
        <p className="text-[16px] font-semibold text-[var(--text-primary)] [font-family:var(--font-display)]">
          Vas muy bien, Eli
        </p>
      </div>
    </div>
  );
}
