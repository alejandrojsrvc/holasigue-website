# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La web presenta SIGUE a personas que quieren cuidar su alimentación, movimiento y descanso mediante avances sostenibles, sin convertir el bienestar en una fuente de presión. También sirve a quienes buscan ayuda, información de privacidad o una invitación para compartir progreso en Juntos.

## Product Purpose

SIGUE ayuda a cuidar tres áreas esenciales —Alimentación, Movimiento y Descanso— mediante registros sencillos, sesiones e historial que permiten reconocer el progreso personal. La web explica la aplicación, facilita su descarga y ofrece soporte e información sobre el tratamiento de datos.

## Positioning

SIGUE reúne los tres esenciales en una experiencia de bienestar personal que permite observar la evolución sin exigir perfección. La aplicación personal funciona sin cuenta; Juntos permite compartir de forma opcional el progreso elegido con un grupo.

## Operating Context

- La aplicación está dirigida a iPhone y iPad. La landing está en español e inglés y enlaza a su ficha en App Store.
- Las páginas `/es` y `/en` presentan los tres esenciales, Juntos, Evolución, privacidad y descarga. `/` dirige a la versión elegida o al idioma del navegador.
- Las páginas de soporte, privacidad y datos de salud responden dudas sobre uso, permisos y tratamiento de datos.
- Los enlaces `/join/<token>` muestran una invitación y permiten volver a abrirla en la aplicación después de instalarla.

## Capabilities and Constraints

- El sitio es HTML, CSS y JavaScript estáticos; no requiere compilación ni dependencias de la aplicación web.
- Las funciones personales de SIGUE guardan los registros en el dispositivo y, si está activo, en el iCloud privado de la persona. No requieren una cuenta SIGUE.
- La lectura de Apple Salud es opcional y se realiza en el dispositivo con permiso. SIGUE no envía al servidor de Juntos los datos leídos de Apple Salud.
- Juntos es opcional y está disponible para crear una cuenta con Apple y compartir el progreso que la persona elige en grupos y desafíos.
- El preview público de invitaciones consulta la API mediante un proxy del mismo origen. El enlace de invitación no ofrece instalación con apertura diferida: después de instalar, la persona vuelve al enlace original.
- SIGUE es una herramienta de bienestar general; no ofrece diagnósticos, tratamientos ni recomendaciones médicas.
- El sitio no usa cookies publicitarias ni herramientas de analítica de terceros.

## Brand Commitments

- El nombre es SIGUE. Su promesa expresa: «Primero tus esenciales. Luego tu mejor versión».
- La comunicación acompaña el progreso sin culpa ni exigencia de perfección.
- El sitio utiliza los activos de marca existentes en `assets/` y dirige las consultas a los contactos publicados en sus páginas de soporte y privacidad.

## Evidence on Hand

- Contenido y funciones publicados en este repositorio: `index.html`, `soporte.html`, `privacidad.html`, `datos-de-salud.html` y `join/`.
- Funcionamiento y límites de publicación documentados en `README.md`.
- Activos de marca disponibles en `assets/`. Los ejemplos visuales de la portada están construidos con HTML y marcados como ilustrativos; faltan capturas reales aprobadas de Hoy, Juntos, Evolución y el detalle de desafío.
- Este repositorio no contiene testimonios, métricas de usuarios ni evidencia clínica que pueda presentarse como real.

## Product Principles

1. Mantener Alimentación, Movimiento y Descanso como base reconocible del producto.
2. Mostrar avances sostenibles y patrones personales con lenguaje claro y sin culpa.
3. Explicar los permisos y la separación entre registros personales y progreso compartido antes de pedir confianza.
4. Ayudar a cada visitante a descargar la app, resolver una duda o entender una invitación con información verificable.

## Accessibility & Inclusion

El contenido debe ser comprensible y evitar juicios sobre hábitos, cuerpos o ritmos de vida. La web ya incluye navegación semántica, enlace para saltar al contenido y etiquetas accesibles; futuras páginas deben conservar esa base.
