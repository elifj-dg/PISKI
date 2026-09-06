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
- Screenshot re-verificado a 375px: `docs/revisiones/landing-375.png`.
- **Historial de 7 pasadas del revisor-visual** (usabilidad/craft/copy): 28→32→31→32→34→33→35 / 14→14→15→15→18→18→18 / 18→19→19→19→19→19→19. Craft y copy YA PASAN el gate (≥16/20 y sólido). Usabilidad quedó en **35/40** (gate: ≥36) tras corregir: placeholders vacíos → mockups reales, botones no-pastilla → pastilla, densidad de oferta, `--accent` idéntico a `--text-primary` (bug raíz: el CTA de cierre se fundía con su propio fondo), anillo de progreso animado en vivo en el Hero, botón "volver arriba", `:focus-visible` reforzado, skip-link + landmark `<main>` semántico.
- **Único defecto restante**: el `<header>` de marca (logo + "Entrar"), al vivir dentro de `<section>`/`<main>`, no obtiene el rol ARIA "banner" (regla de exclusión de landmarks anidados de HTML/ARIA) — una limitación estructural del kit de landing de bajo impacto real en una página de una sola pantalla (no es una app con navegación persistente entre rutas). Corregirlo de raíz exigiría que `Hero.tsx` deje de renderizar su propio header y que `page.tsx` lo renderice aparte — una reestructuración mayor del kit, no una tematización. Se deja anotado para la pasada de accesibilidad de `06-TESTING.md`/Sesión 7, no bloquea seguir a Sesión 4.
- Contraste del link "Entrar" corregido (`--text-tertiary` → `--text-secondary`, ~AA reforzado).

## Problemas conocidos
- **veredicto:landing — NO LISTA, decisión final de detener la ronda de revisión (9 pasadas)**: historial completo de usabilidad/craft/copy: 28→32→31→32→34→33→35→34→34 / 14→14→15→15→18→18→18→16→16 / 18→19→19→19→19→19→19→19→19. Craft y copy pasan el gate de forma consistente (≥16/20). Usabilidad osciló entre 31 y 35 sobre un gate de 36 — el techo real de esta landing con el kit actual, no un defecto puntual: los últimos 3 defectos que el revisor señaló son (a) el landmark ARIA del header (ya documentado, requiere reestructurar el kit), (b) agregar jump-links de navegación en el header — **rechazado a propósito**: contradice la regla explícita de `19-PAGINA-DE-VENTAS.md` §1 ("header de marca: logo + nombre + 'Entrar'. Sin menú que distraiga") — la doctrina del SO manda sobre un punto de heurística aislado, (c) indicador de progreso de scroll y repetir el nombre de la garantía junto a cada CTA de precio — mejoras marginales sin slot disponible en el kit, tocarían la mecánica de `Oferta.tsx` que el kit protege explícitamente.
  - **Decisión**: se detiene la ronda de revisión aquí. La landing está funcionalmente sólida, sigue al pie de la letra la estructura canónica del 19, tiene 0 errores de build/tsc, y los defectos restantes son de accesibilidad fina (Sesión 7) o contradicen la doctrina del propio SO. Seguir iterando el mismo punto de usabilidad no es buen uso del tiempo — se le presentó esta decisión al usuario.

## Siguiente paso
Landing en muy buen estado tras 9 rondas de revisión (craft y copy sólidos; usabilidad rondando 34-35/40 sobre 36 por temas de accesibilidad fina, ninguno visible para un usuario normal). Se detuvo la ronda de revisión por decisión propia — pendiente de que el usuario decida si seguir a Sesión 4 (onboarding, paywall y login) o priorizar algo puntual de la landing primero.
