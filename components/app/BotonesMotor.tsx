'use client';

// El CTA héroe de Piski: abre el Motor ¿Qué Como Ahora? real. "Modo rescate"
// es el mismo mecanismo con entrada urgente (Constitución del producto).

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Sparkles, LifeBuoy } from 'lucide-react';

export function BotonesMotor() {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col gap-3">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push('/hoy/motor')}
        className="flex h-16 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[17px] font-bold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation] [font-family:var(--font-display)]"
      >
        <Sparkles size={20} aria-hidden="true" />
        ¿Qué como ahora?
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push('/hoy/motor?modo=rescate')}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)] bg-[var(--surface)] text-[14px] font-semibold text-[var(--text-secondary)] [touch-action:manipulation]"
      >
        <LifeBuoy size={16} aria-hidden="true" />
        Modo rescate — no sé qué comer
      </motion.button>
    </div>
  );
}
