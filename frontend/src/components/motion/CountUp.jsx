"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts "1000+" up from 0 when it scrolls into view. Writes to the DOM directly (no re-renders).
export default function CountUp({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^[\d,]+/, "");

  useEffect(() => {
    if (!inView || reduce || !ref.current || Number.isNaN(target)) return;
    const el = ref.current;
    const controls = animate(0, target, {
      duration: target > 100 ? 1.8 : 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-IN") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
