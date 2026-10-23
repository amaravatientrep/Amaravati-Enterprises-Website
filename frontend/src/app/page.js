import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PenNib, Stamp, Truck } from "@phosphor-icons/react/dist/ssr";
import ButtonLink from "@/components/Button";
import Reveal from "@/components/Reveal";
import ClientMarquee from "@/components/ClientMarquee";
import BrochureGrid from "@/components/BrochureGrid";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import HeroVideo from "@/components/motion/HeroVideo";
import PhotoMarquee from "@/components/PhotoMarquee";
import showcase from "@/lib/showcase.json";
import { spread } from "@/lib/scenes";
import CountUp from "@/components/motion/CountUp";
import TiltCard from "@/components/motion/TiltCard";
import BrandTeaser from "@/components/motion/BrandTeaser";
import { categories, stats, brandedWork, faqs } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/" },
};

// Range tiles: our categories plus Biotique (partner brand). Order sets the bento placement.
const tileOrder = ["hotel-toiletries","amenity-kits", "purely-serene", "anti-theft-dispensers", "housekeeping", "stationery", "tea-coffee", "biotique", "in-room-amenities", "eco-friendly"];
const rangeTiles = [
  ...categories.map((c) => ({ ...c, href: `/products/${c.slug}` })),
  { slug: "biotique", name: "Biotique Range", short: "Bath and dry amenities for hotel rooms, from single-use bottles and soap to dispensers and refill cans.", href: "/products/biotique" },
].sort((a, b) => tileOrder.indexOf(a.slug) - tileOrder.indexOf(b.slug));

// Mosaic: 6 columns x 8 rows on desktop, every cell filled.
// lg map:  T T T K K K / T T T K K K / T T T P P H / D D B P P H / D D B C C H / D D S C C H / I I I E E E (2 rows)
const bento = {
  "hotel-toiletries": { cls: "col-span-2 md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-3 lg:col-start-1 lg:row-start-1", img: "/images/tiles/hotel-toiletries.jpg", pos: "72% 40%", sizes: "(min-width: 1024px) 50vw, 100vw", big: true },
  "amenity-kits": { cls: "lg:col-span-3 lg:row-span-2 lg:col-start-4 lg:row-start-1", img: "/images/tiles/guest-amenities.jpg", pos: "55% 40%", sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw", text: true },
  "purely-serene": { cls: "lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-3", img: "/images/tiles/purely-serene.jpg", pos: "50% 35%", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  "anti-theft-dispensers": { cls: "md:row-span-2 lg:col-span-2 lg:row-span-3 lg:col-start-1 lg:row-start-4", img: "/images/tiles/dispensers.jpg", pos: "62% 38%", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  housekeeping: { cls: "md:row-span-2 lg:col-span-1 lg:row-span-4 lg:col-start-6 lg:row-start-3", img: "/images/tiles/housekeeping.jpg", pos: "55% 45%", sizes: "(min-width: 1024px) 17vw, (min-width: 768px) 50vw, 100vw" },
  stationery: { cls: "lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:row-start-6", img: "/images/tiles/stationery.jpg", pos: "55% 55%", sizes: "(min-width: 1024px) 17vw, (min-width: 768px) 50vw, 100vw" },
  "tea-coffee": { cls: "lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-5", img: "/images/tiles/tea-coffee.jpg", pos: "50% 45%", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw", text: true },
  "in-room-amenities": { cls: "md:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-1 lg:row-start-7", img: "/images/stationery/leather-products.jpg", sizes: "(min-width: 1024px) 50vw, 100vw", text: true },
  "eco-friendly": { cls: "col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-4 lg:row-start-7", img: "/images/tiles/eco-friendly.jpg", pos: "50% 55%", sizes: "(min-width: 1024px) 50vw, 100vw", text: true },
  biotique: { cls: "md:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-3 lg:row-start-4", img: "/images/tiles/biotique.jpg", pos: "50% 36%", sizes: "(min-width: 1024px) 17vw, 100vw" },
};

// Styled scenes of client kits, tea stations and dispensers (owner's photos placed in hotel rooms), in slide order.
// The client flat-lays (portrait, shown whole) join the scenes; look-alikes are kept apart.
const flatGroup = { "The Park, Hyderabad": "the-park", Clarion: "clarion", "Deccan Serai": "deccan-serai", "trē": "tre", "a hotel client": "white-pouch" };
const flatlays = brandedWork.map((w) => ({ image: w.image, alt: `Branded amenities made for ${w.client}`, fit: "contain", group: flatGroup[w.client], kind: "kit" }));
const productStack = spread([...showcase, ...flatlays], 11);

// The five FAQs shown on the page, as FAQPage schema for Google and AI answers
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.slice(0, 5).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HeroVideo />

      {/* Client logos */}
      <section aria-labelledby="clients-title" className="py-10">
        <div className="container-x">
          <h2 id="clients-title" className="mb-6 text-center text-[15px] text-muted">
            Our Clients
          </h2>
        </div>
        <ClientMarquee />
      </section>

      {/* Custom Branding: real client work, horizontal strip */}
      <section aria-labelledby="branding-title" className="mt-10 bg-sunk py-20 md:mt-14 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="mb-5 inline-flex rounded-full bg-accent-soft px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
              Custom Branding
            </p>
            <h2 id="branding-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Your hotel&rsquo;s identity on all products.
            </h2>
            <ol className="mt-10 space-y-5">
              {[
                { icon: PenNib, t: "Share your logo", d: "Send it on WhatsApp or email." },
                { icon: Stamp, t: "Approve the artwork", d: "We prepare the design and send it for your approval." },
                { icon: Truck, t: "Receive branded stock", d: "Delivered to your property." },
              ].map((s) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-line/10" aria-hidden="true">
                    <s.icon size={20} weight="light" />
                  </span>
                  <div>
                    <p className="font-medium">{s.t}</p>
                    <p className="text-[15px] text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href="/custom-branding#try" icon={ArrowRight} variant="dark">
                Try your logo
              </ButtonLink>
            </div>
          </Reveal>

          <div className="md:col-span-8">
            <Reveal>
              <BrandTeaser />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statement + numbers, with the product carousel on the right */}
      <section className="container-x mt-20 md:mt-28">
        <Reveal className="grid gap-12 xl:grid-cols-12 xl:items-end">
          <p className="text-3xl font-medium leading-[1.15] tracking-tight md:text-[2.75rem] xl:col-span-7">
            One-stop shop for all your hospitality needs, from the soap by the basin to the card on the door handle.
          </p>
          <dl className="grid grid-cols-3 gap-4 sm:gap-6 xl:col-span-5">
            {stats.map((s) => (
              // The label is the term (read once); the number is shown above it
              <div key={s.label} className="flex flex-col border-t border-line/15 pt-4">
                <dt className="order-2 mt-2 text-[14px] leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 text-[1.75rem] font-semibold tabular-nums tracking-tighter sm:text-4xl md:text-5xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* The range in photos: client kits, tea stations and dispensers, drifting sideways full width */}
      <section className="mt-12 md:mt-16" aria-label="Our range in photos">
        <PhotoMarquee items={productStack} label="Our range in photos" />
      </section>

      {/* Range bento */}
      <section aria-label="Our product range" className="container-x mt-24 md:mt-32">

        {/* Phones: the lead tile full width, the rest two per row */}
        <div className="grid grid-cols-2 gap-3 md:auto-rows-[240px] md:gap-4 lg:auto-rows-[150px] lg:grid-cols-6">
          {rangeTiles.map((c, i) => {
            const b = bento[c.slug];
            return (
              <Reveal key={c.slug} delay={i * 0.05} className={`${b.cls}`}>
                <TiltCard>
                <Link href={c.href} className="shell group block h-full">
                  {b.img ? (
                    <div className={`core relative flex h-full flex-col justify-end overflow-hidden md:min-h-0 ${b.big ? "min-h-[260px]" : "min-h-[200px]"}`}>
                      <Image
                        src={b.img}
                        alt=""
                        fill
                        sizes={b.sizes}
                        // Each photo is aimed at its products (they sit off-centre in the shot), clear of the caption shade
                        style={{ objectPosition: b.pos || "50% 50%" }}
                        className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0E]/90 via-[#0C0F0E]/30 to-transparent md:from-[#0C0F0E]/85 md:via-[#0C0F0E]/25" />
                      <div className="relative p-4 text-white md:p-5 xl:p-6">
                        <h3 className={`flex items-end justify-between gap-3 font-semibold leading-tight tracking-tight ${b.big ? "text-2xl md:text-4xl" : "text-base md:text-2xl"}`}>
                          {c.name}
                          <ArrowUpRight size={18} aria-hidden="true" className="mb-0.5 shrink-0 transition-transform duration-200 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </h3>
                        {b.text && <p className={`mt-2 max-w-md text-[15px] leading-relaxed text-white/80 ${b.big ? "" : "hidden md:block"}`}>{c.short}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="core flex h-full min-h-[240px] flex-col justify-between bg-accent p-6 text-accent-ink md:min-h-0">
                      <h3 className="flex items-center justify-between gap-3 text-xl font-semibold tracking-tight md:text-2xl">
                        {c.name}
                        <ArrowUpRight size={20} aria-hidden="true" className="shrink-0" />
                      </h3>
                      <ul className="flex flex-wrap gap-2" aria-label={`${c.name} examples`}>
                        {c.groups.slice(0, 4).map((g) => (
                          <li key={g.title} className="rounded-full bg-accent-ink/10 px-3 py-1.5 text-[13px] leading-tight ring-1 ring-accent-ink/15">
                            {g.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>


      {/* Brochures */}
      <section aria-labelledby="brochures-title" className="container-x mt-24 md:mt-32">
        <Reveal className="mb-10 max-w-2xl">
          <h2 id="brochures-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Browse Our Brochures.
          </h2>
        </Reveal>
        <BrochureGrid />
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="faq-title" className="container-x mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 id="faq-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              FAQs
            </h2>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium">
              All questions <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-8">
          <FaqList items={faqs.slice(0, 5)} />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
