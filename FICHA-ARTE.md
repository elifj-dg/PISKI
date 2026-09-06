# FICHA DE DIRECCIÓN DE ARTE — Piski

## Referencia del usuario (CONTRATO parcial — ver 16)
- ¿Hay imagen(es) de referencia?: SÍ — moodboards de marca (logo, paleta, tipografía, elementos gráficos) en 2 rondas (PiiSKI → Piski). NO se recibió un mockup de pantalla que sea contrato de flujo (el mockup de "buscar recetas" enviado se descartó como referencia de flujo — ver ESTADO.md).
- Extracción (de los moodboards, mirados con herramienta de imágenes):
  - Modo: CLARO (fondo crema, logo oscuro sobre claro en toda la exploración de marca)
  - Fondo: #F7F1E6 (Crema) · Superficie elevada: #FFFDF7 (blanco cálido) · Hundido: #EFE6D3
  - Texto 1º: #0E4D2F (Nopal) · Texto 2º: #4A5D50 (verde grisáceo derivado del Nopal, para jerarquía sin perder tinte)
  - Acento primario: #F4C430 (Maíz) — en CTA y dato clave · Acento 2º (razón funcional: énfasis de copy/alertas de vencimiento): #E26D56 (Terracota)
  - Display: familia redonda con carácter (el moodboard usa una display custom "Piski Display"/"NA'AT Display") · Body: Inter (ya definido por el usuario en su kit)
  - Radio: alto y consistente (el isotipo usa barras muy redondeadas) → 20px cards, 14px botones, 8px chips
  - Sombras: sutiles (fondo claro, sin necesidad de elevar con brillo)
  - Bordes: hairline sutil solo en 1-2 elementos clave (no en toda card)
  - Textura/gradiente: fondo con leve profundidad (mesh muy sutil crema→blanco), nunca fill plano
  - Layout: el moodboard muestra composición centrada, mucho aire, fotografía de comida real como protagonista en piezas de marketing
  - Detalle firma a replicar: la hoja bicolor (verde+terracota) del isotipo, reutilizada como marcador de viñetas/puntos clave
- Prohibiciones anti-IA que la referencia LEVANTA: ninguna — el kit del usuario ya es anti-slop por sí mismo (nada de oscuro+neón+glow)

## Identidad derivada (fuente tipográfica real — el moodboard usa una display custom que no existe como archivo)
- Display elegido: **Fredoka** (Google Fonts) — geométrica, redondeada, con el mismo carácter amigable de "Piski Display"; razón escrita: es la familia real más cercana al trazo del logo (barras redondeadas, terminaciones suaves) sin ser Inter/Roboto/system-ui
- Body: **Inter** — ya decidido por el usuario en su propio kit; se mantiene solo como texto de cuerpo (nunca como portador de identidad de marca)
- Arquetipo: comida real + calidez mexicana + practicidad — "el amigo que sabe de nutrición y no te complica la vida"
- Mundo del sujeto: cocina casera mexicana de diario (tortillas, frijoles, mercado), no gimnasio de neón ni laboratorio clínico

## Personalidad compilada
- 3 adjetivos: **cercana, resolutiva, sabrosa**
- Compilación: spring suave (celebraciones tipo "llegaste a tu proteína del día") · duración base 220ms · exclamaciones máx 1/pantalla · celebración nivel medio (confeti sutil solo en hitos: primera semana completa, racha de 7 días) · radio tendencial 18-20px

## Brand kit final (valores para globals.css)
- Fondo: #F7F1E6 · Superficie: #FFFDF7 · Hundido: #EFE6D3 · Texto 1º: #0E4D2F · Texto 2º: #4A5D50
- Acento: #F4C430 (Maíz — SOLO en CTA primario y el dato clave del día, ej. "te faltan 35g de proteína") · 2ª nota: #E26D56 (Terracota — énfasis de copy en titulares y estados de "vence pronto"/alerta suave)
- Semánticos: éxito #4C8B5B (verde derivado de Nopal, más claro) · error #C4483A (rojo-terracota, distinto del acento para no confundir) · aviso #E0A72E (variante del maíz, más apagada)
- Display: Fredoka (pesos 500/600/700) · Body: Inter (400/500/600) · Escala: display 32px / title 19px / body 15px / label 12px
- Radio: cards 20px · botones 14px · chips 8px · Profundidad: sombras sutiles de 2 niveles (elevado/hundido) + mesh crema→blanco muy tenue de fondo · Espaciado base: 4·8·12·16·24·32·48·64 (margen lateral fijo: 20px)
- Dispositivo ownable: la hoja bicolor (verde #0E4D2F + terracota #E26D56) como marcador de viñetas y de "opción recomendada"; blob orgánico muy sutil (evoca un plato/tortilla) detrás del dato héroe en Home y Onboarding
- Motion signature: ease-out `cubic-bezier(0.16,1,0.3,1)` para casi todo · stagger 60ms · spring `cubic-bezier(0.34,1.56,0.64,1)` solo en celebraciones

## Trazabilidad y vetos
- Ruta de diseño: réplica/aplicación fiel del branding ya aprobado por el usuario (no exploración A/B/C — la marca ya es cosa juzgada desde antes de esta sesión)
- Tour de la app: `docs/revisiones/piski-tour.html` (Onboarding · Home "¿Qué Como Ahora?" · Paywall · Perfil) — pendiente de aprobación del usuario
- Paleta derivada de: kit de marca aportado por el usuario (Piski) — tomada tal cual, sin perturbar hues
- Registro anti-repetición: paleta verde-nopal/lima/maíz/terracota + Fredoka/Inter — vetados para el próximo proyecto de este SO
- Modo (claro/oscuro) DERIVADO por: el propio moodboard del usuario (fondo crema en toda la exploración de marca) — no asumido

## Idioma UI: Español (México, tuteo) · Fecha de cierre: 2026-09-05 · Aprobada por el usuario: pendiente (se aprueba junto con el tour)
