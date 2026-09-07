# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-06 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 32/40
Craft: 14/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Fondo general de la pantalla] El degradado radial de profundidad es casi invisible a 375px (cream/blanco casi indistinguibles) y no hay ninguna zona "hundida" — solo base plana + cards elevadas con sombra → falta el 3er nivel de profundidad que pide el eje 2 de craft; subir el tinte del radial en el header/hero o dar un tratamiento hundido a la card de timeline.
2. [Card "Anual" destacada] El `border-image` con degradado de acento agregado esta ronda no se percibe en el screenshot (se funde con el borde normal, sin contraste de grosor/brillo) → el gate de conversión pide ≥1 hairline degradé VISIBLE; subir su opacidad/grosor o moverlo a un elemento con más contraste (ej. barra superior de la card) para que se note al entrecerrar los ojos.
3. [Cards de plan Anual/Mensual] La card seleccionada solo cambia borde+fondo tintado, sin checkmark ni ícono de confirmación — inconsistente con `ChipOpcion` (el mismo patrón de selección en el resto del onboarding SÍ trae un check circular) → un usuario que vio los pasos anteriores nota que aquí el patrón de "elegido" es distinto; agregar el mismo check circular de `ChipOpcion` a la esquina de la card seleccionada.
4. [Texto "Elegimos el anual porque... puedes cambiarlo aquí"] La palabra "aquí" promete una acción (cambiar de plan) pero el texto no es un link ni tiene onClick — no hace nada al tocarlo → falsa afordancia (regla anti-patrón #11); o se convierte en link real que hace scroll/focus a la card "Mensual", o se reescribe sin implicar acción ("el anual te sale más barato al mes").
5. [Identidad visual general] Los chips circulares de ícono (Zap/Sparkles/ShieldCheck) siguen siendo genéricos de cualquier app con Lucide; el dispositivo ownable de la ficha (anillo de progreso, hoja del isotipo) no aparece en esta pantalla → sin un segundo elemento de firma, el kit es intercambiable con otra app de nutrición (nota ya señalada en la ronda anterior, aún no resuelta).

Progreso vs. 4ª pasada: los 3 defectos de código corregidos (focus-visible en todos los interactivos, try/catch en `empezar()` con mensaje de error, beneficios acortados a 1 línea) están verificados en Paywall.tsx y SÍ resuelven lo reportado — usabilidad se mantiene en 32/40 porque los defectos nuevos/residuales encontrados en esta pasada (checkmark de selección ausente, falsa afordancia del "aquí") compensan la mejora. Craft baja de 15 a 14/20 tras una medición más estricta del eje de profundidad e identidad: el hairline degradé agregado no es perceptible en el screenshot real y sigue sin resolverse el dispositivo ownable — ambos gates (≥36/40 y ≥16/20) siguen sin cumplirse.
