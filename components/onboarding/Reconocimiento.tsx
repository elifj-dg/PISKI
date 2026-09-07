'use client';

// Micro-pantalla de RECONOCIMIENTO (50 → A5): "cada pregunta devuelve algo".
// Sin opciones — solo Continuar. Usa la respuesta real del usuario (pasada por
// el padre en `texto`), nunca un genérico intercambiable.

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CtaFijo } from './ui';

export function Reconocimiento({
  titulo,
  texto,
  icon,
  onContinuar,
}: {
  titulo: string;
  texto: string;
  icon?: ReactNode;
  onContinuar: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex size-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]"
      >
        {icon ?? <Sparkles size={32} />}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.12 }}
        className="mt-5 text-balance text-[26px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]"
      >
        {titulo}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-[var(--text-secondary)]"
      >
        {texto}
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }} className="mt-8 w-full">
        <CtaFijo label="Continuar" onClick={onContinuar} />
      </motion.div>
    </div>
  );
}
