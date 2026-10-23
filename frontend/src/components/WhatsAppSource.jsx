"use client";

import { useEffect } from "react";
import { toast } from "./Toaster";

// Conversion tracking for every contact link on the site, by page:
// - WhatsApp: the pre-filled message gets a last line naming the page it was sent from, and the tap is counted;
// - phone calls, emails, brochure downloads and "Get a quote" taps are counted too.
// Counts go to visitor statistics only if the visitor accepted them in the cookie banner.
const kinds = [
  ["whatsapp_click", (h) => h.includes("wa.me/")],
  ["phone_click", (h) => h.startsWith("tel:")],
  ["email_click", (h) => h.startsWith("mailto:")],
  ["brochure_download", (h) => /\.pdf($|\?)/i.test(h)],
  ["quote_click", (h) => /\/contact(\?|#|$)/.test(h)],
];

export default function WhatsAppSource() {
  useEffect(() => {
    // JavaScript is running, so scroll-in sections can animate (see the fallback in layout.js)
    window.__aeReady = true;
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const kind = kinds.find(([, test]) => test(href))?.[0];
      if (!kind) return;
      const page = document.title.split(" | ")[0] || location.pathname;
      if (kind === "whatsapp_click") {
        try {
          const url = new URL(a.href);
          const text = url.searchParams.get("text") || "";
          if (!text.includes("(From the website:")) {
            url.searchParams.set("text", `${text}\n\n(From the website: ${page})`.trim());
            a.href = url.toString();
          }
        } catch {}
      }
      if (kind === "brochure_download") toast("Opening the brochure…");
      window.posthog?.capture?.(kind, { page: location.pathname, page_title: page, link: kind === "brochure_download" ? href : undefined });
    };
    // Capture phase, so the WhatsApp link is updated before the browser follows it
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
