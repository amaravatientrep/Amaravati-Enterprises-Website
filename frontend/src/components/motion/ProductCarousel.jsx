"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const DURATION = 2600; // time each photo stays, in ms

// One framed photo at a time with a quick crossfade, a progress line with a counter, and previous/next controls.
export default function ProductCarousel({ items, label = "Our range" }) {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.3 }); // only advance while on screen
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [layer, setLayer] = useState(1); // keeps the incoming slide above the outgoing one, even when wrapping to the first
  const item = items[index];

  // Fetch the next photo while this one shows, so the fade never waits on the network.
  const nextReady = useRef(null);
  useEffect(() => {
    if (!inView) return;
    const img = new window.Image();
    img.src = items[(index + 1) % items.length].image;
    nextReady.current = img.decode().catch(() => {});
  }, [index, inView, items]);

  const go = (step) => {
    setIndex((i) => (i + step + items.length) % items.length);
    setLayer((l) => l + 1);
  };

  useEffect(() => {
    if (reduce || paused || !inView) return;
    let cancelled = false;
    // Move on after the hold time, but never before the next photo is ready (slow connections).
    const t = setTimeout(async () => {
      await nextReady.current;
      if (!cancelled) go(1);
    }, DURATION);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [index, paused, reduce, inView]);

  return (
    <div
      ref={rootRef}
      className="shell"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="core relative aspect-[3/2] overflow-hidden bg-[#0C0F0E]" aria-roledescription="carousel" aria-label={label}>
        <div className="absolute inset-0 isolate">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.image}
            className="absolute inset-0"
            style={{ zIndex: layer }}
            // The incoming photo fades in over the outgoing one, which only clears once covered: no dark dip between slides.
            initial={reduce ? false : { opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }, scale: { duration: 3.2, ease: [0.25, 0.1, 0.25, 1] } } }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: reduce ? 0 : 0.6 } }}
          >
            {item.fit === "contain" ? (
              // Portrait photos are shown whole, over a blurred, dimmed copy that fills the wide frame
              <>
                <Image src={item.image} alt="" aria-hidden="true" fill className="scale-110 object-cover opacity-60 blur-2xl" unoptimized />
                <Image src={item.image} alt={item.alt} fill className="object-contain" priority={index === 0} unoptimized />
              </>
            ) : (
              <Image src={item.image} alt={item.alt} fill className="object-cover" priority={index === 0} unoptimized />
            )}
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Caption shade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C0F0E]/85 via-[#0C0F0E]/35 to-transparent" />

        {/* Progress: one line for the current photo, plus a counter (there are many photos) */}
        <div className="absolute inset-x-5 top-5 flex items-center gap-3 md:inset-x-6 md:top-6" aria-hidden="true">
          <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <motion.span
              key={`p-${index}`}
              className="block h-full origin-left rounded-full bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: reduce || paused ? 0.0001 : 1 }}
              transition={!reduce && !paused ? { duration: DURATION / 1000, ease: "linear" } : { duration: 0 }}
            />
          </span>
          <span className="shrink-0 rounded-full bg-black/35 px-2 py-0.5 text-[12px] font-medium tabular-nums text-white backdrop-blur-sm">
            {index + 1} / {items.length}
          </span>
        </div>

        {/* Caption + controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-4 p-5 text-white md:p-6">
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20 active:scale-[0.96]"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#131816] transition-colors hover:bg-white/90 active:scale-[0.96]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
