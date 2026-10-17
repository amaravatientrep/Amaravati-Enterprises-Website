"use client";

import { motion, useReducedMotion } from "motion/react";

// Words rise out of a mask one after another. Text stays real text for SEO and screen readers.
export default function AnimatedWords({ text, as = "h1", className, delay = 0, inView = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }
  const trigger = inView ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" };
  return (
    <Tag className={className} initial="hide" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hide: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
