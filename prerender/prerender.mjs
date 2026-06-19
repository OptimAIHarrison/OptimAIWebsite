/**
 * Post-build prerendering script.
 *
 * Runs after `vite build`. Spins up a temporary static server serving the
 * built SPA (dist/public), then uses a headless browser to visit every
 * public route, wait for React + the SEO component's useEffect to finish
 * rendering, and saves the fully-formed HTML to dist/public/<route>/index.html.
 *
 * Real users still get the SPA (JS still loads and hydrates normally).
 * Crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot, etc.) that request
 * a route get the prerendered static HTML directly from Express — no JS
 * execution required.
 */

import { chromium } from "playwright";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist", "public");
// Port 0 tells the OS to assign any free ephemeral port automatically.
// This avoids EADDRINUSE collisions with leftover processes from a
// previous build attempt still holding a fixed port (e.g. 4173) inside
// the same build container.
const PORT = 0;

// All public, crawlable routes
const ROUTES = [
  "/",
  "/services",
  "/about",
  "/why-optimai",
  "/what-we-actually-do",
  "/case-studies",
  "/roi-calculator",
  "/pricing",
  "/products",
  "/faq",
  "/contact",
  "/free-audit",
];

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.static(DIST_DIR));
    // SPA fallback so client-side routing resolves during prerender too
    app.get("*", (_req, res) => {
      res.sendFile(path.join(DIST_DIR, "index.html"));
    });
    const server = app.listen(PORT, () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}` });
    });
    server.on("error", reject);
  });
}

async function prerenderRoutes() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`[prerender] dist dir not found at ${DIST_DIR}. Run vite build first.`);
    process.exit(1);
  }

  console.log("[prerender] Starting static server...");
  let server, url, browser;

  try {
    ({ server, url } = await startStaticServer());
    console.log(`[prerender] Static server listening at ${url}`);

    console.log("[prerender] Launching headless browser...");
    browser = await chromium.launch({
      ...(process.env.CHROMIUM_PATH && { executablePath: process.env.CHROMIUM_PATH }),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    let successCount = 0;
    let failCount = 0;

    for (const route of ROUTES) {
      try {
        const fullUrl = `${url}${route}`;
        await page.goto(fullUrl, { waitUntil: "networkidle", timeout: 30000 });

        // Extra wait so the SEO component's useEffect (meta tags + JSON-LD)
        // and any data-dependent rendering has settled.
        await page.waitForTimeout(800);

        const html = await page.content();

        // Determine output path: "/" -> index.html, "/services" -> services/index.html
        const routeDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ""));
        fs.mkdirSync(routeDir, { recursive: true });
        const outPath = path.join(routeDir, "index.html");

        fs.writeFileSync(outPath, html, "utf-8");
        console.log(`[prerender] \u2713 ${route} -> ${path.relative(PROJECT_ROOT, outPath)}`);
        successCount++;
      } catch (err) {
        console.error(`[prerender] \u2717 Failed to prerender ${route}:`, err);
        failCount++;
      }
    }

    console.log(`[prerender] Done. ${successCount} succeeded, ${failCount} failed.`);

    if (failCount > 0) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("[prerender] Fatal error during setup:", err);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve)).catch(() => {});
    }
  }
}

prerenderRoutes().catch((err) => {
  console.error("[prerender] Unhandled fatal error:", err);
  process.exitCode = 1;
});
