import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import { guides } from "@/lib/guides";

export const metadata = {
  title: "Guides for Hotels",
  description: "Practical guides for hotels: an amenities checklist by room category, plastic-free amenity swaps, and how custom branded toiletries work.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader ld crumbs={[{ label: "Guides" }]} title="Guides for hotels" intro="Straight answers to the questions hotels ask us about guest amenities." />
      <section className="container-x">
        <ul className="grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="group block">
                <div className="shell">
                  <div className="core relative aspect-[4/3] overflow-hidden">
                    <Image src={g.image.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 px-1">
                  <span>
                    <span className="block text-lg font-semibold leading-snug tracking-tight">{g.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-muted">{g.description}</span>
                  </span>
                  <ArrowUpRight size={18} className="mt-1 shrink-0" aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
