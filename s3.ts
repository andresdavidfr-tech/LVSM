import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Tipos de imagen permitidos para subir al catálogo.
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// Solo se permiten keys dentro de catalogo/<slug>/<archivo>.<ext> (sin traversal).
const KEY_RE = /^catalogo\/[a-z0-9-]+\/[a-zA-Z0-9._-]+\.(jpe?g|png|webp|avif)$/i;

export function isValidKey(key: unknown): key is string {
  return typeof key === "string" && !key.includes("..") && KEY_RE.test(key);
}

function cfg() {
  return {
    region: process.env.AWS_REGION ?? process.env.VITE_S3_REGION ?? "us-east-1",
    bucket: process.env.S3_BUCKET ?? process.env.VITE_S3_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

// Las credenciales AWS son secretas y viven SOLO en el servidor.
export function isS3Configured(): boolean {
  const c = cfg();
  return Boolean(c.bucket && c.accessKeyId && c.secretAccessKey);
}

// Genera una URL prefirmada de PUT (5 min) + la URL pública resultante.
// El firmado es local (offline): no llama a AWS.
export async function presignUpload(key: string, contentType: string) {
  const { region, bucket, accessKeyId, secretAccessKey } = cfg();
  if (!bucket || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 no configurado");
  }
  const client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return {
    url,
    publicUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
    key,
  };
}
