// Resolución de imágenes desde Amazon S3 (bucket público), con fallback a la
// URL absoluta provista (ej. Unsplash) cuando S3 no está configurado o la
// imagen todavía no se subió.
//
// Configuración por variables de entorno (Vite expone las VITE_*):
//   VITE_S3_BUCKET        nombre del bucket (ej. lvsm-847008501986-us-east-1-an)
//   VITE_S3_REGION        región del bucket (default: us-east-1)
//   VITE_IMAGE_BASE_URL   opcional: base custom (CloudFront/dominio propio) que
//                         tiene prioridad sobre la URL nativa de S3
//
// Importante: el bucket/objetos deben ser de lectura pública para mostrarse en
// <img>. Configurar el env SOLO después de subir las imágenes; si no, se cae
// al fallback (Unsplash) y nada se rompe.

function config() {
  const env = import.meta.env;
  return {
    base: (env.VITE_IMAGE_BASE_URL as string | undefined)?.replace(/\/+$/, ''),
    bucket: env.VITE_S3_BUCKET as string | undefined,
    region: (env.VITE_S3_REGION as string | undefined) ?? 'us-east-1',
  };
}

/** Base pública desde la que se sirven las imágenes, o undefined si no hay config. */
export function storageBaseUrl(): string | undefined {
  const { base, bucket, region } = config();
  if (base) return base;
  if (bucket) return `https://${bucket}.s3.${region}.amazonaws.com`;
  return undefined;
}

export function isStorageConfigured(): boolean {
  return Boolean(storageBaseUrl());
}

/** Construye la URL pública de un object key del bucket. */
export function storageUrl(key: string): string {
  const base = storageBaseUrl();
  const cleanKey = key.replace(/^\/+/, '');
  return base ? `${base}/${cleanKey}` : key;
}

/** Devuelve la URL de S3 si hay storageKey y config; si no, la src de fallback. */
export function resolveImage(image: { src: string; storageKey?: string }): string {
  if (image.storageKey && isStorageConfigured()) return storageUrl(image.storageKey);
  return image.src;
}

/**
 * true cuando la imagen mostrada NO es la foto real del artículo (todavía no
 * se subió a S3), sino el placeholder de fallback. Se usa para avisar al
 * usuario que la foto es referencial y no corresponde a la pieza física.
 *
 * Una imagen marcada explícitamente como `isReal` (foto verificada del
 * artículo, cargada como asset local) nunca cuenta como placeholder, aunque
 * no tenga storageKey ni S3 esté configurado.
 */
export function isPlaceholderImage(image: { src: string; storageKey?: string; isReal?: boolean }): boolean {
  if (image.isReal) return false;
  return !(image.storageKey && isStorageConfigured());
}
