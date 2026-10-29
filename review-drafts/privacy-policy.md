# SIGUE — Política de privacidad (borrador bilingüe)

**Estado: documento de trabajo para aprobación técnica y jurídica. No publicar.**
Preparado: 11 de octubre de 2026. No es una fecha de entrada en vigor.

Este borrador describe el código que se revisó para SIGUE 2.0. La versión pública observada en App Store es la 1.0 y todavía no acredita Rutina, Juntos ni los métodos de autenticación de SIGUE 2.0.

## Español

### Responsable y alcance

SIGUE es una aplicación de bienestar para iPhone. Las funciones personales pueden utilizarse sin crear una cuenta SIGUE. Juntos es un servicio social opcional previsto para SIGUE 2.0. **Antes de publicar:** confirmar la identidad legal del responsable, domicilio de contacto, correo operativo, territorios de disponibilidad y fecha de vigencia. No se incluyen aquí domicilios, identificación fiscal ni bases jurídicas no verificadas.

### Información tratada en el dispositivo

El código guarda localmente hábitos, preferencias, registros de alimentación y descanso, actividad física, sesiones, rutinas, calendarios seleccionados, estadísticas derivadas y ajustes de la app. Si una persona inicia una sesión que usa GPS, se registra la ruta durante esa sesión; el código excluye la carpeta de rutas de las copias de seguridad del dispositivo. La lectura de Apple Salud es opcional y de solo lectura; los tipos consultados incluyen pasos, distancias, tiempo de ejercicio, sueño, entrenamientos y algunas métricas de actividad.

La app incorpora SwiftData con opción local y opción de base privada CloudKit. El esquema sincronizado contiene entidades de hábitos, Rutina, sesiones y resúmenes diarios derivados de Apple Salud. **Este tratamiento requiere una decisión técnica y revisión de Apple antes de sostener que los datos de salud permanecen solo en el dispositivo o que su sincronización con iCloud es admisible.** Confirmar qué modelos se sincronizan en la versión que se distribuirá y cómo se migrará cualquier registro.

Los eventos de calendario se consultan con permiso y se copian a la experiencia de Rutina. La integración de calendario de Google también aparece en el código. Confirmar si esa integración y Rutina forman parte de la versión que se lanzará.

### Cuenta y servicio Juntos

El backend revisado implementa autenticación con Apple, Google y correo electrónico con contraseña y verificación por código. La cuenta puede incluir identificadores del proveedor, dirección de correo, credencial protegida, perfil visible y foto, sesiones de acceso, grupos, membresías, invitaciones, retos de grupo, fechas y valores de check-in, reacciones, ánimos, preferencias y tokens de notificaciones.

Cuando una persona vincula expresamente un hábito o una métrica a un desafío, el cliente puede enviar automáticamente a Juntos los valores posteriores de ese progreso. El código incluye pasos derivados de Apple Salud como posible fuente, además de registros manuales, duración y distancia de sesiones. No se envían las muestras originales de HealthKit ni los identificadores locales de hábitos. **La divulgación de valores derivados de HealthKit y el mecanismo para desconectar/suspender ese envío requieren confirmación y revisión de Apple.**

### Proveedores y destinatarios

El código integra servicios de Apple (autenticación, HealthKit, iCloud/CloudKit, compras, notificaciones y revocación de credenciales), Google (identidad y calendario), Resend (correo de verificación/recuperación) y Cloudflare R2 (fotos de perfil). El backend utiliza PostgreSQL. La entidad que opera la base, región del servidor, región del bucket, encargados adicionales, registros operativos y ubicación de copias de seguridad no se verificaron en el código.

**Antes de publicar:** confirmar proveedores activos en producción, contratos, ubicaciones, transferencias internacionales, subencargados y períodos de retención. No afirmar que los servidores están en Estados Unidos hasta verificar la configuración de producción.

### Conservación y eliminación

Los datos personales locales y su posible copia privada en iCloud no se eliminan al borrar la cuenta SIGUE ni al desinstalar la app. Las muestras de Apple Salud se administran desde Apple Salud. El código del servidor implementa `DELETE /v1/me`: intenta revocar la credencial de Apple y, si el proceso termina correctamente, elimina los registros de cuenta relacionados y la foto; la operación puede transferir o borrar grupos administrados por esa cuenta. Si falla la revocación de Apple, la solicitud no completa el borrado. El endpoint no borra datos personales almacenados en CloudKit.

El plazo de retención en copias de seguridad, logs, correos, datos fiscales y otros registros que deban conservarse no está confirmado. **Definir esos plazos y el procedimiento de eliminación completa antes de publicar.**

### Derechos, fundamento y contacto

La normativa y los derechos aplicables dependen de la residencia de cada persona. **Completar bases jurídicas por finalidad, derechos aplicables, mecanismo de reclamación, identidad y contacto del responsable, y transferencias internacionales luego de revisión jurídica.** Contactos actualmente publicados en el sitio: `privacidad@holasigue.com` y `soporte@holasigue.com`; confirmar que reciben y gestionan estas solicitudes.

### Pendientes que bloquean publicación

1. Resolver el almacenamiento de datos derivados de HealthKit en CloudKit y compartirlos con Juntos; documentar consentimiento y revocación.
2. Confirmar proveedores y regiones de producción, incluidos respaldos, R2, PostgreSQL, correo y logs.
3. Definir conservación y eliminación de copias de seguridad y datos locales/iCloud.
4. Completar responsable, bases jurídicas, derechos, edad mínima y canales de reclamación por territorio.
5. Alinear el texto con la compilación efectivamente distribuida y la declaración App Privacy de App Store Connect.

## English

### Controller and scope

SIGUE is an iPhone wellbeing app. Personal features can be used without a SIGUE account. Juntos is an optional social service planned for SIGUE 2.0. **Before publication:** confirm the controller’s legal identity, contact address, working email, countries of availability, and effective date. This draft does not invent a postal address, tax number, or legal bases.

### Information handled on the device

The code stores habits, preferences, meal and rest records, physical activity, sessions, routines, selected calendar data, derived statistics, and app settings locally. When someone starts a GPS-enabled session, the route is recorded for that session; the code excludes the route folder from device backups. Apple Health access is optional and read-only. Queried types include steps, distances, exercise time, sleep, workouts, and some activity metrics.

The app supports SwiftData in local-only mode and a private CloudKit database. Its synchronized schema includes habit, Routine, session, and daily-summary entities derived from Apple Health. **This needs a technical decision and Apple review before claiming health data stays only on the device or that its iCloud synchronization is permitted.** Confirm which models sync in the release build and how existing records will be handled.

Calendar events are read with permission and copied into Routine. Google Calendar integration is also present in source. Confirm whether these integrations and Routine will ship.

### Account and Juntos service

The reviewed backend implements Apple, Google, and email/password authentication with verification codes. An account may include provider identifiers, email address, protected credentials, display profile and photo, access sessions, groups, memberships, invitations, group challenges, check-in dates and values, reactions, nudges, preferences, and notification tokens.

When someone explicitly links a habit or metric to a challenge, the client may automatically send later progress values to Juntos. The code includes Apple Health-derived steps as a possible source, along with manual records and session duration or distance. Original HealthKit samples and local habit identifiers are not sent. **Sharing HealthKit-derived values and how a user stops that flow need confirmation and Apple review.**

### Providers and recipients

The code integrates Apple services (sign-in, HealthKit, iCloud/CloudKit, purchases, notifications, and credential revocation), Google (identity and calendar), Resend (verification/recovery email), and Cloudflare R2 (profile photos). The backend uses PostgreSQL. The production database operator, server region, bucket region, additional processors, operational logs, and backup locations have not been verified from code.

**Before publication:** confirm production vendors, contracts, locations, international transfers, sub-processors, and retention periods. Do not state that servers are in the United States until the production configuration has been checked.

### Retention and deletion

Personal data on the device and a possible private iCloud copy are not deleted when a SIGUE account is deleted or the app is uninstalled. Apple Health samples are managed in Apple Health. Server code implements `DELETE /v1/me`: it attempts to revoke the Apple credential and, when the operation succeeds, deletes related account records and the profile photo; it may transfer or delete groups managed by the account. If Apple revocation fails, the deletion request does not complete. The endpoint does not delete personal data stored in CloudKit.

Retention periods for backups, logs, email, tax records, or other records that may need to be kept are unconfirmed. **Define those periods and the complete deletion workflow before publication.**

### Rights, legal bases, and contact

Applicable law and rights depend on each person’s residence. **Complete legal bases by purpose, applicable rights, complaint channel, controller identity/contact, and international-transfer details after legal review.** Current website contacts are `privacidad@holasigue.com` and `soporte@holasigue.com`; confirm that these inboxes receive and handle such requests.

### Publication blockers

1. Resolve HealthKit-derived data in CloudKit and sharing with Juntos; document consent and revocation.
2. Confirm production vendors and regions, including backups, R2, PostgreSQL, email, and logs.
3. Define backup retention and deletion across local/iCloud data.
4. Complete controller details, legal bases, rights, minimum age, and complaint channels by territory.
5. Align this notice with the build actually distributed and App Store Connect App Privacy disclosures.
