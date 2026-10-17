import Image from "next/image";
import Reveal from "./Reveal";
import StripCarousel from "./motion/StripCarousel";

// Captioned photo groups for a product category: a grid per group, or a swipeable row when layout is "carousel".
export default function ProductGallery({ groups }) {
  return (
    <div className="space-y-20 md:space-y-24">
      {groups.map((g) => (
        <section key={g.title} aria-labelledby={`g-${slug(g.title)}`}>
          <Reveal className="mb-8 max-w-2xl">
            <h2 id={`g-${slug(g.title)}`} className="text-3xl font-semibold tracking-tight md:text-4xl">
              {g.title}
            </h2>
            {g.note && <p className="mt-3 text-lg leading-relaxed text-muted">{g.note}</p>}
          </Reveal>
          {g.layout === "carousel" ? (
            <StripCarousel items={g.items} label={g.title} captions={g.captions !== false} />
          ) : (
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {g.items.map((it, i) => (
                <Reveal as="li" key={it.src} delay={(i % 4) * 0.05}>
                  <figure>
                    <div className="shell">
                      <div className={`core relative overflow-hidden ${g.aspect === "square" ? "aspect-square" : "aspect-[4/3]"}`}>
                        <Image src={it.src} alt={g.captions !== false ? `${g.title}: ${it.label}` : it.label} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                      </div>
                    </div>
                    {g.captions !== false && <figcaption className="mt-3 text-[15px] font-medium">{it.label}</figcaption>}
                  </figure>
                </Reveal>
              ))}
            </ul>
          )}
          {g.footnote && (
            <Reveal>
              <p className="mt-8 text-lg font-medium leading-relaxed md:whitespace-nowrap">{g.footnote}</p>
            </Reveal>
          )}
        </section>
      ))}
    </div>
  );
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
