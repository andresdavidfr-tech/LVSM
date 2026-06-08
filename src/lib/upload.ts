// Subida de una imagen a Amazon S3 desde el navegador.
// Paso 1: pedir al servidor una URL prefirmada (sin exponer credenciales AWS).
// Paso 2: hacer PUT del archivo directo a S3. Devuelve la URL pública final.
export async function uploadImage(file: File, key: string): Promise<string> {
  const presign = await fetch('/api/uploads/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, contentType: file.type }),
  });

  if (!presign.ok) {
    const data = await presign.json().catch(() => ({}));
    throw new Error(data.error || 'No se pudo obtener la URL de subida');
  }

  const { url, publicUrl } = (await presign.json()) as { url: string; publicUrl: string };

  const put = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!put.ok) {
    throw new Error('Falló la subida a S3 (revisá la config de CORS y permisos del bucket)');
  }

  return publicUrl;
}
