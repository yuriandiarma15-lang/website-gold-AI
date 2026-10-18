
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

// Health check untuk Railway
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "AI Assistants Gold",
    mode: "website-preview",
    timestamp: new Date().toISOString(),
  });
});

// Sajikan file hasil build Vite
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Fallback React SPA tanpa pola route "*"
  app.use((req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    if (req.path.startsWith("/api/")) {
      return next();
    }

    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  app.get("/", (_req, res) => {
    res.status(503).send(
      "Website belum di-build. Jalankan npm run build terlebih dahulu."
    );
  });
}

// API atau halaman yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Assistants Gold berjalan pada port ${PORT}`);
});
