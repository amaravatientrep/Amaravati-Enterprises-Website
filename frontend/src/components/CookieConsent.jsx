"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { X } from "@phosphor-icons/react";

const KEY = "ae-consent"; // "granted" | "denied"

function read() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return "denied"; // storage blocked: behave as declined, and don't ask on every page
  }
}

function save(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {}
  if (value === "granted") window.__aeAnalytics?.();
  else window.posthog?.opt_out_capturing?.();
}

// Cookie banner and preferences. Visitor statistics (PostHog) start only after "Accept"; the choice is remembered,
// and the footer's "Cookie settings" link (or any element firing "ae-cookie-settings") reopens the preferences.
export default function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [panel, setPanel] = useState(false);
  const [stats, setStats] = useState(false);

  useEffect(() => {
    if (!read()) setBanner(true);
    const open = () => {
      setStats(read() === "granted");
      setPanel(true);
    };
    window.addEventListener("ae-cookie-settings", open);
    return () => window.removeEventListener("ae-cookie-settings", open);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e) => e.key === "Escape" && setPanel(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel]);

  const choose = (value) => {
    save(value);
    setBanner(false);
    setPanel(false);
  };

  return (
    <>
      {banner && !panel && (
        <div role="region" aria-label="Cookie notice" className="anim-tray fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl md:bottom-6 md:left-6 md:right-auto md:mx-0">
          <div className="rounded-3xl bg-[#131816] p-4 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:p-5">
            <p className="text-[14px] leading-relaxed text-white/85">
              We use cookies for anonymous visitor statistics, to see which pages help hotels most.{" "}
              <Link href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                Privacy Notice
              </Link>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => choose("granted")} className="rounded-full bg-[#5CBF9C] px-5 py-2.5 text-[14px] font-medium text-[#0A1A14] transition-transform duration-150 ease-out active:scale-[0.97]">
                Accept
              </button>
              <button type="button" onClick={() => choose("denied")} className="rounded-full bg-white/10 px-5 py-2.5 text-[14px] font-medium ring-1 ring-white/20 transition-transform duration-150 ease-out hover:bg-white/15 active:scale-[0.97]">
                Decline
              </button>
              <button
                type="button"
                onClick={() => {
                  setStats(false);
                  setPanel(true);
                }}
                className="rounded-full px-4 py-2.5 text-[14px] font-medium text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {panel && (
        <div className="anim-viewer fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={() => setPanel(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            className="anim-tray w-full max-w-md rounded-3xl bg-surface p-5 text-ink shadow-xl ring-1 ring-line/10 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-title" className="text-xl font-semibold tracking-tight">
                Cookie settings
              </h2>
              <button type="button" onClick={() => setPanel(false)} aria-label="Close" className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/[0.05]">
                <X size={18} />
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start justify-between gap-4 rounded-2xl bg-sunk p-4">
                <span>
                  <span className="block font-medium">Necessary</span>
                  <span className="mt-1 block text-[14px] leading-snug text-muted">Keeps the site working and remembers this choice. Always on.</span>
                </span>
                <span className="shrink-0 text-[13px] font-medium text-muted">Always on</span>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-2xl bg-sunk p-4">
                <span>
                  <span id="stats-label" className="block font-medium">
                    Visitor statistics
                  </span>
                  <span className="mt-1 block text-[14px] leading-snug text-muted">Anonymous counts of pages visited and buttons tapped (PostHog). Never sold or shared.</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={stats}
                  aria-labelledby="stats-label"
                  onClick={() => setStats((v) => !v)}
                  className={clsx("relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors duration-150", stats ? "bg-accent" : "bg-ink/20")}
                >
                  <span className={clsx("absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ease-out", stats ? "translate-x-6" : "translate-x-1")} />
                </button>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => choose(stats ? "granted" : "denied")} className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-ink transition-transform duration-150 ease-out active:scale-[0.97]">
                Save choices
              </button>
              <button type="button" onClick={() => choose("granted")} className="rounded-full bg-ink/[0.05] px-5 py-2.5 text-[14px] font-medium ring-1 ring-line/10 transition-transform duration-150 ease-out active:scale-[0.97]">
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Footer link that reopens the preferences panel.
export function CookieSettingsLink({ className }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("ae-cookie-settings"))} className={className}>
      Cookie settings
    </button>
  );
}
