import Image from "next/image";
import { clients } from "@/lib/site";

// The page's only marquee. Pauses on hover; static (wrapping grid) under reduced motion.
export default function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max animate-marquee gap-4 py-2 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {row.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= clients.length ? "true" : undefined}
            className={`flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl px-5 py-4 ring-1 ring-line/[0.07] md:h-28 md:w-56 ${
              i >= clients.length ? "motion-reduce:hidden" : ""
            }`}
            style={{ backgroundColor: c.bg || "#FFFFFF" }}
          >
            <Image src={c.src} alt={i >= clients.length ? "" : c.name} width={224} height={112} className="h-full w-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}
