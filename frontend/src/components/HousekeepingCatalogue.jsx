"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MagnifyingGlass, Check, X, ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { hkSections } from "@/lib/housekeeping";
import { whatsappLink } from "@/lib/site";

const HK_PRODUCT = "Housekeeping Consumables & Equipment"; // matches the enquiry form's product option
const keyOf = (sectionId, it) => `${sectionId}:${it.code}:${it.name}`;
const labelOf = (it) => (it.code ? `${it.code} ${it.name}` : it.name);

// Searchable text catalogue. Tap products to collect them, then send one enquiry listing their codes.
// sections: which catalogue sections to show (all by default). product: the enquiry form option to preselect.
export default function HousekeepingCatalogue({ sections: source = hkSections, product = HK_PRODUCT }) {
  const withNav = source.length > 1;
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState([]); // [{ key, label }]

  const q = query.trim().toLowerCase();
  const sections = useMemo(() => {
    if (!q) return source;
    return source
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((it) => `${it.code} ${it.name} ${sec.title}`.toLowerCase().includes(q)),
      }))
      .filter((sec) => sec.items.length);
  }, [q]);
  const matches = sections.reduce((n, sec) => n + sec.items.length, 0);

  const isPicked = (key) => picked.some((p) => p.key === key);
  const toggle = (key, label) =>
    setPicked((list) => (list.some((p) => p.key === key) ? list.filter((p) => p.key !== key) : [...list, { key, label }]));

  // Which section is on screen, for highlighting it in the section list.
  const [active, setActive] = useState(source[0].id);
  useEffect(() => {
    const els = sections.map((sec) => document.getElementById(sec.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const pickedText = picked.map((p) => p.label).join("; ");
  const enquireHref = `/contact?product=${encodeURIComponent(product)}&range=${encodeURIComponent(pickedText)}#enquiry`;

  return (
    <div className={withNav ? "lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)]" : ""}>
      {/* Desktop: search and section list stay pinned on the left while the catalogue scrolls */}
      {withNav && (
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pb-6">
          <label htmlFor="hk-search" className="sr-only">
            Search products or codes
          </label>
          <div className="relative">
            <MagnifyingGlass size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="hk-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a product or code"
              className="w-full rounded-full bg-surface py-3.5 pr-5 text-[16px] text-ink ring-1 ring-line/15 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ paddingLeft: "3.25rem" }}
            />
          </div>
          {q && (
            <p className="mt-3 text-[14px] text-muted" aria-live="polite">
              {matches ? `${matches} product${matches === 1 ? "" : "s"} found` : "No products match"}
            </p>
          )}
          <nav aria-label="Sections" className="mt-5">
            <ul className="space-y-1">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    aria-current={active === sec.id ? "true" : undefined}
                    className={clsx(
                      "flex items-baseline justify-between gap-3 rounded-2xl px-4 py-2.5 text-[14px] leading-snug transition-colors duration-200",
                      active === sec.id ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-ink/[0.04] hover:text-ink"
                    )}
                  >
                    {sec.title}
                    <span className="shrink-0 text-[12px] tabular-nums opacity-70">{sec.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      )}

      <div className="min-w-0">
        {/* Phones and tablets: search and section chips stay pinned at the top */}
        <div className={clsx("sticky top-24 z-20 -mx-4 bg-bg/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6", withNav && "lg:hidden")}>
          <label htmlFor="hk-search-mobile" className="sr-only">
            Search products or codes
          </label>
          <div className="relative">
            <MagnifyingGlass size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="hk-search-mobile"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a product or code"
              className="w-full rounded-full bg-surface py-3.5 pr-5 text-[16px] text-ink ring-1 ring-line/15 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ paddingLeft: "3.25rem" }}
            />
          </div>
          {q && (
            <p className="mt-3 text-[14px] text-muted" aria-live="polite">
              {matches ? `${matches} product${matches === 1 ? "" : "s"} found` : "No products match"}
            </p>
          )}
          {!q && withNav && (
            <nav aria-label="Sections" className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {source.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  aria-current={active === sec.id ? "true" : undefined}
                  className={clsx(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-[14px] font-medium ring-1 transition-colors",
                    active === sec.id ? "bg-accent-soft text-accent ring-accent/40" : "ring-line/15 hover:bg-ink/[0.05]"
                  )}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          )}
        </div>

      {q && !matches && (
        <div className="mt-10 rounded-shell bg-surface p-8 text-center ring-1 ring-line/10 md:p-12">
          <p className="text-lg font-medium">We could not find “{query}” in this list.</p>
          <p className="mt-2 text-muted">We supply more than the catalogue shows. Ask us and we will tell you if we can source it.</p>
          <div className="mt-6 flex justify-center">
            <a
              href={whatsappLink(`Hi, do you supply ${query}?`)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[15px] font-medium text-accent-ink hover:bg-accent/90"
            >
              <WhatsappLogo size={18} aria-hidden="true" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-16 md:space-y-20 lg:mt-0">
        {sections.map((sec, i) => (
          // content-visibility lets the browser skip layout and paint for sections that are off screen (not the first, which is on screen at load)
          <section
            key={sec.id}
            id={sec.id}
            className="scroll-mt-60 border-t border-line/15 pt-8 lg:scroll-mt-28 lg:first:border-t-0 lg:first:pt-0"
            style={i > 0 ? { contentVisibility: "auto", containIntrinsicSize: "auto 1200px" } : undefined}
            aria-labelledby={`${sec.id}-title`}
          >
            <div>
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 id={`${sec.id}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {sec.title}
                </h2>
                <p className="mt-2 text-[15px] text-muted">
                  {sec.items.length} product{sec.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {sec.items.map((it) => {
                  const key = keyOf(sec.id, it);
                  const on = isPicked(key);
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => toggle(key, labelOf(it))}
                        aria-pressed={on}
                        className={clsx(
                          "group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left ring-1 transition-[box-shadow,background-color] duration-300",
                          on ? "bg-accent-soft ring-2 ring-accent" : "bg-surface ring-line/10 hover:ring-line/25"
                        )}
                      >
                        <span className="relative block aspect-square bg-white">
                          {it.img && (
                            // Small pre-compressed webp files: served as-is, which keeps 300 srcset lists out of the HTML. The product name is the button text, so alt stays empty.
                            <Image src={it.img} alt="" width={240} height={240} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-500 ease-snap group-hover:scale-[1.04]" />
                          )}
                          <span
                            className={clsx(
                              "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full ring-1 transition-colors",
                              on ? "bg-accent text-accent-ink ring-accent" : "bg-white/90 text-transparent ring-black/15"
                            )}
                            aria-hidden="true"
                          >
                            <Check size={14} weight="bold" />
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col gap-1 p-3">
                          {it.code && <span className="text-[12px] font-semibold tabular-nums tracking-wide text-accent">{it.code}</span>}
                          <span className="text-[14px] leading-snug">{it.name}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* Enquiry tray */}
      {picked.length > 0 && (
        <div className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-2xl md:bottom-6" role="region" aria-label="Selected products">
          <div className="flex items-center gap-2 rounded-full bg-[#131816] p-2 pl-4 sm:gap-3 sm:p-3 sm:pl-5 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            <p className="mr-auto flex items-center gap-1 whitespace-nowrap text-[14px] sm:text-[15px]">
              <span className="font-semibold">{picked.length}</span> selected
              <button type="button" onClick={() => setPicked([])} aria-label="Clear selection" className="ml-2 inline-flex items-center gap-1 text-white/60 hover:text-white sm:ml-3">
                <X size={14} aria-hidden="true" /> <span className="hidden sm:inline">Clear</span>
              </button>
            </p>
            <a
              href={whatsappLink(`Hi, I'd like a quote for: ${pickedText}`)}
              target="_blank"
              rel="noopener"
              aria-label="Send selection on WhatsApp"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 p-2.5 text-[14px] font-medium ring-1 ring-white/20 hover:bg-white/20 sm:px-4"
            >
              <WhatsappLogo size={16} aria-hidden="true" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link href={enquireHref} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#5CBF9C] px-4 py-2.5 sm:px-5 text-[14px] font-medium text-[#0C0F0E] hover:bg-[#5CBF9C]/90">
              Enquire <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
