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
import { SITE_URL, contact, categories } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Preview and local builds are kept out of search results; only the production site is indexed (see robots.js)
  ...(process.env.VERCEL_ENV === "production" ? {} : { robots: { index: false, follow: false } }),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${display.variable}`}>
      <body className="font-sans">
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
        <Script id="posthog-init" strategy="lazyOnload">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset get_distinct_id opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            // Visitor statistics start only after the visitor accepts them in the cookie banner (stored as "ae-consent").
            // Then they wait for the first scroll, tap or key (or 8 s), so they never slow the page load on phones.
            // Session recording runs on desktop only; phones are too slow for the recorder.
            window.__aeAnalytics=function(){if(window.__aeAnalyticsOn)return;window.__aeAnalyticsOn=true;var done=false,ev=["pointerdown","keydown","scroll","touchstart"];function go(){if(done)return;done=true;ev.forEach(function(n){removeEventListener(n,go)});
              posthog.init("phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs",{api_host:"https://us.i.posthog.com",person_profiles:"identified_only",disable_session_recording:!matchMedia("(min-width: 768px)").matches});}
              ev.forEach(function(n){addEventListener(n,go,{once:true,passive:true})});setTimeout(go,8000);};
            try{if(localStorage.getItem("ae-consent")==="granted")window.__aeAnalytics()}catch(e){}
          `}
        </Script>
      </body>
    </html>
  );
}
