import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve hashed assets (JS/CSS/images) with standard static middleware first.
  app.use(express.static(distPath));

  // For any other request, check whether a prerendered HTML file exists for
  // this exact route (e.g. /services -> dist/public/services/index.html).
  // This is what makes prerendering actually visible to crawlers — without
  // this, every route would silently fall back to the root index.html and
  // none of the per-page meta tags / schema baked in at build time would
  // ever be served.
  app.use("*", (req, res) => {
    // Strip query string and trailing slash, e.g. "/services/" -> "/services"
    const cleanPath = req.path.replace(/\/+$/, "") || "/";

    const prerenderedPath =
      cleanPath === "/"
        ? path.join(distPath, "index.html")
        : path.join(distPath, cleanPath.replace(/^\//, ""), "index.html");

    if (fs.existsSync(prerenderedPath)) {
      res.sendFile(prerenderedPath);
      return;
    }

    // Fall back to the root SPA shell for any route without a prerendered
    // file (e.g. /admin, /login, dynamic /articles/:slug, or 404s).
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
