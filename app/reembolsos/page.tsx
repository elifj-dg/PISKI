export const metadata = { title: 'Reembolsos — Piski' };

export default function ReembolsosPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-semibold [font-family:var(--font-display)]">
        Política de reembolso
      </h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        Tienes 15 días desde tu primer cobro para pedir tu reembolso completo
        — la Garantía del Primer ¿Qué Como? Solo escribe a{' '}
        <a href="mailto:hola@piski.app" className="underline">
          hola@piski.app
        </a>{' '}
        y te devolvemos tu dinero, sin preguntas.
      </p>
      <p className="mt-4 text-sm text-[var(--text-tertiary)]">
        Procesado a través de Hotmart, conforme a su política de reembolsos.
      </p>
    </main>
  );
}
