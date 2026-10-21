import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { guides } from "@/lib/guides";
import { whatsappLink, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const g = guides.find((x) => x.slug === params.slug);
  if (!g) return {};
  return {
    title: g.seoTitle,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", images: [{ url: g.image.src }] },
  };
}

function Block({ b }) {
  if (b.p) return <p className="max-w-[68ch] text-lg leading-relaxed text-ink/85">{b.p}</p>;
  if (b.list)
    return (
      <ul className="max-w-[68ch] list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink/85 marker:text-accent">
        {b.list.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    );
  if (b.table)
    return (
      <div className="overflow-x-auto rounded-2xl ring-1 ring-line/15">
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <thead className="bg-sunk">
            <tr>
              {b.table.head.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((r) => (
              <tr key={r[0]} className="border-t border-line/10 align-top">
                {r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="px-4 py-3 font-medium">{c}</th> : <td key={i} className="px-4 py-3 text-ink/80">{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.image)
    return (
      <figure className="max-w-3xl">
        <div className="shell">
          <div className="core relative aspect-[3/2] overflow-hidden">
            <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
        </div>
        {b.image.caption && <figcaption className="mt-3 text-[15px] text-muted">{b.image.caption}</figcaption>}
      </figure>
    );
  return null;
}

// Buyer guide: a short direct answer first (what Google and AI tools quote), then the detail, FAQs and related pages.
export default function GuidePage({ params }) {
  const g = guides.find((x) => x.slug === params.slug);
  if (!g) notFound();
  const url = `${SITE_URL}/guides/${g.slug}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      image: `${SITE_URL}${g.image.src}`,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Amaravati Enterprises", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Amaravati Enterprises", logo: { "@type": "ImageObject", url: `${SITE_URL}/amaravati-logo.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader ld crumbs={[{ label: "Guides", href: "/guides" }, { label: g.title }]} title={g.title}>
        {/* The answer in brief, set apart so a reader in a hurry (or an AI summary) gets it at once */}
        <div className="mt-8 max-w-[68ch] rounded-2xl bg-accent-soft p-5 md:p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">In short</p>
          <p className="mt-2 text-lg leading-relaxed">{g.answer}</p>
        </div>
      </PageHeader>

      <article className="container-x space-y-14 md:space-y-16">
        <figure className="max-w-4xl">
          <div className="shell">
            <div className="core relative aspect-[16/9] overflow-hidden">
              <Image src={g.image.src} alt={g.image.alt} fill priority sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
            </div>
          </div>
        </figure>

        {g.sections.map((s) => (
          <section key={s.h} className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.h}</h2>
            {s.blocks.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </section>
        ))}

        <section className="space-y-5" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Questions hotels ask
          </h2>
          <dl className="max-w-[68ch] space-y-5">
            {g.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold">{f.q}</dt>
                <dd className="mt-1 text-lg leading-relaxed text-ink/85">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-4" aria-labelledby="related-title">
          <h2 id="related-title" className="text-xl font-semibold tracking-tight">
            Related
          </h2>
          <ul className="flex flex-wrap gap-2">
            {g.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-4 py-2.5 text-[15px] ring-1 ring-line/10 transition-colors duration-150 hover:bg-ink/[0.08]">
                  {r.label} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/contact#enquiry" icon={ArrowRight}>
              Get a quote
            </ButtonLink>
            <ButtonLink href={whatsappLink(`Hi, I read your guide "${g.title}" and I'd like a proposal for my hotel.`)} external icon={WhatsappLogo} variant="ghost">
              WhatsApp us
            </ButtonLink>
          </div>
          {g.sources && (
            <p className="pt-4 text-[14px] text-muted">
              Source:{" "}
              {g.sources.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {s.label}
                </a>
              ))}
            </p>
          )}
        </section>
      </article>

      <CtaBand />
    </>
  );
}
