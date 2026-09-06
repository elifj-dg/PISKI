'use client';

// Botón flotante "volver arriba" — no forma parte del kit de landing.
// Responde al defecto de navegación señalado por el revisor: en una página
// larga de 10 secciones, no había forma de regresar al inicio sin scroll manual.

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          aria-label="Volver arriba"
          className="fixed right-4 bottom-24 z-30 flex size-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-2)] [touch-action:manipulation] md:bottom-8"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
