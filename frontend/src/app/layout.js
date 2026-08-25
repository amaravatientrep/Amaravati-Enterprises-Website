import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.amaravatienterprises.com"),
  title: "Amaravati Enterprises — Premium Hospitality Supplies Across India",
  description:
    "Premium hospitality supplies for hotels, resorts, and boutique stays across India — toiletries, housekeeping essentials, kitchen consumables, and more. Based in Hyderabad.",
  alternates: {
    canonical: "https://www.amaravatienterprises.com/",
  },
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Amaravati Enterprises — Premium Hospitality Supplies",
    description:
      "Elevating guest experiences with premium hospitality supplies delivered with consistency and elegance.",
    type: "website",
    url: "https://www.amaravatienterprises.com",
    siteName: "Amaravati Enterprises",
    locale: "en_IN",
    images: [
      {
        url: "https://www.amaravatienterprises.com/amaravati-logo.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Amaravati Enterprises — Premium Hospitality Supplies",
    description:
      "Elevating guest experiences with premium hospitality supplies delivered with consistency and elegance.",
    images: ["https://www.amaravatienterprises.com/amaravati-logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Amaravati Enterprises",
  description:
    "Premium hospitality supplies for hotels, resorts, and boutique stays across India — toiletries, housekeeping essentials, kitchen consumables, and more.",
  url: "https://www.amaravatienterprises.com",
  telephone: "+91-94946-00101",
  email: "amaravatienterprises.info@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "C3, Banjara Gardens, Banjara Hills, Rd No 12",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500034",
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#c9a961" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es \$s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init("phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs",{api_host:"https://us.i.posthog.com",person_profiles:"identified_only",session_recording:{recordCrossOriginIframes:!0,capturePerformance:!1}});
          `}
        </Script>
      </body>
    </html>
  );
}
