'use client';

// Encabezado de "Hoy" con entrada animada — completa la baseline de stagger
// que antes solo tenía el anillo y la lista (veredicto:hoy, defecto #4).

import { motion, useReducedMotion } from 'motion/react';

export function EncabezadoHoy({ saludo, meta }: { saludo: string; meta: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-[15px] font-semibold text-[var(--text-secondary)]">{saludo}</p>
      <h1 className="mt-1 text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
        {meta}
      </h1>
    </motion.div>
  );
}
