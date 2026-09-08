// Puente entre el onboarding anónimo y la cuenta real (Modelo 2, ver
// ESTADO.md: "preview anónimo → paywall → login/auth. Guardas temporalmente
// en navegador y pides login para conservar"). Se guarda justo antes de
// mandar al usuario a /entrar y se consume una sola vez tras el primer login.

const CLAVE = 'piski_onboarding';

export interface OnboardingGuardado {
  objetivo?: string;
  actividadDiaria?: string;
  entrenamiento?: string;
  peso?: string;
  estatura?: string;
  edad?: string;
  sexo?: string;
  pesoObjetivo?: string;
  dificultad?: string;
  estiloVida?: string;
  organizacion?: string;
  precision?: string;
  restricciones: string[];
  presupuesto?: string;
  basicos: string[];
  compromiso: number;
  caloriasObjetivo: number;
  proteinaObjetivo: number;
}

export function guardarOnboarding(datos: OnboardingGuardado) {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena) — no bloquea
    // el flujo, el usuario simplemente no recupera sus respuestas al entrar.
  }
}

export function leerOnboardingGuardado(): OnboardingGuardado | null {
  try {
    const raw = window.localStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as OnboardingGuardado) : null;
  } catch {
    return null;
  }
}

export function limpiarOnboardingGuardado() {
  try {
    window.localStorage.removeItem(CLAVE);
  } catch {
    // No hay nada que limpiar si no se pudo leer/escribir en primer lugar.
  }
}
