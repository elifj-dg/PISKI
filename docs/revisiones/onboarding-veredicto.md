# VEREDICTO revisor-visual — onboarding
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 32/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Paso "objetivo", debajo del header] Sin dispositivo ownable visible en el paso — los íconos (flama/mancuerna/corazón/hoja) son Lucide genéricos de librería, no hay ningún rasgo de marca (hoja bicolor del isotipo, anillo, textura) → agregar el detalle firma de FICHA-ARTE (hoja bicolor o acento propio) cerca del título o como marca de agua sutil del paso.
2. [Entre header y título] Persiste un hueco de ~120px entre la barra de progreso y "¿Cuál es tu meta...?" pese al ajuste de PasoTransicion — sigue sintiéndose como espacio muerto antes de la primera pregunta → fijar el bloque de título con un margen superior constante (ej. mt-3) en vez de justify-center, incluso en pasos cortos.
3. [Chips de opción] Sombra (shadow-1) casi imperceptible sobre el fondo #FAFAF7 — las cards blancas no se distinguen del fondo a simple vista, dando sensación de un solo plano → subir el contraste de superficie/sombra o usar un tinte de fondo ligeramente más oscuro detrás de las cards.
4. [Riesgo de identidad] La combinación papel cálido (#FAFAF7) + tinta/acento verde oscuro se acerca al arquetipo vetado "Capítulo" (papel cálido + tinta verde) del test anti-clon — la tipografía Fredoka/Inter la distingue de Petrona/Karla, pero conviene reforzar el dispositivo ownable (ítem 1) para alejarla más del patrón.
5. [Todos los ChipOpcion] Sin navegación por flecha entre opciones (solo Tab nativo) — code review confirma que son `<button>` sin manejo de ArrowUp/Down; mejora menor para uso en desktop/teclado, no crítica en mobile-first.
