"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

// A belt of photo cards drifting sideways, looping without a seam. Pauses on hover and while off screen;
// under reduced motion it becomes a row you can scroll by hand. Photos load as they approach the screen.
// items: [{ image, alt, fit? }]  ("contain" shows a portrait photo whole on a blurred copy of itself)
// Phones show only the first PHONE photos (the rest are hidden and never downloaded), which keeps the page light on 4G.
const PHONE = 16;

export default function PhotoMarquee({ items, label, seconds = 4 }) {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "100px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const row = [...items, ...items];
  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
    >
      <ul
        className={clsx(
          "marquee-row flex w-max animate-marquee gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-4 md:pr-4",
          !onScreen && "[animation-play-state:paused]"
        )}
        // Same speed whatever the number of photos: a few seconds per photo (phones loop over fewer photos)
        style={{ "--dur-sm": `${Math.min(items.length, PHONE) * seconds}s`, "--dur-lg": `${items.length * seconds}s`, animationDuration: "var(--marquee-dur)" }}
      >
        {row.map((it, i) => {
          const copy = i >= items.length;
          const phoneHidden = i % items.length >= PHONE;
          return (
            <li key={`${it.image}-${i}`} aria-hidden={copy ? "true" : undefined} className={clsx("shrink-0", copy && "motion-reduce:hidden", phoneHidden && "max-md:hidden")}>
              <div className="shell">
                <div className="core relative aspect-[3/2] w-64 overflow-hidden bg-[#0C0F0E] sm:w-80 md:w-[26rem]">
                  {it.fit === "contain" && (
                    <Image src={it.image} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 416px, 320px" className="scale-110 object-cover opacity-60 blur-2xl" />
                  )}
                  <Image
                    src={it.image}
                    alt={copy ? "" : it.alt}
                    fill
                    sizes="(min-width: 768px) 416px, 320px"
                    className={it.fit === "contain" ? "object-contain" : "object-cover"}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
