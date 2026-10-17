import Link from "next/link";
import { ArrowRight, Check, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import KitExplorer from "@/components/KitExplorer";
import SceneSlideshow from "@/components/SceneSlideshow";
import { kitScenes, rotate } from "@/lib/scenes";
import { categories, amenityProducts, amenityPackaging, amenityLine, whatsappLink, SITE_URL } from "@/lib/site";

const c = categories.find((x) => x.slug === "amenity-kits");
const others = categories.filter((x) => x.slug !== c.slug);

export const metadata = {
  title: c.title,
  description: `${c.short} Supplied to hotels all over India by Amaravati Enterprises, Hyderabad.`,
  alternates: { canonical: "/products/amenity-kits" },
  openGraph: { images: [{ url: c.images[0] }] },
};

export default function AmenityKitsPage() {
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
      <PageHeader crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]} title={c.h1} subtitle={c.subtitle} intro={c.intro}>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink(`Hi, I'd like a quote for ${c.name}.`)} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <SceneSlideshow items={rotate(kitScenes, 10)} label="Amenity kits made for hotels" className="mb-16 md:mb-24" />

      {/* Interactive explorer: pick a product, see its parts, varieties and packaging, collect options for one enquiry */}
      <KitExplorer product={c.name} />

      {/* The full range as plain text: readable without JavaScript, by search engines and with reduced motion */}
      {/* content-visibility lets the browser skip layout for this off-screen list until it scrolls near */}
      <section className="container-x mt-20 md:mt-28" aria-labelledby="range-title" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 2600px" }}>
        <h2 id="range-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
          Every amenity and option
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          A hotel amenities kit is built from the pieces below. Mix varieties per room category and pack them in any of our six boxes and pouches, printed with your hotel&rsquo;s name.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenityProducts.map((p) => (
            <li key={p.slug} className="shell">
              <article className="core h-full p-6 md:p-7" aria-labelledby={`${p.slug}-title`}>
                <h3 id={`${p.slug}-title`} className="text-lg font-semibold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-[15px] text-muted">{amenityLine(p)}</p>
                {p.contents && !p.onRequest && p.pattern === "C" && p.contents.length > 1 && (
                  <ul className="mt-4 space-y-2">
                    {p.contents.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-snug">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {p.parts?.map((part) => (
                  <div key={part.id} className="mt-4">
                    <h4 className="text-[13px] font-semibold uppercase tracking-wide text-accent">{part.label}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{part.options.join(", ")}</p>
                  </div>
                ))}
                <p className="mt-4 border-t border-line/10 pt-4 text-[14px] text-muted">
                  {p.packaging ? "Packed in any of the six packaging options below." : p.pattern === "D" ? "Comes in the container you choose." : "Supplied as is, without an outer box or pouch."}
                </p>
              </article>
            </li>
          ))}
          <li className="shell sm:col-span-2 lg:col-span-3">
            <article className="core h-full p-6 md:p-7" aria-labelledby="packaging-title">
              <h3 id="packaging-title" className="text-lg font-semibold tracking-tight">
                Packaging options
              </h3>
              <p className="mt-1 text-[15px] text-muted">Every box and pouch can carry your hotel&rsquo;s name and logo.</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {amenityPackaging.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-snug">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        </ul>

        <p className="mt-8 max-w-2xl text-muted">
          Want these with your hotel&rsquo;s name?{" "}
          <Link href="/custom-branding" className="font-medium text-ink underline decoration-line/30 underline-offset-4 hover:decoration-accent">
            See how custom branding works
          </Link>
          .
        </p>
      </section>

      <CtaBand title={`Get a quote for ${c.name.toLowerCase()}.`} product={c.name} />

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
