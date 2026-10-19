import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, WhatsappLogo, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { categories, whatsappLink, SITE_URL } from "@/lib/site";
import ProductGallery from "@/components/ProductGallery";
import FeatureBanner from "@/components/motion/FeatureBanner";
import ShowcaseSlideshow from "@/components/motion/ShowcaseSlideshow";
import TrayMarquee from "@/components/TrayMarquee";
import SceneSlideshow from "@/components/SceneSlideshow";
import { kitScenes, teaScenes, rotate } from "@/lib/scenes";
import { fileSize } from "@/lib/fileSize";

export function generateStaticParams() {
  return categories.filter((c) => !c.customPage).map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = categories.find((x) => x.slug === params.slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.short} Supplied to hotels all over India by Amaravati Enterprises, Hyderabad.`,
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: c.images[0] ? { images: [{ url: c.images[0] }] } : undefined,
  };
}

export default function CategoryPage({ params }) {
  const c = categories.find((x) => x.slug === params.slug);
  if (!c) notFound();
  const others = categories.filter((x) => x.slug !== c.slug);
  const [lead, ...rest] = c.images;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/products/${c.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]} title={c.h1 || (c.subtitle ? c.name : c.title)} subtitle={c.subtitle} intro={c.intro}>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink(`Hi, I'd like a quote for ${c.name}.`)} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      {c.scenes && (
        <SceneSlideshow
          items={c.scenes === "tea" ? teaScenes : rotate(kitScenes, 3)}
          label={c.scenes === "tea" ? "Tray and kettle sets in hotel rooms" : "Amenity kits made for hotels"}
          className="mb-16 md:mb-24"
        />
      )}

      {c.features?.map((f, i) => (
        <section key={f.title} className="container-x mb-16 md:mb-24" aria-labelledby={`feature-${i}`}>
          <Reveal>
            <FeatureBanner id={`feature-${i}`} title={f.title} images={f.images} items={f.items} side={f.side} />
          </Reveal>
        </section>
      ))}

      {lead && !c.gallery?.length && !c.showcase && !c.features && !c.scenes && (
        <section className="container-x" aria-label={`${c.name} photos`}>
          <div className="grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="shell">
                <div className="core relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <Image src={lead} alt={`${c.name} by Amaravati Enterprises`} fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:col-span-5">
              {rest.slice(0, 4).map((img, i) => (
                <Reveal key={img} delay={0.05 * (i + 1)}>
                  <div className="shell">
                    <div className="core relative aspect-[3/4] overflow-hidden">
                      <Image src={img} alt={`${c.name}, photo ${i + 2}`} fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.showcase && !c.scenes && (
        <section className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10" aria-label={`${c.name} photos`}>
          <ShowcaseSlideshow items={c.showcase} label={`${c.name} photos`} />
        </section>
      )}

      {c.trays && (
        <section className="mt-20 md:mt-28" aria-labelledby="trays-title">
          <div className="container-x">
            <Reveal className="mb-6">
              <h2 id="trays-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trays
              </h2>
            </Reveal>
          </div>
          <TrayMarquee items={c.trays} label="Trays" />
        </section>
      )}

      {c.gallery && (
        <div className="container-x mt-20 md:mt-28">
          <ProductGallery groups={c.gallery} />
        </div>
      )}

      {!c.hideRange && (
      <section className="container-x mt-20 md:mt-28" aria-labelledby="range-title">
        <Reveal>
          <h2 id="range-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
            In this range
          </h2>
        </Reveal>
        <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${c.groups.length === 2 ? "" : "lg:grid-cols-3"}`}>
          {c.groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.06} className="shell">
              <div className="core h-full p-6 md:p-7">
                <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px] leading-snug text-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        {c.brochure && (
          <a href={c.brochure} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink/[0.05] px-5 py-3 text-[15px] font-medium ring-1 ring-line/10 hover:bg-ink/[0.08]">
            <DownloadSimple size={18} aria-hidden="true" /> {c.name} Brochure (PDF{fileSize(c.brochure) ? `, ${fileSize(c.brochure)}` : ""})
          </a>
        )}
        {c.slug !== "tea-coffee" && (
          <p className="mt-8 max-w-2xl text-muted">
            Want these with your hotel&rsquo;s identity?{" "}
            <Link href="/custom-branding" className="font-medium text-ink underline decoration-line/30 underline-offset-4 hover:decoration-accent">
              See how Custom Branding works
            </Link>
            .
          </p>
        )}
      </section>
      )}

      <CtaBand product={c.name} />

      <section className="container-x mt-24" aria-labelledby="more-title">
        <h2 id="more-title" className="text-2xl font-semibold tracking-tight">
          More from our range
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/products/${o.slug}`} className="inline-flex rounded-full bg-ink/[0.05] px-5 py-2.5 text-[15px] ring-1 ring-line/10 transition-colors hover:bg-ink/[0.09]">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
