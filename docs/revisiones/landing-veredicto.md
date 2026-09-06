# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 35/40
Craft: 18/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Hero.tsx: <header> (logo+Entrar) quedó anidado en <section id="hero"> dentro de <main> — pierde el rol landmark "banner" para lectores de pantalla (regla ARIA: header pierde banner si es descendiente de section/article/aside/main/nav); mover el header fuera de <main> como hermano directo en page.tsx. 2) El enlace "Entrar" del header y otros usos de --text-tertiary (#6f7a6a sobre #FAFAF7) rondan ~4.2-4.5:1, al límite de AA para texto normal — subir un tono o usar --text-secondary en textos de navegación. 3) Ningún estado de error/carga es aplicable (landing sin formularios) por lo que h5/h9 quedan en "funciona sin problemas visibles" (3/4) en vez de ejemplar — no bloqueante.
