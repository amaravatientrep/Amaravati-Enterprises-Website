import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { categories } from "@/lib/site";

// Each card carries the line its product page shows under the heading
const pageLine = {
  "anti-theft-dispensers": "Lockable Dispensers & Wall Mounted Bottle Systems.",
  "purely-serene": "Every Detail, Thoughtfully Serene.",
};

const tiles = [
  ...categories.map((c) => ({ slug: c.slug, name: c.name, short: pageLine[c.slug] || c.subtitle, image: c.cover || c.images[0], href: `/products/${c.slug}` })),
  { slug: "biotique", name: "Biotique Range", short: "Bath and dry amenities for hotel rooms, from single-use bottles and soap to dispensers and refill cans.", image: "/images/tiles/cards/biotique.jpg", href: "/products/biotique" },
];

export const metadata = {
  title: "Product Range: Everything a Hotel and a Guest Room Needs",
  description:
    "A hotel amenities list for every guest room: toiletries, amenity kits, dispensers, in-room amenities, stationery, kettle trays and housekeeping material, plus the Biotique Range.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "Products" }]}
        title="Product Range: Everything a hotel and a guest room needs."
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
                      <Image src={c.image} alt="" fill priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
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
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] transition-transform duration-200 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
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
