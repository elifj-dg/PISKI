export const metadata = { title: 'Términos y Condiciones — Piski' };

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-semibold [font-family:var(--font-display)]">
        Términos y condiciones
      </h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        Piski es una herramienta de bienestar general que te ayuda a decidir
        qué comer. No sustituye a un médico ni a un nutriólogo, y sus
        estimaciones son orientativas, nunca diagnósticos. Al usar Piski
        aceptas que las recomendaciones son sugerencias, no indicaciones
        médicas.
      </p>
      <p className="mt-4 text-sm text-[var(--text-tertiary)]">
        Esta es una versión inicial de los términos, en revisión legal
        completa antes del lanzamiento público.
      </p>
    </main>
  );
}
