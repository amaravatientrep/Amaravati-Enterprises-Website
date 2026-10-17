"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// Image drifts slightly inside its frame as the page scrolls, for depth.
export default function ParallaxImage({ className, amount = 8, ...img }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[-10%]" style={reduce ? undefined : { y }}>
        <Image {...img} fill className={className} />
      </motion.div>
    </div>
  );
}
