import { SITE_URL, categories, areas } from "@/lib/site";

export default function sitemap() {
  const paths = [
    "",
    "/products",
    ...categories.map((c) => `/products/${c.slug}`),
    "/products/biotique",
    "/custom-branding",
    "/partner-brands",
    "/about",
    "/faq",
    "/brochures",
    "/gallery",
    "/contact",
    "/privacy",
    ...areas.map((a) => `/areas/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
