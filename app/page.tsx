'use client';

// Landing de Piski — compone el kit canónico (components/landing/) en el orden
// de 19-PAGINA-DE-VENTAS.md. Copy marcado trazado a FICHA-AVATAR.md, ver
// docs/copy/landing.md. Modelo de negocio: onboarding-first (preview anónimo).

import { Utensils, Calculator, Frown, RefreshCw, Leaf, Zap, HeartHandshake, ClipboardList, Sparkles, ThumbsUp } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Problema } from '@/components/landing/Problema';
import { Agitacion } from '@/components/landing/Agitacion';
import { Solucion } from '@/components/landing/Solucion';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { Oferta } from '@/components/landing/Oferta';
import { Garantia } from '@/components/landing/Garantia';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { StickyCtaMobile, IconChip } from '@/components/landing/ui';
import { AnimatedRingDemo } from '@/components/AnimatedRingDemo';
import { BackToTop } from '@/components/BackToTop';

const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Quiero saber qué comer ahora';

export default function LandingPiski() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* Skip-link: navegación por teclado — el primer Tab salta directo a <main>, después del header */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-[var(--radius-button)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-2)] transition-transform duration-150 focus:translate-y-0"
      >
        Ir al contenido principal
      </a>

      <main id="main-content">
      {/* 1. HERO */}
      <Hero
        appName="Piski"
        loginHref="/entrar"
        h1Marked="¿Qué como ahora? Piski te lo dice en [b]10 segundos[/b]"
        subtitleMarked="Con lo que tienes, tu presupuesto y tu objetivo del día."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={
          <div className="flex flex-col items-center gap-8">
            {/* Fila de 3 beneficios con ícono — mismo IconChip del kit (44px, mismo borde/forma que Problema/Solución) */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <IconChip icon={Leaf} />
                <span className="text-[11.5px] font-medium leading-tight text-[var(--text-secondary)]">Comida real mexicana</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconChip icon={Zap} />
                <span className="text-[11.5px] font-medium leading-tight text-[var(--text-secondary)]">Decisiones en segundos</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconChip icon={HeartHandshake} />
                <span className="text-[11.5px] font-medium leading-tight text-[var(--text-secondary)]">Sin pesar nada</span>
              </div>
            </div>
            {/* Franja de confianza — resaltada en caja redondeada, pedido explícito */}
            <span className="rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[var(--chip-bg)] px-4 py-2 text-[13px] font-bold text-[var(--accent)]">
              7 días gratis · Garantía de 15 días · cancela cuando quieras
            </span>
          </div>
        }
        visual={
          <div className="flex flex-col gap-4 bg-[var(--bg)] p-4">
            <AnimatedRingDemo />
            <img
              src="/mockups/home.png"
              alt="Pantalla principal de Piski: tu día en un vistazo, con el anillo de progreso, tu proteína y calorías restantes, y el botón ¿Qué Como Ahora?"
              width={750}
              height={1584}
              className="w-full rounded-[var(--radius-card)] object-cover"
            />
          </div>
        }
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: Utensils, textoMarked: '¿Llega la hora de comer y otra vez no sabes qué preparar?' },
          { icon: Calculator, textoMarked: '¿Sabes cuántas calorías llevas, pero sigues [b]sin saber qué comer[/b]?' },
          { icon: Frown, textoMarked: '¿Sientes que ya [b]perdiste el control[/b] del día si comes fuera?' },
          { icon: RefreshCw, textoMarked: '¿Un día te organizas y al siguiente vuelves a [b]improvisar[/b]?' },
        ]}
      />

      {/* 3. AGITACIÓN */}
      <Agitacion
        frases={[
          'Sigues pensando qué comer varias veces al día — y esa decisión nunca se acaba.',
          'En un año son cientos de veces que decides a ciegas, sin saber si de verdad avanzas.',
          'Otra dieta o app no lo arregla: [b]más números no es más claridad[/b].',
        ]}
        contraste={{
          labelHoy: 'Hoy',
          hoy: 'Otra vez frente al refri, sin saber qué preparar.',
          labelFuturo: 'En 6 meses, si nada cambia',
          futuro: 'El mismo momento de duda — todos los días.',
        }}
      />

      {/* 4. SOLUCIÓN */}
      <Solucion
        tituloMarked="Decide en segundos con [b]el Motor ¿Qué Como Ahora?[/b]"
        mecanismo="el Motor ¿Qué Como Ahora?"
        bigIdeaMarked="No te falta saber qué es saludable — te falta saber [b]qué comer ahora[/b]. El Motor lo resuelve mirando tu objetivo, lo que tienes y tu momento del día."
        pasos={[
          { titulo: 'Cuéntale tu día', detalle: 'Tu objetivo, lo que tienes en casa y tu presupuesto.', icon: ClipboardList },
          { titulo: 'El Motor decide', detalle: 'Cruza tu objetivo con lo que ya tienes disponible.', icon: Sparkles },
          { titulo: 'Tú eliges', detalle: 'Recibes 2-3 opciones reales — di "me late" o pide otra.', icon: ThumbsUp },
        ]}
        antesDespues={{
          labelAntes: 'Antes',
          antes: 'Abres 3 apps distintas y sigues sin saber qué comer.',
          labelDespues: 'Después',
          despues: 'Abres Piski, ves 2-3 opciones y decides en segundos.',
        }}
      />

      {/* 5. LA APP POR DENTRO — placeholders honestos (app interna: Sesión 5) */}
      <AppPorDentro
        tituloMarked="Así se ve tu día en [b]Piski[/b]"
        frames={[
          { src: '/mockups/home.png', label: 'Tu proteína y calorías del día, de un vistazo', nombrePantalla: 'Inicio' },
          { src: '/mockups/que-como-ahora.png', label: '2-3 opciones con lo que ya tienes', nombrePantalla: '¿Qué Como Ahora?' },
          { src: '/mockups/modo-rescate.png', label: 'Si no sabes qué hacer, resuelve en segundos', nombrePantalla: 'Modo rescate' },
          { src: '/mockups/perfil.png', label: 'Tus básicos y tu objetivo, siempre a mano', nombrePantalla: 'Perfil' },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA */}
      <Oferta
        tituloMarked="Empieza gratis. Sigue por [b]menos de $3 al día[/b]"
        trialDias={7}
        stack={{
          lineas: [
            { resultado: 'Piski Pro con el Motor ¿Qué Como Ahora? (12 meses)', valor: '$1,188' },
            { resultado: 'Modo rescate ilimitado para esos días sin plan', valor: '$300' },
          ],
          totalTachado: '$1,488',
          nota: 'Hoy: $82.50/mes (se cobra $990/año)',
        }}
        anual={{
          nombre: 'Anual',
          badge: 'MEJOR VALOR',
          precioMes: '$82.50',
          totalAnual: 'Se cobra $990/año',
          ahorro: '2 meses gratis',
          descomposicionDia: 'menos de $3 al día',
          ctaLabel: 'Empezar mis 7 días gratis',
          ctaHref: CTA_HREF,
          features: [
            'El Motor ¿Qué Como Ahora? sin límite',
            'Modo rescate cuando no sabes qué comer',
            'Meal prep y lista de compras inteligente',
            'Historial de tus comidas y progreso',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$99',
          ctaLabel: 'Elegir mensual',
          ctaHref: CTA_HREF,
          features: [
            'El Motor ¿Qué Como Ahora? sin límite',
            'Modo rescate cuando no sabes qué comer',
            'Cancela cuando quieras',
          ],
        }}
      />

      {/* 7. GARANTÍA */}
      <Garantia
        nombre="la Garantía del Primer ¿Qué Como?"
        condicionMarked="Si en tus primeros 7 días el Motor no te da una opción real para tu día, escribes un correo y te devolvemos todo."
        pisoLegal="Respaldada por la garantía Hotmart de 15 días"
      />

      {/* 8. FAQ */}
      <Faq
        items={[
          {
            pregunta: '¿Por qué pagar por esto si puedo preguntarle a ChatGPT?',
            respuestaMarked:
              'Piski recuerda tu objetivo, tus básicos y tu presupuesto — [b]no tienes que explicarlo cada vez[/b].',
          },
          {
            pregunta: '¿Voy a tener que registrar todo lo que como?',
            respuestaMarked:
              'No. El registro es simple y aproximado — nunca te obligamos a pesar nada.',
          },
          {
            pregunta: '¿Y si calcula mal lo que estoy comiendo fuera?',
            respuestaMarked:
              'Usamos rangos honestos, nunca precisión inventada — sabrás que es estimado, no un dato exacto.',
          },
          {
            pregunta: '¿Tiene alimentos que sí como en México?',
            respuestaMarked:
              'Sí: tortillas, frijoles, pollo, queso panela y los platillos de siempre, desde el primer día.',
          },
          {
            pregunta: '¿Qué pasa si no me sirve?',
            respuestaMarked:
              'Tienes 7 días gratis y la Garantía del Primer ¿Qué Como?: [b]un correo y te devolvemos todo[/b].',
          },
        ]}
      />

      {/* 9. CTA FINAL */}
      <CtaFinal
        h2Marked="Imagina abrir Piski y ya [b]saber qué comer[/b]"
        futurePacingMarked='Es la hora de comer. Abres Piski, ves tus opciones, dices "me late" y sigues tu día.'
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="Garantía del Primer ¿Qué Como? · 7 días gratis"
        psMarked="PS: Piski convierte tu objetivo en comida real con el Motor ¿Qué Como Ahora? Hoy entras con 7 días gratis y la Garantía del Primer ¿Qué Como? — sin pesar nada, sin explicarte dos veces."
      />
      </main>

      {/* 10. FOOTER LEGAL */}
      <FooterLegal
        appName="Piski"
        soporteEmail="hola@piski.app"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
          { label: 'Aviso de IA', href: '/aviso-ia' },
        ]}
      />

      <StickyCtaMobile labelComercial={CTA_LABEL} href={CTA_HREF} />
      <BackToTop />
    </div>
  );
}
