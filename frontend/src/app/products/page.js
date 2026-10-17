import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { categories } from "@/lib/site";

const tiles = [
  ...categories.map((c) => ({ slug: c.slug, name: c.name, short: c.short, image: c.cover || c.images[0], href: `/products/${c.slug}` })),
  { slug: "biotique", name: "Biotique", short: "Ayurvedic hotel amenities from a name guests already know.", image: "/images/tiles/cards/biotique.jpg", href: "/products/biotique" },
  { slug: "diversey", name: "Diversey", short: "The Diversey housekeeping chemicals your team already trusts.", blurb: "TASKI, Suma, Crew and Soft Care housekeeping chemicals.", href: "/partner-brands#diversey" },
];

export const metadata = {
  title: "Hotel Amenities List: Everything a Guest Room Needs",
  description:
    "A hotel amenities list for every guest room: toiletries, amenity kits, dispensers, in-room amenities, stationery, kettle trays and housekeeping material, plus Biotique and Diversey.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "Products" }]}
        title="Hotel amenities list: everything a guest room needs."
        intro="Eight product families plus our partner brands Biotique and Diversey. Most of the range can carry your hotel's name and logo."
      />

      <section className="container-x">
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {tiles.map((c, i) => {
            // The first row paints with the HTML (no fade-in), so it can be the page's largest paint straight away
            const Item = i < 2 ? "li" : Reveal;
            const itemProps = i < 2 ? {} : { as: "li", delay: (i % 2) * 0.08 };
            return (
            <Item key={c.slug} {...itemProps}>
              <Link href={c.href} className="group block">
                <div className="shell">
                  <div className="core relative aspect-[16/10] overflow-hidden">
                    {c.image ? (
                      <Image src={c.image} alt="" fill priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-snap group-hover:scale-[1.03]" />
                    ) : (
                      <div className="flex h-full items-end bg-accent p-8 text-accent-ink">
                        <p className="max-w-sm text-2xl font-medium leading-snug tracking-tight">{c.blurb}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 px-1">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">{c.name}</h2>
                    <p className="mt-2 max-w-md leading-relaxed text-muted">{c.short}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] transition-transform duration-500 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </Item>
            );
          })}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
