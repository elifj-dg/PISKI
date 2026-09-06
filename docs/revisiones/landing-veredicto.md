# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 33/40
Craft: 18/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Skip-link, fixed left-4 top-4, visible al Tab] Apunta a `#hero`, pero ese `id` está en el `<section>` que CONTIENE el propio `<header>` (logo + "Entrar") — el salto no salta nada: el foco secuencial cae igual en el logo/Entrar. El defecto de la pasada anterior (h7) sigue sin resolverse, ahora con apariencia de resuelto → mover el `id`/target a un ancla DESPUÉS del header (el `<h1>` o un `<main id="main-content">`) y apuntar el skip-link ahí.
2. [app/page.tsx, estructura completa] No existe ningún `<main>` en la página — todo el contenido va suelto entre `<header>` (dentro de Hero) y `<footer>`, sin landmark semántico central → envolver Hero..CtaFinal en `<main id="main-content">` (regla UX #9 + fix natural del defecto 1).
3. [Sección Oferta, cards Anual/Mensual] Anual con 4 features y Mensual con 3, sin igualar alturas — invisible en el apilado de 375px pero reaparece en `md:grid-cols-2` → normalizar con `min-height` o `mt-auto` en el CTA.
4. [Identidad de marca, cuerpo del scroll] El único dispositivo ownable (anillo animado) vive solo en el Hero; el resto de las 9 secciones se apoya en papel cálido + tinta verde sin un segundo elemento propio → repetir el anillo/barras en otra sección (Solución o AppPorDentro).
5. [Hero.tsx, rama `else` del visual] Placeholder dashed con ícono de cámara sigue en el componente aunque hoy no se usa → vigilar que no se cuele a producción si `visual` queda sin pasar en un cambio futuro.
