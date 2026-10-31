import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { Cinzel } from "next/font/google";

// Display serif for the hero headline (matches the gold logo lettering). Self-hosted by Next, one weight only.
const display = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-display", display: "swap" });
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhatsAppSource from "@/components/WhatsAppSource";
import CookieConsent from "@/components/CookieConsent";
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
    default: "Hotel Amenities Manufacturer & Supplier in India | Amaravati Enterprises",
    template: "%s | Amaravati Enterprises",
  },
  description:
    "Hotel amenities manufacturer and supplier for hotels across India: toiletries, soaps, amenity kits and stationery with your branding, plus dispensers and housekeeping material.",
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
    "Hyderabad manufacturer and supplier of hotel amenities to hotels all over India: toiletries, soaps, amenity kits and stationery with custom hotel branding, plus dispenser systems, in-room amenities and housekeeping material. Partner brand Biotique Range.",
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

// Google Analytics 4 web stream "AE Web". Counts only the production site, so previews and local builds stay out of the figures.
const GA_ID = process.env.VERCEL_ENV === "production" ? "G-N77XQ075X3" : "";

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
        <CookieConsent />
        <Toaster />
        {GA_ID && (
          <Script id="ga-init" strategy="lazyOnload">
            {`
              // Google Analytics starts only after the visitor accepts it in the cookie banner (stored as "ae-consent").
              // Then it waits for the first scroll, tap or key (or 8 s), so it never slows the page load on phones.
              window.__aeAnalytics=function(){window["ga-disable-${GA_ID}"]=false;if(window.__aeAnalyticsOn)return;window.__aeAnalyticsOn=true;var done=false,ev=["pointerdown","keydown","scroll","touchstart"];function go(){if(done)return;done=true;ev.forEach(function(n){removeEventListener(n,go)});
                window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config","${GA_ID}");
                var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}";document.head.appendChild(s);}
                ev.forEach(function(n){addEventListener(n,go,{once:true,passive:true})});setTimeout(go,8000);};
              // A later "Decline" stops further counting and clears the Analytics cookies.
              window.__aeAnalyticsOff=function(){window["ga-disable-${GA_ID}"]=true;document.cookie.split("; ").forEach(function(c){var n=c.split("=")[0];if(n==="_ga"||n.indexOf("_ga_")===0){document.cookie=n+"=; Max-Age=0; path=/; domain=."+location.hostname.replace(/^www\\./,"");document.cookie=n+"=; Max-Age=0; path=/"}})};
              try{if(localStorage.getItem("ae-consent")==="granted")window.__aeAnalytics()}catch(e){}
            `}
          </Script>
        )}
        {/* Page counts: Vercel Web Analytics. Cookieless and anonymous, so it runs whatever is chosen in the cookie banner. */}
        <Analytics />
        {/* Real visitors' load times (Core Web Vitals), also anonymous and cookieless */}
        <SpeedInsights />
      </body>
    </html>
  );
}
