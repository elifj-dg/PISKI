# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Craft global — EJE movimiento/identidad] Sin animación "viva" propia del mecanismo (nada de conteo animado, anillo que se dibuja o micro-demo del Motor; los mockups de AppPorDentro son imágenes estáticas) → agregar una animación signature (anillo dibujándose o contador) en Solución/AppPorDentro para subir EJE 4 y cerrar el gate de craft (hoy 15/20, falta 1 punto).
2. [Navegación global] No existe forma de volver arriba ni saltar entre secciones (solo scroll manual + StickyCtaMobile) → agregar ancla/botón "volver arriba" o nav de secciones (heurística 3, hoy 3/4).
3. [Toda la landing] Sin atajos de teclado ni foco visible reforzado para el usuario avanzado → agregar `:focus-visible` explícito y accesos rápidos a anclas (heurística 7, hoy 2/4 — la más baja del reporte).
4. [Sección Oferta, card Mensual] 3 features vs 4 del plan Anual generan alturas de card desiguales, ligero desencaje óptico → alinear CTA al fondo con `mt-auto` en ambas cards o igualar alturas.
5. [Identidad de marca] Fondo cálido + tinta verde se acerca en espíritu al arquetipo vetado "Capítulo" (aunque la tipografía Fredoka/Inter difiere de Petrona/Karla) → reforzar el dispositivo ownable (anillo de progreso) también dentro de la landing, no solo en los mockups estáticos.
