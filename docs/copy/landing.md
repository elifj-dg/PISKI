# COPY MARCADO — Landing de Piski

> Cada pieza se traza a `FICHA-AVATAR.md`. Marcador usado: `[b]…[/b]` (semibold — bold, no color).
> ⚠️ DESVIACIÓN DOCUMENTADA (ver ESTADO.md): el kit soporta `[acento]…[/acento]` para resaltar en el
> color de marca, pero en la FICHA-ARTE de Piski `--accent` = `--text-primary` (verde oscuro, elegido
> para los botones CTA). Eso hace que `[acento]` sea invisible en la sección CTA Final (fondo invertido
> = `--text-primary`) e indistinguible del texto normal en el resto. Se usa `[b]` (negrita) en todo el
> copy en su lugar — visible en cualquier fondo, sin tocar ningún componente del kit.
> Big Idea: "No te falta saber qué es saludable — te falta saber qué comer ahora. El Motor ¿Qué Como Ahora? lo resuelve mirando tu objetivo, lo que tienes y tu momento del día."
> Mecanismo bautizado: **el Motor ¿Qué Como Ahora?** (hereda el nombre de la función corazón de la app, ya validado con el usuario en la Constitución).
> Modelo de negocio: Onboarding-first (preview anónimo) → CTA_HREF = `/onboarding`.

## 1. HERO
- appName: Piski · loginHref: `/entrar`
- h1Marked: `¿Qué como ahora? Piski te lo dice en [b]10 segundos[/b]`
- subtitleMarked: `Con lo que tienes, tu presupuesto y tu objetivo del día.`
- ctaLabel: `Quiero saber qué comer ahora` · ctaHref: `/onboarding`
- socialProof: `7 días gratis · Garantía de 15 días · cancela cuando quieras`
- visualPlaceholderSugerencia: `captura del Motor ¿Qué Como Ahora? con 3 opciones y el dato de proteína faltante`
- Traza: deseo tangible #1 ("saber qué comer sin pensarlo tanto") + nivel de consciencia 3 (mecanismo al frente, no promesa numérica)

## 2. PROBLEMA — título: "¿Te suena?"
1. icon: Utensils · `¿Llega la hora de comer y otra vez no sabes qué preparar?` (dolor #1)
2. icon: Calculator · `¿Sabes cuántas calorías llevas, pero sigues sin saber qué comer?` (dolor #2)
3. icon: Frown · `¿Sientes que ya perdiste el control del día si comes fuera?` (dolor emocional #3)
4. icon: RefreshCw · `¿Un día te organizas y al siguiente vuelves a improvisar?` (dolor emocional #4)

## 3. AGITACIÓN
- frases:
  1. `Sigues pensando qué comer varias veces al día — y esa decisión nunca se acaba.`
  2. `En un año son cientos de veces que decides a ciegas, sin saber si de verdad avanzas.`
  3. `Otra dieta o app no lo arregla: [b]más números no es más claridad[/b].`
- contraste: labelHoy `Hoy` · hoy: `Otra vez frente al refri, sin saber qué preparar.` · labelFuturo: `En 6 meses, si nada cambia` · futuro: `El mismo momento de duda — todos los días.`
- Traza: costo de la inacción (campo de la ficha) + dolor #1

## 4. SOLUCIÓN
- tituloMarked: `Decide en segundos con [b]el Motor ¿Qué Como Ahora?[/b]`
- mecanismo: `el Motor ¿Qué Como Ahora?`
- bigIdeaMarked: `No te falta saber qué es saludable — te falta saber [b]qué comer ahora[/b]. El Motor lo resuelve mirando tu objetivo, lo que tienes y tu momento del día.`
- pasos:
  1. `Cuéntale tu día` — `Tu objetivo, lo que tienes en casa y tu presupuesto.`
  2. `El Motor decide` — `Cruza tu objetivo con lo que ya tienes disponible.`
  3. `Tú eliges` — `Recibes 2-3 opciones reales — di "me late" o pide otra.`
- antesDespues: Antes: `Abres 3 apps distintas y sigues sin saber qué comer.` · Después: `Abres Piski, ves 2-3 opciones y decides en segundos.`
- Traza: objeción "ya probé apps así y las abandono" + deseo #1

## 5. LA APP POR DENTRO
- tituloMarked: `Así se ve tu día en [b]Piski[/b]`
- frames (mini-demo HTML/CSS honesto — tier 2 de la jerarquía de fidelidad de 19 §5: son los mockups de `vista-previa-app.html` ya aprobados por el usuario, recortados como imágenes estáticas en `public/mockups/`, NO screenshots de la app interna en código — esa se construye en Sesión 5 y ahí se reemplazan por capturas reales):
  1. `/mockups/home.png` — `Tu proteína y calorías del día, de un vistazo` — pantalla: Inicio
  2. `/mockups/que-como-ahora.png` — `2-3 opciones con lo que ya tienes` — pantalla: ¿Qué Como Ahora?
  3. `/mockups/modo-rescate.png` — `Si no sabes qué hacer, resuelve en segundos` — pantalla: Modo rescate
  4. `/mockups/perfil.png` — `Tus básicos y tu objetivo, siempre a mano` — pantalla: Perfil
- ctaLabel/ctaHref: igual al hero
- Testimonios: NINGUNO todavía (regla de <3 reales — no se muestran cards de testimonios)
- Hero: el `visual` usa `/mockups/home.png` (el mismo mockup del Home) en vez del placeholder de cámara — muestra el anillo de progreso (dispositivo ownable de FICHA-ARTE.md) desde el primer viewport

## 6. OFERTA
- tituloMarked: `Empieza gratis. Sigue por [b]menos de $3 al día[/b]`
- trialDias: 7
- stack (recortado a 2 líneas tras revisión de densidad — ver ESTADO.md):
  - `Piski Pro con el Motor ¿Qué Como Ahora? (12 meses)` — $1,188 (mata: "es caro/no sé si lo voy a usar")
  - `Modo rescate ilimitado para esos días sin plan` — $300 (mata: "no tengo tiempo")
  - totalTachado: $1,488 · nota: `Hoy: $82.50/mes (se cobra $990/año)`
- anual: badge `MEJOR VALOR` · precioMes $82.50 · totalAnual `Se cobra $990/año` · ahorro `2 meses gratis` · descomposicionDia `menos de $3 al día` · ctaLabel `Empezar mis 7 días gratis` · features: [`El Motor ¿Qué Como Ahora? sin límite`, `Modo rescate cuando no sabes qué comer`, `Meal prep y lista de compras inteligente`, `Historial de tus comidas y progreso`]
- mensual: precioMes $99 · ctaLabel `Elegir mensual` · features: [`El Motor ¿Qué Como Ahora? sin límite`, `Cancela cuando quieras`] (recortado a 2 — plan secundario, menos aire necesario)
- Traza: FICHA-MERCADO §1 (precio) + deseos tangibles

## 7. GARANTÍA
- nombre: `la Garantía del Primer ¿Qué Como?`
- condicionMarked: `Si en tus primeros 7 días el Motor no te da una opción real para tu día, escribes un correo y te devolvemos todo.`
- pisoLegal: `Respaldada por la garantía Hotmart de 15 días`
- Traza: FICHA-MERCADO §4 (garantía 15 > prueba 7)

## 8. FAQ
1. `¿Por qué pagar por esto si puedo preguntarle a ChatGPT?` → `Piski recuerda tu objetivo, tus básicos y tu presupuesto — no tienes que explicarlo cada vez.`
2. `¿Voy a tener que registrar todo lo que como?` → `No. El registro es simple y aproximado — nunca te obligamos a pesar nada.`
3. `¿Y si calcula mal lo que estoy comiendo fuera?` → `Usamos rangos honestos, nunca precisión inventada — sabrás que es estimado, no un dato exacto.`
4. `¿Tiene alimentos que sí como en México?` → `Sí: tortillas, frijoles, pollo, queso panela y los platillos de siempre, desde el primer día.`
5. `¿Qué pasa si no me sirve?` → `Tienes 7 días gratis y la Garantía del Primer ¿Qué Como? — un correo y te devolvemos todo.`
- Traza: objeciones 1, 2, 3, 6(nicho) y 4 de FICHA-AVATAR.md

## 9. CTA FINAL
- h2Marked: `Imagina abrir Piski y ya [b]saber qué comer[/b]`
- futurePacingMarked: `Es la hora de comer. Abres Piski, ves tus opciones, dices "me late" y sigues tu día.`
- recap: `Garantía del Primer ¿Qué Como? · 7 días gratis`
- psMarked: `PS: Piski convierte tu objetivo en comida real con el Motor ¿Qué Como Ahora? Hoy entras con 7 días gratis y la Garantía del Primer ¿Qué Como? — sin pesar nada, sin explicarte dos veces.`
- Traza: deseo de identidad #5 ("que el esfuerzo del gym se note")

## 10. FOOTER LEGAL
- appName: Piski · soporteEmail: `hola@piski.app` (⚠️ dominio placeholder — el usuario debe confirmar el dominio real antes del lanzamiento, ver ESTADO.md)
- enlaces: Privacidad `/privacidad` · Términos `/terminos` · Reembolsos `/reembolsos` · Aviso de IA `/aviso-ia`
- Páginas creadas como stub mínimo en esta sesión — contenido completo se redacta con `47-LEGAL-FISCAL-Y-PRIVACIDAD.md` en Sesión 7
