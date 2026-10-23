"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, WhatsappLogo, Pause, Play } from "@phosphor-icons/react";
import ButtonLink from "../Button";
import Magnetic from "./Magnetic";
import { whatsappLink } from "@/lib/site";

// Full-screen background video with the headline over it. The poster shows instantly;
// the video (desktop or phone cut) loads after. Skipped for reduced motion, data saver or a slow (2G/3G) connection.
export default function HeroVideo() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    const slow = /(^|-)(2g|3g)$/.test(navigator.connection?.effectiveType ?? "");
    if (reduce || saveData || slow) {
      setPlaying(false);
      return;
    }
    // Start the download only once the page itself has loaded, so the video never competes with it on 4G
    let timer;
    const start = () => {
      timer = setTimeout(() => setSrc(window.matchMedia("(min-width: 768px)").matches ? "/videos/hero-desktop.mp4" : "/videos/hero-mobile.mp4"), 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="relative isolate min-h-screen supports-[min-height:100svh]:min-h-[100svh] overflow-hidden bg-[#0C0F0E] text-white">
      {/* Media: full-bleed on phones; on desktop it sits right of the headline, its left edge fading into the dark ground (a gradient, since Chrome ignores masks on video) */}
      <div className="absolute inset-0 -z-10 md:left-[26%]">
        <Image src="/videos/hero-desktop-poster.jpg" alt="" fill priority sizes="75vw" className="hidden object-cover md:block" />
        <Image src="/videos/hero-mobile-poster.jpg" alt="" fill priority sizes="100vw" className="object-cover md:hidden" />
        {src && (
          <video
            ref={ref}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className="absolute inset-y-0 -left-1 hidden w-2/5 bg-gradient-to-r from-[#0C0F0E] via-[#0C0F0E]/60 to-transparent md:block" />
      </div>
      {/* Readability shade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0C0F0E] from-15% via-[#0C0F0E]/65 via-50% to-[#0C0F0E]/25 md:from-0% md:via-50% md:bg-gradient-to-r md:from-[#0C0F0E]/70 md:via-[#0C0F0E]/10 md:to-transparent" />

      <div className="container-x flex min-h-screen supports-[min-height:100svh]:min-h-[100svh] flex-col justify-end pb-28 pt-28 md:justify-center md:pb-0">
        <div className="max-w-6xl">
          <h1 className="hero-rise font-display text-[clamp(1rem,4.6vw,3.4rem)] font-semibold uppercase leading-[1.25] tracking-[0.02em]">
            <span className="block">Complete Hospitality Solutions</span>
            <span className="block">for Modern Hospitality</span>
          </h1>
          <div className="hero-rise [animation-delay:150ms]">
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-white/85 md:text-xl">
              Your one-stop shop for all hospitality needs, from Hotel Toiletries, Guest Amenities, Shampoo Dispensers and In-Room Amenities to Housekeeping Tools &amp; Consumables. Delivering quality and convenience to hotels across India.
            </p>
            {/* Phones: two equal buttons in one row */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Magnetic className="block sm:inline-block">
                <ButtonLink fill href="/contact#enquiry" icon={ArrowRight} className="!bg-white !text-[#131816] hover:!bg-white/90">
                  Get a quote
                </ButtonLink>
              </Magnetic>
              <Magnetic className="block sm:inline-block">
                <ButtonLink
                  fill
                  href={whatsappLink("Hi, I'd like a quote for hotel amenities.")}
                  external
                  icon={WhatsappLogo}
                  variant="ghost"
                  className="!bg-white/10 !text-white !ring-white/25 backdrop-blur-md hover:!bg-white/20"
                >
                  WhatsApp us
                </ButtonLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {src && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute right-4 top-24 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 md:bottom-8 md:right-24 md:top-auto"
        >
          {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
        </button>
      )}
    </section>
  );
}
