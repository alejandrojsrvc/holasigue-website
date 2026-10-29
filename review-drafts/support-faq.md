# SIGUE — Soporte y preguntas frecuentes (borrador bilingüe)

**Estado: contenido propuesto para revisión de producto. No sustituye ni actualiza las páginas públicas de soporte.**

## Español

### ¿Qué ofrece hoy la app pública?

La ficha actual de App Store describe registros de alimentación, movimiento y descanso, integración opcional con Apple Salud y vistas de Evolución. SIGUE es una herramienta de bienestar general, no una app médica.

### ¿Necesito cuenta?

La versión pública consultada no requiere una cuenta para las funciones personales. El backend y el código de SIGUE 2.0 tienen acceso mediante Apple, Google y correo con contraseña y código de verificación para las futuras funciones sociales. Confirmar la experiencia final y si los tres proveedores se ofrecerán al lanzar Juntos.

### ¿Ya están Rutina, Juntos o Retos Guiados?

Rutina y Juntos están en el código de SIGUE 2.0 pero no aparecen en la versión pública de App Store consultada. Retos Guiados personales siguen en prototipo. Publicar respuestas nuevas cuando se confirme la versión de lanzamiento.

### ¿Qué sucede si conecto Apple Salud?

La app puede leer categorías compatibles con el permiso de iOS. El acceso es opcional y se puede cambiar en Ajustes/Salud. Está pendiente confirmar la política final sobre resúmenes derivados, CloudKit y la opción de compartirlos en Juntos.

### ¿Cómo borro Juntos?

El backend implementa `DELETE /v1/me`. La interfaz y el texto final deben explicar la revocación de Apple, las opciones para grupos que administra la persona, qué datos locales/iCloud no se borran y los plazos aún por confirmar de las copias de seguridad. Confirmar el flujo en una compilación distribuible antes de publicar instrucciones paso a paso.

### Contacto

Soporte: `soporte@holasigue.com`. Privacidad: `privacidad@holasigue.com`. Confirmar que ambos correos están activos y asignados antes de publicar.

## English

### What does the public app offer today?

The current App Store listing describes meal, movement, and rest records, optional Apple Health integration, and Evolution views. SIGUE is a general wellbeing tool, not a medical app.

### Do I need an account?

The public version checked does not require an account for personal features. The backend and SIGUE 2.0 source support Apple, Google, and email/password with a verification code for upcoming social features. Confirm the final sign-in experience and whether all three providers will be offered when Juntos launches.

### Are Routine, Juntos, or Guided Challenges available?

Routine and Juntos are in SIGUE 2.0 source code but do not appear in the public App Store version checked. Personal Guided Challenges remain a prototype. Publish updated answers after the release version is confirmed.

### What happens when I connect Apple Health?

The app can read supported categories with iOS permission. Access is optional and can be changed in Health settings. The final policy for derived summaries, CloudKit, and sharing those values in Juntos is still under review.

### How do I delete Juntos?

The backend implements `DELETE /v1/me`. Final support instructions should explain Apple revocation, choices for groups the person manages, which local/iCloud data are not deleted, and backup retention periods that remain unconfirmed. Verify this flow in a distributable build before publishing step-by-step instructions.

### Contact

Support: `soporte@holasigue.com`. Privacy: `privacidad@holasigue.com`. Confirm that both inboxes are active and monitored before publication.
