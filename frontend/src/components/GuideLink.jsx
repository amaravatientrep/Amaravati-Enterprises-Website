import Link from "next/link";
import { BookOpenText, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { guides } from "@/lib/guides";

// A one-line pointer from a product page to the buyer guide on the same topic.
export default function GuideLink({ slug, className = "" }) {
  const g = guides.find((x) => x.slug === slug);
  if (!g) return null;
  return (
    <section className={`container-x ${className}`} aria-label="Related guide">
      <Link href={`/guides/${g.slug}`} className="group flex items-center gap-4 rounded-shell p-5 ring-1 ring-line/10 transition-colors duration-150 hover:bg-surface sm:max-w-2xl">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
          <BookOpenText size={22} />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-semibold uppercase tracking-wide text-accent">Guide</span>
          <span className="block font-semibold leading-snug">{g.title}</span>
        </span>
        <ArrowRight size={18} className="ml-auto shrink-0 transition-transform duration-200 ease-snap group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </section>
  );
}
