# VEREDICTO revisor-visual — landing
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 34/40
Craft: 18/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Hero.tsx: <header> sigue anidado en <section id="hero"> dentro de <main> — pierde el rol landmark "banner" (issue arrastrado desde la pasada 7, sin corregir). 2) NUEVO en esta pasada: los 3 chips de beneficio agregados bajo el CTA del Hero (page.tsx L48-67) son un componente ad-hoc (círculo 36px, sin borde, ícono 16px) que no reutiliza <IconChip> de components/landing/ui.tsx (44px, borde acento, ícono 22px, usado en Solucion.tsx y Garantia.tsx) — dos tratamientos distintos de "chip de ícono" en la misma página, rompe consistencia (h4) y encaje óptico; unificar usando <IconChip tone="accent" />. 3) --text-tertiary en enlaces (ej. "Entrar") ronda 4.2-4.5:1, al límite de AA, sin corregir desde la pasada anterior. 4) FAQ: ninguna pregunta tiene ícono ancla, a diferencia del resto del kit que sí usa IconChip por ítem — agregar ícono de categoría por pregunta.
