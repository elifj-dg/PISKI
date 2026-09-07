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

## Fichas del proyecto (memoria persistente — cosa juzgada)
- `FICHA-AVATAR.md`: BORRADOR (avatar/dolores/deseos confirmados en el reporte de validación; falta ronda dedicada de VoC en español antes de la landing final)
- `FICHA-MERCADO.md`: precio $99 MXN/mes · $990 MXN/año, trial 7 días, garantía 15 días — completa
- `FICHA-MODELO.md`: APROBADA — Cal AI como app modelo (revenue probado: $30M/año, adquirida por MyFitnessPal), eje propio: texto/contexto en vez de foto, alimentos mexicanos
- `FICHA-ARTE.md`: pendiente (se completa en Sesión 2, branding ya definido en la sección de arriba)

## Monetización (decidido por el agente — matriz A-F de 02C, nicho C: Fitness/Nutrición)
- **Modelo**: Onboarding + Paywall de prueba (Modelo 2), variante preview anónimo → paywall → login/auth. El usuario vive el "¿Qué Como Ahora?" real ANTES de pedir cuenta; el login solo llega para guardar/desbloquear.
- **Precio**: $99 MXN/mes · $990 MXN/año (equivalente $82.50/mes, "2 meses gratis") — dentro del rango de mercado (Eat This Much ~$95 MXN/mes, MacroFactor ~$228 MXN/mes), ver FICHA-MERCADO §1.
- **Trial**: 7 días (el aha es inmediato, no hace falta trial largo) · **Garantía**: 15 días (pasa la regla garantía > prueba).
- **Gate de unit economics (pasa en ambos escenarios)**:
  - Venta directa: ingreso neto ~$77 MXN → COGS (IA+infra+email) ~$10.5 MXN → margen ~$66.5 MXN (~86%)
  - Venta por afiliado (40% recurrente): ingreso neto ~$37.4 MXN → margen ~$26.9 MXN (~72%)
  - Ambos escenarios pasan el gate de margen sano (>70%). Comisión de afiliado por defecto: 30-40% recurrente.
- **Créditos de IA**: no aplica — la app es de texto (sin imagen/audio en el MVP), costo de IA insignificante frente al precio.

## Arquitectura y stack (decisión técnica interna — no se le presenta al usuario)
- **Framework**: Next.js (App Router) — necesita landing + SEO + app en un solo proyecto.
- **Auth**: Supabase Auth, email/password + Google OAuth. Preview anónimo con estado local hasta el paywall; el login sube esa sesión a cuenta real.
- **Base de datos**: Supabase Postgres, RLS en toda tabla con política `(select auth.uid()) = user_id`.
- **IA**: Anthropic Claude vía BFF (nunca en el frontend). Modelo principal Sonnet para "¿Qué Como Ahora?" (streaming, síncrono, <10s); Haiku para clasificar/extraer texto libre ("comí tacos al pastor" → estimación). `AI_MODEL`/`AI_MODEL_FALLBACK` en env vars. Sin imagen/video en el MVP (fase posterior, ver Constitución).
- **Memoria del usuario**: cada recomendación usa el historial reciente (comidas registradas + "me late"/"dame otra") — el registro de hoy cambia la recomendación de mañana (test de retención de 24 pasado).

## Mapa de pantallas (MVP, 8 pantallas únicas)
1. Landing (vende el resultado, no la app)
2. Onboarding (preview anónimo: objetivo, datos básicos, preferencias, restricciones, presupuesto — 6-8 pasos, termina con el primer "¿Qué Como Ahora?" real)
3. Paywall (tras la primera victoria)
4. Login/Registro (sube la sesión anónima a cuenta)
5. Hoy / ¿Qué Como Ahora? (protagonista — home)
6. Registro de comida + Modo rescate (dentro del home, no pantalla aparte)
7. Historial/Progreso (proteína/calorías de la semana)
8. Perfil (Mis básicos, objetivos, plan/suscripción)

## Modelo de datos (Supabase — decisión técnica, no requiere aprobación)
- `profiles`: user_id (PK/FK auth.users), edad, sexo, estatura, peso, actividad, objetivo, calorias_objetivo, proteina_objetivo, carbos_objetivo, grasas_objetivo, presupuesto, horarios (jsonb), preferencias (jsonb), restricciones (jsonb), plan, trial_ends_at, created_at
- `mis_basicos`: id, user_id (FK, indexado), alimento, created_at
- `comidas_registradas`: id, user_id (FK, indexado con created_at), descripcion, proteina_aprox, calorias_aprox, momento (desayuno/comida/cena/snack), fuente (casa/fuera/pedido), created_at
- `recomendaciones`: id, user_id (FK), contexto (jsonb), opciones (jsonb), elegida, feedback (me_late/dame_otra/no_tengo_eso/etc), created_at — alimenta el aprendizaje de gustos
- `ai_calls`: id, user_id, modelo, tokens_in, tokens_out, costo_usd, created_at — para el kill-switch de gasto de IA (30)
- Todas con RLS `own_rows`: `using ((select auth.uid()) = user_id) with check (...)`

## Sesión 2 — Identidad visual (historial de rondas)
- **Ronda 1** (agente propone, fondo crema plano): rechazada por el usuario — se sintió genérica.
- **Ronda 2** (`direcciones-abc.html`, kit `abc-v2`): 3 composiciones en blanco (A Tarjetas Frescas, B Anillo y Resumen, C Lista Editorial). El usuario reaccionó con: le gustó A combinada con el anillo de B, y aportó una referencia propia más completa (Ronda 3).
- **Ronda 3 — ADOPTADA**: el usuario mandó un spec sheet completo (Home/Dashboard, ¿Qué Como Ahora?, Modo rescate, Perfil, Aprende de ti, Sistema de 5 pasos) con fondo CREMA (no blanco), cards blancas con sombra suave, CTA en pastilla verde oscuro, nav de 5 pestañas, fotografía de comida real. Se tomó como CONTRATO de flujo y craft (protocolo 16), fusionando el anillo de progreso que el usuario pidió explícitamente.
- `FICHA-ARTE.md` actualizada con los tokens de la Ronda 3 (ver archivo — acento de acción ahora es verde oscuro #123D2B, maíz/terracota pasan a acentos secundarios).
- `vista-previa-app.html` (raíz, marcador `data-kit="abc-v2"` conservado) reconstruido sobre la Ronda 3: Home con anillo · ¿Qué Como Ahora? · Modo rescate · Perfil. Screenshot verificado a 375px: `docs/revisiones/vista-previa-app-375.png`. Enviado al usuario — pendiente de la pregunta del tour (me encanta / ajustar / repensar).
- Nota: la puntuación formal del revisor-visual (/40 usabilidad, /20 craft) se aplica cuando estas pantallas se construyan como código real de producción (Sesiones 3-5) — este tour es la aprobación de DIRECCIÓN visual, no el cierre de pantalla.

- **Ajuste final aprobado**: fondo cambiado de crema a blanco cálido (#FAFAF7), cards en #FFFFFF con hairline sutil para diferenciarse del fondo. `FICHA-ARTE.md` APROBADA. Identidad visual CERRADA — cosa juzgada para el resto del proyecto.

## Sesión 3 — Página de ventas (código real)
- **Scaffold instalado**: Next.js 16 (App Router, TypeScript, Tailwind v4, Turbopack) en la raíz del proyecto + `motion` + `lucide-react`. `npx tsc --noEmit` y `npm run build` limpios.
- **Kit de landing copiado** a `components/landing/` (10 secciones + `ui.tsx` + `MarkedCopy.tsx`) y **tematizado** en `components/landing/tokens.css` con los valores de `FICHA-ARTE.md` (bg #FAFAF7, texto #123D2B, acento #123D2B, radios 20/16px, Fredoka+Inter vía `next/font` en `app/layout.tsx`).
- **Copy marcado** en `docs/copy/landing.md`, trazado a `FICHA-AVATAR.md`. Big Idea y mecanismo bautizado: **"el Motor ¿Qué Como Ahora?"** (hereda el nombre ya validado del corazón de la app).
- **Modelo de negocio**: onboarding-first (preview anónimo) — todos los CTA de la landing apuntan a `/onboarding` (stub por ahora, se construye real en Sesión 4).
- **Bug encontrado y corregido**: en la FICHA-ARTE de Piski, `--accent` = `--text-primary` (mismo verde oscuro, elegido para que los botones CTA fueran verdes). Eso hacía invisible el marcador `[acento]` del kit en la sección CTA Final (fondo invertido) e indistinguible del texto normal en el resto. **Desviación documentada**: se usa `[b]` (negrita) en vez de `[acento]` en todo el copy — visible en cualquier fondo, sin tocar ningún componente del kit. Anotado también en `docs/copy/landing.md`.
- **Páginas legales stub creadas** (contenido mínimo real, no vacío): `/privacidad`, `/terminos`, `/reembolsos`, `/aviso-ia` — se completan con `47-LEGAL-FISCAL-Y-PRIVACIDAD.md` en Sesión 7. Páginas placeholder: `/onboarding`, `/entrar`.
- **Primera pasada del revisor-visual: NO LISTA** (28/40 usabilidad, 14/20 craft, 18/20 copy) — defectos: Hero y carrusel "La app por dentro" mostraban placeholders vacíos (caja punteada + texto de instrucción interna filtrado a producción), y el anillo de progreso (dispositivo ownable de FICHA-ARTE.md) no aparecía en ningún lado visible.
- **Corregido**: se recortaron capturas de los 4 mockups YA APROBADOS de `vista-previa-app.html` (Home con anillo, ¿Qué Como Ahora?, Modo rescate, Perfil) como imágenes estáticas en `public/mockups/*.png` (tier 2 de la jerarquía de fidelidad de 19 §5 — mini-demo HTML/CSS honesto, no una captura de la app interna en código, que aún no existe). El Hero ahora usa `/mockups/home.png` como `visual` (el anillo ya es visible desde el primer viewport) y el carrusel usa las 4 imágenes vía la prop `src` que el componente `AppPorDentro` ya soportaba (sin tocar ningún `.tsx`).
- **Testimonios**: ninguno (regla de <3 reales — correcto no mostrar cards de testimonios en día 1).
- ⚠️ **Dominio placeholder**: el email de soporte en el footer usa `hola@piski.app` — el usuario debe confirmar el dominio real antes del lanzamiento.
- ⚠️ **Pendiente real para Sesión 5**: reemplazar `public/mockups/*.png` por screenshots de la app interna en código real cuando exista (estos mockups son honestos pero no son la app funcionando).
- Captura a 375px guardada en: `docs/revisiones/landing-375.png` (se regenera en cada ronda de ajustes).
- **Historial de 7 pasadas del revisor-visual** (usabilidad/craft/copy): 28→32→31→32→34→33→35 / 14→14→15→15→18→18→18 / 18→19→19→19→19→19→19. Craft y copy YA PASAN el gate (≥16/20 y sólido). Usabilidad quedó en **35/40** (gate: ≥36) tras corregir: placeholders vacíos → mockups reales, botones no-pastilla → pastilla, densidad de oferta, `--accent` idéntico a `--text-primary` (bug raíz: el CTA de cierre se fundía con su propio fondo), anillo de progreso animado en vivo en el Hero, botón "volver arriba", `:focus-visible` reforzado, skip-link + landmark `<main>` semántico.
- **Único defecto restante**: el `<header>` de marca (logo + "Entrar"), al vivir dentro de `<section>`/`<main>`, no obtiene el rol ARIA "banner" (regla de exclusión de landmarks anidados de HTML/ARIA) — una limitación estructural del kit de landing de bajo impacto real en una página de una sola pantalla (no es una app con navegación persistente entre rutas). Corregirlo de raíz exigiría que `Hero.tsx` deje de renderizar su propio header y que `page.tsx` lo renderice aparte — una reestructuración mayor del kit, no una tematización. Se deja anotado para la pasada de accesibilidad de `06-TESTING.md`/Sesión 7, no bloquea seguir a Sesión 4.
- Contraste del link "Entrar" corregido (`--text-tertiary` → `--text-secondary`, ~AA reforzado).

## Problemas conocidos
- **veredicto:landing — NO LISTA, decisión final de detener la ronda de revisión (9 pasadas)**: historial completo de usabilidad/craft/copy: 28→32→31→32→34→33→35→34→34 / 14→14→15→15→18→18→18→16→16 / 18→19→19→19→19→19→19→19→19. Craft y copy pasan el gate de forma consistente (≥16/20). Usabilidad osciló entre 31 y 35 sobre un gate de 36 — el techo real de esta landing con el kit actual, no un defecto puntual: los últimos 3 defectos que el revisor señaló son (a) el landmark ARIA del header (ya documentado, requiere reestructurar el kit), (b) agregar jump-links de navegación en el header — **rechazado a propósito**: contradice la regla explícita de `19-PAGINA-DE-VENTAS.md` §1 ("header de marca: logo + nombre + 'Entrar'. Sin menú que distraiga") — la doctrina del SO manda sobre un punto de heurística aislado, (c) indicador de progreso de scroll y repetir el nombre de la garantía junto a cada CTA de precio — mejoras marginales sin slot disponible en el kit, tocarían la mecánica de `Oferta.tsx` que el kit protege explícitamente.
  - **Decisión**: se detiene la ronda de revisión aquí. La landing está funcionalmente sólida, sigue al pie de la letra la estructura canónica del 19, tiene 0 errores de build/tsc, y los defectos restantes son de accesibilidad fina (Sesión 7) o contradicen la doctrina del propio SO. Seguir iterando el mismo punto de usabilidad no es buen uso del tiempo — se le presentó esta decisión al usuario.

- **veredicto:onboarding — 3 pasadas (31/40→32/40, 13/20→13/20), 3ª pasada EN CURSO tras nuevas correcciones**:
  - 1ª pasada NO LISTA (31/40, 13/20): vacío muerto, chips sin stagger, chips sin sombra, CTA disabled sin decir qué falta, avance automático sin cancelar. **Corregido**: `PasoTransicion` centra verticalmente (`justify-center`), `OpcionesGrupo` nuevo (ui.tsx) escalona la entrada con `staggerChildren`, `ChipOpcion` lleva `shadow-[var(--shadow-1)]`, `CtaFijo` acepta `disabledHint`, avance automático con `avanceRef`+`clearTimeout` (debounce real).
  - 2ª pasada NO LISTA (32/40, 13/20): sin dispositivo de identidad/tercer nivel de profundidad, chips sin foco visible explícito, `CampoNumero` sin rango, header con el botón atrás "flotando". **Corregido**: `FunnelScreen` ahora lleva el mismo degradado radial de marca que el Hero de la landing, `ChipOpcion` con `focus-visible:outline` en acento, `CampoNumero` acepta `min`/`max` (peso 30-250, estatura 100-230, edad 14-100, calorías 800-6000, proteína 20-400), header con padding/gap reducido para anclar el botón a la barra.
  - 3ª pasada NO LISTA (30/40, 15/20): usabilidad bajó porque el revisor detectó que el fix de min/max era solo un atributo HTML sin aviso real; vacío grande entre header y título por el centrado vertical; sin dispositivo ownable en este paso; número héroe del paso "compromiso" no contaba de 0→N; sin navegación por flechas entre chips. **Corregido**: `CampoNumero` ahora clampea en `onBlur` y muestra borde+mensaje en `--danger` si el valor tecleado sale de rango; `PasoTransicion` usa `justify-center` + `pb-24` de contrapeso (sesga el bloque hacia arriba en vez de centrarlo con hueco grande); el número del paso "compromiso" ahora cuenta de 0 al valor con un intervalo de 60ms al entrar al paso (el arrastre en vivo del slider sigue siendo instantáneo). No se agregó dispositivo ownable ni navegación por flechas (evaluados como de menor impacto que el resto).
  - 4ª pasada NO LISTA (32/40, 12/20): oscilación (no regresión real) — reapareció el hueco header-título, dispositivo ownable seguía sin verse, sombra de chips seguía débil. **Corregido**: se agregó un ícono de hoja (Leaf) en círculo acento junto al título del primer paso (mismo lenguaje visual que Reconocimiento/Paywall); `PasoTransicion` abandonó el centrado vertical (quitado `justify-center`), vuelve al anclaje superior fijo de la 1ª pasada; chips no seleccionados con borde más oscuro (45% en vez de 28%) y sombra propia más visible que el token genérico.
  - Quinto screenshot y 5ª pasada del revisor-visual lanzados — todavía sin veredicto. **Nota de proceso**: el puntaje de usabilidad ha oscilado 31→32→30→32/40 y craft 13→13→15→12/20 en 4 pasadas sin converger claramente al gate (≥36/40, ≥16/20) — mismo patrón que se documentó y se decidió detener en la landing tras 9 pasadas. Si la 5ª pasada no logra el gate, se evaluará aplicar la misma decisión aquí.
- **veredicto:paywall — 4 pasadas (30/40→34/40→32/40, 12/20→17/20→15/20 craft, 15/20→17/20 copy), 5ª pasada EN CURSO tras nuevas correcciones**:
  - 1ª pasada NO LISTA (30/40, 12/20, 15/20 copy): nombre del mecanismo inconsistente, X cierra sin confirmar, fondo plano, animaciones sin guard de `prefers-reduced-motion`. **Corregido**: copy unificado a "el Motor ¿Qué Como Ahora?", `useReducedMotion` en las 3 animaciones de entrada, degradado radial de profundidad.
  - 2ª pasada NO LISTA (34/40, 13/20, 16/20 con eje emoción en 2/5): headline sin palabra en acento, `window.confirm()` nativo rompe la estética del kit, cards de plan sin `whileTap`, barra de timeline sin animación de dibujado, primer beneficio sin anclar el dolor emocional de FICHA-AVATAR antes del alivio. **Corregido**: "está listo" del headline en `var(--accent)`, `window.confirm` reemplazado por un modal propio animado (bottom sheet "Seguir viendo mi plan" / "Salir sin guardar"), cards de plan ahora `motion.button` con `whileTap`, barra de timeline animada de 0 a 35% al montar, primer beneficio reescrito: 'Se acabó el "¿y ahora qué como?": el Motor ¿Qué Como Ahora? decide por ti...'.
  - 3ª pasada NO LISTA (33/40, **17/20 craft PASA**, **17/20 copy PASA** — único bloqueante es usabilidad): CTA de compra sin loading ni bloqueo de doble-tap (crítico en una acción de pago), beneficio 1 ocupaba 3 líneas vs 1 de los otros, plan anual preseleccionado sin explicar por qué. **Corregido**: `CtaFijo` (ui.tsx) ahora acepta `loading`/`loadingLabel` — al comprar se deshabilita, muestra spinner y "Llevándote a tu pago…", con bandera anti doble-tap en Paywall.tsx; beneficio 1 acortado a 2 líneas; texto "Elegimos el anual porque te sale más barato al mes — puedes cambiarlo aquí" agregado sobre las cards de plan.
  - El badge circular "N" que el revisor vio superpuesto sobre las cards en varias pasadas se confirmó (inspeccionando el código) que es un overlay del entorno de captura de pantalla, no algo que exista en Paywall.tsx — se le avisó al revisor para que no lo siga contando.
  - Cuarto screenshot y 4ª pasada del revisor-visual lanzados — todavía sin veredicto.

## Sesión 3 — Ronda de ajustes visuales pedidos por el usuario (tras ver la landing)
El usuario pidió, con capturas concretas: (1) resaltar la franja "7 días gratis · Garantía..." en caja redondeada con negrita, (2) cards de "¿Te suena?" en verde claro con borde/sombra verde e íconos verdes, con palabras clave en negrita, (3) mismo tratamiento de diferenciación de color en las cajas "Hoy/En 6 meses" y "Antes/Después", (4) el chip "el Motor ¿Qué Como Ahora?" en verde oscuro sólido con letras claras, (5) íconos en los 3 pasos del mecanismo, (6) que TODO el texto en negrita del copy sea verde, (7) más separación en la fila de íconos del Hero.
- **Implementado** (deviations documentadas — tocan `.tsx` del kit, justificadas por pedido explícito de marca):
  - `Problema.tsx`: cards ahora con bg verde claro (`color-mix accent 8%`), borde verde 32%, sombra verde, `IconChip tone="accent"` (antes "muted").
  - `Agitacion.tsx` y `Solucion.tsx` (antesDespues): la card "positiva" (En 6 meses / Después) ahora lleva borde + sombra verde además del tinte de fondo; labels en `font-bold`.
  - `Solucion.tsx`: el chip del mecanismo pasó de outline+texto-acento a pastilla sólida `bg-accent` + `text-bg` (verde oscuro, letras claras). Se agregó `icon?: LucideIcon` a `PasoMecanismo` — los 3 pasos ahora muestran ícono (ClipboardList / Sparkles / ThumbsUp) en vez del número.
  - `MarkedCopy.tsx`: el marcador `[b]` ahora renderiza en `text-[var(--accent)]` (verde) además de bold, en TODA la landing — **excepto** dentro de `.cta-final-invert` (la sección de cierre con fondo invertido), donde una utilidad Tailwind (`[.cta-final-invert_&]:text-inherit`) lo revierte a heredar color, para no repetir el bug de contraste ya corregido antes (verde sobre verde oscuro sería invisible). `CtaFinal.tsx` ahora lleva la clase `cta-final-invert` en su `<section>`.
  - `app/page.tsx`: preguntas de Problema con `[b]` en "sin saber qué comer" / "perdiste el control" / "improvisar"; franja de confianza del Hero en caja redondeada con borde+fondo verde y texto bold; más gap (`gap-8`/`gap-2`) entre la fila de íconos y el resto.
- Verificado: `npx tsc --noEmit` y `npm run build` limpios, revisado visualmente sección por sección en el navegador (capturas no adjuntas al repo, solo de verificación). Screenshot final: `docs/revisiones/landing-375.png`.
- ⚠️ Como se tocó código de pantallas otra vez, el veredicto anterior queda CADUCADO — no se relanzó el revisor-visual tras esta ronda (eran cambios de estilo pedidos punto por punto por el usuario, de bajo riesgo funcional); se recomienda una pasada de revisor antes de dar la landing por cerrada del todo, pero no bloquea seguir a Sesión 4 si el usuario prefiere avanzar.

## Sesión 4 — Onboarding, paywall y login (código real)
- **`lib/plan.ts`**: cálculo Mifflin-St Jeor (BMR + factor de actividad por días de entrenamiento + ajuste por objetivo) → calorías y proteína objetivo, IMC y rango de peso saludable. Siempre presentado como "orientativo", nunca diagnóstico (Constitución del producto).
- **`components/onboarding/ui.tsx`** (piezas propias del funnel, sobre los mismos tokens de `FICHA-ARTE.md`): `FunnelHeader` (atrás + barra de progreso con endowed progress ≥5%), `ChipOpcion`, `CtaFijo`, `PasoTransicion` (entrada/salida horizontal), `CampoNumero`.
- **`app/onboarding/page.tsx`**: máquina de estados de 13 pasos siguiendo las 7 reglas de `02B`/`50` — objetivo → (manual opcional) → entrenamiento → datos (peso/estatura/edad/sexo) → restricciones → presupuesto → momento del día → **Reconocimiento 1** (usa la respuesta real del paso anterior) → básicos que tiene en casa → compromiso (slider días/semana) → **Reconocimiento 2** → **loading** ("construyendo tu plan") → **paywall**. Botón "Ya tengo mis objetivos de mi nutriólogo" salta directo a captura manual de calorías/proteína (atajo legítimo, evita redundancia con quien ya trae su plan).
- **`components/onboarding/Reconocimiento.tsx`**: micro-pantalla sin opciones (solo "Continuar"), refuerza que "cada pregunta devuelve algo" con el dato real del usuario, nunca un genérico.
- **`components/onboarding/LoadingPlan.tsx`**: anillo animado (0→100%, con mesetas por paso, nunca lineal) + 4 líneas que aparecen secuencialmente citando datos REALES del usuario ("Ajustando tu proteína a 130g al día", "Usando los 4 básicos que ya tienes") — patrón Labor Illusion de `50`, nunca spinner genérico. Respeta `prefers-reduced-motion` (salta directo al 100%).
- **`components/onboarding/Paywall.tsx`** (pantalla C1 de `50`, de primera clase): X cerrar, badge "Hecho con tus N respuestas" (costo hundido visible), headline con el objetivo real + meta diaria (kcal/proteína calculados), 3 beneficios con ícono, timeline Hoy/Día 5/Día 7 con el texto exacto de cuándo se cobra y cómo cancelar, 2 planes (anual destacado "Mejor valor" $82.50/mes = $990/año, mensual $99/mes — mismos números de `FICHA-MERCADO.md`), CTA "Empezar mis 7 días gratis", fila de confianza (garantía 15 días), salida "Ahora no, seguir sin plan" (sin dark pattern — visible, no oculta).
- **`app/entrar/page.tsx`** (pantalla E de `26-AUTH-MODERNO.md`, reemplaza el stub): magic link/OTP por correo como método PRIMARIO (jerarquía del 26 — Hotmart-first, sin contraseñas) + "Continuar con Google" como secundario. 3 estados reales: idle (con validación de formato antes de enviar) → enviando (botón deshabilitado, texto cambia) → enviado (confirmación con el correo en negrita + opción de reintentar con otro correo). Hereda contexto de la URL (`?plan=anual|mensual` o `?modo=gratis`) y lo refleja en el subtítulo. El envío real (Supabase Auth) se conecta en la Sesión 5 (servicios externos) — por ahora la UI simula el envío con los 3 estados ya resueltos.
- **Token nuevo**: `--danger` (`#b3261e`) agregado a `components/landing/tokens.css` — primer uso semántico de error de formulario en la app (antes no existía, la landing no tenía formularios).
- **Verificado**: `npx tsc --noEmit` y `npm run build` limpios. Flujo completo probado en el navegador a 375px paso por paso (clicks reales): objetivo → entrenamiento → datos (65kg/165cm/30 años/mujer) → restricciones → presupuesto → momento → Reconocimiento 1 (texto correcto) → básicos (4 elegidos) → compromiso → Reconocimiento 2 → loading (130g proteína y "4 básicos" correctos en las líneas) → paywall (1590 kcal/130g coherente con el cálculo) → botón de compra → `/entrar?plan=anual` con el contexto correcto en el subtítulo → los 3 estados de login verificados (error de formato, enviando, enviado).
- ⚠️ **Revisor-visual EN CURSO, sin veredicto todavía**: onboarding y paywall son 2 de las "4 pantallas que deciden el dinero" (Regla de Oro 7) — el subagente `revisor-visual` ya fue lanzado para ambas (ver `veredicto:onboarding` / `veredicto:paywall` en Problemas conocidos), pero su resultado aún no volvió. Ninguna de las dos pantallas se declara "lista" hasta leer `docs/revisiones/onboarding-veredicto.md` y `docs/revisiones/paywall-veredicto.md`.
- ⚠️ **Pendiente real para Sesión 5**: conectar Supabase Auth de verdad (magic link real, no simulado) y persistir la sesión anónima del onboarding a la cuenta.

## Siguiente paso
Onboarding, paywall y login construidos y verificados funcionalmente (tsc/build limpios, flujo de punta a punta probado en navegador). Falta: lanzar `revisor-visual` sobre el onboarding y el paywall (pantallas del dinero, Regla de Oro 7) antes de cerrar la sesión, y luego decidir con el usuario si se avanza a Sesión 5 (conectar Supabase, GitHub, IA real, Vercel).
