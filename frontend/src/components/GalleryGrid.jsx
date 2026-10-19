"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

// Filterable photo wall with a simple full-screen viewer (arrow keys, Esc, swipe-free buttons).
// groups: [{ id, label, items: [{ src, alt, w, h }] }]
export default function GalleryGrid({ groups }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null); // index into `shown`
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const shown = filter === "all" ? groups.flatMap((g) => g.items) : groups.find((g) => g.id === filter).items;
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const show = (i, el) => {
    lastFocus.current = el;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, step]);

  const current = open === null ? null : shown[open];

  return (
    <>
      <div role="group" aria-label="Filter photos" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {[{ id: "all", label: "All", count: total }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.items.length }))].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={clsx(
              "shrink-0 rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]",
              filter === f.id ? "bg-accent text-accent-ink ring-accent" : "bg-surface ring-line/15 hover:bg-ink/[0.05]"
            )}
          >
            {f.label} <span className="ml-1 tabular-nums opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Masonry: photos keep their own shape */}
      <ul className="mt-6 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>li]:mb-3">
        {shown.map((it, i) => (
          <li key={it.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => show(i, e.currentTarget)}
              className="group block w-full overflow-hidden rounded-2xl bg-sunk ring-1 ring-line/10"
              aria-label={`View photo: ${it.alt}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="anim-viewer fixed inset-0 z-[70] flex flex-col bg-[#0B0E0D] text-white" onClick={close}>
          <div className="flex items-center justify-between gap-3 p-4">
            <p className="text-[14px] tabular-nums text-white/70">
              {open + 1} / {shown.length}
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/20">
              <X size={20} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-4" onClick={(e) => e.stopPropagation()}>
            {/* Served as is: the files are already web-sized, so the viewer never waits on resizing */}
            <Image key={current.src} src={current.src} alt={current.alt} fill unoptimized className="anim-photo object-contain" />
          </div>
          <div className="flex items-center justify-between gap-3 p-4" onClick={(e) => e.stopPropagation()}>
            <p className="min-w-0 truncate text-[14px] text-white/80">{current.alt}</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/20">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#131816] hover:bg-white/90">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
