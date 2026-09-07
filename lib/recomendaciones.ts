// Motor de recomendaciones DETERMINISTA para el onboarding — la primera
// "¿Qué Como Ahora?" real que el usuario vive, usando exactamente lo que
// marcó en "Mis básicos". Es una versión de reglas fijas (sin IA todavía):
// demuestra el MECANISMO real de la app (objetivo + lo que tienes → 2-3
// opciones concretas), no una imitación aguada. El motor con IA real de
// texto libre se conecta en Sesión 5 (ver ESTADO.md → Arquitectura y stack).

import type { Objetivo } from './plan';

export type BasicoId = 'huevo' | 'pollo' | 'frijoles' | 'tortillas' | 'arroz' | 'atun' | 'aguacate' | 'queso';

export interface Combo {
  id: string;
  nombre: string;
  ingredientes: BasicoId[];
  proteina: number;
  calorias: number;
  tiempoMin: number;
  costo: 'economico' | 'medio' | 'flexible';
}

const COMBOS: Combo[] = [
  { id: 'huevo-frijol-tortilla', nombre: 'Huevo revuelto + frijoles + tortillas', ingredientes: ['huevo', 'frijoles', 'tortillas'], proteina: 28, calorias: 420, tiempoMin: 10, costo: 'economico' },
  { id: 'pollo-arroz-aguacate', nombre: 'Pollo a la plancha + arroz + aguacate', ingredientes: ['pollo', 'arroz', 'aguacate'], proteina: 38, calorias: 520, tiempoMin: 20, costo: 'medio' },
  { id: 'atun-tortilla-aguacate', nombre: 'Atún con tortillas y aguacate', ingredientes: ['atun', 'tortillas', 'aguacate'], proteina: 30, calorias: 380, tiempoMin: 5, costo: 'economico' },
  { id: 'quesadilla-frijol', nombre: 'Quesadillas de queso con frijoles', ingredientes: ['queso', 'tortillas', 'frijoles'], proteina: 22, calorias: 450, tiempoMin: 10, costo: 'economico' },
  { id: 'pollo-frijol-tortilla', nombre: 'Pollo con frijoles y tortillas', ingredientes: ['pollo', 'frijoles', 'tortillas'], proteina: 35, calorias: 480, tiempoMin: 15, costo: 'economico' },
  { id: 'huevo-aguacate-tortilla', nombre: 'Huevo con aguacate y tortillas', ingredientes: ['huevo', 'aguacate', 'tortillas'], proteina: 20, calorias: 400, tiempoMin: 8, costo: 'economico' },
  { id: 'atun-arroz', nombre: 'Atún con arroz', ingredientes: ['atun', 'arroz'], proteina: 32, calorias: 430, tiempoMin: 10, costo: 'economico' },
  { id: 'bowl-pollo-completo', nombre: 'Bowl de pollo, arroz y frijoles', ingredientes: ['pollo', 'arroz', 'frijoles'], proteina: 40, calorias: 560, tiempoMin: 20, costo: 'medio' },
  { id: 'huevo-queso-tortilla', nombre: 'Huevo con queso y tortillas', ingredientes: ['huevo', 'queso', 'tortillas'], proteina: 24, calorias: 430, tiempoMin: 8, costo: 'economico' },
  { id: 'frijol-arroz-queso', nombre: 'Frijoles con arroz y queso', ingredientes: ['frijoles', 'arroz', 'queso'], proteina: 20, calorias: 470, tiempoMin: 12, costo: 'economico' },
];

const LABEL_COSTO: Record<Combo['costo'], string> = {
  economico: 'Económico',
  medio: 'Costo medio',
  flexible: 'Flexible',
};

export function labelCosto(c: Combo['costo']): string {
  return LABEL_COSTO[c];
}

/**
 * Ordena los combos para un usuario: primero los que usan SOLO básicos que
 * ya tiene (coincidencia total), luego por mayor coincidencia parcial: nunca
 * deja al usuario sin ninguna opción, aunca haya marcado pocos básicos.
 */
export function ordenarRecomendaciones(basicos: BasicoId[], objetivo: Objetivo): Combo[] {
  const set = new Set(basicos);
  const conCoincidencia = COMBOS.map((c) => {
    const tiene = c.ingredientes.filter((i) => set.has(i)).length;
    const completo = tiene === c.ingredientes.length;
    return { combo: c, tiene, completo };
  });

  const priorizaProteina = objetivo === 'ganar_musculo' || objetivo === 'bajar_grasa';

  return conCoincidencia
    .sort((a, b) => {
      if (a.completo !== b.completo) return a.completo ? -1 : 1;
      if (b.tiene !== a.tiene) return b.tiene - a.tiene;
      if (priorizaProteina) return b.combo.proteina - a.combo.proteina;
      return a.combo.calorias - b.combo.calorias;
    })
    .map((x) => x.combo);
}
