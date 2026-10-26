"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const DURATION = 3000;

// Small crossfade. Advances only while on screen and without reduced motion; the dots pick a photo.
// images: [src], label: what the photos show. scene: full-bleed photos (4:3); otherwise square cutouts on white.
// Photos go through the image optimiser (phone-sized WebP/AVIF), and only the showing photo and the next one
// are fetched, so a slideshow costs one small photo on page load instead of all of them at full size.
export default function MiniSlideshow({ images, label, offset = 0, scene = false }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0]));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || images.length < 2) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, [images.length]);

  useEffect(() => {
    if (!running) return;
    // Fetch the next photo during this one's turn, so it is ready when it fades in
    const next = (index + 1) % images.length;
    setLoaded((s) => (s.has(next) ? s : new Set(s).add(next)));
    // offset staggers neighbouring slideshows so they do not all change at once
    const t = setTimeout(() => setIndex(next), DURATION + offset);
    return () => clearTimeout(t);
  }, [running, index, images.length, offset]);

  const show = (i) => {
    setLoaded((s) => (s.has(i) ? s : new Set(s).add(i)));
    setIndex(i);
  };

  return (
    <div ref={ref} className={clsx("relative overflow-hidden rounded-2xl", scene ? "aspect-[4/3] bg-[#0C0F0E]" : "aspect-square bg-white")} role="group" aria-roledescription="slideshow" aria-label={label}>
      {images.map((src, i) =>
        loaded.has(i) ? (
          <Image
            key={src}
            src={src}
            alt={i === index ? label : ""}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className={clsx("transition-opacity duration-700 ease-out", scene ? "object-cover" : "object-contain p-5 mix-blend-multiply", i === index ? "opacity-100" : "opacity-0")}
          />
        ) : null
      )}
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span className={clsx("block h-1.5 rounded-full transition-all duration-300", i === index ? "w-4 bg-white" : "w-1.5 bg-white/50", !scene && (i === index ? "!bg-[#0E5A47]" : "!bg-black/25"))} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
