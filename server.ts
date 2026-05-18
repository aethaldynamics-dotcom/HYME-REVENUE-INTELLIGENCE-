import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json());

  // API Route for Lead Generation
  app.post("/api/leads", async (req, res) => {
    const { name, company, email, website, objective, metadata } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required." });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY not configured. Logging lead to console.");
      console.log("LEAD_PAYLOAD:", req.body);
      return res.json({ success: true, message: "Lead logged locally (Web3Forms not configured)." });
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          company: company || "N/A",
          email: email,
          website: website || "N/A",
          objective: objective || "N/A",
          from_name: "HYME Revenue Intelligence",
          subject: `New Strategic Partnership Application: ${company || name}`,
          ...metadata,
        }),
      });

      const result = await response.json();

      if (result.success) {
        res.json({ success: true });
      } else {
        console.error("WEB3FORMS_ERROR:", result);
        res.status(500).json({ error: "Web3Forms submission failed." });
      }
    } catch (error) {
      console.error("TRANSMISSION_FAILURE:", error);
      res.status(500).json({ error: "Secure relay transmission failed." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
