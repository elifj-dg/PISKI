export const metadata = { title: 'Privacidad — Piski' };

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 [font-family:var(--font-body)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-semibold [font-family:var(--font-display)]">
        Política de privacidad
      </h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        Piski guarda solo los datos que necesita para darte recomendaciones de
        comida: tu perfil (edad, peso, objetivo), tus alimentos básicos y tu
        historial de comidas. Nunca vendemos tus datos a terceros. Puedes
        pedir que borremos tu cuenta y toda tu información escribiendo a{' '}
        <a href="mailto:hola@piski.app" className="underline">
          hola@piski.app
        </a>
        .
      </p>
      <p className="mt-4 text-sm text-[var(--text-tertiary)]">
        Esta es una versión inicial de la política de privacidad, en revisión
        legal completa antes del lanzamiento público.
      </p>
    </main>
  );
}
