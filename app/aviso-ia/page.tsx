export const metadata = { title: 'Aviso de IA — Piski' };

export default function AvisoIaPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-semibold [font-family:var(--font-display)]">
        Aviso sobre el uso de inteligencia artificial
      </h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        Piski usa inteligencia artificial para sugerirte qué comer según tu
        objetivo, lo que tienes disponible y tu presupuesto. Las estimaciones
        de calorías y proteína son aproximadas — nunca diagnósticos médicos.
        Cuando algo es incierto (por ejemplo, comida preparada fuera de casa),
        Piski te lo dice como un rango, no como un dato exacto.
      </p>
    </main>
  );
}
