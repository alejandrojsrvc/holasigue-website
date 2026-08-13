# holasigue.com

Landing estática oficial de SIGUE. No requiere compilación, dependencias, cookies ni backend.

## Vista local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

## Publicación con Vercel

El repositorio se despliega como sitio estático, sin comando de build ni directorio de salida. En Vercel:

1. Importar el repositorio de GitHub `holasigue-website`.
2. Seleccionar `Other` como framework.
3. Dejar vacíos Build Command y Output Directory.
4. Conectar `holasigue.com` y redirigir `www.holasigue.com` al dominio principal.

Antes de anunciarlo:

1. Configurar `hola@holasigue.com`, `soporte@holasigue.com` y `privacidad@holasigue.com`.
2. Validar los datos estructurados con Rich Results Test.
3. Registrar el dominio en Google Search Console.
4. Enviar `https://holasigue.com/sitemap.xml`.
5. Sustituir los enlaces `mailto:` de descarga por la URL real de App Store cuando exista.
6. Añadir capturas definitivas del producto cuando estén aprobadas.

Los títulos, descripciones y canonicales están definidos por página. Si cambian las rutas durante el despliegue, deben actualizarse también en `sitemap.xml`.
