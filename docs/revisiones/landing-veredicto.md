# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 34/40
Craft: 18/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Toda la landing] Sigue sin skip-to-content ni anclas rápidas entre secciones — solo se agregó `:focus-visible`, no un mecanismo de salto (heurística 7, hoy 3/4) → agregar enlace "ir al contenido" + anclas de sección navegables por teclado.
2. [Sección Oferta, cards Anual/Mensual] Anual tiene 4 features y Mensual 3, sin `min-height`/`mt-auto` — en desktop (md:grid-cols-2) las cards y sus CTA quedan a distinta altura (en mobile no se nota por ir apiladas) → igualar alturas para que el desencaje no aparezca al pasar a md/lg.
3. [Identidad de marca, cuerpo del scroll] El anillo animado ya vive dentro del Hero (defecto de la pasada anterior resuelto), pero el resto de las 9 secciones siguientes vuelve a apoyarse solo en papel cálido + tinta verde sin un segundo dispositivo ownable propio → repetir el anillo o las barras horizontales del stat en al menos una sección más abajo (p.ej. Solución o AppPorDentro) para que la identidad no dependa de un único momento.
4. [Global] No hay evidencia de ningún patrón de loading/disabled (la landing no tiene formularios ni llamadas async todavía) → cuando se conecte el CTA a un flujo real con validación de red, diseñar el estado de espera desde ahora mismo, no después.
5. [Sección Hero] El placeholder condicional del visual (rama `else` con ícono de cámara) sigue en el componente aunque hoy no se usa (el mockup real está montado) → si el componente vuelve a quedar sin `visual` en algún cambio futuro, revisar que el placeholder no se cuele a producción sin aviso.
