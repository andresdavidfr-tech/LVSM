import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { STATIC_PRODUCTS } from "./src/data/products";
import { STATIC_REVIEWS } from "./src/data/reviews";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;
  const db = new Database("leads.db");

  // Initialize database
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

  app.use(express.json());

  // API Routes
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

  // Admin route to view leads (for MVP demo purposes)
  app.get("/api/leads", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los leads" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
