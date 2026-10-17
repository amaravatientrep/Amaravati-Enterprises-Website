"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const INTERVAL = 3000;

// Horizontal, swipeable row of captioned photos with arrow controls.
// Advances one photo every few seconds and loops; pauses on hover, touch or focus, and stays still under reduced motion.
// perView: "four" (default) or "three" cards across on desktop; aspect: "square" or "portrait".
export default function StripCarousel({ items, label, captions = true, perView = "four", aspect = "square" }) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  function step(dir) {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const by = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * by, behavior: "smooth" });
  }

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => step(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <li key={it.src} className={`w-[68%] shrink-0 snap-start sm:w-[42%] ${perView === "three" ? "lg:w-[calc((100%-2rem)/3)]" : "lg:w-[calc((100%-3rem)/4)]"}`}>
            <figure>
              <div className="shell">
                <div className={`core relative overflow-hidden ${aspect === "portrait" ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image src={it.src} alt={captions ? `${label}: ${it.label}` : label} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 68vw" className="object-cover" />
                </div>
              </div>
              {captions && <figcaption className="mt-3 text-[15px] font-medium">{it.label}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Scroll back"
          className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line/20 transition-colors hover:bg-sunk active:scale-[0.96]"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Scroll forward"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink transition-opacity hover:opacity-90 active:scale-[0.96]"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
