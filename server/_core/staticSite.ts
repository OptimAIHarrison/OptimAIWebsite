/**
 * Production page serving with correct SEO behaviour.
 *
 * Why this exists: the default static handler (a) redirected /services to
 * /services/ while the page's canonical tag said /services, and (b) answered
 * EVERY unknown URL with the homepage and a 200 status. Google then reported
 * each of those URLs as an "Alternate page with proper canonical tag" or a
 * soft 404. The rules below fix that:
 *
 *  - one address per page: no trailing slash,
 *    lowercase, /index.html -> /, /free-audit -> /free-report (all 301).
 *    Host redirects (www/apex) and http->https are left to Cloudflare.
 *  - real pages are served from their prerendered HTML (status 200)
 *  - private pages get the app shell with noindex
 *  - everything else is a real 404 (with noindex), never the homepage
 */
import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";

export const CLIENT_ONLY_ROUTES = new Set(["/login", "/admin", "/admin/editor"]);
export const REDIRECTS: Record<string, string> = { "/free-audit": "/free-report" };

export type Decision =
  | { type: "redirect"; status: 301; location: string }
  | { type: "asset" }
  | { type: "prerendered"; route: string }
  | { type: "app-shell"; status: 200 | 404 }
  | { type: "not-found-plain" };

export interface RequestInfo {
  path: string;
  search?: string;
  host?: string;
  proto?: string;
}

/** Every folder in the build that contains an index.html is a real page. */
export function discoverPrerenderedRoutes(distPath: string): Set<string> {
  const routes = new Set<string>();
  const walk = (dir: string, rel: string) => {
    if (!fs.existsSync(dir)) return;
    if (fs.existsSync(path.join(dir, "index.html"))) routes.add(rel === "" ? "/" : `/${rel}`);
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name !== "assets") {
        walk(path.join(dir, entry.name), rel ? `${rel}/${entry.name}` : entry.name);
      }
    }
  };
  walk(distPath, "");
  return routes;
}

export function resolveRequest(req: RequestInfo, prerendered: Set<string>): Decision {
  const host = (req.host || "").toLowerCase().replace(/:\d+$/, "");
  const search = req.search || "";
  const original = req.path;

  // 1. Normalise the path
  let p = original.replace(/\/{2,}/g, "/");
  p = p.replace(/\/index\.html$/i, "") || "/";
  if (p.length > 1) p = p.replace(/\/+$/, "") || "/";

  const isKnown = (x: string) => prerendered.has(x) || CLIENT_ONLY_ROUTES.has(x) || x in REDIRECTS;
  const lower = p.toLowerCase();
  if (lower !== p && isKnown(lower)) p = lower;
  if (p in REDIRECTS) p = REDIRECTS[p];

  // 2. Host and protocol (www vs apex, http vs https) are deliberately NOT
  // handled here. Behind Cloudflare + a hosting proxy, a redirect in the app
  // can fight with a redirect rule at the edge and send visitors round in an
  // endless loop (ERR_TOO_MANY_REDIRECTS). Do host/https redirects in ONE
  // place only: Cloudflare.
  if (p !== original) {
    return { type: "redirect", status: 301, location: `${p}${search}` };
  }

  // 3. What is this URL?
  const lastSegment = p.split("/").pop() || "";
  if (p.startsWith("/api/")) return { type: "not-found-plain" };
  if (/\.html?$/i.test(lastSegment)) return { type: "not-found-plain" }; // no direct .html files
  if (/\.[a-z0-9]{1,8}$/i.test(lastSegment)) return { type: "asset" };
  if (prerendered.has(p)) return { type: "prerendered", route: p };
  if (CLIENT_ONLY_ROUTES.has(p)) return { type: "app-shell", status: 200 };
  return { type: "app-shell", status: 404 };
}

export function mountStaticSite(app: Express, distPath: string) {
  const prerendered = discoverPrerenderedRoutes(distPath);
  const shellFile = fs.existsSync(path.join(distPath, "app-shell.html"))
    ? path.join(distPath, "app-shell.html")
    : path.join(distPath, "index.html");

  const sendHtml = (res: Response, file: string, status: number, noindex: boolean) => {
    res.status(status);
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    if (noindex) res.set("X-Robots-Tag", "noindex, nofollow");
    res.type("html");
    res.sendFile(file);
  };

  app.use((req: Request, res: Response, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const qIndex = req.originalUrl.indexOf("?");
    const decision = resolveRequest(
      {
        path: req.path,
        search: qIndex >= 0 ? req.originalUrl.slice(qIndex) : "",
        host: String(req.headers["x-forwarded-host"] || req.headers.host || ""),
        proto: String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim() || undefined,
      },
      prerendered
    );
    switch (decision.type) {
      case "redirect":
        return res.redirect(decision.status, decision.location);
      case "asset":
        return next();
      case "prerendered": {
        const file = decision.route === "/" ? path.join(distPath, "index.html") : path.join(distPath, decision.route.slice(1), "index.html");
        return sendHtml(res, file, 200, false);
      }
      case "app-shell":
        return sendHtml(res, shellFile, decision.status, true);
      default:
        return res.status(404).type("text/plain").send("Not found");
    }
  });

  app.use(
    express.static(distPath, {
      index: false,
      redirect: false,
      setHeaders: (res, filePath) => {
        // Hashed build files never change, so browsers can keep them forever.
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // A missing asset (an unknown .png, .js, ...) is a plain 404, never a page.
  app.use((_req: Request, res: Response) => res.status(404).type("text/plain").send("Not found"));
}
