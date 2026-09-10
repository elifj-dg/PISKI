// Próxima pantalla a construir en esta misma sesión — estado honesto en vez
// de un enlace roto (regla UX #11).

import { CalendarDays } from 'lucide-react';

export default function HistorialPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]">
        <CalendarDays size={26} aria-hidden="true" />
      </span>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">Tu historial está en camino</p>
      <p className="max-w-[260px] text-[13px] leading-snug text-[var(--text-secondary)]">
        Aquí vas a ver tu proteína y calorías de la semana, día por día.
      </p>
    </div>
  );
}
