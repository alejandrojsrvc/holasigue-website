# Product

<!-- impeccable:product-schema 1 -->

Revisión: **2026-11-06**. Contexto contrastado con el código local de iOS y backend, sin certificar despliegue o versión distribuida. Consultar [README.md](README.md).

## Platform

web

## Users

La web presenta SIGUE a personas que quieren cuidar su alimentación, movimiento y descanso mediante avances sostenibles, sin convertir el bienestar en una fuente de presión. También sirve a quienes buscan ayuda, información de privacidad o una invitación para compartir progreso en Juntos.

## Product Purpose

SIGUE ayuda a cuidar tres áreas esenciales —Alimentación, Movimiento y Descanso— mediante registros sencillos, sesiones e historial que permiten reconocer el progreso personal. Rutina ayuda a planificar, Modo Sigue acompaña sesiones elegidas y Estadísticas permite revisar registros. La web explica la aplicación, facilita su descarga y ofrece soporte e información sobre el tratamiento de datos.

## Positioning

SIGUE reúne los tres esenciales en una experiencia de bienestar personal que permite observar la evolución sin exigir perfección. La aplicación personal funciona sin cuenta; Juntos permite compartir de forma opcional el progreso elegido con un grupo.

## Operating Context

- La aplicación está dirigida a iPhone y iPad. La landing está en español e inglés y enlaza a App Store; `/` dirige según preferencia o idioma, y `/es` y `/en` son páginas independientes.
- La navegación iOS local actual es Hoy, Rutina, Juntos, Estadísticas y Perfil. Rutina ya existe; Retos personales/guiados tiene su pestaña principal oculta. No inferir navegación actual de mockups o páginas anteriores.
- Soporte, privacidad y datos de salud tienen versiones en español e inglés. Los términos siguen documentados como borrador pendiente de identificación legal del prestador.
- Los enlaces `/join/<token>` muestran una invitación. Después de instalar, la persona vuelve a abrir el enlace original; no hay deferred deep link.
- Los ejemplos de la landing son ilustrativos; para campañas o capturas reales hay que confirmar la versión de la app anunciada.
- La landing, soporte, términos y aclaraciones de privacidad y salud se han alineado en español e inglés con el contexto local actual. La conexión de ChatGPT no se anuncia como disponible; se conserva información sobre autorizaciones anteriores. No se han publicado estos cambios durante la revisión.

## Capabilities and Constraints

- Sitio estático HTML, CSS y JavaScript, sin compilación ni dependencias de ejecución de una aplicación web. El preview de invitaciones consulta la API mediante proxy del mismo origen.
- La experiencia personal básica de SIGUE no requiere cuenta. Sus datos usan SwiftData local con `cloudKitDatabase: .none`, y JSON local para entrenamientos reutilizables; no prometer sincronización personal iCloud.
- Apple Salud es opcional y de solo lectura en dispositivo. Juntos comparte el progreso elegido, no una transferencia general de registros personales o datos brutos de Salud.
- Cuenta, Juntos y autorización Premium usan backend; no presentar toda la app como «sin servidor» o completamente sin conexión.
- El código local permite gratis hasta 5 planes activos de Rutina y 2 entrenamientos reutilizables guardados. Editar planes existentes y usar recordatorios no es exclusivo de Premium. Una plantilla guardada no es una sesión, ni un plan activo equivale a cada ejecución diaria.
- Premium amplía esos cupos y permite importar calendarios. Precios mensual/anual, moneda, ofertas y elegibilidad proceden de StoreKit; confirmar condiciones y publicación para el mercado antes de anunciarlos.
- La primera práctica compartida gratuita está contemplada por el cliente, pero el backend local inspeccionado todavía exige Premium para crear prácticas independientes. No anunciarla como disponible.
- ChatGPT/MCP está excluido de esta entrega iOS bajo `SIGUE_MCP_ENABLED`. La presencia de `connect/` y sus páginas no prueba disponibilidad desde la app actual.
- SIGUE es bienestar general, sin diagnósticos, tratamientos ni resultados médicos garantizados. No inventar testimonios o métricas.
- El sitio no tiene Analytics activado en la configuración local inspeccionada. El gestor de cookies permite preparar GA4 opcional con consentimiento previo, rechazo y retirada; sin ID real no carga analítica. No se habilita publicidad. Los permisos y conexiones deben explicarse sin extender una afirmación de privacidad a servicios que no cubre.
- No se han verificado aquí despliegue, compras ni publicación de cambios locales recientes.

## Brand Commitments

- El nombre es SIGUE. «Planifica. Hazlo. Entiende cómo vas» conecta herramientas; «Primero tus esenciales. Luego tu mejor versión» conserva la base emocional.
- Lenguaje claro, humano y sin culpa. No usar puntos medios como separadores en textos de interfaz.
- Marca #FABB43 y tinta #222E49. Figtree y tokens web aplicados en `css/styles.css`; no copiar sin revisión los tokens adaptativos de iOS.
- Iconos e ilustraciones con profundidad 3D, formas suaves y sombras controladas; reutilizar activos existentes. El logo del pájaro conserva su dibujo plano; las propuestas SVG planas anteriores no son la nueva familia de iconos.
- La UI de la app contempla claro y oscuro; no deducir que toda la app es clara porque lo sea la landing.
- Usar recursos oficiales de `assets/`, distinguir ejemplos ilustrativos de capturas reales y dirigir consultas a los contactos publicados de soporte y privacidad.

## Evidence on Hand

- Contexto y operación web: `README.md`; contexto funcional contrastado: `../sigue-app/README.md` y `../sigue-app/PRODUCT.md`.
- Estado local de navegación, datos y acceso: `../sigue-app/sigue-app/App/RootTabView.swift`, `../sigue-app/sigue-app/sigue_appApp.swift` y `../sigue-app/sigue-app/Data/Social/PersonalPremiumAccess.swift`.
- Contrato pendiente social: `../sigue-app/PREMIUM_FREEMIUM_BACKEND.md`; autorización efectiva en los servicios de entitlements y desafíos del backend.
- Contenido local: `es.html`, `en.html`, páginas de soporte/privacidad/salud y `join/`. Su presencia no certifica el despliegue ni la disponibilidad comercial de cambios locales recientes.
- Identidad web: `css/styles.css` y `assets/`. Biblioteca editorial complementaria local: `~/Downloads/SIGUE Recursos/08 Documentacion/00_LEER_PRIMERO.md`.
- No tomar imágenes ilustrativas, datos de ejemplo o propuestas de diseño como evidencia comercial o clínica.

## Product Principles

1. Mantener Alimentación, Movimiento y Descanso como base reconocible del producto.
2. Mostrar avances sostenibles y patrones personales con lenguaje claro y sin culpa.
3. Explicar los permisos y la separación entre registros personales y progreso compartido antes de pedir confianza.
4. Ayudar a cada visitante a descargar la app, resolver una duda o entender una invitación con información verificable.

## Accessibility & Inclusion

El contenido debe ser comprensible y evitar juicios sobre hábitos, cuerpos o ritmos de vida. La web ya incluye navegación semántica, enlace para saltar al contenido y etiquetas accesibles; futuras páginas deben conservar esa base.
