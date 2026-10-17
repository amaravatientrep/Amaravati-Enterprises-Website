import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { dispenserGroups, prefilled } from "@/lib/dispensers";
import { categories, whatsappLink, SITE_URL } from "@/lib/site";

const c = categories.find((x) => x.slug === "anti-theft-dispensers");

export const metadata = {
  title: c.title,
  description:
    "Lockable 380 ml and 500 ml dispensers, wall mounted bottle systems, soap and sanitizer, SS and automatic dispensers for hotels, plus prefilled ranges.",
  alternates: { canonical: "/products/anti-theft-dispensers" },
  openGraph: { images: [{ url: "/images/dispensers/photo-1.jpg" }] },
};

const enquireHref = (name) => `/contact?product=${encodeURIComponent(c.name)}&range=${encodeURIComponent(name)}#enquiry`;

function DispenserCard({ it }) {
  const [first, second] = it.photos;
  return (
    <article className="flex h-full flex-col">
      <div className="shell">
        <div className={`core group relative aspect-square overflow-hidden ${it.contain ? "bg-[#EFEBE4]" : ""}`}>
          <Image
            src={first}
            alt={it.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className={`${it.contain ? "object-contain p-6" : "object-cover"} transition-opacity duration-700 ease-out ${second ? "group-hover:opacity-0" : ""}`}
          />
          {second && (
            <Image
              src={second}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-xl font-semibold tracking-tight">{it.name}</h3>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Capacity and options">
          {[...it.capacity, ...(it.options || [])].map((t) => (
            <li key={t} className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent">
              {t}
            </li>
          ))}
        </ul>
        <dl className="mt-4 divide-y divide-line/10 text-[14px]">
          {it.specs.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2">
              <dt className="text-muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <Link href={enquireHref(it.name)} className="group mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-medium text-accent">
          Enquire about this dispenser
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-500 ease-snap group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default function DispensersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/products/anti-theft-dispensers` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]}
        title={c.name}
        subtitle="Lockable dispensers, wall mounted bottle systems, and soap and sanitizer dispensers."
        intro="Dispensers stay on the wall and are refilled from bulk cans, so you stop replacing small bottles every stay."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hi, I'd like a quote for dispensers.")} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
          {c.brochure && (
            <ButtonLink href={c.brochure} external icon={DownloadSimple} variant="ghost">
              Download catalogue
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <div className="space-y-24 md:space-y-32">
        {dispenserGroups.map((g) => (
          <section key={g.id} id={g.id} className="container-x scroll-mt-28" aria-labelledby={`${g.id}-title`}>
            <Reveal className="mb-10 max-w-2xl border-t border-line/15 pt-8">
              <h2 id={`${g.id}-title`} className="text-3xl font-semibold tracking-tight md:text-4xl">
                {g.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{g.text}</p>
            </Reveal>
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it, i) => (
                <Reveal as="li" key={it.name} delay={(i % 3) * 0.06}>
                  <DispenserCard it={it} />
                </Reveal>
              ))}
            </ul>
          </section>
        ))}

        {/* Prefilled brand ranges */}
        <section id="prefilled" className="container-x scroll-mt-28" aria-labelledby="prefilled-title">
          <Reveal className="mb-10 max-w-2xl border-t border-line/15 pt-8">
            <h2 id="prefilled-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
              Prefilled Brand Dispensers
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">Dispensers that arrive filled, with matching refill cans.</p>
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prefilled.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.06}>
                <Link href={p.href} className="group block">
                  <div className="shell">
                    <div className="core relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={`${p.name} dispensers`} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-snap group-hover:scale-[1.04]" />
                    </div>
                  </div>
                  <h3 className="mt-5 flex items-center gap-2 text-xl font-semibold tracking-tight">
                    {p.name}
                    <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>

      <CtaBand title="Get a quote for dispensers." product={c.name} />
    </>
  );
}
