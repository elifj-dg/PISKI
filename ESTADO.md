# ESTADO.md — Piski (antes "¿Qué Como?" / "NA'AT" / "PiiSKI")

## Resumen (3 líneas)
App de decisiones de alimentación para México: convierte objetivo + lo que tienes + presupuesto + momento del día en 2-3 opciones concretas de comida ("¿Qué Como Ahora?"). Validación de mercado hecha (veredicto: excelente oportunidad). Constitución del producto cerrada. Branding (nombre, paleta, tipografía, isotipo) definitivo — pendiente de aplicar a las pantallas reales en Sesión 2.

## Fecha de última actualización
2026-09-04

## Reporte de validación (evidencia de mercado)
- **Fitia** (LATAM/México, alta calificación): contador de calorías + generador de dietas en español. Quejas: cálculos imprecisos, recetas pobres, funciones gratis movidas a premium, bugs de pago.
- **Eat This Much** (EEUU, 4.7★, 22k reseñas, $5/mes): el más parecido a la idea — genera plan con "despensa". Su propia falla confirma el hueco: la despensa no afecta realmente el plan generado, cantidades absurdas, sigue exigiendo edición manual.
- **MacroFactor** (4.8★, $12/mes o $72/año): nutrición adaptativa, sin capa gratis (queja #1). Confirma que se paga bien por algo "que decide por mí" si es confiable.
- **Cal AI**: no es competencia directa, pero prueba de mercado fuerte — $0 a $30M/año en <2 años con una sola función simple y bien ejecutada (foto → calorías).
- **Brecha real**: ninguna app convierte "lo que tienes + lo que te falta + tu presupuesto + tu momento" en opciones aceptables/rechazables en segundos. Todas se quedan en mostrar el número.

## Constitución del producto (decidida y confirmada con el usuario)
- **Promesa central**: "Tus objetivos convertidos en comida real."
- **Usuario/avatar**: 23-38 años, entrena 3-5x/semana, ya sabe de nutrición (no necesita que le expliquen qué es proteína), cansado de tener que decidir/registrar/calcular todo el día. Ejemplo (Mariana, 29, oficinista, entrena fuerza 4x/semana).
- **Problema**: sabe qué necesita nutricionalmente, pero no sabe convertir eso en comida real cada día, en cada situación (casa, fuera, prisa, poco dinero).
- **Primera victoria (onboarding)**: antes de pedir registro, la app entrega la primera respuesta real a "¿Qué como ahora?" con 2-3 opciones concretas — el momento-wow ocurre ANTES de cualquier registro.
- **Diferenciador**: no solo registra — decide contigo qué hacer después. Motor personal de decisiones de comida, no un contador ni un planificador rígido.
- **Las 6 funciones del MVP** (de las 19 originales, resto pasa a Premium/fase 2):
  1. Perfil + objetivos (calculados o dados por nutriólogo)
  2. ¿Qué Como Ahora? (el corazón — usa "Mis básicos")
  3. ¿Te late? / Dame otra (aprendizaje simple)
  4. Comer fuera (por texto)
  5. Modo rescate ("no sé qué comer")
  6. Registro simple + proteína/calorías restantes
- **Qué NUNCA hace la app**: no diagnostica (no sustituye médico/nutriólogo) · no usa mensajes de culpa ("rompiste la dieta") · no finge precisión exacta (usa "aproximado"/"rango orientativo") · no obliga a pesar todo · no cobra nada sorpresa después del pago.
- **Localización**: México primero (alimentos, medidas, platillos mexicanos), expansión a LATAM después.
- **No construir todavía**: Garmin/Strava/Fitbit, Uber Eats/Rappi, precios de súper en tiempo real, comunidad/red social, rutinas de gym, consultas médicas, chat con nutriólogos, reconocimiento visual obligatorio.

## Branding (DEFINITIVO — cosa juzgada, aprobado por el usuario)
- **Nombre**: Piski — de la raíz maya yucateca "p'iis" (medir/medida) + "ki'" (sabroso/agradable) = "medida + sabor". Nombre real, no inventado al azar; corrige el problema de lectura de la primera versión ("PiiSKI"/"NA'AT" no estaban disponibles en dominio/redes).
- **Tagline**: "Comida real, decisiones inteligentes."
- **Paleta**: Nopal #0E4D2F · Lima #A7D957 · Crema #F7F1E6 · Maíz #F4C430 · Terracota #E26D56
- **Tipografía**: Display "Piski Display" (redonda, amigable, con carácter) + texto Inter
- **Isotipo/App icon**: dos barras redondeadas (verde/crema) con hoja de dos tonos arriba (verde+terracota), variantes en fondo sólido, minimal y círculo
- **Elementos gráficos**: hoja (ingredientes reales), aguacate (México en cada bocado), maíz (nutrición con conciencia), sol (bienestar), plato (hábitos que suman)
- ⚠️ Los mockups de pantalla/producto (tote bag, botella, empaque, tarjeta con foto de bowl) son piezas de exploración de marca, NO especificación de pantallas. Las pantallas reales (Sesión 2) se diseñan siguiendo el flujo de decisión validado (¿Qué Como Ahora?, modo rescate, ¿te late?/dame otra), no un feed de búsqueda de recetas.

## Documentos fuente del usuario (ya leídos y volcados aquí)
- Resumen fundamental de ¿Qué Como? (PDF) — especificación funcional completa
- Propuesta de valor y razones de compra (PDF) — versión C ganadora, 3 razones de compra fuertes (evitar esfuerzo, ahorrar tiempo, ganar comodidad)
- Que_Como_Cliente_Ideal_Imprimible (PDF) — avatar, dolores, deseos, objeciones, ángulo de venta

## Siguiente paso
Sesión 1: validación técnica + AVATAR formal + monetización + unit economics + arquitectura + base de datos + auth. Pendiente de iniciar.

## Decisiones técnicas (criterio del agente — no requieren aprobación del usuario)
(se irán anotando aquí a medida que se tomen en Sesión 1: stack, modelo de datos, método de auth, arquitectura de IA)
