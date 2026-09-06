export const metadata = { title: 'Empieza — Piski' };

export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center [font-family:var(--font-body)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-semibold [font-family:var(--font-display)]">
        Tu primer ¿Qué Como Ahora? está en camino
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-secondary)]">
        Estamos construyendo el recorrido de bienvenida — vuelve pronto para
        vivir tu primera recomendación real.
      </p>
    </main>
  );
}
