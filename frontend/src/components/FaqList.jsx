import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function FaqList({ items }) {
  return (
    <div className="shell">
      <div className="core divide-y divide-line/[0.08] px-5 sm:px-8">
        {items.map((f) => (
          <details key={f.q} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] transition-transform duration-200 ease-snap group-open:rotate-45" aria-hidden="true">
                <Plus size={16} />
              </span>
            </summary>
            <p className="max-w-[65ch] pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
