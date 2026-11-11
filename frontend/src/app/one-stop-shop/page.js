import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, MapPin, Clock, Phone, Package, Stamp, Storefront } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import ClientMarquee from "@/components/ClientMarquee";
import { hkSections } from "@/lib/housekeeping";
import { brandedWork, contact, stats } from "@/lib/site";

export const metadata = {
  title: "One Stop Shop for Hotel Supplies: Trolleys, Dispensers & Branded Toiletries",
  description:
    "One supplier for your whole hotel: housekeeping trolleys, dispensers, hair dryers, kettle trays and room fixtures, plus guest toiletries with your hotel's name and logo. Visit our Hyderabad showroom.",
  alternates: { canonical: "/one-stop-shop" },
};

// Catalogue photos only (owner rule). Picked by product code from the housekeeping catalogue.
const all = hkSections.flatMap((s) => s.items);
const pick = (codes) => codes.map((c) => all.find((i) => i.code === c)).filter((i) => i && i.img);

const equipment = [
  {
    id: "trolleys",
    title: "Trolleys & carts",
    text: "Housekeeping, laundry, luggage and wringer trolleys for every floor and back area.",
    href: "/products/housekeeping",
    items: pick(["CT-101", "CT-103", "CT-107", "CT-112", "CT-109", "CT-115"]),
  },
  {
    id: "dispensers",
    title: "Dispensers",
    text: "Stainless steel, ABS, sensor and anti-theft dispensers for bathrooms and public areas.",
    href: "/products/anti-theft-dispensers",
    items: pick(["F-129", "F-130", "F-131", "F-123", "F-127", "F-132"]),
  },
  {
    id: "fixtures",
    title: "Fixtures & room equipment",
    text: "Hair dryers, hand dryers, kettle trays, kettles, shoe shiners, hangers and ironing sets.",
    href: "/products/housekeeping",
    items: pick(["F-118", "F-115", "R-119", "R-123", "F-101", "R-104"]),
  },
];

const reasons = [
  { icon: Package, t: "One supplier, one order", d: "Equipment, fixtures, toiletries and housekeeping supplies from a single source, so your purchase team deals with one vendor." },
  { icon: Stamp, t: "Your brand on every item", d: "Soaps, bottles, kits, slippers, laundry bags and stationery made with your hotel's name and logo." },
  { icon: Storefront, t: "See it before you order", d: "Our Hyderabad showroom holds the full range, so you can compare sizes, finishes and quality in person." },
];

export default function OneStopShopPage() {
  return (
    <>
      <PageHeader
        ld
        crumbs={[{ label: "One Stop Shop" }]}
        title="One stop shop for all your hospitality needs."
        intro="From housekeeping trolleys and dispensers to guest toiletries that carry your hotel's name and logo. One supplier for opening a new hotel or running an existing one."
      >
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href="/contact?product=One%20Stop%20Shop#enquiry" icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href="#visit" icon={ArrowDown} variant="ghost">
            Visit our showroom
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Equipment first */}
      <section className="container-x" aria-labelledby="equipment-title">
        <Reveal className="mb-10 max-w-2xl">
          <h2 id="equipment-title" className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Equipment and fixtures for every department.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">Tell us your room count and we will quote as per your requirement.</p>
        </Reveal>
        <div className="grid gap-14">
          {equipment.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-28">
              <Reveal className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{g.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{g.text}</p>
                </div>
                <Link href={g.href} className="inline-flex items-center gap-1.5 py-2 font-medium text-accent hover:underline">
                  See the full range <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Reveal>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {g.items.map((it, i) => (
                  <Reveal as="li" key={it.code} delay={i * 0.04} className="shell">
                    <div className="core flex h-full flex-col p-3">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                        <Image src={it.img} alt={it.name} width={240} height={240} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-contain p-2" />
                      </div>
                      <p className="mt-3 text-sm font-medium leading-snug">{it.name}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Custom branding: the hero */}
      <section className="mt-24 bg-sunk py-20 md:mt-32 md:py-28" aria-labelledby="branding-title">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <h2 id="branding-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Your hotel&rsquo;s name and logo on every item.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Soaps, shampoo and shower gel bottles, dental and shaving kits, slippers, laundry bags and key card jackets, all made in your brand. Send us your logo and we will show you how it looks on our products.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/custom-branding#try" icon={ArrowRight}>
                Try your logo
              </ButtonLink>
              <ButtonLink href="/products/amenity-kits" icon={ArrowRight} variant="ghost">
                See amenity kits
              </ButtonLink>
            </div>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {brandedWork.slice(0, 4).map((w, i) => (
              <Reveal as="li" key={w.image} delay={i * 0.06} className="overflow-hidden rounded-2xl ring-1 ring-line/[0.07]">
                <div className="relative aspect-[4/5]">
                  <Image src={w.image} alt={`Custom branded amenities made for ${w.client}`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl leading-relaxed text-muted">
            Prefer a known brand in the room? We are authorised sellers of{" "}
            <Link href="/products/biotique" className="font-medium text-accent hover:underline">Biotique hotel amenities</Link>, and we make our own luxury range,{" "}
            <Link href="/products/purely-serene" className="font-medium text-accent hover:underline">Purely Serene</Link>. Plastic-free packaging is available in our{" "}
            <Link href="/products/eco-friendly" className="font-medium text-accent hover:underline">eco-friendly range</Link>.
          </p>
        </div>
      </section>

      {/* Why one supplier */}
      <section className="container-x mt-24 md:mt-32" aria-labelledby="why-title">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="why-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Why hotels buy everything from us
            </h2>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">{s.value}</dd>
                  <p className="mt-1 text-sm leading-snug text-muted">{s.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
          <ol className="grid gap-4 md:col-span-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.t} delay={i * 0.08} className="shell">
                <div className="core flex gap-5 p-6 md:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
                    <r.icon size={22} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{r.t}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{r.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="clients-title" className="mt-20 py-6 md:mt-28">
        <div className="container-x">
          <h2 id="clients-title" className="mb-6 text-center text-[15px] text-muted">Our Clients</h2>
        </div>
        <ClientMarquee />
      </section>

      {/* Visit us */}
      <section id="visit" className="container-x mt-20 scroll-mt-28 md:mt-28" aria-labelledby="visit-title">
        <Reveal className="shell">
          <div className="core grid gap-8 p-7 md:grid-cols-2 md:p-12">
            <div>
              <h2 id="visit-title" className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                Visit our Hyderabad showroom.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                With 600+ products, the best way to choose is to see them. Walk through trolleys, dispensers, fixtures and branded toiletry samples, and leave with a proposal for your property.
              </p>
            </div>
            <ul className="grid content-start gap-5">
              <li className="flex gap-4">
                <MapPin size={22} weight="light" className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="leading-relaxed">{contact.address.join(", ")}</p>
                  <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 py-1 font-medium text-accent hover:underline">
                    Get directions <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock size={22} weight="light" className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <p className="leading-relaxed">Monday to Saturday, 10:00 am to 7:00 pm</p>
              </li>
              <li className="flex gap-4">
                <Phone size={22} weight="light" className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <a href={contact.phoneHref} className="py-1 font-medium text-accent hover:underline">{contact.phoneDisplay}</a>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBand product="One Stop Shop" />
    </>
  );
}
