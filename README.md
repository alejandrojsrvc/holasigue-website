# holasigue.com

Landing estática oficial de SIGUE. No requiere compilación ni dependencias. Las preferencias de cookies y la futura integración opcional de Analytics se describen al final. El preview de invitaciones consulta la API mediante el proxy same-origin del servidor.

La landing tiene páginas indexables independientes en `/es` y `/en`, con `hreflang` recíproco. `/` es una entrada que dirige según la preferencia guardada en el navegador o, en su ausencia, su idioma. El selector ES/EN guarda la elección. Soporte, privacidad y datos de salud están en español y en inglés; las páginas españolas conservan sus rutas públicas históricas. Los términos de uso bilingües están publicados en `/terminos` y `/en/terms` como borrador no indexable mientras se completan los datos legales del prestador. Las invitaciones usan la preferencia guardada o el idioma del navegador y permiten cambiarlo. Los ejemplos visuales de la nueva landing son ilustrativos mientras se incorporan capturas reales aprobadas.

## Contexto vigente para agentes

Revisado el **6 de noviembre de 2026**, contra el código local de la app y el backend. Este contexto no certifica qué versión está publicada ni qué está desplegado. La web presenta el producto, facilita la descarga y ofrece soporte, información de privacidad e invitaciones; sus maquetas y textos no prueban que una función esté disponible.

### Producto y acceso

SIGUE ayuda a cuidar Alimentación, Movimiento y Descanso con constancia y sin culpa. «Planifica. Hazlo. Entiende cómo vas» conecta Rutina, Modo Sigue y la revisión del progreso. Juntos permite compartir el progreso elegido de forma opcional.

- El código iOS actual tiene **Hoy, Rutina, Juntos, Estadísticas y Perfil**. Rutina ya está implementada; Estadísticas tiene pestaña propia. Retos personales tiene código, pero su pestaña principal está oculta.
- Los registros personales se guardan localmente: SwiftData con `cloudKitDatabase: .none`, y JSON local para entrenamientos reutilizables. No prometer sincronización personal con iCloud.
- La experiencia personal básica no requiere cuenta. Apple Salud es opcional y de solo lectura. Cuenta, Juntos y autorización Premium usan backend; no describir toda la app como «sin servidor».
- Gratis permite **hasta 5 planes activos de Rutina y 2 entrenamientos reutilizables guardados** en el código local. No son cinco acciones diarias ni dos sesiones. Editar planes existentes y usar recordatorios no es exclusivo de Premium.
- Premium amplía esas capacidades y permite importar calendarios. Los planes mensual y anual, sus precios, ofertas y elegibilidad se consultan en StoreKit. Confirmar país, condiciones y versión distribuida antes de anunciar cifras o pruebas gratuitas.
- La primera práctica compartida gratuita está contemplada por el cliente, pero el backend local todavía exige Premium para crear prácticas independientes. No anunciar esa gratuidad hasta completar y comprobar el servidor.
- ChatGPT/MCP está excluido de la entrega iOS actual bajo `SIGUE_MCP_ENABLED`. La presencia de `connect/` no demuestra que la conexión esté disponible desde esta entrega de la app.

El README de iOS (referencia local: `../sigue-app/README.md`) resume el estado y enlaza a las fuentes. Para límites, consultar `PersonalPremiumAccess.swift` (referencia local: `../sigue-app/sigue-app/Data/Social/PersonalPremiumAccess.swift`) y el contrato pendiente de Premium/Juntos (referencia local: `../sigue-app/PREMIUM_FREEMIUM_BACKEND.md`). El servidor es la fuente de autorización social; un texto del paywall no sustituye ese permiso.

### Identidad y contenido

- Marca: **#FABB43** y tinta **#222E49**. La web usa Figtree; sus tokens aplicados están en [`css/styles.css`](css/styles.css). La app usa sus propios tokens adaptativos en `AppColors.swift` (referencia local: `../sigue-app/sigue-app/DesignSystem/AppColors.swift`); no copiar entre plataformas sin revisar el uso.
- Iconos e ilustraciones: familia **3D con volumen y sombras suaves**. Reutilizar recursos existentes; no adoptar las propuestas SVG planas anteriores. El logo oficial del pájaro conserva su dibujo plano.
- Lenguaje claro, humano y sin presión. No inventar resultados, testimonios, precios, compatibilidad o funciones. Distinguir capturas reales, ejemplos ilustrativos y propuestas.
- Biblioteca editorial local: `~/Downloads/SIGUE Recursos/08 Documentacion/00_LEER_PRIMERO.md`, con guías y briefs para posts, iconos, mockups y desarrollo. Es un complemento local, no necesario para servir la web.

### Coherencia de las páginas públicas

La landing, soporte, términos y aclaraciones de privacidad y salud en español e inglés se han alineado con este contexto en el código local. ChatGPT aparece solo para explicar su indisponibilidad desde esta entrega iOS y el tratamiento de autorizaciones anteriores. No se anuncian importes, pruebas gratuitas, descuentos ni la primera práctica compartida gratuita. Esto no certifica que esos textos o las funciones locales recientes estén publicados.

[`PRODUCT.md`](PRODUCT.md) recoge el contexto de producto alineado con esta revisión. Para comportamiento actual, contrastar el README de iOS y el código; para disponibilidad pública, confirmar la versión distribuida. Los textos históricos o mockups no deben utilizarse como requisito para restaurar funciones retiradas.

No se ha verificado aquí el despliegue, una compra real ni la disponibilidad comercial de las funciones locales recientes. Mantener esa distinción en documentación y handoffs. No ejecutar builds, tests, lint o typecheck automáticamente como cierre de una tarea; indicar la validación manual correspondiente.

## Vista local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

El servidor simple de Python no aplica las reglas de rutas limpias: para revisar la landing allí, abrir `/es.html` o `/en.html`. Para comprobar `/`, `/es` y `/en` como en producción, usar Apache o la configuración Nginx incluida.

## Publicación

El sitio es estático y puede servirse desde Apache o desde la imagen Docker incluida. Para Apache, el DocumentRoot debe apuntar a la raíz del repositorio, permitir reglas `.htaccess` (`AllowOverride FileInfo`) y tener activos `mod_rewrite` y `mod_headers`. El archivo `.htaccess` resuelve rutas limpias como `/privacidad` y `/soporte/`, redirige cualquier URL directa `.html` a su ruta limpia (incluido `/index.html` a `/`) y sirve las invitaciones `/join/<token>`. Nginx aplica las mismas rutas desde `nginx/default.conf`.

La ruta same-origin `/api/invitations/<token>/preview` se proxifica en Caddy a `GET /v1/invitations/<token>` en la API para conservar la IP real del visitante sin habilitar CORS. El ajuste de Caddy de [deploy/README.md](deploy/README.md) debe aplicarse **antes de publicar esta imagen web**: Apache y Nginx devuelven 404 para `/api/` y ya no consultan la API desde una IP compartida del contenedor. El AASA se sirve directamente desde `.well-known/apple-app-site-association` con Content-Type JSON y sin redirect.

La imagen Docker copia únicamente las páginas y carpetas públicas; la configuración de Nginx se instala fuera del DocumentRoot. Nginx y Apache bloquean rutas internas y aplican CSP, protección contra marcos, `nosniff`, política de referrer, permisos y HSTS. Los tokens de invitación se redactan en el access log de Nginx. Los logs del proxy público deben revisarse por separado.

Antes de anunciarlo:

1. Configurar `hola@holasigue.com`, `soporte@holasigue.com` y `privacidad@holasigue.com`.
2. Completar y revisar la identificación legal pendiente en los términos antes de retirar su estado de borrador o permitir su indexación.
3. Validar los datos estructurados con Rich Results Test.
4. Registrar el dominio en Google Search Console.
5. Enviar `https://holasigue.com/sitemap.xml`.
6. Añadir capturas definitivas del producto cuando estén aprobadas.

Los títulos, descripciones y canonicales están definidos por página. Si cambian las rutas durante el despliegue, deben actualizarse también en `sitemap.xml`.


## Invitaciones y Universal Links

La ruta `/join/<token>` muestra un preview público mínimo y consulta la API mediante la ruta same-origin `/api/invitations/<token>/preview`. Caddy dirige exclusivamente esa ruta hacia `api:3000`, sin abrir CORS en la API, conservando la IP real para el límite por visitante y sin reenviar cookies, autorización ni query string. El preview no se cachea. Nginx registra los paths de invitación con el token redactado; los access logs del proxy externo también deben configurarse para no guardar el token.

El AASA está en `.well-known/apple-app-site-association`, asociado únicamente a `86SK6M98QS.com.holasigue.com` y `/join/*`. Debe servirse en `https://holasigue.com/.well-known/apple-app-site-association` con HTTPS, 200, `application/json` y sin redirect.

El botón de descarga abre la ficha pública de SIGUE en App Store. No se implementa deferred deep link: después de instalar, la persona vuelve al mensaje original y toca el enlace de invitación otra vez.

## Cookies y Google Analytics

La integración local está configurada para el flujo **Landing** de `https://holasigue.com`, con ID de flujo `16303735255` e ID de medición `G-4VVBDBG8P9`. La recogida requiere la aceptación expresa del visitante. Esta configuración local no acredita su despliegue en producción.

- El ID de medición está configurado en `js/cookie-consent.js` (`measurementId`). Mantener vacía esa constante desactiva Analytics y evita mostrar un aviso de aceptación innecesario; el botón Cookies sigue mostrando el estado real.
- El gestor y su CSS se incluyen en las páginas públicas. Solo `/es` y `/en` (también sus rutas `.html`) pueden cargar GA. Nunca se carga en `/connect/`, `/join/`, soporte o documentos legales.
- Consentimiento básico: no se descarga la etiqueta ni se envían eventos de Analytics antes de aceptar, al rechazar o al cerrar el aviso sin aceptar. Los permisos publicitarios permanecen denegados y Google signals desactivado. No añadir etiquetas gtag/GTM externas fuera de este gestor.
- Aceptar y rechazar tienen el mismo peso visual. El botón Cookies permite cambiar la elección. El almacenamiento local `sigue.cookie-consent` conserva versión, elección y fecha durante 180 días, sin identificador de cuenta. Sin almacenamiento disponible, la analítica queda desactivada.
- Al retirar el permiso se usa `ga-disable-<ID>`, se eliminan las cookies `_ga`, `_ga_*` y restos `_gid`/`_gat` accesibles y se recarga la página si GA estaba cargado para retirar también sus listeners. Los cambios se sincronizan entre pestañas. No se eliminan las preferencias de idioma ni cookies de autenticación.
- La configuración limita las cookies GA a 180 días sin renovación automática, elimina query/fragmento de `page_location` y usa únicamente el origen del referente. No se envían datos de SIGUE ni se conecta Analytics con la app o el backend.
- Revisar en la propiedad GA4 las opciones de medición mejorada, enlaces con productos publicitarios y retención del servidor. La duración de cookies del navegador no configura la retención en Google.

Se reutilizan los tokens y la tipografía existentes. No se han ejecutado builds, tests ni un servidor local para esta tarea, ni se han desplegado los cambios.

Validación manual recomendada con DevTools y el ID configurado: sesión nueva sin peticiones a `googletagmanager.com`/`google-analytics.com`; rechazo persistido sin etiquetas; aceptación con una sola carga y page view; recarga y cambio ES/EN; retirar permiso y comprobar limpieza y cese tras recargar; cambio en otra pestaña; almacenamiento bloqueado; preferencias caducadas; móvil y teclado; ausencia de Analytics en las páginas excluidas. Verificar también que los eventos no contengan queries, fragmentos o referentes con tokens.

La implementación sigue el [modo de consentimiento básico de Google](https://developers.google.com/tag-platform/security/guides/consent) y sus [controles de privacidad](https://developers.google.com/tag-platform/security/guides/privacy). La configuración del ID en código no acredita la configuración de la propiedad de Analytics ni el funcionamiento desplegado.
