"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DURATION = 5000;

// Large photo (or crossfading slideshow) with a numbered product list over one side.
// On phones the list sits below the photo so nothing covers the products.
export default function FeatureBanner({ id, title, images, items, side = "left" }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [layer, setLayer] = useState(1);
  const many = images.length > 1;

  useEffect(() => {
    if (!many || reduce) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      setLayer((l) => l + 1);
    }, DURATION);
    return () => clearTimeout(t);
  }, [index, many, reduce, images.length]);

  const right = side === "right";
  const img = images[index];

  return (
    <div className="shell">
      <div className="core relative overflow-hidden">
        <div className="relative isolate aspect-[4/3] md:aspect-[3/2]" aria-roledescription={many ? "carousel" : undefined}>
          <div className="absolute inset-0 isolate">
          <AnimatePresence initial={false}>
            <motion.div
              key={img.src}
              className="absolute inset-0"
              style={{ zIndex: layer }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.4, delay: reduce ? 0 : 1.4 } }}
            >
              <Image src={img.src} alt={img.alt} fill priority={index === 0} sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          </div>
          <div
            className={`absolute inset-0 z-[1] hidden md:block ${
              right ? "bg-gradient-to-l" : "bg-gradient-to-r"
            } from-[#0C0F0E]/85 via-[#0C0F0E]/45 to-transparent`}
          />
          {many && (
            <div className={`absolute bottom-4 z-[2] flex gap-1.5 ${right ? "left-5" : "right-5"}`} aria-hidden="true">
              {images.map((im, i) => (
                <span key={im.src} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          )}
        </div>
        <div
          className={`bg-[#0C0F0E] p-6 text-white md:absolute md:inset-y-0 md:z-[2] md:flex md:w-[44%] md:flex-col md:justify-center md:bg-transparent md:p-10 lg:p-12 ${
            right ? "md:right-0" : "md:left-0"
          }`}
        >
          <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] md:mt-6 md:grid-cols-1 md:gap-y-2 lg:mt-8 lg:gap-y-3 lg:text-lg">
            {items.map((it, i) => (
              <li key={it} className="flex items-baseline gap-3">
                <span className="w-6 shrink-0 text-[13px] font-semibold tabular-nums text-[#5CBF9C] lg:text-sm">{String(i + 1).padStart(2, "0")}</span>
                {it}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
