import { SITE_URL } from "@/lib/site";

// Search engines may index only the live (production) site. Preview deploys and local builds ask them to stay
// away, so the private preview link never appears in Google; nothing needs changing at go-live.
const live = process.env.VERCEL_ENV === "production";

export default function robots() {
  return {
    rules: live ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
