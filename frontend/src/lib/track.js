import { track } from "@vercel/analytics";

// One call counts a conversion in both tools: Vercel Analytics (custom events, paid plans only) and Google
// Analytics 4. GA4 only receives it when the visitor accepted the cookie banner: window.gtag exists only after
// consent (see layout.js), and withdrawing consent sets ga-disable, which makes gtag drop the event.
export function trackEvent(name, params = {}) {
  track(name, params);
  try {
    if (window.__aeAnalyticsOn && typeof window.gtag === "function") {
      const { page_title, ...rest } = params; // GA4 already records the page; page_title would overwrite its title
      window.gtag("event", name, { ...rest, source_page: location.pathname });
    }
  } catch {}
}
