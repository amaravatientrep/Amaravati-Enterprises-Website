import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import MiniSlideshow from "@/components/MiniSlideshow";
import KitExplorer from "@/components/KitExplorer";
import { categories, ecoPackaging, ecoPackagingNames, ecoKits, whatsappLink, SITE_URL } from "@/lib/site";
import GuideLink from "@/components/GuideLink";

const c = categories.find((x) => x.slug === "eco-friendly");

// Tile photo: packed kits show their contents rising out of the kraft pouch; the rest show their varieties
const tilePhotos = (k) => (k.tile ? [k.tile] : k.parts.flatMap((pt) => pt.options.map((o) => pt.images[o]).filter(Boolean)).slice(0, 3));

export const metadata = {
  title: c.title,
  description: "Eco-friendly hotel amenities supplier: bamboo and wheat starch kits, jute slippers and loofahs, paper laundry bags and biodegradable packaging for hotels all over India.",
  alternates: { canonical: "/products/eco-friendly" },
  openGraph: { images: [{ url: c.images[0] }] },
};

export default function EcoFriendlyPage() {
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
      <PageHeader crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]} title={c.h1} subtitle={c.subtitle}>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink(`Hi, I'd like a quote for ${c.name}.`)} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Packaging first: the three kinds every kit below can come in */}
      <section className="container-x" aria-labelledby="packaging-title">
        <Reveal className="mb-8 max-w-2xl">
          <h2 id="packaging-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
            Packaging
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-3">
          {ecoPackaging.map((pk, i) => (
            <Reveal as="li" key={pk.name} delay={i * 0.06} className="shell">
              <div className="core p-2.5 sm:p-3">
                <MiniSlideshow images={pk.images} label={pk.name} offset={i * 700} scene />
                <h3 className="px-1.5 pb-1 pt-3 text-lg font-semibold tracking-tight">{pk.name}</h3>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="mt-20 md:mt-28">
        <KitExplorer product={c.name} products={ecoKits} packaging={ecoPackagingNames} title="Build your Eco Kit" />
      </div>

      <section className="container-x mt-20 md:mt-28" aria-labelledby="eco-range-title">
        <h2 id="eco-range-title" className="sr-only">
          All eco products
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {ecoKits.map((k) => (
            <li key={k.slug} className="shell">
              <article className="core flex aspect-square flex-col p-2.5 sm:p-3" aria-labelledby={`${k.slug}-title`}>
                {/* White well: the photos are shot on white, so they sit cleanly in light and dark mode */}
                <div className={`relative flex min-h-0 flex-1 items-center justify-center gap-[3%] overflow-hidden rounded-2xl bg-white ${k.tile ? "p-[3%]" : "p-[7%]"}`}>
                  {tilePhotos(k).map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element -- small pre-sized photos
                    <img key={src} src={src} alt="" loading="lazy" className="h-full min-w-0 flex-1 object-contain mix-blend-multiply" />
                  ))}
                </div>
                <h3 id={`${k.slug}-title`} className="px-1.5 pb-1 pt-2.5 text-[15px] font-semibold leading-tight tracking-tight sm:text-base">
                  {k.name}
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <GuideLink slug="eco-friendly-hotel-amenities" className="mt-20 md:mt-28" />

      <CtaBand product={c.name} />
    </>
  );
}
