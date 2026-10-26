import { GeistSans } from "geist/font/sans";
import { Cinzel } from "next/font/google";

// Display serif for the hero headline (matches the gold logo lettering). Self-hosted by Next, one weight only.
const display = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-display", display: "swap" });
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhatsAppSource from "@/components/WhatsAppSource";
import Toaster from "@/components/Toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, contact, categories } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Preview and local builds are kept out of search results; only the production site is indexed (see robots.js)
  ...(process.env.VERCEL_ENV === "production" ? {} : { robots: { index: false, follow: false } }),
  // Bing Webmaster Tools ownership check
  verification: { other: { "msvalidate.01": "64507EAE9D556709F854E361C1D81A3B" } },
  title: {
    default: "Hotel Amenities Supplier in India | Amaravati Enterprises",
    template: "%s | Amaravati Enterprises",
  },
  description:
    "Hotel amenities supplier serving hotels all over India: toiletries, amenity kits, dispensers, stationery and housekeeping supplies, with your hotel's branding.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-32.png", apple: "/apple-touch-icon.png" },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Amaravati Enterprises",
    locale: "en_IN",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Amaravati Enterprises: complete hospitality solutions for hotels all over India" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F5F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0F0E" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Amaravati Enterprises",
  description:
    "Hyderabad supplier of hotel amenities to hotels all over India: toiletries, amenity kits, dispensers, in-room amenities, stationery and housekeeping material, with custom hotel branding. Partner brand Biotique Range.",
  url: SITE_URL,
  sameAs: [contact.googleProfile, contact.instagram],
  telephone: "+91-94946-00101",
  email: contact.email,
  image: `${SITE_URL}/amaravati-logo.png`,
  logo: `${SITE_URL}/amaravati-logo.png`,
  brand: ["Purely Serene", "Biotique"].map((name) => ({ "@type": "Brand", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hotel amenities and supplies",
    itemListElement: categories.map((c) => ({
      "@type": "OfferCatalog",
      name: c.name,
      url: `${SITE_URL}/products/${c.slug}`,
    })),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "C3, Banjara Gardens, Road No. 12, Banjara Hills",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500034",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
};

// Matches the hidden starting state of <Reveal> (opacity 0, moved down 16px)
const REVEAL_FALLBACK = '[style*="opacity:0;transform:translateY(16px)"]{opacity:1!important;transform:none!important}';

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${display.variable}`}>
      <body className="font-sans">
        {/* Scroll-in sections start hidden and are revealed by JavaScript. If a phone's browser has no
            JavaScript, or it has not started within 4 s (very old or very slow phones), show them anyway. */}
        <noscript dangerouslySetInnerHTML={{ __html: `<style>${REVEAL_FALLBACK}</style>` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){if(!window.__aeReady){var s=document.createElement("style");s.textContent=${JSON.stringify(REVEAL_FALLBACK)};document.head.appendChild(s)}},4000)`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <WhatsAppSource />
        <Toaster />
        {/* Visitor statistics: Vercel Web Analytics. Cookieless and anonymous, so no consent banner is needed. */}
        <Analytics />
        {/* Real visitors' load times (Core Web Vitals), also anonymous and cookieless */}
        <SpeedInsights />
      </body>
    </html>
  );
}
