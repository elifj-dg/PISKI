# VEREDICTO revisor-visual — Recomendación (aha moment onboarding)
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/recomendacion-375.png
Usabilidad: 31/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Card principal, icono circular] Ícono Lucide genérico (huevo) en vez de foto real de comida o dispositivo ownable propio → la FICHA-ARTE exige "fotografía de comida real en los cards de opciones"; hasta tener pipeline de assets, usar una ilustración de marca custom (no Lucide stock) como puente.
2. [Layout completo, ~40-45% del viewport] Bloque de contenido flota en el centro dejando franjas en blanco arriba (bajo la barra de progreso) y abajo (bajo los botones) → reducir el `justify-center` o sumar un elemento (ilustración, dato secundario) que ancle el layout y llene el viewport.
3. [Fila de chips: "28g proteína" / "420 kcal" / "10 min" / "$ Económico"] El chip de calorías es el único sin ícono (los otros 3 sí tienen) → agregar un ícono (ej. `Flame` ya usado, o `Zap`) para consistencia dentro del mismo grupo de chips.
4. [Botones "Dame otra" / "Sí, me late"] No tienen `focus-visible:outline` como sí tienen `ChipOpcion` y `CtaFijo` en ui.tsx → agregar el mismo estilo de foco para paridad de teclado/accesibilidad entre componentes del kit.
5. [Botones "Dame otra" / "Sí, me late"] Siguen siendo botones custom en vez de un componente compartido de ui.tsx (riesgo de deriva visual futura pese a que hoy usan los mismos tokens) → extraer un `BotonesReaccion` reutilizable al kit compartido.
