import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import ClientMarquee from "@/components/ClientMarquee";
import CtaBand from "@/components/CtaBand";
import { areas, categories, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = areas.find((x) => x.slug === params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/areas/${a.slug}` },
  };
}

export default function AreaPage({ params }) {
  const a = areas.find((x) => x.slug === params.slug);
  if (!a) notFound();
  return (
    <>
      <PageHeader ld crumbs={[{ label: a.name }]} title={a.title} intro={a.intro}>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/contact#enquiry" icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink href={whatsappLink(`Hi, I'm a hotel in ${a.name} and I'd like a quote for amenities.`)} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="shell">
            <div className="core relative aspect-[4/5] overflow-hidden">
              <Image src="/images/clarion-amenities.jpg" alt="Branded in-room amenity tray made for Clarion" fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="self-center md:col-span-7">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Why hotels in {a.name} work with us</h2>
          <ul className="mt-8 space-y-4">
            {a.points.map((p) => (
              <li key={p} className="flex gap-3 text-lg leading-snug">
                <Check size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container-x mt-24" aria-labelledby="range-title">
        <h2 id="range-title" className="text-3xl font-semibold tracking-tight">
          What we supply in {a.name}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/products/${c.slug}`} className="group flex h-full items-start justify-between gap-4 rounded-shell p-6 ring-1 ring-line/[0.08] transition-colors duration-300 hover:bg-surface">
                <span>
                  <span className="block text-lg font-semibold tracking-tight">{c.name}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-muted">{c.short}</span>
                </span>
                <ArrowUpRight size={18} className="mt-1 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24" aria-label="Clients">
        <ClientMarquee />
      </section>

      <CtaBand title={`Supplying hotels in ${a.name}.`} />
    </>
  );
}
