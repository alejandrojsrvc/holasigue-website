# Revisión de privacidad y acceso — 29 de octubre de 2026

Estado: propuesta para aprobación; no sustituye la política pública. Revisión estática del código local, sin acreditar la versión distribuida ni la configuración de producción. Este documento complementa el borrador del 11 de octubre y actualiza el alcance de ChatGPT.

## Diferencias encontradas

- `/privacidad` y `/en/privacy` describen Apple como único acceso. El backend y la pantalla de conexión implementan Apple, Google y correo/contraseña; la conexión acepta una cuenta existente.
- La política no explica las copias temporales de hábitos, Rutina y sesiones, los permisos de consulta/escritura ni la revocación de ChatGPT.
- La frase sobre datos personales locales necesita distinguir los originales de las copias de consulta enviadas expresamente para ChatGPT.
- El texto público promete borrado inmediato y reintentos posteriores de revocación Apple. El servicio actual intenta revocar Apple antes de borrar; un fallo puede impedir completar la solicitud. Los grupos y desafíos administrados requieren elegir transferencia o eliminación.
- Los términos publicados también describen acceso exclusivo con Apple. Deben revisarse junto con la política; continúan marcados como borrador.
- La web carga Figtree desde Google Fonts; el acceso puede cargar servicios de identidad de Google y Apple. La sección web debe explicar esas conexiones y las cookies técnicas de autorización.

## Texto propuesto en español

### Resumen — sustituir el actual

Las funciones personales de SIGUE pueden utilizarse sin cuenta y guardan tus registros en el dispositivo y, si está activo, en tu iCloud privado. Juntos utiliza una cuenta SIGUE y procesa el progreso que eliges compartir. Si conectas tu cuenta con ChatGPT y concedes permisos de consulta, SIGUE envía al servidor una copia temporal y limitada de los datos necesarios para responder a esas consultas. Los registros originales permanecen en tu dispositivo.

### Cuenta SIGUE — actualizar la primera parte de la sección 5

La cuenta SIGUE permite utilizar funciones opcionales como Juntos y la conexión con ChatGPT. Según los métodos habilitados, puedes acceder con Apple, Google o correo y contraseña. Se tratan los identificadores del proveedor, el correo cuando corresponde, las credenciales protegidas, las sesiones de acceso y los datos de perfil que configuras, como nombre visible y foto. Los correos de verificación y recuperación se utilizan para gestionar el acceso a tu cuenta.

En Juntos se procesan los grupos, desafíos, invitaciones y el progreso que eliges compartir. Quienes participan pueden ver tu perfil visible y el progreso compartido según la función. Vincular un hábito o una métrica a un desafío puede permitir que SIGUE actualice ese progreso automáticamente; esta vinculación debe poder revisarse y retirarse desde la aplicación. No equivale a compartir todo tu historial personal.

### Conexión opcional con ChatGPT — añadir sección específica

La conexión requiere una cuenta SIGUE existente y tu autorización. Antes de concederla puedes revisar los permisos solicitados y cancelar. Los permisos permiten identificar la cuenta, consultar hábitos y progreso, planes de Rutina y resúmenes de sesiones terminadas, o preparar cambios de hábitos y Rutina, según lo que autorices.

Las consultas utilizan copias temporales del último envío de SIGUE, no una lectura en directo del iPhone. El alcance contempla hábitos y resultados diarios del último año, planes activos, sus ocurrencias de los últimos 90 días y los próximos 30 días, y sesiones terminadas de los últimos 90 días. Los resúmenes de sesión pueden incluir duración, pasos, distancia, velocidades, desnivel, esfuerzo y ejercicios, series y pesos de gimnasio cuando estén disponibles. No se incluyen notas, rutas GPS, frecuencia cardíaca ni muestras detalladas de Apple Salud.

Las copias de consulta vencen a los siete días y se eliminan al revocar la conexión. Los cambios solicitados desde ChatGPT quedan pendientes hasta que SIGUE los valida y aplica en el iPhone; pueden rechazarse o vencer. ChatGPT no puede crear ni iniciar sesiones de movimiento.

Puedes revocar la conexión desde SIGUE. Esto impide nuevos accesos con esa autorización y elimina las copias de consulta de SIGUE, pero no debe interpretarse como borrado de información que ya se haya incorporado a una conversación de ChatGPT. Antes de aprobar esta sección deben revisarse y enlazarse las condiciones y la política de privacidad vigentes del proveedor de ChatGPT.

### Sitio web — ampliar la sección 7

holasigue.com no utiliza cookies publicitarias ni herramientas de analítica de terceros. El sitio carga la fuente Figtree desde Google Fonts, lo que requiere conexiones con Google. Cuando se ofrece el acceso con Google o Apple, la pantalla de conexión carga los servicios del proveedor correspondiente para verificar tu identidad. La autorización utiliza cookies técnicas de sesión y el sitio puede guardar tu preferencia de idioma en el navegador. Los proveedores de alojamiento y acceso pueden procesar datos técnicos necesarios, como dirección IP, información del navegador y registros de seguridad.

### Eliminación y control — sustituir el primer párrafo de la sección 8

Puedes solicitar la eliminación de tu cuenta desde la sección de cuenta de SIGUE. Si administras grupos o desafíos, tendrás que resolver su transferencia o eliminación. Para cuentas vinculadas a Apple, el proceso requiere revocar la credencial de Apple; si esa operación falla, la eliminación puede no completarse y deberás reintentar. Cuando la solicitud termina correctamente, se eliminan la cuenta y los registros relacionados, incluida la foto de perfil. Esto no elimina los originales guardados en el dispositivo, tu iCloud privado ni Apple Salud. Si no puedes acceder a la app, escribe a privacidad@holasigue.com.

## Proposed English text

### Summary — replace existing text

SIGUE’s personal features can be used without an account and store your records on your device and, if enabled, in your private iCloud. Juntos uses a SIGUE account and processes the progress you choose to share. If you connect your account to ChatGPT and grant read permissions, SIGUE sends a temporary, limited copy of the data needed to answer those queries to its server. Original records remain on your device.

### SIGUE account — update the first part of section 5

A SIGUE account provides access to optional features such as Juntos and the ChatGPT connection. Depending on the enabled methods, you can sign in with Apple, Google, or email and password. The service processes provider identifiers, email where applicable, protected credentials, access sessions, and profile information you configure, such as your display name and photo. Verification and recovery emails are used to manage account access.

Juntos processes groups, challenges, invitations, and the progress you choose to share. Participants can see your visible profile and shared progress according to the feature. Linking a habit or metric to a challenge may allow SIGUE to update that progress automatically; this link must be reviewable and removable in the app. It does not share your entire personal history.

### Optional ChatGPT connection — add a dedicated section

The connection requires an existing SIGUE account and your authorization. You can review the requested permissions and cancel before granting access. Depending on your authorization, permissions allow identification of the account, reading habits and progress, Routine plans and completed-session summaries, or preparing habit and Routine changes.

Queries use temporary copies of SIGUE’s latest upload rather than live access to your iPhone. Coverage includes habits and daily results from the last year, active plans and their occurrences from the previous 90 days and next 30 days, and sessions completed in the previous 90 days. Session summaries may include duration, steps, distance, speeds, elevation change, effort, and gym exercises, sets, and weights where available. Notes, GPS routes, heart rate, and detailed Apple Health samples are excluded.

Read copies expire after seven days and are deleted when you revoke the connection. Changes requested through ChatGPT remain pending until SIGUE validates and applies them on your iPhone; they may be rejected or expire. ChatGPT cannot create or start movement sessions.

You can revoke the connection in SIGUE. This prevents further access using that authorization and deletes SIGUE’s read copies, but should not be understood as deleting information already included in a ChatGPT conversation. Before this section is approved, the ChatGPT provider’s current terms and privacy policy must be reviewed and linked.

### Website — expand section 7

holasigue.com does not use advertising cookies or third-party analytics tools. The site loads Figtree from Google Fonts, which requires connections to Google. When Google or Apple sign-in is offered, the connection screen loads the corresponding provider’s services to verify your identity. Authorization uses technical session cookies, and the site may store your language preference in your browser. Hosting and sign-in providers may process necessary technical data, such as IP addresses, browser information, and security logs.

### Deletion and control — replace the first paragraph of section 8

You can request account deletion from SIGUE’s account section. If you manage groups or challenges, you must resolve their transfer or deletion. For accounts linked to Apple, deletion requires revoking the Apple credential; if that operation fails, deletion may not complete and you will need to retry. Once the request completes successfully, the account and related records, including the profile photo, are deleted. This does not delete original records on your device, in your private iCloud, or in Apple Health. If you cannot access the app, email privacidad@holasigue.com.

## Antes de aprobar y publicar

Confirmar el alcance de la versión distribuida, proveedores y regiones reales, plazos de conservación y copias de seguridad, datos derivados de Salud en CloudKit/Juntos, información legal del responsable y derechos por territorio. Conservar los pendientes jurídicos del borrador anterior. No sustituir una región publicada por otra sin evidencia de producción.

Fuentes locales inspeccionadas:

- `connect/connect.js`: permisos, métodos de acceso, idiomas y carga condicional de proveedores.
- `js/language.js`: preferencia de idioma del navegador.
- `../backend/src/oauth/mount-oauth.ts`: acceso de cuenta existente, consentimiento y borrado de copias al revocar.
- `../backend/src/modules/auth/account-deletion.service.ts`: revocación de Apple antes del borrado y resolución de titularidad de grupos/desafíos.
- `../backend/src/modules/users/remote-actions.service.ts`: acciones pendientes y vencimiento.
- `../backend/CHATGPT_OAUTH.md` y `../sigue-app/sigue-app/Data/Social/ChatGPTReadSync.swift`: alcance de copias, exclusiones y sincronización.

Validación manual recomendada: revisar escritorio y móvil en ES/EN; recorrer login, recuperación, consentimiento y cancelación con una autorización real de ChatGPT; comprobar enlaces e índice de privacidad. No se ejecutó ese recorrido en esta revisión.
