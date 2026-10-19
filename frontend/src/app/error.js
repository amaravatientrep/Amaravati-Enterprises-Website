"use client";

import { ArrowCounterClockwise, WhatsappLogo } from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";

// Shown if a page fails to load or crashes, in place of a blank screen; the header and footer stay.
export default function Error({ reset }) {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col items-start justify-center pt-28">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Something went wrong.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">This page didn&rsquo;t load properly. Please try again, or message us and we&rsquo;ll help straight away.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-ink transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <ArrowCounterClockwise size={18} aria-hidden="true" /> Try again
        </button>
        <a
          href={whatsappLink("Hi, a page on your website didn't load. Can you help?")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink/[0.05] px-6 py-3 text-[15px] font-medium ring-1 ring-line/10 transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <WhatsappLogo size={18} aria-hidden="true" /> WhatsApp us
        </a>
      </div>
    </section>
  );
}
