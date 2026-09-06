# FICHA DE DIRECCIÓN DE ARTE — Piski

## Referencia del usuario (CONTRATO — ver 16)
- ¿Hay imagen(es) de referencia?: SÍ, 3 rondas: (1) moodboards de marca (logo/paleta/tipografía, PiiSKI→Piski) · (2) tour propio del agente, RECHAZADO (fondo crema plano, sin fotografía, se sintió genérico) · (3) **spec sheet completo aportado por el usuario** (pantallas Home/Dashboard, ¿Qué Como Ahora?, Se adapta a tu día, Modo rescate, Perfil, Aprende de ti, Sistema de decisión de 5 pasos) — ESTA es la referencia de flujo y craft que manda ahora.
- Extracción de la Ronda 3 (mirada con herramienta de imágenes):
  - Modo: CLARO, fondo CREMA (no blanco — el usuario probó blanco en la ronda 2 y volvió al crema de marca, con mejor ejecución)
  - Fondo: #F7F1E6 (crema, igual que el kit de marca original) · Superficie (cards): blanco/casi blanco #FFFFFF con sombra suave tintada de verde
  - Texto 1º: verde oscuro tipo #123D2B (más profundo que el Nopal original, usado en headers/CTA) · Texto 2º: verde grisáceo apagado
  - Acento: verde oscuro como color de ACCIÓN (CTA pill, chip seleccionado) — el maíz/terracota de la marca quedan como acentos secundarios (tags "Económico"/"Alto en proteína" en verde-éxito, thumbnails de comida en gradientes cálidos)
  - Display: redonda con carácter (familia tipo Fredoka, consistente con el isotipo) · Body: sans limpia (Inter)
  - Radio: MUY alto — botones CTA en pastilla completa (999px), cards 20-22px, chips redondeados
  - Sombras: sutiles, tintadas de verde, no negras
  - Layout: cards blancas flotando sobre crema, header con saludo + campana de notificaciones, bottom nav de 5 pestañas con ícono+label (Inicio/Descubrir/Plan/Compras/Perfil), fotografía de comida real en los cards de opciones
  - Detalle firma a replicar: anillo de progreso circular como resumen del día (combinado desde la exploración propia — el usuario pidió fusionarlo aquí), barras de progreso horizontales en los stats de proteína/calorías, chips de selección (pastilla) para preguntas rápidas del modo rescate
- Prohibiciones anti-IA que la referencia LEVANTA: ninguna — sigue siendo anti-slop (crema+blanco+verde, cero neón/glass/oscuro)

## Identidad derivada
- Display: **Fredoka** (Google Fonts, pesos 500/600/700) — mismo proxy real de "Piski Display" ya usado en rondas anteriores
- Body: **Inter** (400/500/600/700)
- Arquetipo: comida real + calidez mexicana + practicidad, con un acabado más "app profesional de tracking" que la ronda 1 (más cerca de Fitia/MyFitnessPal en craft, sin perder la calidez de Piski)
- Mundo del sujeto: cocina casera mexicana de diario, con la seriedad visual de una app de salud en la que se confía

## Personalidad compilada
- 3 adjetivos: **cercana, resolutiva, sabrosa**
- Compilación: spring suave en celebraciones (racha, hito de proteína) · duración base 200-220ms · exclamaciones máx 1/pantalla · radio tendencial 20px en cards, pastilla completa en CTA/chips

## Brand kit final (valores para globals.css)
- Fondo: #FAFAF7 (blanco cálido, aprobado en ajuste final — no crema) · Superficie: #FFFFFF (cards) · Hundido: #EFE6D3 · Texto 1º: #123D2B · Texto 2º: #63705F
- Acento de acción (CTA/chip activo/nav activo): #123D2B (verde oscuro, no el maíz) — el maíz #F4C430 y la terracota #E26D56 pasan a acentos secundarios: thumbnails de comida, tags de estado, detalles de marca
- Semánticos: éxito #3F8F52 (verde medio, barras de progreso y tags positivos) · error #C4483A · aviso #E0A72E
- Display: Fredoka · Body: Inter · Escala: display 28-32px / title 16-18px / body 14-15px / label 10.5-12px
- Radio: cards 20-22px · botones/CTA 999px (pastilla completa) · chips 12-14px
- Profundidad: sombra sutil tintada de verde (nunca negra) en cards sobre el fondo crema
- Dispositivo ownable: anillo de progreso circular (resumen del día) + barras de progreso horizontales en los stats + hoja bicolor del isotipo como acento de marca
- Motion signature: ease-out `cubic-bezier(0.16,1,0.3,1)` · stagger 50-60ms · spring solo en celebraciones de hitos reales

## Trazabilidad y vetos
- Ruta de diseño: Ronda 1 (aplicación fiel del branding) → RECHAZADA por el usuario → Ronda 2 (protocolo A/B/C, 3 composiciones en blanco, ver `direcciones-abc.html` en el historial de git) → el usuario pidió combinar A+B con una referencia propia más completa (Ronda 3) → Ronda 3 es la ADOPTADA
- Tour de la app: `vista-previa-app.html` (raíz, marcador `data-kit="abc-v2"` conservado) — Home con anillo · ¿Qué Como Ahora? · Modo rescate · Perfil. Screenshot: `docs/revisiones/vista-previa-app-375.png`. Enviado al usuario — pendiente de la pregunta del tour (me encanta / ajustar / repensar).
- Paleta derivada de: kit de marca Piski (crema/verde/maíz/terracota), reponderada por la referencia del usuario (verde oscuro pasa a ser el acento de acción principal, maíz/terracota quedan secundarios) — mismos hex de familia, sin inventar colores nuevos
- Registro anti-repetición: crema+blanco+verde-oscuro+Fredoka/Inter+anillo de progreso — vetados para el próximo proyecto de este SO
- Modo (claro/oscuro) DERIVADO por: el propio material de marca y la referencia de producto del usuario — nunca asumido

## Idioma UI: Español (México, tuteo) · Fecha de cierre: 2026-09-06 · Aprobada por el usuario: SÍ (fondo ajustado a blanco cálido #FAFAF7 en el ajuste final)
