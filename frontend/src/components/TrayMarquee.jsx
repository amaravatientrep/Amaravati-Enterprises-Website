import Image from "next/image";

// Cut-out trays drifting across on the page background. Pauses on hover; a static wrapped row under reduced motion.
export default function TrayMarquee({ items, label }) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <ul
        aria-label={label}
        className="flex w-max animate-marquee items-center gap-16 py-6 pr-16 md:pr-24 [animation-duration:45s] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center md:gap-24"
      >
        {row.map((it, i) => (
          <li key={`${it.src}-${i}`} aria-hidden={i >= items.length ? "true" : undefined} className={i >= items.length ? "motion-reduce:hidden" : ""}>
            <div className="relative h-40 w-64 md:h-56 md:w-[22rem]">
              <Image src={it.src} alt={i >= items.length ? "" : it.label} fill sizes="352px" className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.28)]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
