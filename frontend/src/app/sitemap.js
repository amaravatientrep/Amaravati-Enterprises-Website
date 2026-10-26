import { SITE_URL, categories, areas } from "@/lib/site";
import { guides } from "@/lib/guides";

export default function sitemap() {
  const paths = [
    "",
    "/products",
    ...categories.map((c) => `/products/${c.slug}`),
    "/products/biotique",
    "/custom-branding",
    "/about",
    "/faq",
    "/brochures",
    "/gallery",
    "/contact",
    "/privacy",
    "/guides",
    ...guides.map((g) => `/guides/${g.slug}`),
    ...areas.map((a) => `/areas/${a.slug}`),
  ];
  // lastModified is the build date: every deploy republishes all pages. Home and product pages are marked as the
  // most important; region pages as the least.
  const lastModified = new Date();
  const priority = (p) => (p === "" ? 1 : p.startsWith("/products") ? 0.9 : p.startsWith("/areas") ? 0.5 : 0.7);
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified, changeFrequency: "monthly", priority: priority(p) }));
}
