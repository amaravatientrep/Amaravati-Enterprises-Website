import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { partnerBrands } from "@/lib/site";
import { fileSize } from "@/lib/fileSize";

export const metadata = {
  title: "Biotique Hotel Amenities",
  description:
    "Biotique hotel amenities supplied to hotels all over India.",
  alternates: { canonical: "/partner-brands" },
};

export default function PartnerBrandsPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "Partner brands" }]}
        title="Biotique Range, from the same supplier."
        intro="Some guests look for a name they recognise. We supply Biotique alongside our own range, so it arrives in the same order."
      />

      {partnerBrands.map((p, idx) => (
        <section key={p.slug} id={p.slug} className="container-x scroll-mt-28 [&:not(:first-of-type)]:mt-20" aria-labelledby={`${p.slug}-title`}>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <Reveal className={`md:col-span-7 ${idx % 2 ? "md:order-2" : ""}`}>
              <div className="grid grid-cols-3 gap-3">
                {p.images.map((img, i) => (
                  <div key={img} className={`shell ${i === 0 ? "col-span-3 sm:col-span-2 sm:row-span-2" : "hidden sm:block"}`}>
                    <div className={`core relative overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-square h-full"}`}>
                      <Image src={img} alt={`${p.name} hotel amenities${i ? `, photo ${i + 1}` : ""}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="self-center md:col-span-5">
              <h2 id={`${p.slug}-title`} className="text-4xl font-semibold tracking-tight md:text-5xl">
                {p.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{p.line}</p>
              <ul className="mt-8 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 leading-snug">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {p.catalogue && (
                <Link href={p.catalogue} className="mt-8 mr-3 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[15px] font-medium text-accent-ink hover:bg-accent/90">
                  View the {p.name} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              )}
              {p.brochure && (
                <a href={p.brochure} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink/[0.05] px-5 py-3 text-[15px] font-medium ring-1 ring-line/10 hover:bg-ink/[0.08]">
                  <DownloadSimple size={18} aria-hidden="true" /> {p.name} Brochure (PDF{fileSize(p.brochure) ? `, ${fileSize(p.brochure)}` : ""})
                </a>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
