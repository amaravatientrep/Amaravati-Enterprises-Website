import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { SITE_URL } from "@/lib/site";

// ld: also output the crumbs as BreadcrumbList schema (product pages build their own).
export default function PageHeader({ crumbs = [], title, subtitle, intro, children, ld = false }) {
  const breadcrumbLd = ld &&
    crumbs.length > 0 && {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ label: "Home", href: "/" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        ...(c.href && { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` }),
      })),
    };
  return (
    <section className="container-x pb-10 pt-32 sm:pt-36 md:pb-16">
      {breadcrumbLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />}
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <CaretRight size={12} aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {subtitle ? (
        <>
          <h1 className="max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-4xl text-xl font-medium leading-snug tracking-tight text-ink/80 md:text-2xl">{subtitle}</p>
        </>
      ) : (
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
      )}
      {intro && <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{intro}</p>}
      {children}
    </section>
  );
}
