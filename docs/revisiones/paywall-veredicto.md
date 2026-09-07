# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Toda pantalla — X, cards de plan, CTA "Empezar mis 7 días gratis", "Ahora no", botones del modal de salida] Ningún elemento interactivo de Paywall.tsx tiene clase `focus-visible` (verificado en código: solo `ChipOpcion` en ui.tsx la tiene, `CtaFijo` y los botones propios de Paywall.tsx no) → un usuario de teclado no ve dónde está el foco en la pantalla de pago; agregar `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]` a X, cards de plan, CtaFijo y botones del modal.
2. [Cards de plan Anual/Mensual y card de timeline] Cero hairline degradé en toda la pantalla (bordes son color sólido `border-[var(--accent)]`/`color-mix` plano, no degradé 1-2px) → viola el gate binario de conversión del checklist de cierre (55/CHECKLIST-CIERRE); agregar al menos 1 borde degradé (padding-box/border-box) en la card del plan destacado "Anual".
3. [Botón "Empezar mis 7 días gratis" → función `empezar` en Paywall.tsx] `onComprar` se invoca sin try/catch ni manejo de fallo: si el checkout no puede iniciarse, `comprando` queda en `true` para siempre (spinner infinito, sin mensaje ni forma de reintentar) → agregar timeout/catch que resetee `comprando` y muestre "No pudimos abrir tu pago, inténtalo de nuevo" con botón de reintento.
4. [Lista de beneficios] Beneficio 1 y 3 ocupan 2 líneas, beneficio 2 ocupa 1 línea — mejoró vs. la ronda anterior (antes 3 líneas) pero la asimetría sigue siendo visible a simple vista → acortar beneficio 3 a una sola línea para igualar el ritmo visual de los tres.
5. [Identidad visual general] Los chips circulares de ícono (Zap/Sparkles/ShieldCheck sobre fondo acento 12%) son un patrón común de cualquier app con Lucide + shadcn, sin un segundo dispositivo ownable propio de Piski en esta pantalla → sumar un detalle de firma (textura, forma de check custom, o el "Motor" con un ícono propio) para que el kit no sea intercambiable con otra app.

Nota: el defecto #1 de la 3ª revisión (loading + bloqueo de doble-tap en el CTA de compra) está corregido — verificado en código: `CtaFijo` deshabilita el botón, muestra `Loader2` girando y "Llevándote a tu pago…", y `empezar()` retorna temprano si `comprando` es true. El defecto de "beneficio 1 en 3 líneas" está corregido a 2 líneas (defecto #4 arriba es una versión menor residual). El defecto de "anual preseleccionado sin explicar" está corregido con la línea "Elegimos el anual porque te sale más barato al mes — puedes cambiarlo aquí".
