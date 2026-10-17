"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "motion/react";

// Gentle 3D tilt toward the cursor plus a soft spotlight. Mouse/pen only; touch and reduced motion stay flat.
export default function TiltCard({ children, className, max = 5 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 20, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const lx = useTransform(px, (v) => `${v * 100}%`);
  const ly = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${lx} ${ly}, rgb(255 255 255 / 0.16), transparent 60%)`;
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={`relative h-full [transform-style:preserve-3d] ${className || ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glowOpacity.set(1);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        glowOpacity.set(0);
      }}
    >
      {children}
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-1.5 z-10 rounded-core" style={{ background: glow, opacity: glowOpacity }} />
    </motion.div>
  );
}
