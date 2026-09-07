// Cálculo orientativo de objetivos nutricionales (Mifflin-St Jeor + factor de
// actividad) — SIEMPRE mostrado como estimado/aproximado, nunca como diagnóstico
// médico (Constitución del producto, ver ESTADO.md).

export type Objetivo = 'bajar_grasa' | 'ganar_musculo' | 'mantener' | 'comer_mejor';
export type Entrenamiento = '0-1' | '2-3' | '4-5' | '6-7';
export type Sexo = 'M' | 'F';
/** NEAT — movimiento fuera del ejercicio formal (independiente de si entrena). */
export type ActividadDiaria = 'sentado' | 'movimiento' | 'de_pie' | 'fisico';

const FACTOR_ACTIVIDAD: Record<Entrenamiento, number> = {
  '0-1': 1.3,
  '2-3': 1.45,
  '4-5': 1.6,
  '6-7': 1.75,
};

/** Modificador aditivo por NEAT — pequeño a propósito, el eje que más pesa sigue siendo el ejercicio. */
const MODIFICADOR_ACTIVIDAD_DIARIA: Record<ActividadDiaria, number> = {
  sentado: 0,
  movimiento: 0.03,
  de_pie: 0.06,
  fisico: 0.1,
};

export interface DatosPlan {
  peso: number; // kg
  estatura: number; // cm
  edad: number;
  sexo: Sexo;
  entrenamiento: Entrenamiento;
  actividadDiaria: ActividadDiaria;
  objetivo: Objetivo;
}

export interface PlanCalculado {
  bmr: number;
  mantenimiento: number;
  caloriasObjetivo: number;
  proteinaObjetivo: number; // gramos
  rangoPesoMin: number;
  rangoPesoMax: number;
  imc: number;
}

export function calcularPlan(d: DatosPlan): PlanCalculado {
  const bmr =
    d.sexo === 'M'
      ? 10 * d.peso + 6.25 * d.estatura - 5 * d.edad + 5
      : 10 * d.peso + 6.25 * d.estatura - 5 * d.edad - 161;

  const factor = FACTOR_ACTIVIDAD[d.entrenamiento] + MODIFICADOR_ACTIVIDAD_DIARIA[d.actividadDiaria];
  const mantenimiento = Math.round(bmr * factor);

  const ajusteObjetivo: Record<Objetivo, number> = {
    bajar_grasa: -0.2,
    ganar_musculo: 0.1,
    mantener: 0,
    comer_mejor: 0,
  };
  const caloriasObjetivo = Math.round(mantenimiento * (1 + ajusteObjetivo[d.objetivo]));

  const gPorKg: Record<Objetivo, number> = {
    bajar_grasa: 2.0,
    ganar_musculo: 1.9,
    mantener: 1.6,
    comer_mejor: 1.4,
  };
  const proteinaObjetivo = Math.round(d.peso * gPorKg[d.objetivo]);

  const estaturaM = d.estatura / 100;
  const imc = Math.round((d.peso / (estaturaM * estaturaM)) * 10) / 10;
  const rangoPesoMin = Math.round(18.5 * estaturaM * estaturaM);
  const rangoPesoMax = Math.round(24.9 * estaturaM * estaturaM);

  return { bmr: Math.round(bmr), mantenimiento, caloriasObjetivo, proteinaObjetivo, rangoPesoMin, rangoPesoMax, imc };
}

export const LABEL_OBJETIVO: Record<Objetivo, string> = {
  bajar_grasa: 'bajar grasa',
  ganar_musculo: 'ganar músculo',
  mantener: 'mantener tu peso',
  comer_mejor: 'comer mejor',
};
