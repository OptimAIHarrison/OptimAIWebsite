/**
 * Post-build prerendering + SEO guard.
 *
 * Runs after `vite build`. Serves the built SPA from a temporary server, uses
 * a headless browser to visit every public route, waits for React + the SEO
 * component to finish, and saves the finished HTML to
 * dist/public/<route>/index.html so crawlers (Googlebot, GPTBot, ClaudeBot,
 * PerplexityBot...) get real content without running any JavaScript.
 *
 * It also:
 *  - keeps a pristine copy of the un-rendered app (app-shell.html) and always
 *    renders from it, so one page's tags can never leak into another page;
 *  - writes sitemap.xml from the exact same list of routes;
 *  - CHECKS every page (canonical, title, description, one <h1>, indexable,
 *    valid JSON-LD, unique title) and FAILS THE BUILD if any check fails, so
 *    an SEO regression can never be deployed unnoticed.
 */

import { chromium } from "playwright";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist", "public");
const SITE_URL = "https://optimai.com.au";
const PORT = 0; // any free port

// ---- Routes ---------------------------------------------------------------

const PAGE_ROUTES = [
  "/",
  "/services",
  "/about",
  "/why-optimai",
  "/what-we-actually-do",
  "/case-studies",
  "/roi-calculator",
  "/pricing",
  "/products",
  "/resources",
  "/faq",
  "/contact",
  "/free-report",
  "/privacy",
  "/terms",
];

function articleSlugs() {
  const read = (f) => fs.readFileSync(path.join(PROJECT_ROOT, "client/src/pages", f), "utf-8");
  const slugsIn = (src) => [...new Set([...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]))];
  const detail = slugsIn(read("ArticleDetail.tsx"));
  const list = slugsIn(read("Resources.tsx"));
  const missing = list.filter((s) => !detail.includes(s));
  if (missing.length) {
    console.error(`[prerender] Resources lists articles that ArticleDetail cannot render: ${missing.join(", ")}`);
    process.exit(1);
  }
  return detail;
}

const ROUTES = [...PAGE_ROUTES, ...articleSlugs().map((s) => `/articles/${s}`)];
const expectedCanonical = (route) => `${SITE_URL}${route === "/" ? "/" : route}`;

// ---- Helpers --------------------------------------------------------------

const attr = (html, tagRe, name) => {
  const tag = html.match(tagRe);
  if (!tag) return null;
  const m = tag[0].match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : null;
};
const decode = (s) => (s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function auditPage(route, html) {
  const problems = [];
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1]).trim();
  const canonical = attr(html, /<link[^>]*rel="canonical"[^>]*>/, "href");
  const description = decode(attr(html, /<meta[^>]*name="description"[^>]*>/, "content"));
  const robots = attr(html, /<meta[^>]*name="robots"[^>]*>/, "content");
  const ogUrl = attr(html, /<meta[^>]*property="og:url"[^>]*>/, "content");
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) problems.push("missing <title>");
  if (title.length > 65) problems.push(`title too long (${title.length} chars)`);
  if (!description) problems.push("missing meta description");
  else if (description.length > 170) problems.push(`description too long (${description.length} chars)`);
  if (canonical !== expectedCanonical(route)) problems.push(`canonical is "${canonical}", expected "${expectedCanonical(route)}"`);
  if (ogUrl !== expectedCanonical(route)) problems.push(`og:url is "${ogUrl}", expected "${expectedCanonical(route)}"`);
  if (!robots || /noindex/i.test(robots)) problems.push(`page is not indexable (robots: ${robots})`);
  if (h1s !== 1) problems.push(`expected exactly one <h1>, found ${h1s}`);
  if (/Article Not Found|Page not found|Page Not Found/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) problems.push("renders a 'not found' message");

  const types = [];
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(m[1]);
      for (const x of [].concat(d)) types.push(x["@type"]);
    } catch {
      problems.push("invalid JSON-LD");
    }
  }
  return { problems, title, types, published: attr(html, /<meta[^>]*property="article:published_time"[^>]*>/, "content") };
}

function writeSitemap(results) {
  const urls = results
    .map(({ route, published }) => {
      const lastmod = published ? `\n    <lastmod>${published}</lastmod>` : "";
      return `  <url>\n    <loc>${expectedCanonical(route)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  return xml;
}

function startStaticServer(shellPath) {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.static(DIST_DIR, { index: false, redirect: false }));
    // SPA fallback always uses the pristine shell, never a rendered page.
    app.get("*", (_req, res) => res.sendFile(shellPath));
    const server = app.listen(PORT, () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
    server.on("error", reject);
  });
}

// ---- Main -----------------------------------------------------------------

async function prerenderRoutes() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`[prerender] dist dir not found at ${DIST_DIR}. Run vite build first.`);
    process.exit(1);
  }

  const shellPath = path.join(DIST_DIR, "app-shell.html");
  if (!fs.existsSync(shellPath)) fs.copyFileSync(path.join(DIST_DIR, "index.html"), shellPath);

  let server, url, browser;
  try {
    ({ server, url } = await startStaticServer(shellPath));
    console.log(`[prerender] Static server at ${url}; ${ROUTES.length} routes to render`);

    browser = await chromium.launch({
      ...(process.env.CHROMIUM_PATH && { executablePath: process.env.CHROMIUM_PATH }),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const results = [];
    const failures = [];
    const titles = new Map();

    for (const route of ROUTES) {
      // A fresh page per route so nothing carries over between pages.
      const page = await browser.newPage();
      try {
        await page.goto(`${url}${route}`, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(800);
        const html = await page.content();

        const audit = auditPage(route, html);
        if (titles.has(audit.title)) audit.problems.push(`duplicate title (also used by ${titles.get(audit.title)})`);
        titles.set(audit.title, route);

        const routeDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ""));
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");

        if (audit.problems.length) {
          failures.push({ route, problems: audit.problems });
          console.error(`[prerender] \u2717 ${route}: ${audit.problems.join("; ")}`);
        } else {
          console.log(`[prerender] \u2713 ${route}  [${audit.types.join(", ") || "no schema"}]`);
        }
        results.push({ route, published: audit.published });
      } catch (err) {
        failures.push({ route, problems: [String(err)] });
        console.error(`[prerender] \u2717 Failed to prerender ${route}:`, err);
      } finally {
        await page.close().catch(() => {});
      }
    }

    writeSitemap(results);
    console.log(`[prerender] sitemap.xml written with ${results.length} URLs`);
    console.log(`[prerender] Done. ${ROUTES.length - failures.length} passed, ${failures.length} failed.`);
    if (failures.length) process.exitCode = 1;
  } catch (err) {
    console.error("[prerender] Fatal error during setup:", err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (server) await new Promise((resolve) => server.close(resolve)).catch(() => {});
  }
}

prerenderRoutes().catch((err) => {
  console.error("[prerender] Unhandled fatal error:", err);
  process.exitCode = 1;
});
