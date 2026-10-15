import { describe, expect, it, beforeAll, afterAll } from "vitest";
import express from "express";
import fs from "fs";
import os from "os";
import path from "path";
import type { Server } from "http";
import { mountStaticSite, resolveRequest, CLIENT_ONLY_ROUTES, REDIRECTS } from "./staticSite";

const PAGES = new Set(["/", "/services", "/about", "/free-report", "/articles/crm-automation-guide"]);
const r = (p: string, extra: object = {}) => resolveRequest({ path: p, host: "optimai.com.au", proto: "https", ...extra }, PAGES);

describe("resolveRequest: one address per page", () => {
  it("serves real pages", () => {
    expect(r("/")).toEqual({ type: "prerendered", route: "/" });
    expect(r("/services")).toEqual({ type: "prerendered", route: "/services" });
    expect(r("/articles/crm-automation-guide")).toEqual({ type: "prerendered", route: "/articles/crm-automation-guide" });
  });
  it("keeps query strings on a real page without redirecting", () => {
    expect(r("/services", { search: "?utm_source=x" })).toEqual({ type: "prerendered", route: "/services" });
  });
  it("301s trailing slashes, uppercase, /index.html and double slashes to the one canonical path", () => {
    expect(r("/services/")).toEqual({ type: "redirect", status: 301, location: "/services" });
    expect(r("/SERVICES")).toEqual({ type: "redirect", status: 301, location: "/services" });
    expect(r("/services/index.html")).toEqual({ type: "redirect", status: 301, location: "/services" });
    expect(r("/index.html")).toEqual({ type: "redirect", status: 301, location: "/" });
    expect(r("//services")).toEqual({ type: "redirect", status: 301, location: "/services" });
    expect(r("/services/", { search: "?a=1" })).toEqual({ type: "redirect", status: 301, location: "/services?a=1" });
  });
  it("301s the old /free-audit address to /free-report", () => {
    expect(r("/free-audit")).toEqual({ type: "redirect", status: 301, location: "/free-report" });
  });
  it("301s www and plain http to https on the apex, in ONE hop, keeping path and query", () => {
    expect(r("/about", { host: "www.optimai.com.au" })).toEqual({ type: "redirect", status: 301, location: "https://optimai.com.au/about" });
    expect(r("/about", { proto: "http" })).toEqual({ type: "redirect", status: 301, location: "https://optimai.com.au/about" });
    expect(r("/About/", { host: "www.optimai.com.au", proto: "http", search: "?x=1" })).toEqual({ type: "redirect", status: 301, location: "https://optimai.com.au/about?x=1" });
  });
  it("does not redirect other hosts (localhost, health checks, preview domains)", () => {
    expect(r("/services", { host: "localhost:3000", proto: "http" })).toEqual({ type: "prerendered", route: "/services" });
    expect(r("/", { host: "healthcheck.railway.app", proto: "http" })).toEqual({ type: "prerendered", route: "/" });
  });
});

describe("resolveRequest: real 404s instead of the homepage", () => {
  it("returns 404 for unknown pages, including article slugs that do not exist", () => {
    expect(r("/totally-fake-page")).toEqual({ type: "app-shell", status: 404 });
    expect(r("/articles/does-not-exist")).toEqual({ type: "app-shell", status: 404 });
    expect(r("/404")).toEqual({ type: "app-shell", status: 404 });
  });
  it("serves private pages (noindex) with status 200", () => {
    for (const p of CLIENT_ONLY_ROUTES) expect(r(p)).toEqual({ type: "app-shell", status: 200 });
  });
  it("treats files as assets and refuses direct .html and unknown /api paths", () => {
    expect(r("/assets/index-abc.js")).toEqual({ type: "asset" });
    expect(r("/robots.txt")).toEqual({ type: "asset" });
    expect(r("/app-shell.html")).toEqual({ type: "not-found-plain" });
    expect(r("/api/whatever")).toEqual({ type: "not-found-plain" });
  });
});

describe("the server's page list stays in step with the app", () => {
  const root = path.resolve(import.meta.dirname, "../..");
  const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf-8");
  const prerender = fs.readFileSync(path.join(root, "prerender/prerender.mjs"), "utf-8");
  const appRoutes = [...app.matchAll(/<Route path=\{?"([^"]+)"/g)].map((m) => m[1]);
  const pageRoutes = [...prerender.match(/PAGE_ROUTES = \[([\s\S]*?)\];/)![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

  it("every route in App.tsx is prerendered, private, a redirect, an article, or /404", () => {
    const known = new Set([...pageRoutes, ...CLIENT_ONLY_ROUTES, ...Object.keys(REDIRECTS), "/articles/:slug", "/404"]);
    const unaccounted = appRoutes.filter((x) => !known.has(x));
    expect(unaccounted, `App routes with no SEO handling: ${unaccounted.join(", ")}`).toEqual([]);
  });
  it("every prerendered route exists in App.tsx (so we never prerender a 404)", () => {
    const missing = pageRoutes.filter((x) => !appRoutes.includes(x));
    expect(missing, `Prerendered but not in the app: ${missing.join(", ")}`).toEqual([]);
  });
});

describe("real HTTP behaviour", () => {
  let server: Server;
  let base: string;
  let dir: string;

  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "site-"));
    const w = (f: string, c: string) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), c); };
    w("index.html", "<title>HOME</title>");
    w("services/index.html", "<title>SERVICES</title>");
    w("app-shell.html", "<title>SHELL</title>");
    w("assets/app-1.js", "console.log(1)");
    w("robots.txt", "User-agent: *\nAllow: /\n");
    const app = express();
    mountStaticSite(app, dir);
    await new Promise<void>((res) => { server = app.listen(0, res); });
    base = `http://127.0.0.1:${(server.address() as any).port}`;
  });
  afterAll(() => { server.close(); fs.rmSync(dir, { recursive: true, force: true }); });

  const get = (p: string, headers: Record<string, string> = {}) => fetch(base + p, { redirect: "manual", headers });

  it("serves home and inner pages with 200 and their own HTML", async () => {
    expect(await (await get("/")).text()).toContain("HOME");
    const s = await get("/services");
    expect(s.status).toBe(200);
    expect(await s.text()).toContain("SERVICES");
  });
  it("redirects /services/ to /services (not the other way round)", async () => {
    const s = await get("/services/");
    expect(s.status).toBe(301);
    expect(s.headers.get("location")).toBe("/services");
  });
  it("returns a real 404 (noindex) for unknown pages, never the homepage", async () => {
    const s = await get("/totally-fake-page");
    expect(s.status).toBe(404);
    expect(s.headers.get("x-robots-tag")).toContain("noindex");
    const body = await s.text();
    expect(body).toContain("SHELL");
    expect(body).not.toContain("HOME");
  });
  it("marks private pages noindex but serves them", async () => {
    const s = await get("/admin");
    expect(s.status).toBe(200);
    expect(s.headers.get("x-robots-tag")).toContain("noindex");
  });
  it("serves assets with long cache, robots.txt as-is, and 404s missing files plainly", async () => {
    const a = await get("/assets/app-1.js");
    expect(a.status).toBe(200);
    expect(a.headers.get("cache-control")).toContain("immutable");
    expect(await (await get("/robots.txt")).text()).toContain("Allow: /");
    const missing = await get("/nope.png");
    expect(missing.status).toBe(404);
    expect(await missing.text()).not.toContain("<title>");
  });
  it("does not expose the app shell file directly", async () => {
    expect((await get("/app-shell.html")).status).toBe(404);
  });
  it("redirects www to the apex over https in one hop", async () => {
    const s = await get("/services", { "x-forwarded-host": "www.optimai.com.au", "x-forwarded-proto": "https" });
    expect(s.status).toBe(301);
    expect(s.headers.get("location")).toBe("https://optimai.com.au/services");
  });
});
