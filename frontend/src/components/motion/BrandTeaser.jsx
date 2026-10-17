"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import { ProductScene } from "../BrandingMockups";
import { swatchFromHex } from "@/lib/logoTools";

// Example names (illustrative, not clients) type themselves onto the products while the label colour changes.
const DEMO = [
  { name: "Your Hotel", color: "#0E5A47" },
  { name: "Lakeview Inn", color: "#1C2F5A" },
  { name: "Grand Residency", color: "#6B1E2C" },
  { name: "Palm Court", color: "#E6D8BF" },
  { name: "Hotel Ananda", color: "#24292B" },
];

export default function BrandTeaser() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // Typing redraws the whole product scene, so it only runs while the teaser is on screen
  const inView = useInView(ref, { amount: 0.3 });
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(DEMO[0].name);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = idx;
    let chars = typed.length; // resume where it paused
    let deleting = false;
    let hold = 0;
    const t = setInterval(() => {
      const full = DEMO[i].name;
      if (!deleting) {
        if (chars < full.length) chars++;
        else if (++hold > 14) deleting = true;
      } else if (chars > 0) chars--;
      else {
        deleting = false;
        hold = 0;
        i = (i + 1) % DEMO.length;
        setIdx(i);
      }
      setTyped(DEMO[i].name.slice(0, chars));
    }, 90);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, inView]);

  const sw = swatchFromHex(DEMO[idx].color);
  const name = typed || " ";

  return (
    <Link ref={ref} href="/custom-branding#try" className="shell group block">
      <span className="core relative grid items-center gap-6 overflow-hidden bg-surface p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10 sm:p-7">
        {/* Full range at true relative size, on its own panel so the scene and text read as one balanced card */}
        <span className="flex justify-center rounded-[1.1rem] bg-sunk/70 p-4 sm:p-6" aria-hidden="true">
          <span className="block drop-shadow-[0_12px_14px_rgba(0,0,0,0.14)]">
            <ProductScene view="all" sw={sw} name={name} scale={0.9} />
          </span>
        </span>
        {/* Text, right of the products */}
        <span className="flex flex-col justify-center gap-3">
          <span className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">Try it with your logo</span>
          <span className="text-[15px] leading-relaxed text-muted">Upload your logo and see it on our whole amenity range in seconds.</span>
          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-accent">
            Open the preview tool
            <ArrowUpRight size={18} className="transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </span>
    </Link>
  );
}
