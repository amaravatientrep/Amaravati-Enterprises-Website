import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import ShowcaseSlideshow from "@/components/motion/ShowcaseSlideshow";
import { whatsappLink, SITE_URL } from "@/lib/site";

// Purely Serene, our own registered brand. Site layout and type throughout; the brand shows through
// the photography and one champagne-gold accent taken from the labels (used for rules and tags, never body text).
const GOLD = "#C7A66A";
const I = "/images/purely-serene/";
const PRODUCT = "Purely Serene Luxury Toiletries"; // matches the enquiry form's product option

export const metadata = {
  title: "Purely Serene Luxury Toiletries",
  description:
    "Purely Serene glycerin soaps, 20 ml and 35 ml guest bottles, 500 ml dispensers and 5 litre refill cans for hotels all over India.",
  alternates: { canonical: "/products/purely-serene" },
  openGraph: { images: [{ url: `${I}hero.jpg` }] },
};

const enquireHref = (range) => `/contact?product=${encodeURIComponent(PRODUCT)}&range=${encodeURIComponent(range)}#enquiry`;

const soaps = [
  { src: `${I}soap-indian-spices.jpg`, label: "Indian Spices", alt: "Purely Serene Indian Spices glycerin soaps in three sizes" },
  { src: `${I}soap-aloe-vera.jpg`, label: "Aloe Vera", alt: "Purely Serene Aloe Vera glycerin soaps in 15 g, 20 g and 30 g" },
];

const bottles = [
  { src: `${I}bottles-20ml-hexagon.jpg`, label: "20 ml Hexagon", alt: "Purely Serene 20 ml hexagon bottles: shampoo, bath gel, moisturizer and conditioner" },
  { src: `${I}bottles-35ml.jpg`, label: "35 ml", alt: "Purely Serene 35 ml bottles with gold caps: shampoo, bath gel, moisturizer and conditioner" },
];

const dispensers = [
  { src: `${I}dispensers-500ml-lineup.jpg`, alt: "Purely Serene 500 ml dispensers: shampoo, shower gel, conditioner, moisturizer and hand wash" },
  { src: `${I}dispensers-500ml-closeup.jpg`, alt: "Purely Serene 500 ml shower gel, shampoo and conditioner" },
  { src: `${I}dispensers-500ml-bathroom.jpg`, alt: "Purely Serene 500 ml dispensers on a hotel bathroom counter" },
];

function RangeHead({ id, title, text, specs, range }) {
  return (
    <Reveal className="mb-8 flex flex-col justify-between gap-6 pt-8 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <span className="mb-5 block h-px w-12" style={{ backgroundColor: GOLD }} aria-hidden="true" />
        <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>
        {specs && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} sizes`}>
            {specs.map((s) => (
              <li key={s} className="rounded-full px-3.5 py-1.5 text-[14px] font-medium ring-1" style={{ backgroundColor: `${GOLD}24`, "--tw-ring-color": `${GOLD}66` }}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <ButtonLink href={enquireHref(range)} icon={ArrowRight}>
          Enquire About This Range
        </ButtonLink>
        <ButtonLink href={whatsappLink(`Hi, I'd like to know more about ${range}.`)} external icon={WhatsappLogo} variant="ghost">
          WhatsApp
        </ButtonLink>
      </div>
    </Reveal>
  );
}

function Card({ it, sizes = "(min-width: 768px) 50vw, 100vw", priority }) {
  return (
    <figure>
      <div className="shell">
        <div className="core relative aspect-[4/3] overflow-hidden">
          <Image src={it.src} alt={it.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        </div>
      </div>
      {it.label && <figcaption className="mt-3 text-[15px] font-medium">{it.label}</figcaption>}
    </figure>
  );
}

export default function PurelySerenePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: PRODUCT, item: `${SITE_URL}/products/purely-serene` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: "Purely Serene" }]}
        title="Purely Serene"
        subtitle="Every Detail, Thoughtfully Serene."
        intro="Our own registered brand of guest amenities: glycerin soaps, guest bottles, 500 ml dispensers and 5 litre refill cans, in one considered look."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?product=${encodeURIComponent(PRODUCT)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hi, I'd like a quote for Purely Serene amenities.")} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Banner */}
      <section className="container-x" aria-label="The Purely Serene range">
        <Reveal className="shell">
          <div className="core relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
            <Image
              src={`${I}hero.jpg`}
              alt="The Purely Serene range: soaps, guest bottles, a 500 ml dispenser and a 5 litre can"
              fill
              priority
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <div className="mt-24 space-y-24 md:mt-32 md:space-y-32">
        {/* Soaps */}
        <section id="soaps" className="container-x scroll-mt-28" aria-labelledby="soaps-title">
          <RangeHead
            id="soaps"
            title="Glycerin Soaps"
            text="Indian Spices and Aloe Vera, a matching pair."
            specs={["15 g", "20 g", "30 g"]}
            range="Purely Serene Glycerin Soaps"
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {soaps.map((it, i) => (
              <Reveal as="li" key={it.src} delay={i * 0.06}>
                <Card it={it} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Guest bottles */}
        <section id="bottles" className="container-x scroll-mt-28" aria-labelledby="bottles-title">
          <RangeHead
            id="bottles"
            title="Guest Bottles"
            text="Shampoo, Bath Gel, Moisturizer and Conditioner."
            specs={["20 ml Hexagon", "35 ml"]}
            range="Purely Serene Guest Bottles"
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {bottles.map((it, i) => (
              <Reveal as="li" key={it.src} delay={i * 0.06}>
                <Card it={it} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* 500 ml dispensers */}
        <section id="dispensers" className="scroll-mt-28" aria-labelledby="dispensers-title">
          <div className="container-x">
            <RangeHead
              id="dispensers"
              title="500 ml Dispensers"
              text="Shampoo, Shower Gel, Conditioner, Moisturizer and Hand Wash."
              range="Purely Serene 500 ml Dispensers"
            />
          </div>
          <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
            <ShowcaseSlideshow items={dispensers} label="Purely Serene 500 ml dispensers" />
          </div>
          <div className="container-x mt-6">
            <Link href="/products/anti-theft-dispensers" className="group inline-flex items-center gap-2 text-[15px] font-medium">
              Wall-mount anti theft dispensers
              <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* 5 litre cans */}
        <section id="cans" className="container-x scroll-mt-28" aria-labelledby="cans-title">
          <RangeHead
            id="cans"
            title="5 Litre Refill Cans"
            text="Shampoo, Shower Gel, Moisturizer, Conditioner and Hand Wash, for refilling dispensers."
            specs={["5 Litre"]}
            range="Purely Serene 5 Litre Refill Cans"
          />
          <ul className="grid gap-4 md:grid-cols-2">
            <Reveal as="li">
              <Card it={{ src: `${I}cans-5-litre.jpg`, alt: "Purely Serene 5 litre refill cans: shampoo, shower gel, moisturizer, conditioner and hand wash" }} />
            </Reveal>
          </ul>
        </section>
      </div>

      <CtaBand title="Get a quote for Purely Serene." product={PRODUCT} />
    </>
  );
}
