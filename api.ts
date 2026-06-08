import express, { type Express } from "express";
import { STATIC_PRODUCTS } from "./src/data/products";
import { STATIC_REVIEWS } from "./src/data/reviews";
import { presignUpload, isS3Configured, isValidKey, ALLOWED_TYPES } from "./s3";

/**
 * Crea la app Express con las rutas de API (sin Vite ni archivos estáticos),
 * para poder testearla de forma aislada con una base en memoria.
 * `db` es una instancia de better-sqlite3 (sin @types → any).
 */
export function createApiApp(db: any): Express {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      interest TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const app = express();
  app.use(express.json());

  app.post("/api/leads", (req, res) => {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nombre y Email son requeridos" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO leads (name, email, phone, interest, message)
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, phone, interest, message);
      res.status(201).json({ success: true, message: "Información recibida correctamente" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Error al guardar la información" });
    }
  });

  // Catálogo y reseñas (el frontend cae a datos estáticos si no hay servidor)
  app.get("/api/products", (_req, res) => {
    res.json(STATIC_PRODUCTS);
  });

  app.get("/api/reviews", (_req, res) => {
    res.json(STATIC_REVIEWS);
  });

  // URL prefirmada para subir una imagen de producto a S3 (lo usa el Admin).
  // Las credenciales AWS nunca salen del servidor; el navegador sube directo a S3.
  app.post("/api/uploads/presign", async (req, res) => {
    const { key, contentType } = req.body ?? {};

    if (!key || !contentType) {
      return res.status(400).json({ error: "key y contentType son requeridos" });
    }
    if (!isValidKey(key)) {
      return res.status(400).json({ error: "key inválido (debe ser catalogo/<slug>/<archivo>)" });
    }
    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({ error: "Tipo de archivo no permitido" });
    }
    if (!isS3Configured()) {
      return res.status(503).json({ error: "S3 no está configurado en el servidor" });
    }

    try {
      res.json(await presignUpload(key, contentType));
    } catch (error) {
      console.error("Presign error:", error);
      res.status(500).json({ error: "No se pudo generar la URL de subida" });
    }
  });

  // Admin: ver leads (para demo del MVP)
  app.get("/api/leads", (_req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los leads" });
    }
  });

  return app;
}
