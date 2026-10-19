"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

// Short confirmations ("Preview saved", "Opening the brochure…"). Call toast("…") from anywhere in the browser;
// one message at a time, read out by screen readers, gone after a few seconds.
export function toast(message) {
  window.dispatchEvent(new CustomEvent("ae-toast", { detail: message }));
}

export default function Toaster() {
  const [msg, setMsg] = useState(null);
  const [n, setN] = useState(0);
  const timer = useRef();

  useEffect(() => {
    const show = (e) => {
      setMsg(e.detail);
      setN((x) => x + 1);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 3500);
    };
    window.addEventListener("ae-toast", show);
    return () => {
      window.removeEventListener("ae-toast", show);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-3 top-24 z-[90] flex justify-center">
      {msg && (
        <p key={n} className="anim-tray flex items-center gap-2 rounded-full bg-[#131816] px-4 py-3 text-[14px] text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
          <CheckCircle size={18} className="shrink-0 text-[#5CBF9C]" aria-hidden="true" />
          {msg}
        </p>
      )}
    </div>
  );
}
