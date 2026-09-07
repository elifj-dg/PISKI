'use client';

// B. LOADING "CONSTRUYENDO TU PLAN" (50 → B) — el argumento de apertura del
// paywall (patrón Noom/Labor Illusion). 4-6s, líneas con respuestas REALES,
// anillo con mesetas (nunca lineal perfecto), nunca spinner genérico.

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';

export function LoadingPlan({
  objetivo,
  proteina,
  basicosCount,
  onDone,
}: {
  objetivo: string;
  proteina: number;
  basicosCount: number;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();
  const lineas = [
    `Analizando tu objetivo: ${objetivo}`,
    proteina > 0 ? `Ajustando tu proteína a ${proteina}g al día` : 'Ajustando tus objetivos',
    basicosCount > 0 ? `Usando los ${basicosCount} básicos que ya tienes` : 'Preparando tus primeras opciones',
    'Armando tu Motor ¿Qué Como Ahora?',
  ];
  const [activa, setActiva] = useState(0);
  const [pct, setPct] = useState(8);

  useEffect(() => {
    if (reduce) {
      setActiva(lineas.length - 1);
      setPct(100);
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const pasos = lineas.length;
    const intervalos: number[] = [];
    for (let i = 0; i < pasos; i++) {
      intervalos.push(
        window.setTimeout(() => {
          setActiva(i + 1);
          setPct(Math.round(((i + 1) / pasos) * 100));
        }, 750 * (i + 1))
      );
    }
    const fin = window.setTimeout(onDone, 750 * pasos + 500);
    return () => {
      intervalos.forEach(clearTimeout);
      clearTimeout(fin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const radio = 52;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia * (1 - pct / 100);

  return (
    <div className="flex flex-1 flex-col items-center justify-center" aria-live="polite" aria-busy={pct < 100}>
      <div className="relative size-[120px]">
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={radio} fill="none" stroke="var(--surface-2)" strokeWidth={9} />
          <motion.circle
            cx={60}
            cy={60}
            r={radio}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[24px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
          {pct}%
        </div>
      </div>

      <h1 className="mt-6 text-[22px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">Construyendo tu plan…</h1>

      <ul className="mt-8 flex w-full flex-col gap-3">
        {lineas.map((linea, i) => {
          const estado = i < activa ? 'done' : i === activa ? 'active' : 'pending';
          return (
            <motion.li
              key={linea}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: estado === 'pending' ? 0.4 : 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                  estado === 'done' ? 'bg-[var(--accent)]' : 'border border-[var(--text-tertiary)]'
                }`}
              >
                {estado === 'done' && <Check size={12} color="var(--bg)" strokeWidth={3} />}
                {estado === 'active' && (
                  <motion.span
                    className="size-2 rounded-full bg-[var(--accent)]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </span>
              <span className="text-[15px] text-[var(--text-primary)]">{linea}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
