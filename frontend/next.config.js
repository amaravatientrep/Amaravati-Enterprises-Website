/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
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
