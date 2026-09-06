'use client';

// Landing de Piski — compone el kit canónico (components/landing/) en el orden
// de 19-PAGINA-DE-VENTAS.md. Copy marcado trazado a FICHA-AVATAR.md, ver
// docs/copy/landing.md. Modelo de negocio: onboarding-first (preview anónimo).

import { Utensils, Calculator, Frown, RefreshCw } from 'lucide-react';
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
import { StickyCtaMobile } from '@/components/landing/ui';

const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Quiero saber qué comer ahora';

export default function LandingPiski() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="Piski"
        loginHref="/entrar"
        h1Marked="¿Qué como ahora? Piski te lo dice en [b]10 segundos[/b]"
        subtitleMarked="Con lo que tienes, tu presupuesto y tu objetivo del día."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>7 días gratis · Garantía de 15 días · cancela cuando quieras</span>}
        visual={
          <img
            src="/mockups/home.png"
            alt="Pantalla principal de Piski: tu día en un vistazo, con el anillo de progreso, tu proteína y calorías restantes, y el botón ¿Qué Como Ahora?"
            width={750}
            height={1584}
            className="h-full w-full object-cover"
          />
        }
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: Utensils, textoMarked: '¿Llega la hora de comer y otra vez no sabes qué preparar?' },
          { icon: Calculator, textoMarked: '¿Sabes cuántas calorías llevas, pero sigues sin saber qué comer?' },
          { icon: Frown, textoMarked: '¿Sientes que ya perdiste el control del día si comes fuera?' },
          { icon: RefreshCw, textoMarked: '¿Un día te organizas y al siguiente vuelves a improvisar?' },
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
          { titulo: 'Cuéntale tu día', detalle: 'Tu objetivo, lo que tienes en casa y tu presupuesto.' },
          { titulo: 'El Motor decide', detalle: 'Cruza tu objetivo con lo que ya tienes disponible.' },
          { titulo: 'Tú eliges', detalle: 'Recibes 2-3 opciones reales — di "me late" o pide otra.' },
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
            { resultado: 'Meal prep y lista de compras inteligente', valor: '$250' },
          ],
          totalTachado: '$1,738',
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
    </div>
  );
}
