// Addresses from the old (pre-October 2026) website that Search Console reported as 404, sent to the closest
// new page. Order matters: specific paths come before the "/:path*" catch-alls of the same folder.
const oldSiteRedirectMap = [
  // General pages
  ["/home", "/"],
  ["/dd", "/"],
  ["/testing", "/"],
  ["/manual", "/"],
  ["/sitemap", "/"],
  ["/pages/refer_to_friends", "/"],
  ["/aboutus", "/about"],
  ["/testimonials", "/about"],
  ["/services", "/about"],
  ["/contactus", "/contact"],
  ["/pages/contactus", "/contact"],
  ["/pages/complaint", "/contact"],
  ["/privacy-policy", "/privacy"],
  ["/terms-conditions", "/privacy"],
  ["/refund-cancellation", "/privacy"],
  ["/shipping-delivery", "/privacy"],
  ["/customization/:path*", "/custom-branding"],
  ["/logo-printed-wet-amenities/:path*", "/custom-branding"],
  ["/catalogue/:path*", "/brochures"],
  // Old shop listings
  ["/category/:path*", "/products"],
  ["/products/index/:path*", "/products"],
  ["/hot-products", "/products"],
  ["/new-arrival", "/products"],
  ["/cart", "/products"],
  ["/register", "/products"],
  ["/users/:path*", "/products"],
  // Eco-friendly
  ["/sustainability", "/products/eco-friendly"],
  ["/shower-cap/compostible", "/products/eco-friendly"],
  ["/dental-kit/bamboo", "/products/eco-friendly"],
  ["/shaving-kit/bamboo", "/products/eco-friendly"],
  ["/slippers/jute", "/products/eco-friendly"],
  // Amenity kits (door hangers go to stationery)
  ["/other-guest-amenities/dnd", "/products/stationery"],
  ["/other-guest-amenities/dnd-mdf", "/products/stationery"],
  ["/other-guest-amenities/:path*", "/products/amenity-kits"],
  ["/dry-amenities/:path*", "/products/amenity-kits"],
  ["/sewing-kit/:path*", "/products/amenity-kits"],
  ["/shower-cap/:path*", "/products/amenity-kits"],
  ["/comb/:path*", "/products/amenity-kits"],
  ["/dental-kit/:path*", "/products/amenity-kits"],
  ["/shaving-kit/:path*", "/products/amenity-kits"],
  ["/slippers/:path*", "/products/amenity-kits"],
  // Toiletries and dispensers
  ["/wet-amenities/dispensers", "/products/anti-theft-dispensers"],
  ["/wet-amenities/:path*", "/products/hotel-toiletries"],
  ["/shampoo-sg-moi-con/:path*", "/products/hotel-toiletries"],
  ["/hand-wash", "/products/hotel-toiletries"],
  ["/soap-oil-50-ltrs", "/products/hotel-toiletries"],
  ["/purely-serene", "/products/purely-serene"],
  ["/purely-serene-luxury-range", "/products/purely-serene"],
  ["/35-ml/:path*", "/products/purely-serene"],
  // Tea and coffee
  ["/tcm-supplies/water-bottle", "/products/in-room-amenities"],
  ["/tcm-supplies/:path*", "/products/tea-coffee"],
  ["/goodwyn/:path*", "/products/tea-coffee"],
  ["/other-consumables/glass-cover", "/products/tea-coffee"],
  // Housekeeping
  ["/housekeeping-consumables/:path*", "/products/housekeeping"],
  ["/garbage-bag/:path*", "/products/housekeeping"],
  ["/paper-products/:path*", "/products/housekeeping"],
  ["/dustbins", "/products/housekeeping"],
  ["/bucket/:path*", "/products/housekeeping"],
  ["/air-revitalisor", "/products/housekeeping"],
  ["/other-consumables/:path*", "/products/housekeeping"],
];
const oldSiteRedirects = oldSiteRedirectMap.map(([source, destination]) => ({ source, destination, permanent: true }));

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
      // Same Biotique content as /products/biotique; one page per search term
      { source: "/partner-brands", destination: "/products/biotique", permanent: true },
      ...oldSiteRedirects,
    ];
  },
};

module.exports = nextConfig;
