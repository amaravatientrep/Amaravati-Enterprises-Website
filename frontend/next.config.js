/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security headers on every response. (A strict Content-Security-Policy is left out on purpose: the site loads
  // PostHog, Google Maps and Web3Forms, and a mistake there would silently break the enquiry form.)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
  async redirects() {
    // Old single-page anchors and removed files
    return [
      { source: "/biotique-catalogue.pdf", destination: "/catalogues/ae-biotique-2026.pdf", permanent: true },
      { source: "/housekeeping-kitchen-catalogue.pdf", destination: "/catalogues/ae-hk-2026.pdf", permanent: true },
      { source: "/products/housekeeping-kitchen", destination: "/products/housekeeping", permanent: true },
      { source: "/products/packaging-stationery", destination: "/products/stationery", permanent: true },
      { source: "/products/toiletries", destination: "/products/hotel-toiletries", permanent: true },
    ];
  },
};

module.exports = nextConfig;
