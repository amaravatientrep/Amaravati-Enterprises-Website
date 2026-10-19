import Image from "next/image";
import { ArrowRight, WhatsappLogo, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { biotiqueRanges } from "@/lib/biotique";
import { partnerBrands, whatsappLink, SITE_URL } from "@/lib/site";
import { fileSize } from "@/lib/fileSize";

const brochure = partnerBrands.find((p) => p.slug === "biotique")?.brochure;

export const metadata = {
  title: "Biotique Hotel Amenities and Toiletries Kits",
  description:
    "Biotique hotel amenities: Assorted range, Almond Soap, dry amenities, tubes, Biotique Royal and Farm Fresh. Distributed by Amaravati Enterprises.",
  alternates: { canonical: "/products/biotique" },
  openGraph: { images: [{ url: "/images/biotique/royal-bergamot-patchouli.jpg" }] },
};

const enquireHref = (range) => `/contact?product=${encodeURIComponent("Biotique Range")}&range=${encodeURIComponent(range)}#enquiry`;

export default function BiotiquePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: "Biotique Range", item: `${SITE_URL}/products/biotique` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: "Biotique Range" }]}
        title="Biotique Range"
        intro="Bath and dry amenities for hotel rooms, from single-use bottles and soap to dispensers and refill cans."
      >
        <p className="mt-5 text-[15px] text-muted">Biotique Hospitality Collection — Distributed by Amaravati Enterprises</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/contact?product=Biotique%20Range#enquiry" icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          {brochure && (
            <ButtonLink href={brochure} external icon={DownloadSimple} variant="ghost">
              Download Brochure{fileSize(brochure) ? ` (${fileSize(brochure)})` : ""}
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <div className="space-y-24 md:space-y-32">
        {biotiqueRanges.map((r) => (
          <section key={r.id} id={r.id} className="container-x scroll-mt-28" aria-labelledby={`${r.id}-title`}>
            <Reveal className="mb-8 flex flex-col justify-between gap-6 border-t border-line/15 pt-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 id={`${r.id}-title`} className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {r.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{r.text}</p>
                {r.specs && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${r.title} sizes`}>
                    {r.specs.map((s) => (
                      <li key={s} className="rounded-full bg-accent-soft px-3.5 py-1.5 text-[14px] font-medium text-accent">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <ButtonLink href={enquireHref(r.title)} icon={ArrowRight}>
                  Enquire About This Range
                </ButtonLink>
                <ButtonLink href={whatsappLink(`Hi, I'd like to know more about ${r.title}.`)} external icon={WhatsappLogo} variant="ghost">
                  WhatsApp
                </ButtonLink>
              </div>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {r.items.map((it, i) => (
                <Reveal as="li" key={it.src} delay={i * 0.06}>
                  <figure>
                    <div className="shell">
                      <div className={`core relative aspect-[4/3] overflow-hidden ${r.contain ? "bg-white" : ""}`}>
                        <Image
                          src={it.src}
                          alt={it.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className={r.contain ? "object-contain p-4" : "object-cover"}
                        />
                      </div>
                    </div>
                    {it.label && <figcaption className="mt-3 text-[15px] font-medium">{it.label}</figcaption>}
                  </figure>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand product="Biotique Range" />
    </>
  );
}
