# SIGUE — Términos de uso (borrador bilingüe)

**Estado: borrador para revisión jurídica y aprobación del prestador. No publicar ni sustituir `/terminos` o `/en/terms`.**

## Español

### Prestador y aceptación

SIGUE es una aplicación de bienestar para iPhone y el servicio asociado Juntos. **Completar antes de aprobar:** nombre legal del prestador, domicilio de contacto cuando sea exigible, identificación fiscal cuando sea exigible, correo de contacto operativo, edad mínima, territorio y fecha de entrada en vigor. La nacionalidad no determina por sí sola la jurisdicción contractual. El borrador mantiene Argentina como ley base, sujeto a derechos obligatorios de consumidores de su lugar de residencia.

### Disponibilidad del servicio

La versión pública de App Store comprobada el 11 de octubre de 2026 es la 1.0. Hoy, los registros de alimentación, movimiento y descanso, y Evolución constan en su ficha. Rutina y Juntos aparecen en el código en desarrollo de SIGUE 2.0, pero no en la versión pública observada. Retos Guiados personales continúan como prototipo. No se promete fecha de disponibilidad.

### Uso, salud y contenido

SIGUE ofrece herramientas generales de bienestar y no sustituye consejo profesional. La persona conserva sus derechos sobre el contenido que crea. Las reglas para alojar y mostrar datos compartidos en Juntos solo entrarán en vigor cuando ese servicio se habilite, y deberán definir licencias, moderación, reportes, seguridad y responsabilidad.

### Premium, compras y suscripciones

El código incluye planes Premium procesados mediante Apple. Si se ofrece una compra, antes de confirmar deberán mostrarse precio, moneda, duración y condiciones de renovación que publique la tienda. Apple gestiona cobro, renovación, cancelación y solicitudes de reembolso para compras hechas en App Store. Eliminar la app o la cuenta SIGUE no cancela por sí solo una suscripción. Confirmar qué funciones, territorios, planes y condiciones están activados en producción antes de describirlos como una oferta disponible.

### Acceso fundador

No publicar por ahora “Premium de por vida para los próximos 15 usuarios”. El texto anterior hablaba de 15 grupos; el backend actual implementa un plan `FOUNDING` de Premium de cuenta sin vencimiento y una cuota nominal de 15. El código también contiene una migración que puede conceder ese plan a las cuentas existentes; la cuota real, ejecución en producción, elegibilidad, verificación de correo, duplicidad de identidades y restauración no se comprobaron en la base productiva. La identidad beneficiaria es la cuenta backend; borrar esa cuenta puede borrar su entitlement. Definir y probar asignación atómica, qué significa “nuevo usuario”, reclamación, restauración, soporte y alcance exacto del plan antes de anunciarlo.

### Cierre de cuenta y ley

El backend ofrece una solicitud de eliminación para Juntos. La operación puede depender de revocar credenciales de Apple y de elegir cómo resolver grupos administrados. No elimina registros locales ni la copia iCloud de la persona y no cancela compras Apple. Confirmar qué datos quedan en respaldos y por cuánto tiempo.

Estos términos se proponen bajo leyes de la República Argentina, sin limitar derechos obligatorios que puedan corresponder a consumidores según su lugar de residencia. La validez y redacción final deben ser revisadas por asesoría jurídica local y para cada mercado.

## English

### Provider and acceptance

SIGUE is an iPhone wellbeing app and the associated Juntos service. **Complete before approval:** provider’s legal name, contact address where required, tax identifier where required, working contact email, minimum age, territory, and effective date. Nationality alone does not determine the contract’s jurisdiction. This draft uses Argentine law as its base, subject to mandatory consumer rights in the user’s place of residence.

### Service availability

The public App Store version checked on October 11, 2026 is 1.0. Today, meal, movement, and rest records, and Evolution appear in its listing. Routine and Juntos are in SIGUE 2.0 source code but not in the observed public version. Personal Guided Challenges remain a prototype. No release date is promised.

### Use, health, and content

SIGUE offers general wellbeing tools and does not replace professional advice. Users retain their rights in content they create. Rules for hosting and displaying shared Juntos data should take effect only when that service is enabled and must define licenses, moderation, reporting, security, and responsibility.

### Premium, purchases, and subscriptions

The code includes Premium plans processed through Apple. If a purchase is offered, the store’s price, currency, duration, and renewal terms must be shown before confirmation. Apple manages billing, renewal, cancellation, and refund requests for App Store purchases. Deleting the app or SIGUE account does not itself cancel a subscription. Confirm which features, territories, plans, and terms are enabled in production before describing them as an available offer.

### Founding access

Do not publish “lifetime Premium for the next 15 users” yet. Earlier wording described 15 groups; current backend code implements a non-expiring account-level `FOUNDING` Premium plan and a nominal quota of 15. Code also includes a migration that may grant the plan to existing accounts; the actual production quota, migration status, eligibility, email verification, duplicate identities, and restoration have not been verified in the production database. The beneficiary is a backend account; deleting that account may delete its entitlement. Define and test atomic assignment, who counts as a “new user,” claim flow, restoration, support, and the exact included plan before promotion.

### Account closure and governing law

The backend provides a Juntos account deletion request. Completion may depend on Apple credential revocation and a choice for groups managed by the account. It does not delete personal local records or the user’s iCloud copy and does not cancel Apple purchases. Confirm which data remain in backups and for how long.

These terms are proposed under the laws of Argentina, without limiting mandatory consumer rights that may apply where the user resides. Local counsel should review the final wording for each market.
