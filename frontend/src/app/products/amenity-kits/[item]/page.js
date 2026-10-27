import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Leaf, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import KitExplorer from "@/components/KitExplorer";
import { categories, amenityProducts, ecoKits, whatsappLink, SITE_URL } from "@/lib/site";
import { amenityPages } from "@/lib/amenityPages";

// One page per guest amenity: the kit builder for that product alone, its options as text, the packaging it has
// been made in for clients, and its questions. Facts come from amenityProducts; search copy from amenityPages.
const c = categories.find((x) => x.slug === "amenity-kits");
const items = amenityProducts.filter((p) => amenityPages[p.slug]);

export function generateStaticParams() {
  return items.map((p) => ({ item: p.slug }));
}

export function generateMetadata({ params }) {
  const p = items.find((x) => x.slug === params.item);
  if (!p) return {};
  const s = amenityPages[p.slug];
  const image = p.carton?.closed || p.examples?.[0]?.src || p.kitImage;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/products/amenity-kits/${p.slug}` },
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

// "Slippers" and "Other Amenities" are already plural
const plural = (name) => (name.endsWith("s") ? name : `${name}s`);

// The questions every product gets, after its own
function faqsFor(p, s) {
  const list = [...s.faqs];
  if (p.packaging)
    list.push({
      q: `Can the ${p.name.toLowerCase()} carry our hotel's name and logo?`,
      a: "Yes. The box or pouch is printed with your hotel's name and logo. Share your logo and we prepare the artwork for your approval.",
    });
  list.push({
    q: `How do I get a quote for ${plural(p.name).toLowerCase()}?`,
    a: "Pick your options above and send them in one enquiry, or WhatsApp us with your requirement. We will send a proposal for your property.",
  });
  return list;
}

export default function AmenityItemPage({ params }) {
  const p = items.find((x) => x.slug === params.item);
  if (!p) notFound();
  const s = amenityPages[p.slug];
  const faqs = faqsFor(p, s);
  const eco = ecoKits.find((k) => k.slug === `eco-${p.slug}`);
  const others = items.filter((x) => x.slug !== p.slug);
  const packs = p.packagingImages ? Object.entries(p.packagingImages) : [];
  const examples = p.examples || [];
  const range = encodeURIComponent(p.name);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/products/${c.slug}` },
        { "@type": "ListItem", position: 4, name: p.name, item: `${SITE_URL}/products/${c.slug}/${p.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: c.name, href: `/products/${c.slug}` }, { label: p.name }]}
        title={s.h1}
        intro={s.intro}
      >
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href={`/contact?product=${encodeURIComponent(c.name)}&range=${range}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink(`Hi, I'd like a quote for ${p.name}.`)} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <KitExplorer product={c.name} products={[p]} title={`Choose your ${s.h1.replace(/^Hotel /, "")}`} />

      {/* The options as plain text: readable without JavaScript and by search engines */}
      <section className="container-x mt-20 grid gap-10 md:mt-28 md:grid-cols-12" aria-labelledby="options-title">
        <div className="md:col-span-5">
          <h2 id="options-title" className="text-3xl font-semibold tracking-tight">
            What&rsquo;s available
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">{s.fit}</p>
        </div>
        <div className="space-y-8 md:col-span-7">
          {p.contents && (
            <div>
              <h3 className="text-lg font-semibold tracking-tight">In the kit</h3>
              <OptionList options={p.contents} />
            </div>
          )}
          {(p.parts || []).map((part) => (
            <div key={part.id}>
              <h3 className="text-lg font-semibold tracking-tight">{part.label}</h3>
              <OptionList options={part.options} />
            </div>
          ))}
          {p.packaging && (
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Packaging</h3>
              <OptionList options={Object.keys(p.packagingImages || {})} />
            </div>
          )}
          {eco && (
            <p className="flex gap-3 rounded-2xl bg-accent-soft p-5 text-[15px] leading-snug">
              <Leaf size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                A plastic-free version is part of our{" "}
                <Link href={`/products/eco-friendly#${eco.slug}`} className="font-medium underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                  eco-friendly amenities
                </Link>
                .
              </span>
            </p>
          )}
          {s.links?.map((l) => (
            <p key={l.href} className="text-[15px]">
              <Link href={l.href} className="font-medium underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                {l.label}
              </Link>
            </p>
          ))}
        </div>
      </section>

      {/* Real kits made for clients: one per packaging style, or the example kits */}
      {(packs.length > 0 || examples.length > 0) && (
        <section className="container-x mt-20 md:mt-28" aria-labelledby="made-title">
          <h2 id="made-title" className="text-3xl font-semibold tracking-tight">
            {packs.length ? `${plural(p.name)} made for hotels` : `${plural(p.name)} we have made`}
          </h2>
          {packs.length > 0 && <p className="mt-3 max-w-2xl text-muted">One in each packaging style, each carrying the hotel&rsquo;s own identity.</p>}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {(packs.length ? packs.map(([label, src]) => ({ label, src })) : examples).map((it) => (
              <li key={it.src} className="shell">
                <figure className="core flex h-full flex-col p-2.5 sm:p-3">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                    <Image src={it.src} alt={packs.length ? `Hotel ${p.name.toLowerCase()} in ${it.label}` : `${p.name}: ${it.label}`} fill unoptimized loading="lazy" className="object-contain p-3 mix-blend-multiply" />
                  </div>
                  <figcaption className="px-1.5 pb-1 pt-2.5 text-[15px] font-medium leading-snug">{it.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-x mt-20 md:mt-28" aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-8 text-3xl font-semibold tracking-tight">
          Questions about {p.slug === "other-amenities" ? "these room items" : `the ${p.name.toLowerCase()}`}
        </h2>
        <FaqList items={faqs} />
      </section>

      <CtaBand product={c.name} />

      <section className="container-x mt-24" aria-labelledby="more-title">
        <h2 id="more-title" className="text-2xl font-semibold tracking-tight">
          More guest amenities
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/products/${c.slug}/${o.slug}`} className="inline-flex rounded-full bg-ink/[0.05] px-5 py-2.5 text-[15px] ring-1 ring-line/10 transition-colors hover:bg-ink/[0.09]">
                {amenityPages[o.slug].h1}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/products/${c.slug}`} className="inline-flex rounded-full bg-ink/[0.05] px-5 py-2.5 text-[15px] font-medium ring-1 ring-line/10 transition-colors hover:bg-ink/[0.09]">
              All {c.name}
            </Link>
          </li>
          <li>
            <Link href="/custom-branding" className="inline-flex rounded-full bg-ink/[0.05] px-5 py-2.5 text-[15px] font-medium ring-1 ring-line/10 transition-colors hover:bg-ink/[0.09]">
              Custom Branding
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

function OptionList({ options }) {
  return (
    <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {options.map((o) => (
        <li key={o} className="flex gap-3 text-[15px] leading-snug">
          <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{o}</span>
        </li>
      ))}
    </ul>
  );
}
