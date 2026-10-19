import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ClientMarquee from "@/components/ClientMarquee";
import CtaBand from "@/components/CtaBand";
import Link from "next/link";
import { stats, contact, areas } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description:
    "Hyderabad hospitality supplier serving 1000+ hotels across India with guest amenities, branded packaging, stationery and housekeeping supplies.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "About" }]}
        title="A Hyderabad partner for hotel supplies."
        intro="For more than ten years we have supplied the things guests touch: soaps, kits, slippers, stationery, and the housekeeping supplies behind them."
      />

      <section className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="shell">
            <div className="core relative aspect-[3/4] overflow-hidden">
              <Image src="/images/deccan-serai-amenities.jpg" alt="Branded amenities made for Deccan Serai" fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 self-center text-lg leading-relaxed md:col-span-7 md:pl-8">
          <p>
            Amaravati Enterprises works with hotels, resorts, guest houses and institutions all over India. Our clients range from independent properties to brands such as Lemon Tree, Ginger, Sarovar and Fairfield by Marriott.
          </p>
          <p className="text-muted">
            What hotels value most is simple: one supplier for the whole guest room, consistent quality from order to order, and amenities that carry their own name. Alongside our own range we supply the Biotique Range.
          </p>
          <dl className="grid grid-cols-3 gap-6 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col border-t border-line/15 pt-4">
                <dt className="order-2 mt-1 text-[14px] leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tighter md:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="mt-24 md:mt-32" aria-labelledby="clients-title">
        <div className="container-x">
          <h2 id="clients-title" className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">
            Some of the properties we supply
          </h2>
        </div>
        <ClientMarquee />
      </section>

      <section className="container-x mt-24 md:mt-32" aria-labelledby="visit-title">
        <Reveal className="shell">
          <div className="core grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 id="visit-title" className="text-3xl font-semibold tracking-tight">
                Our office
              </h2>
              <address className="mt-4 text-lg not-italic leading-relaxed text-muted">
                {contact.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-medium underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                Open in Google Maps
              </a>
            </div>
            <div className="space-y-3 text-lg md:text-right">
              <p>
                <a className="font-medium hover:text-accent" href={contact.phoneHref}>
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a className="break-all text-muted hover:text-accent" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Links to every region page, so buyers (and search engines) can find the one for their state */}
      <section className="container-x mt-20 md:mt-28" aria-labelledby="areas-title">
        <h2 id="areas-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
          Where we supply
        </h2>
        <p className="mt-3 max-w-2xl text-muted">From our office in Hyderabad to hotels all over India, including:</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}`} className="inline-flex rounded-full bg-ink/[0.05] px-4 py-2.5 text-[15px] ring-1 ring-line/10 transition-colors duration-150 hover:bg-ink/[0.08]">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
