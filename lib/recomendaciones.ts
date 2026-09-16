// Motor de recomendaciones DETERMINISTA para el onboarding — la primera
// "¿Qué Como Ahora?" real que el usuario vive, usando exactamente lo que
// marcó en "Mis básicos". Es una versión de reglas fijas (sin IA todavía):
// demuestra el MECANISMO real de la app (objetivo + lo que tienes → 2-3
// opciones concretas), no una imitación aguada. El motor con IA real de
// texto libre se conecta en Sesión 5 (ver ESTADO.md → Arquitectura y stack).

import type { Objetivo } from './plan';

export type BasicoId =
  | 'huevo'
  | 'pollo'
  | 'frijoles'
  | 'tortillas'
  | 'arroz'
  | 'atun'
  | 'aguacate'
  | 'queso'
  | 'nopales'
  | 'jitomate'
  | 'cebolla'
  | 'jamon'
  | 'salchicha'
  | 'chorizo'
  | 'avena'
  | 'platano'
  | 'pan';

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
  { id: 'nopales-huevo-queso', nombre: 'Nopales asados con huevo y queso', ingredientes: ['nopales', 'huevo', 'queso'], proteina: 24, calorias: 360, tiempoMin: 12, costo: 'economico' },
  { id: 'jamon-huevo-tortilla', nombre: 'Huevo con jamón y tortillas', ingredientes: ['huevo', 'jamon', 'tortillas'], proteina: 26, calorias: 410, tiempoMin: 8, costo: 'economico' },
  { id: 'salchicha-huevo-tortilla', nombre: 'Huevo con salchicha y tortillas', ingredientes: ['huevo', 'salchicha', 'tortillas'], proteina: 24, calorias: 440, tiempoMin: 8, costo: 'economico' },
  { id: 'chorizo-huevo-tortilla', nombre: 'Huevo con chorizo y tortillas', ingredientes: ['huevo', 'chorizo', 'tortillas'], proteina: 26, calorias: 480, tiempoMin: 10, costo: 'economico' },
  { id: 'pollo-nopales-jitomate', nombre: 'Pollo con nopales y jitomate', ingredientes: ['pollo', 'nopales', 'jitomate'], proteina: 36, calorias: 380, tiempoMin: 18, costo: 'medio' },
  { id: 'huevo-mexicana', nombre: 'Huevo a la mexicana', ingredientes: ['huevo', 'jitomate', 'cebolla'], proteina: 18, calorias: 320, tiempoMin: 10, costo: 'economico' },
  { id: 'avena-platano', nombre: 'Avena con plátano', ingredientes: ['avena', 'platano'], proteina: 12, calorias: 310, tiempoMin: 5, costo: 'economico' },
  { id: 'sandwich-huevo-jamon', nombre: 'Sándwich de huevo con jamón', ingredientes: ['pan', 'huevo', 'jamon'], proteina: 22, calorias: 380, tiempoMin: 8, costo: 'economico' },
];

const LABEL_COSTO: Record<Combo['costo'], string> = {
  economico: 'Económico',
  medio: 'Costo medio',
  flexible: 'Flexible',
};

export function labelCosto(c: Combo['costo']): string {
  return LABEL_COSTO[c];
}

// Ingredientes que cada restricción excluye. "Sin gluten" no excluye nada
// de la lista actual: las tortillas de Piski son de maíz, naturalmente sin
// gluten — no hay ningún ingrediente con gluten en los básicos de hoy.
const INGREDIENTES_EXCLUIDOS_POR_RESTRICCION: Record<string, BasicoId[]> = {
  Vegetariano: ['pollo', 'atun', 'jamon', 'salchicha', 'chorizo'],
  'Sin lactosa': ['queso'],
};

/**
 * Ordena los combos para un usuario: primero los que usan SOLO básicos que
 * ya tiene (coincidencia total), luego por mayor coincidencia parcial: nunca
 * deja al usuario sin ninguna opción, aunca haya marcado pocos básicos.
 * Nunca sugiere un combo que choque con una restricción marcada (vegetariano,
 * sin lactosa) — regla dura, no un "casi": ver Constitución del producto.
 */
export function ordenarRecomendaciones(basicos: BasicoId[], objetivo: Objetivo, restricciones: string[] = []): Combo[] {
  const ingredientesExcluidos = new Set(restricciones.flatMap((r) => INGREDIENTES_EXCLUIDOS_POR_RESTRICCION[r] ?? []));
  const combosPermitidos = ingredientesExcluidos.size === 0 ? COMBOS : COMBOS.filter((c) => !c.ingredientes.some((i) => ingredientesExcluidos.has(i)));

  const set = new Set(basicos);
  const conCoincidencia = combosPermitidos.map((c) => {
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
