import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ClientMarquee from "@/components/ClientMarquee";
import CtaBand from "@/components/CtaBand";
import Link from "next/link";
import { stats, contact, areas } from "@/lib/site";

export const metadata = {
  title: "About Us: Hotel Supplier in Hyderabad",
  description:
    "Your trusted partner in hospitality supplies: toiletries, guest amenities, stationery, housekeeping products and linen for 1,000+ hotels across India.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "About" }]}
        title="Your Trusted Partner in Hospitality Supplies"
        intro="At Amaravati Enterprises, we believe exceptional hospitality begins with the little details that make every guest feel welcome. From our roots in Hyderabad, we have grown into a trusted one-stop partner for 1,000+ hotels, resorts, hospitals, serviced apartments and other hospitality businesses across India."
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
            Our range covers hotel toiletries and guest amenities, tea and coffee supplies, stationery, disposables, in-room essentials, housekeeping products and linen, bringing convenience, consistency and quality under one roof.
          </p>
          <p className="text-muted">
            Every property has its own identity. That is why we go beyond standard supplies with customised products and personalised branding that help hotels strengthen their identity and elevate the guest experience. A strong vendor network, in-house assembly and packaging, and efficient inventory management keep our service dependable and our deliveries on time.
          </p>
          <p className="text-muted">
            We proudly support the Make in India vision, championing quality Indian-made products. We keep adding sustainable alternatives to our range and are growing our presence in international markets.
          </p>
          <p className="font-semibold">We don&rsquo;t just supply hospitality essentials. We help hotels create experiences worth remembering.</p>
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
          {areas.filter((a) => !a.state || a.featured).map((a) => (
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
