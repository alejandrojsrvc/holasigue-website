# Publicación de las correcciones de seguridad web

Estos archivos preparan el ajuste de infraestructura; no se aplican automáticamente
al construir o publicar la imagen web.

## Orden de aplicación en sigue-vps

1. Copiar `deploy/caddy-invitations.caddy` a
   `/opt/sigue/infra/caddy/caddy-invitations.caddy`.
2. Dentro del bloque `holasigue.com` de
   `/opt/sigue/infra/caddy/Caddyfile`, añadir esta línea antes del
   `reverse_proxy web:80` existente:

   ```caddyfile
   import /etc/caddy/caddy-invitations.caddy
   ```

3. Validar y recargar Caddy antes de publicar la nueva imagen web. Esta ruta
   funciona también con la imagen web anterior. No se deben modificar los bloques
   de `api.holasigue.com`, del webhook ni sus credenciales.
4. Publicar la imagen web con el Dockerfile y la configuración Nginx actualizados.

La nueva imagen web devuelve 404 en `/api/`: si se publica sin el ajuste previo de
Caddy, las vistas de invitaciones dejarán de cargar.

## Motivo del cambio

La ruta pública exacta `GET/HEAD /api/invitations/<token de 43 caracteres>/preview`
se reescribe a `/v1/invitations/<token>` y se dirige exclusivamente a `api:3000`.
Caddy elimina las cabeceras de IP proporcionadas por clientes no confiables y
construye `X-Forwarded-For` con la IP real de la conexión. La API ya confía en la
IP de Caddy; así aplica su límite por visitante sin añadir confianza al contenedor
web ni a toda la red Docker. Se eliminan las cookies, la autorización y el query
string del preview. Otros métodos y rutas `/api/` no se publican.

Mantener la IP real de Caddy en `TRUSTED_PROXY_CIDRS` es un requisito de la
infraestructura. Revisar esa correspondencia si se recrea la red o cambia la IP
del proxy; no ampliar el valor a redes enteras para resolver una discrepancia.

## Validaciones manuales recomendadas

- Antes de recargar, ejecutar en la VPS:
  `docker exec sigue-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile`.
- Antes de publicar, comprobar la configuración Nginx en la imagen candidata con
  `nginx -t`; no es una comprobación de la imagen antigua en ejecución.
- Tras publicar, comprobar `404` para `/Dockerfile`, `/nginx/default.conf`,
  `/.htaccess`, `/tests/connect-apple.test.cjs`, `/.env` y `/.git/HEAD`.
- Comprobar las cabeceras de seguridad en `/`, `/es`, `/en`, `/connect/`,
  `/soporte`, una respuesta `404` y `/.well-known/apple-app-site-association`.
- Comprobar que el AASA sigue siendo JSON y que `/` continúa seleccionando idioma.
- Abrir una invitación válida y comparar los contadores de límite desde dos
  conexiones públicas distintas. No agotar los límites de usuarios reales.
  Cambiar una cabecera `X-Forwarded-For` manualmente no debe cambiar el contador
  asignado a la conexión.
- Comprobar Apple/Google y el consentimiento OAuth, la apertura de correo en
  soporte y Analytics con consentimiento, sin errores de CSP en el navegador.

La CSP permite los scripts propios, los orígenes concretos de los proveedores y
los hashes de los tres bloques inline existentes (selector de idioma y JSON-LD).
Si se editan esos bloques, hay que actualizar sus hashes tanto en
`nginx/security-headers.conf` como en `.htaccess`. Los estilos inline existentes
se conservan; los scripts inline arbitrarios no se permiten.

Para revertir: restaurar primero la imagen web anterior y después retirar el
import de Caddy. Así el proxy anterior vuelve a atender las invitaciones durante
la reversión.
