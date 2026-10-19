"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Real kits as a shuffling card stack. Auto-advances, tap/click to flip, pauses on hover.
const SLOTS = [
  { x: "0%", y: 0, rotate: 1.5, scale: 1 },
  { x: "-24%", y: 26, rotate: -4, scale: 0.9 },
  { x: "-40%", y: 52, rotate: -8, scale: 0.8 },
  { x: "-48%", y: 70, rotate: -10, scale: 0.72 },
];

export default function HeroStack({ items }) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(next, 4200);
    return () => clearInterval(t);
  }, [reduce, paused]);


  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <motion.div style={{ y: lift }} className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
        {items.map((it, i) => {
          const pos = order.indexOf(i);
          const slot = SLOTS[Math.min(pos, SLOTS.length - 1)];
          return (
            <motion.button
              key={it.image}
              type="button"
              onClick={next}
              aria-label={pos === 0 ? `Showing ${it.alt}. Show next photo` : undefined}
              tabIndex={pos === 0 ? 0 : -1}
              aria-hidden={pos === 0 ? undefined : true}
              className="shell absolute right-0 top-0 w-[78%] cursor-pointer text-left"
              style={{ zIndex: items.length - pos, transformOrigin: "bottom right" }}
              initial={false}
              animate={{ x: slot.x, y: slot.y, rotate: slot.rotate, scale: slot.scale, opacity: pos > 3 ? 0 : 1 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
            >
              <span className="core relative block aspect-[3/4] overflow-hidden">
                <Image src={it.image} alt={it.alt} fill priority={i === 0} sizes="(min-width: 768px) 40vw, 80vw" className="object-cover" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>
      <div className="mt-6 flex items-center justify-center gap-3 md:justify-end">
        <span className="flex gap-1.5" aria-hidden="true">
          {items.map((it, i) => (
            <span key={it.image} className={`h-1.5 rounded-full transition-all duration-200 ease-snap ${order[0] === i ? "w-6 bg-accent" : "w-1.5 bg-ink/20"}`} />
          ))}
        </span>
      </div>
    </div>
  );
}
