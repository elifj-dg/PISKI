'use client';

// Onboarding de Piski — preview anónimo (Modelo 2, ver ESTADO.md): el usuario
// vive el "¿Qué Como Ahora?" real (aquí: su plan calculado) ANTES de pedir cuenta.
// Blueprint: docs/sistema/50-DISENO-ONBOARDING-PAYWALL.md (secciones A-C).
// Copy trazado a FICHA-AVATAR.md — ver comentarios en cada pantalla.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  Flame,
  Dumbbell,
  Heart,
  Leaf,
  Wallet,
  Coffee,
  Sun,
  Moon,
  Egg,
  Beef,
  Wheat,
  ClipboardCheck,
} from 'lucide-react';
import { FunnelHeader, FunnelScreen, PreguntaTitulo, ChipOpcion, CtaFijo, PasoTransicion, CampoNumero, OpcionesGrupo } from '@/components/onboarding/ui';
import { calcularPlan, LABEL_OBJETIVO, type Objetivo, type Entrenamiento, type Sexo } from '@/lib/plan';
import { LoadingPlan } from '@/components/onboarding/LoadingPlan';
import { Reconocimiento } from '@/components/onboarding/Reconocimiento';
import { Paywall } from '@/components/onboarding/Paywall';

type PasoId =
  | 'objetivo'
  | 'manual'
  | 'entrenamiento'
  | 'datos'
  | 'restricciones'
  | 'presupuesto'
  | 'momento'
  | 'recog1'
  | 'basicos'
  | 'compromiso'
  | 'recog2'
  | 'loading'
  | 'paywall';

interface Respuestas {
  objetivo?: Objetivo;
  manual: boolean;
  caloriasManual: string;
  proteinaManual: string;
  entrenamiento?: Entrenamiento;
  peso: string;
  estatura: string;
  edad: string;
  sexo?: Sexo;
  restricciones: string[];
  presupuesto?: string;
  momento?: string;
  basicos: string[];
  compromiso: number;
}

const BASICOS_OPCIONES = [
  { id: 'huevo', label: 'Huevo', icon: <Egg size={18} /> },
  { id: 'pollo', label: 'Pollo', icon: <Beef size={18} /> },
  { id: 'frijoles', label: 'Frijoles', icon: <Leaf size={18} /> },
  { id: 'tortillas', label: 'Tortillas', icon: <Wheat size={18} /> },
  { id: 'arroz', label: 'Arroz', icon: <Wheat size={18} /> },
  { id: 'atun', label: 'Atún', icon: <Beef size={18} /> },
  { id: 'aguacate', label: 'Aguacate', icon: <Leaf size={18} /> },
  { id: 'queso', label: 'Queso panela', icon: <Egg size={18} /> },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<Respuestas>({
    manual: false,
    caloriasManual: '',
    proteinaManual: '',
    peso: '',
    estatura: '',
    edad: '',
    restricciones: [],
    basicos: [],
    compromiso: 5,
  });

  const pasos: PasoId[] = useMemo(() => {
    const base: PasoId[] = ['objetivo'];
    if (respuestas.manual) base.push('manual');
    else base.push('entrenamiento', 'datos');
    base.push('restricciones', 'presupuesto', 'momento', 'recog1', 'basicos', 'compromiso', 'recog2', 'loading', 'paywall');
    return base;
  }, [respuestas.manual]);

  const [idx, setIdx] = useState(0);
  const pasoActual = pasos[idx];
  const progreso = Math.round((idx / (pasos.length - 1)) * 100);

  const ir = (delta: number) => setIdx((i) => Math.max(0, Math.min(pasos.length - 1, i + delta)));
  const siguiente = () => ir(1);
  const atras = () => (idx === 0 ? router.push('/') : ir(-1));

  // Avance automático tras elegir una opción de selección única: se cancela y
  // reprograma si el usuario cambia de opción antes de que el avance ocurra
  // (evita navegar con una selección que ya corrigió).
  const avanceRef = useRef<number | null>(null);
  const avanzarConRetraso = (ms = 300) => {
    if (avanceRef.current !== null) window.clearTimeout(avanceRef.current);
    avanceRef.current = window.setTimeout(() => {
      avanceRef.current = null;
      siguiente();
    }, ms);
  };

  const plan = useMemo(() => {
    if (respuestas.manual) {
      return {
        caloriasObjetivo: Number(respuestas.caloriasManual) || 0,
        proteinaObjetivo: Number(respuestas.proteinaManual) || 0,
      };
    }
    const peso = Number(respuestas.peso);
    const estatura = Number(respuestas.estatura);
    const edad = Number(respuestas.edad);
    if (!peso || !estatura || !edad || !respuestas.sexo || !respuestas.entrenamiento) {
      return { caloriasObjetivo: 0, proteinaObjetivo: 0 };
    }
    const calc = calcularPlan({
      peso,
      estatura,
      edad,
      sexo: respuestas.sexo,
      entrenamiento: respuestas.entrenamiento,
      objetivo: respuestas.objetivo ?? 'comer_mejor',
    });
    return calc;
  }, [respuestas]);

  const totalPreguntasRespondidas = idx; // costo hundido visible en el paywall

  // Conteo animado del número héroe del paso "compromiso" — solo al entrar al
  // paso (no mientras se arrastra el slider, donde debe reflejar el valor al instante).
  const [compromisoMostrado, setCompromisoMostrado] = useState(respuestas.compromiso);
  useEffect(() => {
    if (pasoActual !== 'compromiso') return;
    setCompromisoMostrado(0);
    let n = 0;
    const objetivo = respuestas.compromiso;
    const id = window.setInterval(() => {
      n += 1;
      setCompromisoMostrado(Math.min(n, objetivo));
      if (n >= objetivo) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pasoActual]);

  return (
    <FunnelScreen>
      <FunnelHeader progreso={progreso} onBack={atras} showBack={pasoActual !== 'loading'} />
      <AnimatePresence mode="wait">
        <PasoTransicion stepKey={pasoActual}>
          {pasoActual === 'objetivo' && (
            <div>
              <span className="flex size-11 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]">
                <Leaf size={20} aria-hidden="true" />
              </span>
              <PreguntaTitulo titulo="¿Cuál es tu meta principal ahora?" sub="Esto define las opciones que te vamos a mostrar." />
              <OpcionesGrupo className="mt-6 flex flex-col gap-3">
                {(
                  [
                    ['bajar_grasa', 'Bajar grasa', <Flame key="i" size={20} />],
                    ['ganar_musculo', 'Ganar músculo', <Dumbbell key="i" size={20} />],
                    ['mantener', 'Mantener mi peso', <Heart key="i" size={20} />],
                    ['comer_mejor', 'Solo comer mejor', <Leaf key="i" size={20} />],
                  ] as [Objetivo, string, React.ReactNode][]
                ).map(([id, label, icon]) => (
                  <ChipOpcion
                    key={id}
                    label={label}
                    icon={icon}
                    selected={respuestas.objetivo === id}
                    onClick={() => {
                      setRespuestas((r) => ({ ...r, objetivo: id, manual: false }));
                      avanzarConRetraso();
                    }}
                  />
                ))}
              </OpcionesGrupo>
              <button
                type="button"
                onClick={() => {
                  setRespuestas((r) => ({ ...r, manual: true }));
                  avanzarConRetraso(150);
                }}
                className="mt-5 w-full text-center text-[13px] font-medium text-[var(--text-tertiary)] underline underline-offset-2"
              >
                Ya tengo mis objetivos de mi nutriólogo
              </button>
            </div>
          )}

          {pasoActual === 'manual' && (
            <div>
              <PreguntaTitulo titulo="Cuéntanos tus objetivos" sub="Los que te dio tu nutriólogo — los respetamos tal cual." />
              <div className="mt-6 flex flex-col gap-4">
                <CampoNumero label="Calorías al día" unidad="kcal" placeholder="1850" min={800} max={6000} value={respuestas.caloriasManual} onChange={(v) => setRespuestas((r) => ({ ...r, caloriasManual: v }))} />
                <CampoNumero label="Proteína al día" unidad="g" placeholder="130" min={20} max={400} value={respuestas.proteinaManual} onChange={(v) => setRespuestas((r) => ({ ...r, proteinaManual: v }))} />
              </div>
              <CtaFijo
                label="Continuar"
                disabled={!respuestas.caloriasManual || !respuestas.proteinaManual}
                disabledHint="Completa calorías y proteína para continuar"
                onClick={siguiente}
              />
            </div>
          )}

          {pasoActual === 'entrenamiento' && (
            <div>
              <PreguntaTitulo titulo="¿Cuántos días entrenas por semana?" />
              <OpcionesGrupo className="mt-6 flex flex-col gap-3">
                {(['0-1', '2-3', '4-5', '6-7'] as Entrenamiento[]).map((v) => (
                  <ChipOpcion
                    key={v}
                    label={`${v} días`}
                    selected={respuestas.entrenamiento === v}
                    onClick={() => {
                      setRespuestas((r) => ({ ...r, entrenamiento: v }));
                      avanzarConRetraso();
                    }}
                  />
                ))}
              </OpcionesGrupo>
            </div>
          )}

          {pasoActual === 'datos' && (
            <div>
              <PreguntaTitulo titulo="Cuéntanos de ti" sub="Para calcular tu rango orientativo — nunca un diagnóstico." />
              <div className="mt-6 flex flex-col gap-4">
                <OpcionesGrupo className="flex gap-3">
                  <ChipOpcion label="Mujer" selected={respuestas.sexo === 'F'} onClick={() => setRespuestas((r) => ({ ...r, sexo: 'F' }))} />
                  <ChipOpcion label="Hombre" selected={respuestas.sexo === 'M'} onClick={() => setRespuestas((r) => ({ ...r, sexo: 'M' }))} />
                </OpcionesGrupo>
                <CampoNumero label="Peso actual" unidad="kg" placeholder="70" min={30} max={250} value={respuestas.peso} onChange={(v) => setRespuestas((r) => ({ ...r, peso: v }))} />
                <CampoNumero label="Estatura" unidad="cm" placeholder="170" min={100} max={230} value={respuestas.estatura} onChange={(v) => setRespuestas((r) => ({ ...r, estatura: v }))} />
                <CampoNumero label="Edad" unidad="años" placeholder="29" min={14} max={100} value={respuestas.edad} onChange={(v) => setRespuestas((r) => ({ ...r, edad: v }))} />
              </div>
              <CtaFijo
                label="Calcular mi plan"
                disabled={!respuestas.peso || !respuestas.estatura || !respuestas.edad || !respuestas.sexo}
                disabledHint="Completa sexo, peso, estatura y edad para calcular tu plan"
                onClick={siguiente}
              />
            </div>
          )}

          {pasoActual === 'restricciones' && (
            <div>
              <PreguntaTitulo titulo="¿Algo que no comas?" sub="Elige todas las que apliquen." />
              <OpcionesGrupo className="mt-6 flex flex-col gap-3">
                {['Sin restricciones', 'Vegetariano', 'Sin lactosa', 'Sin gluten'].map((op) => (
                  <ChipOpcion
                    key={op}
                    label={op}
                    selected={respuestas.restricciones.includes(op)}
                    onClick={() =>
                      setRespuestas((r) => ({
                        ...r,
                        restricciones: r.restricciones.includes(op) ? r.restricciones.filter((x) => x !== op) : [...r.restricciones, op],
                      }))
                    }
                  />
                ))}
              </OpcionesGrupo>
              <CtaFijo
                label="Continuar"
                disabled={respuestas.restricciones.length === 0}
                disabledHint="Elige al menos una opción para continuar"
                onClick={siguiente}
              />
            </div>
          )}

          {pasoActual === 'presupuesto' && (
            <div>
              <PreguntaTitulo titulo="¿Cuánto quieres gastar en comida al día?" />
              <OpcionesGrupo className="mt-6 flex flex-col gap-3">
                {['Ajustado (menos de $100)', 'Medio ($100-200)', 'Flexible (más de $200)'].map((op) => (
                  <ChipOpcion
                    key={op}
                    label={op}
                    icon={<Wallet size={18} />}
                    selected={respuestas.presupuesto === op}
                    onClick={() => {
                      setRespuestas((r) => ({ ...r, presupuesto: op }));
                      avanzarConRetraso();
                    }}
                  />
                ))}
              </OpcionesGrupo>
            </div>
          )}

          {pasoActual === 'momento' && (
            <div>
              <PreguntaTitulo titulo="¿Cuándo se te complica más decidir qué comer?" />
              <OpcionesGrupo className="mt-6 flex flex-col gap-3">
                {[
                  ['Al desayunar', <Coffee key="i" size={18} />],
                  ['A la hora de la comida', <Sun key="i" size={18} />],
                  ['En la cena', <Moon key="i" size={18} />],
                  ['Todo el día', <Flame key="i" size={18} />],
                ].map(([label, icon]) => (
                  <ChipOpcion
                    key={label as string}
                    label={label as string}
                    icon={icon}
                    selected={respuestas.momento === label}
                    onClick={() => {
                      setRespuestas((r) => ({ ...r, momento: label as string }));
                      avanzarConRetraso();
                    }}
                  />
                ))}
              </OpcionesGrupo>
            </div>
          )}

          {pasoActual === 'recog1' && (
            <Reconocimiento
              titulo="No es que no sepas comer bien"
              texto={`Es que decidir "${respuestas.momento?.toLowerCase()}" te cansa, todos los días. Por eso Piski no te pregunta qué es saludable — te dice qué comer, ya.`}
              onContinuar={siguiente}
            />
          )}

          {pasoActual === 'basicos' && (
            <div>
              <PreguntaTitulo titulo="¿Qué sueles tener en casa?" sub="Así tus primeras opciones ya usan lo que ya tienes." />
              <OpcionesGrupo className="mt-6 grid grid-cols-2 gap-3">
                {BASICOS_OPCIONES.map((op) => (
                  <ChipOpcion
                    key={op.id}
                    label={op.label}
                    icon={op.icon}
                    selected={respuestas.basicos.includes(op.id)}
                    onClick={() =>
                      setRespuestas((r) => ({
                        ...r,
                        basicos: r.basicos.includes(op.id) ? r.basicos.filter((x) => x !== op.id) : [...r.basicos, op.id],
                      }))
                    }
                  />
                ))}
              </OpcionesGrupo>
              <CtaFijo label="Continuar" onClick={siguiente} />
            </div>
          )}

          {pasoActual === 'compromiso' && (
            <div>
              <PreguntaTitulo titulo="¿Cuántos días a la semana quieres que Piski te diga qué comer?" />
              <div className="mt-10 flex flex-col items-center">
                <span className="text-[48px] font-bold tabular-nums leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
                  {compromisoMostrado}
                </span>
                <span className="mt-1 text-[14px] text-[var(--text-secondary)]">días/semana</span>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={respuestas.compromiso}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setRespuestas((r) => ({ ...r, compromiso: n }));
                    setCompromisoMostrado(n);
                  }}
                  className="mt-8 w-full accent-[var(--accent)]"
                />
                <p className="mt-4 text-center text-[14px] font-medium text-[var(--accent)]">
                  {respuestas.compromiso <= 2 ? 'Un buen inicio para probar' : respuestas.compromiso <= 5 ? 'Meta realista y sostenible' : 'Ambiciosa — te acompañamos'}
                </p>
              </div>
              <CtaFijo label="Fijar mi meta" onClick={siguiente} />
            </div>
          )}

          {pasoActual === 'recog2' && (
            <Reconocimiento
              titulo="Tus respuestas te describen"
              texto="Pocas personas definen su objetivo, su presupuesto y su meta antes de empezar. Tu plan usa exactamente esa claridad."
              icon={<ClipboardCheck size={40} />}
              onContinuar={siguiente}
            />
          )}

          {pasoActual === 'loading' && (
            <LoadingPlan
              objetivo={respuestas.objetivo ? LABEL_OBJETIVO[respuestas.objetivo] : 'comer mejor'}
              proteina={plan.proteinaObjetivo}
              basicosCount={respuestas.basicos.length}
              onDone={siguiente}
            />
          )}

          {pasoActual === 'paywall' && (
            <Paywall
              objetivoLabel={respuestas.objetivo ? LABEL_OBJETIVO[respuestas.objetivo] : 'comer mejor'}
              caloriasObjetivo={plan.caloriasObjetivo}
              proteinaObjetivo={plan.proteinaObjetivo}
              nRespuestas={totalPreguntasRespondidas}
              onCerrar={() => router.push('/')}
              onContinuarGratis={() => router.push('/entrar?modo=gratis')}
              onComprar={(planId: string) => router.push(`/entrar?plan=${planId}`)}
            />
          )}
        </PasoTransicion>
      </AnimatePresence>
    </FunnelScreen>
  );
}
