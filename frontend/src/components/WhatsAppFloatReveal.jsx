"use client";

import { useEffect } from "react";

// The floating WhatsApp button (tablet and desktop) waits while the visitor is still at the top of the page, then
// slides up once when they start scrolling (or after a few seconds, for short pages) and stays.
// Without JavaScript it is simply visible from the start.
export default function WhatsAppFloatReveal() {
  useEffect(() => {
    const el = document.querySelector(".wa-float");
    if (!el || window.scrollY > 200) return;
    el.setAttribute("data-wait", "");
    let timer;
    const show = () => {
      el.removeAttribute("data-wait");
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
    const onScroll = () => window.scrollY >= 200 && show();
    window.addEventListener("scroll", onScroll, { passive: true });
    timer = setTimeout(show, 4000);
    return show;
  }, []);
  return null;
}
