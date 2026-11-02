import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, DownloadSimple, FilePdf, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { guides, checklists, sectionId } from "@/lib/guides";
import { whatsappLink, SITE_URL } from "@/lib/site";
import { fileSize } from "@/lib/fileSize";

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

const dateLabel = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// A list item is plain text, or { label, href, text }: the label links to the product page and the text follows it.
function ListItem({ it }) {
  if (typeof it === "string") return <li>{it}</li>;
  return (
    <li>
      <Link href={it.href} className="font-medium text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
        {it.label}
      </Link>
      {it.text && <span>: {it.text}</span>}
    </li>
  );
}

// The free checklist PDF, with its size so buyers on mobile data know what they are about to download.
function Download({ c, title }) {
  const size = fileSize(c.href);
  if (!size) return null;
  return (
    <div className="max-w-3xl rounded-2xl bg-accent-soft p-5 md:p-6">
      <div className="flex items-start gap-4">
        <FilePdf size={36} className="shrink-0 text-accent" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-lg font-semibold leading-snug">{c.title}</p>
          <p className="mt-1 text-[15px] text-ink/75">
            {c.blurb} Free, no sign-up. PDF, {c.pages} pages, {size}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={c.href} external icon={DownloadSimple}>
              Download the PDF
            </ButtonLink>
            <ButtonLink href={whatsappLink(`Hi, I downloaded your ${c.title.toLowerCase()} and I'd like a proposal for my hotel.`)} external icon={WhatsappLogo} variant="ghost">
              Send us your list
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ b, g }) {
  if (b.p) return <p className="max-w-[68ch] text-lg leading-relaxed text-ink/85">{b.p}</p>;
  if (b.h3) return <h3 className="pt-2 text-xl font-semibold tracking-tight">{b.h3}</h3>;
  if (b.list)
    return (
      <ul className="max-w-[68ch] list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink/85 marker:text-accent">
        {b.list.map((it) => (
          <ListItem key={typeof it === "string" ? it : it.label + it.href} it={it} />
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
  // Product photo grid: real catalogue photos on white, each opening its product page.
  if (b.grid)
    return (
      <ul className="grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {b.grid.map((it) => (
          <li key={it.name + (it.code || "")}>
            <Link href={it.href} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line/10 transition-shadow duration-150 hover:ring-line/25">
              <span className="relative block aspect-square bg-white">
                {/* Small pre-compressed webp files, served as-is. The alt is the product name, for image search. */}
                <Image src={it.img} alt={it.alt || it.name} width={240} height={240} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-200 ease-snap group-hover:scale-[1.04]" />
              </span>
              <span className="flex flex-1 flex-col gap-1 p-3">
                {it.code && <span className="text-[12px] font-semibold tabular-nums tracking-wide text-accent">{it.code}</span>}
                <span className="text-[15px] font-medium leading-snug">{it.name}</span>
                {it.text && <span className="text-[14px] leading-snug text-muted">{it.text}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  if (b.download) return <Download c={checklists[b.download]} title={g.title} />;
  return null;
}

// Buyer guide: a short direct answer first (what Google and AI tools quote), then the detail, FAQs and related pages.
export default function GuidePage({ params }) {
  const g = guides.find((x) => x.slug === params.slug);
  if (!g) notFound();
  const url = `${SITE_URL}/guides/${g.slug}`;
  const pdf = g.checklist && checklists[g.checklist];
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      image: [g.image.src, ...g.sections.flatMap((s) => s.blocks.filter((b) => b.image).map((b) => b.image.src))].map((src) => `${SITE_URL}${src}`),
      ...(g.published && { datePublished: g.published }),
      ...(g.updated && { dateModified: g.updated }),
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Amaravati Enterprises", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Amaravati Enterprises", logo: { "@type": "ImageObject", url: `${SITE_URL}/amaravati-logo.png` } },
      ...(pdf && fileSize(pdf.href) && { associatedMedia: { "@type": "MediaObject", name: pdf.title, contentUrl: `${SITE_URL}${pdf.href}`, encodingFormat: "application/pdf" } }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  // Long list guides get an "On this page" jump list, so a reader on a phone can go straight to their section.
  const toc = g.sections.length >= 6;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader ld crumbs={[{ label: "Guides", href: "/guides" }, { label: g.title }]} title={g.title}>
        {/* The answer in brief, set apart so a reader in a hurry (or an AI summary) gets it at once */}
        <div className="mt-8 max-w-[68ch] rounded-2xl bg-accent-soft p-5 md:p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">In short</p>
          <p className="mt-2 text-lg leading-relaxed">{g.answer}</p>
        </div>
        {g.updated && (
          <p className="mt-4 text-[14px] text-muted">
            Updated <time dateTime={g.updated}>{dateLabel(g.updated)}</time>
          </p>
        )}
      </PageHeader>

      <article className="container-x space-y-14 md:space-y-16">
        <figure className="max-w-4xl">
          <div className="shell">
            <div className="core relative aspect-[16/9] overflow-hidden">
              <Image src={g.image.src} alt={g.image.alt} fill priority sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" style={g.image.position ? { objectPosition: g.image.position } : undefined} />
            </div>
          </div>
        </figure>

        {toc && (
          <nav aria-labelledby="toc-title" className="max-w-3xl rounded-2xl bg-sunk p-5 md:p-6">
            <p id="toc-title" className="text-[13px] font-semibold uppercase tracking-wide text-muted">
              On this page
            </p>
            <ol className="mt-3 grid gap-x-8 gap-y-2 text-[15px] sm:grid-cols-2">
              {g.sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${sectionId(s.h)}`} className="underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                    {s.h}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq-title" className="underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                  Questions hotels ask
                </a>
              </li>
            </ol>
          </nav>
        )}

        {g.sections.map((s) => (
          <section key={s.h} id={sectionId(s.h)} className="scroll-mt-28 space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.h}</h2>
            {s.blocks.map((b, i) => (
              <Block key={i} b={b} g={g} />
            ))}
          </section>
        ))}

        <section className="scroll-mt-28 space-y-5" aria-labelledby="faq-title" id="faq">
          <h2 id="faq-title" className="scroll-mt-28 text-2xl font-semibold tracking-tight md:text-3xl">
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
