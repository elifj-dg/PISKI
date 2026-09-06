# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Todos los CTA — Hero, mid-page, Oferta, CtaFinal, StickyCtaMobile] tokens.css define --radius-button:16px pero FICHA-ARTE.md exige "botones/CTA en pastilla completa (999px)" — los botones se ven rectángulo muy redondeado, no pastilla → cambiar --radius-button a 999px (o crear --radius-cta:999px separado de los chips) y re-renderizar.
2. [Sección Oferta, ~mitad de la página] stack de valor (3 líneas) + card anual con badge+trial+precio+features + card mensual, todo apilado en 375px, se siente denso y compite por atención → recortar el stack a 2 líneas o mover el trial badge a un solo lugar, dar más aire vertical entre bloques.
3. [Hero / sección Solución] la promesa "en 10 segundos" y el Motor ¿Qué Como Ahora? no tienen ningún elemento vivo en la landing misma (solo screenshots estáticos del carrusel) — de las 7 baseline de movimiento, faltan conteo animado de número héroe y anillo/barra dibujándose en vivo → agregar un micro-demo o contador animado en Hero/Solución que refuerce la velocidad prometida.
4. [Header] sin ancla directa a precios para el usuario que ya sabe que quiere comparar planes (solo aparece tras hacer scroll vía StickyCtaMobile) → agregar enlace "Ver precios" en el header junto a "Entrar".
5. [Proceso — FICHA-AVATAR.md] estado BORRADOR, "Aprobada por el usuario: pendiente de confirmación explícita" — la landing ya se escribió y cerró sobre una ficha de avatar no aprobada formalmente, riesgo de retrabajo de copy → cerrar la aprobación explícita antes de declarar la landing lista para vender.
