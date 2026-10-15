import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  /**
   * Path of this page, e.g. "/services". If left out, the page's own current
   * path is used, so a page can never accidentally claim the homepage as its
   * canonical address.
   */
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: object | object[];
  noIndex?: boolean;
  /** Label for the last breadcrumb (used on article pages). */
  breadcrumbLeaf?: string;
  /** Article publish date as YYYY-MM-DD (articles only). */
  publishedTime?: string;
  /** Article author name (articles only). */
  author?: string;
}

const SITE_NAME = "OptimAI";
const SITE_URL = "https://optimai.com.au";
const DEFAULT_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";

const CRUMB_NAMES: Record<string, string> = {
  "/services": "Services",
  "/about": "About",
  "/why-optimai": "Why OptimAI",
  "/what-we-actually-do": "What we actually do",
  "/case-studies": "Case studies",
  "/roi-calculator": "ROI calculator",
  "/pricing": "Pricing",
  "/resources": "Resources",
  "/products": "Products",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/free-report": "Free report",
  "/privacy": "Privacy policy",
  "/terms": "Terms and conditions",
};

function currentPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname.replace(/\/+$/, "");
}

function buildBreadcrumbs(path: string, leaf?: string) {
  if (!path) return null; // homepage has no breadcrumb trail
  const items: { name: string; url: string }[] = [{ name: "Home", url: `${SITE_URL}/` }];
  if (path.startsWith("/articles/")) {
    items.push({ name: "Resources", url: `${SITE_URL}/resources` });
    items.push({ name: leaf || "Article", url: `${SITE_URL}${path}` });
  } else {
    const name = CRUMB_NAMES[path] || leaf;
    if (!name) return null;
    items.push({ name, url: `${SITE_URL}${path}` });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schema,
  noIndex = false,
  breadcrumbLeaf,
  publishedTime,
  author,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const path = (canonical ?? currentPath()).replace(/\/+$/, "");
  const canonicalUrl = `${SITE_URL}${path || "/"}`;
  const schemaKey = JSON.stringify(schema ?? null);

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const removeMeta = (name: string, property = false) => {
      document.querySelector(`meta[${property ? "property" : "name"}="${name}"]`)?.remove();
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    setMeta("description", description);
    setMeta(
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );
    setLink("canonical", canonicalUrl);

    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "en_AU", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    if (ogType === "article") {
      if (publishedTime) setMeta("article:published_time", publishedTime, true);
      if (author) setMeta("article:author", author, true);
    } else {
      removeMeta("article:published_time", true);
      removeMeta("article:author", true);
    }

    // Structured data: always clear what the previous page added, then add
    // only this page's. Without this, a page with no schema keeps the
    // previous page's data.
    document.querySelectorAll('script[data-seo="true"]').forEach((el) => el.remove());
    const all: object[] = schema ? (Array.isArray(schema) ? [...schema] : [schema]) : [];
    const crumbs = noIndex ? null : buildBreadcrumbs(path, breadcrumbLeaf);
    if (crumbs) all.push(crumbs);
    all.forEach((s) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "true");
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noIndex, schemaKey, breadcrumbLeaf, publishedTime, author]);

  return null;
}
