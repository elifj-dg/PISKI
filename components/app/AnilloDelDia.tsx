'use client';

// El dispositivo ownable de Piski (FICHA-ARTE.md) en su versión real: el
// anillo de progreso del día, con datos reales del usuario (no una demo
// estática como en la landing). Baseline de movimiento: conteo héroe +
// anillo dibujándose al entrar.

import { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Flame } from 'lucide-react';

const RADIO = 56;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

export function AnilloDelDia({
  proteinaConsumida,
  proteinaObjetivo,
  caloriasConsumidas,
  caloriasObjetivo,
}: {
  proteinaConsumida: number;
  proteinaObjetivo: number;
  caloriasConsumidas: number;
  caloriasObjetivo: number;
}) {
  const reduce = useReducedMotion();
  const gradienteId = useId();
  const porcentaje = proteinaObjetivo > 0 ? Math.min(100, Math.round((proteinaConsumida / proteinaObjetivo) * 100)) : 0;
  const [mostrado, setMostrado] = useState(reduce ? proteinaConsumida : 0);
  const [pctMostrado, setPctMostrado] = useState(reduce ? porcentaje : 0);

  useEffect(() => {
    if (reduce) {
      setMostrado(proteinaConsumida);
      setPctMostrado(porcentaje);
      return;
    }
    const inicio = performance.now();
    const duracionMs = 900;
    let frame: number;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracionMs);
      const easeOut = 1 - Math.pow(1 - t, 3);
      setMostrado(Math.round(easeOut * proteinaConsumida));
      setPctMostrado(Math.round(easeOut * porcentaje));
      if (t < 1) frame = requestAnimationFrame(paso);
    };
    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proteinaConsumida, porcentaje]);

  const offset = CIRCUNFERENCIA * (1 - pctMostrado / 100);
  const caloriasRestantes = Math.max(0, caloriasObjetivo - caloriasConsumidas);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-6 flex items-center gap-5 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]"
    >
      <div className="relative size-32 shrink-0">
        <svg width={128} height={128} viewBox="0 0 128 128" role="img" aria-label={`${pctMostrado} por ciento de tu meta de proteína hoy`}>
          <defs>
            <linearGradient id={gradienteId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <circle cx={64} cy={64} r={RADIO} fill="none" stroke="var(--surface-2)" strokeWidth={10} />
          <motion.circle
            cx={64}
            cy={64}
            r={RADIO}
            fill="none"
            stroke={`url(#${gradienteId})`}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            style={{ strokeDashoffset: offset, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-bold tabular-nums leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
            {mostrado}g
          </span>
          <span className="mt-1 text-[11px] text-[var(--text-tertiary)]">de {proteinaObjetivo}g</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Proteína de hoy</p>
        <p className="mt-0.5 text-[15px] font-bold text-[var(--accent)]">{pctMostrado}% de tu meta</p>
        <div className="mt-3 flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)]">
          <Flame size={14} className="text-[var(--text-tertiary)]" aria-hidden="true" />
          <span>
            {caloriasRestantes > 0 ? `${caloriasRestantes} kcal restantes` : 'Meta de calorías alcanzada'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
