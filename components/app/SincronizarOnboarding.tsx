'use client';

// Sube las respuestas guardadas en localStorage (durante el onboarding
// anónimo) a la cuenta recién creada, una sola vez. Se ejecuta apenas el
// usuario entra al área autenticada con sesión real (app/(app)/layout.tsx).

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { leerOnboardingGuardado, limpiarOnboardingGuardado } from '@/lib/onboardingStorage';

export function SincronizarOnboarding() {
  const router = useRouter();

  useEffect(() => {
    const datos = leerOnboardingGuardado();
    if (!datos) return;

    fetch('/api/guardar-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (res.ok) {
          limpiarOnboardingGuardado();
          router.refresh();
        }
      })
      .catch(() => {
        // Sin conexión o falla del servidor — las respuestas quedan en
        // localStorage y se reintenta la próxima vez que cargue el área autenticada.
      });
  }, [router]);

  return null;
}
