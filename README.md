# holasigue.com

Landing estática oficial de SIGUE. No requiere compilación, dependencias ni cookies. El preview de invitaciones consulta la API mediante el proxy same-origin del servidor.

## Vista local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

## Publicación

El sitio es estático y puede servirse desde Apache o desde la imagen Docker incluida. Para Apache, el DocumentRoot debe apuntar a la raíz del repositorio y permitir reglas `.htaccess` (`AllowOverride FileInfo`). El archivo `.htaccess` resuelve rutas limpias como `/privacidad` y `/soporte/`, redirige enlaces antiguos `.html`, conserva `/` como inicio y sirve las invitaciones `/join/<token>`. Nginx aplica las mismas rutas desde `nginx/default.conf`.

La ruta same-origin `/api/invitations/<token>/preview` se proxifica a `GET /v1/invitations/<token>` en la API para no habilitar CORS. Apache necesita tener activos `mod_rewrite`, `mod_proxy` y `mod_proxy_http`. El AASA se sirve directamente desde `.well-known/apple-app-site-association` con Content-Type JSON y sin redirect.

La imagen Docker conserva Nginx y su configuración en `nginx/default.conf`; allí están implementadas las mismas rutas, el proxy al preview y la redacción del token en el access log del contenedor. Los logs del proxy público que está delante del sitio deben revisarse por separado.

Antes de anunciarlo:

1. Configurar `hola@holasigue.com`, `soporte@holasigue.com` y `privacidad@holasigue.com`.
2. Validar los datos estructurados con Rich Results Test.
3. Registrar el dominio en Google Search Console.
4. Enviar `https://holasigue.com/sitemap.xml`.
5. Sustituir los enlaces `mailto:` de descarga por la URL real de App Store cuando exista.
6. Añadir capturas definitivas del producto cuando estén aprobadas.

Los títulos, descripciones y canonicales están definidos por página. Si cambian las rutas durante el despliegue, deben actualizarse también en `sitemap.xml`.


## Invitaciones y Universal Links

La ruta `/join/<token>` muestra un preview público mínimo y consulta la API mediante la ruta same-origin `/api/invitations/<token>/preview`. Apache y Nginx proxifican esa ruta hacia la API, sin abrir CORS en la API; Nginx usa el servicio privado `sigue-api-umbs8w:3000`. El preview no se cachea. Nginx registra los paths de invitación con el token redactado; los access logs del proxy externo también deben configurarse para no guardar el token.

El AASA está en `.well-known/apple-app-site-association`, asociado únicamente a `86SK6M98QS.com.holasigue.com` y `/join/*`. Debe servirse en `https://holasigue.com/.well-known/apple-app-site-association` con HTTPS, 200, `application/json` y sin redirect.

El botón de descarga usa el enlace TestFlight ya publicado en el sitio. Cuando SIGUE tenga ficha pública de App Store, sustituir ese enlace por la URL oficial verificada. No se implementa deferred deep link: después de instalar, la persona vuelve al mensaje original y toca el enlace otra vez.
