# SIGUE — Aviso de datos de salud y bienestar (borrador bilingüe)

**Estado: borrador para revisión de producto, Apple y asesoría legal. No publicar.**

## Español

SIGUE puede leer categorías compatibles de Apple Salud cuando la persona autoriza el acceso en iOS. En el código consultado son datos de pasos, distancia, tiempo de ejercicio, sueño, entrenamientos y ciertas métricas de sesiones. SIGUE solicita acceso de lectura y no escribe muestras en Apple Salud. Los permisos pueden gestionarse en iOS.

Los valores derivados se muestran en funciones personales y se almacenan localmente. El esquema CloudKit privado incluye resúmenes diarios derivados (por ejemplo, pasos, distancias, ejercicio y sueño) y sesiones que pueden contener calorías, frecuencia cardíaca y datos de origen HealthKit. Esto entra en tensión con la guía de App Review que indica que la información de salud personal no puede almacenarse en iCloud. Debe decidirse si se elimina ese contenido de sincronización antes del lanzamiento; esta publicación no puede describirlo como resuelto.

En el código de Juntos, al vincular voluntariamente un registro a un desafío pueden sincronizarse valores agregados elegidos, incluidos pasos cuya fuente puede ser HealthKit. Las muestras originales de Salud no se envían. Un valor derivado sigue siendo información obtenida de HealthKit: debe revisarse si el servicio, el consentimiento expreso, la minimización y el control de desconexión cumplen las condiciones de Apple. No usar esta función en una campaña pública hasta cerrar esa revisión.

SIGUE es una herramienta de bienestar general, no un servicio médico. Sus registros, tendencias y sugerencias no diagnostican, tratan ni previenen enfermedades ni reemplazan atención profesional.

**Pendiente:** confirmar versión distribuida, datos precisos y permisos efectivos, sync de CloudKit, origen de métricas en Juntos, control de desconexión, borrado, y texto de consentimiento antes de enviar cualquier métrica derivada.

## English

SIGUE may read supported Apple Health categories when the user grants access in iOS. The reviewed code queries steps, distance, exercise time, sleep, workouts, and certain session metrics. SIGUE requests read access and does not write samples to Apple Health. Permissions can be managed in iOS.

Derived values appear in personal features and are stored locally. The private CloudKit schema includes derived daily summaries (such as steps, distances, exercise, and sleep) and sessions that may contain calories, heart rate, and HealthKit provenance. This conflicts with App Review guidance that personal health information may not be stored in iCloud. Decide whether to remove this synchronized content before release; this notice cannot describe the issue as resolved.

In Juntos source, when a person voluntarily links a record to a challenge, selected aggregate values may sync, including steps that can come from HealthKit. Original Health samples are not sent. A derived value remains information gained through HealthKit; Apple requirements for the service, express consent, minimization, and disconnect controls need review. Do not promote this flow until that review is complete.

SIGUE is a general wellbeing tool, not a medical service. Its records, trends, and suggestions do not diagnose, treat, or prevent disease and do not replace professional care.

**Pending:** confirm distributed build, exact data and permissions, CloudKit sync, Juntos metric sources, disconnect control, deletion, and consent language before any HealthKit-derived metric is sent.
