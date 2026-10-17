"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DURATION = 5000;

// Large slideshow with every photo as a thumbnail down the left (a row underneath on phones).
// Auto-advances with a slow crossfade; pauses on hover or focus; a thumbnail jumps straight to its photo.
export default function ShowcaseSlideshow({ items, label }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [layer, setLayer] = useState(1);
  const [paused, setPaused] = useState(false);
  const item = items[index];

  function show(i) {
    setIndex(i);
    setLayer((l) => l + 1);
  }

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => show((index + 1) % items.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce]);

  return (
    <div
      className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,6fr)] md:gap-4"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Thumbnails */}
      <ul className="order-2 grid grid-cols-5 gap-2 md:order-1 md:grid-cols-1 md:gap-3" aria-label={`${label}: choose a photo`}>
        {items.map((it, i) => (
          <li key={it.src}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`Show ${it.alt}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative block aspect-[3/2] w-full overflow-hidden rounded-xl transition-[opacity,box-shadow] duration-500 ease-out ${
                i === index ? "opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-55 hover:opacity-90"
              }`}
            >
              <Image src={it.src} alt="" fill sizes="(min-width: 768px) 12vw, 20vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      {/* Main photo */}
      <div className="shell order-1 md:order-2">
        <div className="core relative aspect-[3/2] overflow-hidden bg-[#0C0F0E] md:aspect-auto md:h-[min(82vh,860px)]" aria-roledescription="carousel" aria-label={label}>
          <div className="absolute inset-0 isolate">
            <AnimatePresence initial={false}>
              <motion.div
                key={item.src}
                className="absolute inset-0"
                style={{ zIndex: layer }}
                initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] }, scale: { duration: 7, ease: [0.25, 0.1, 0.25, 1] } } }}
                exit={{ opacity: 0, transition: { duration: 0.4, delay: reduce ? 0 : 1.4 } }}
              >
                <Image src={item.src} alt={item.alt} fill priority={index === 0} sizes="(min-width: 768px) 80vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
