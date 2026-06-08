# Almacenamiento de imágenes en Amazon S3

El catálogo sirve las fotos de producto desde un bucket de S3 público. Mientras
no esté configurado (o falte una imagen), cada foto cae a una URL de fallback
(Unsplash), así el sitio nunca queda con imágenes rotas.

- Bucket: `lvsm-847008501986-us-east-1-an`
- Región: `us-east-1`
- Resolución de URLs: [`src/lib/images.ts`](../src/lib/images.ts)

La app arma cada URL como:

```
https://<VITE_S3_BUCKET>.s3.<VITE_S3_REGION>.amazonaws.com/<key>
```

## 1. Hacer el bucket de lectura pública

1. En el bucket → **Permisos** → **Bloquear acceso público**: desactivar el
   bloqueo para *políticas de bucket* (dejar el resto según tu política de
   seguridad).
2. **Permisos** → **Política del bucket**: pegar (ya con el nombre del bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadCatalog",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lvsm-847008501986-us-east-1-an/*"
    }
  ]
}
```

> Las etiquetas `<img>` no necesitan CORS. Solo hace falta CORS si en el futuro
> se leen las imágenes por `fetch`/`canvas`.

## 2. Subir las imágenes con esta estructura de keys

Cada producto espera sus fotos en `catalogo/<slug>/`:

| Producto (slug) | Keys |
| --- | --- |
| `louis-vuitton-neverfull-mm-monogram` | `catalogo/louis-vuitton-neverfull-mm-monogram/1.jpg`, `2.jpg`, `detalle.jpg` |
| `gucci-gg-marmont-small-shoulder` | `catalogo/gucci-gg-marmont-small-shoulder/1.jpg`, `2.jpg`, `detalle.jpg` |
| `chanel-classic-flap-bag` | `catalogo/chanel-classic-flap-bag/1.jpg`, `2.jpg`, `detalle.jpg` |
| `louis-vuitton-speedy-30-damier-ebene` | `catalogo/louis-vuitton-speedy-30-damier-ebene/1.jpg`, `2.jpg`, `detalle.jpg` |

(Los keys exactos viven en `src/data/products.ts`, campo `storageKey`.)

## 3. Configurar las variables de entorno

Copiar `.env.example` a `.env.local` y dejar:

```
VITE_S3_BUCKET="lvsm-847008501986-us-east-1-an"
VITE_S3_REGION="us-east-1"
```

En Vercel: cargar esas mismas variables en *Project Settings → Environment
Variables* y volver a desplegar.

> Configurar el env **después** de subir las imágenes. Si el bucket está vacío
> y el env está seteado, las URLs de S3 darían 404 (no hay fallback cuando el
> `storageKey` resuelve a S3).

## 4. (Opcional) CloudFront / dominio propio

Para servir vía CDN, setear `VITE_IMAGE_BASE_URL="https://cdn.tudominio.com"`;
tiene prioridad sobre la URL nativa de S3.

## Subida desde el panel Admin (URLs prefirmadas)

El Admin (`/admin` → sección **Imágenes**) permite subir las fotos de cada pieza
directo a S3. El navegador nunca ve las credenciales AWS:

1. El cliente pide una URL prefirmada a `POST /api/uploads/presign`
   (`{ key, contentType }`).
2. El servidor valida el key y el tipo, firma con las credenciales y devuelve la
   URL (válida 5 min).
3. El navegador hace `PUT` del archivo a esa URL → S3.

### Credenciales (server-side, secretas)

Crear un usuario IAM con permiso `s3:PutObject` sobre el bucket y cargar en
`.env.local` (local) y en Vercel (Production):

```
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
S3_BUCKET="lvsm-847008501986-us-east-1-an"
```

Política IAM mínima:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": "s3:PutObject", "Resource": "arn:aws:s3:::lvsm-847008501986-us-east-1-an/catalogo/*" }
  ]
}
```

### CORS del bucket (necesario para el PUT desde el navegador)

En el bucket → **Permisos** → **CORS**:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["https://lvsm.vercel.app", "http://localhost:3000"],
    "ExposeHeaders": []
  }
]
```

> El servidor debe estar corriendo (`npm run server`) para que el endpoint de
> presign funcione; con `npm run dev` (Vite solo) no hay backend.
