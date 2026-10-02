import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: object | object[];
  noIndex?: boolean;
}

const SITE_NAME = "OptimAI";
const SITE_URL = "https://optimai.com.au";
const DEFAULT_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schema,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard meta
    setMeta("description", description);
    if (noIndex) setMeta("robots", "noindex, nofollow");
    else setMeta("robots", "index, follow");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", SITE_NAME, true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // JSON-LD Schema
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      // Remove old schema tags added by this component
      document.querySelectorAll('script[data-seo="true"]').forEach(el => el.remove());
      schemas.forEach(s => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "true");
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noIndex]);

  return null;
}
