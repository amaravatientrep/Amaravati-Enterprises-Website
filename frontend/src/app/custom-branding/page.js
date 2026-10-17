import { ArrowRight, ArrowDown, PenNib, Stamp, Truck, Package, Drop, Article } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import BrandingPreview from "@/components/BrandingPreview";
import SceneSlideshow from "@/components/SceneSlideshow";
import { kitScenes, rotate } from "@/lib/scenes";
import StripCarousel from "@/components/motion/StripCarousel";
import { brandedWork } from "@/lib/site";

export const metadata = {
  title: "Customised Hotel Toiletries and Branded Amenities",
  description:
    "Hotel amenities, packaging and stationery printed with your hotel's name and logo. Soaps, bottles, amenity kits, pouches, boxes, key card jackets and more.",
  alternates: { canonical: "/custom-branding" },
};

const surfaces = [
  { icon: Drop, title: "Toiletries", text: "Soap wrappers, bottle labels and tubes." },
  { icon: Package, title: "Kits and packaging", text: "Dental, shaving and vanity kits, boxes and pouches." },
  { icon: Article, title: "Stationery", text: "Key card jackets, pads, tags, menus, letterheads and napkins." },
];

export default function CustomBrandingPage() {
  return (
    <>
      <PageHeader ld
        crumbs={[{ label: "Custom branding" }]}
        title="Amenities that carry your hotel's name."
        intro="Guests notice the small things. When the soap, the dental kit and the key card jacket all carry your name, the room feels like yours, not a supplier's."
      >
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href="/contact?product=Custom%20branding#enquiry" icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href="#try" icon={ArrowDown} variant="ghost">
            Try your logo
          </ButtonLink>
        </div>
      </PageHeader>

      <section id="try" className="container-x scroll-mt-28" aria-labelledby="try-title">
        <Reveal className="mb-8 max-w-2xl">
          <h2 id="try-title" className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Your Hotel&rsquo;s identity on all products.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">Upload your logo, pick a label colour, and download the preview to share with your team.</p>
        </Reveal>
        <BrandingPreview />
      </section>

      <SceneSlideshow items={rotate(kitScenes, 20)} label="Branded kits made for hotels" className="mt-24 md:mt-32" />

      <section className="container-x mt-24 md:mt-32" aria-label="Branded work for clients">
        <Reveal>
          <StripCarousel
            items={brandedWork.map((w) => ({ src: w.image, label: `Branded amenities made for ${w.client}` }))}
            label="Branded amenities made for clients"
            captions={false}
            perView="three"
            aspect="portrait"
          />
        </Reveal>
      </section>

      <section className="container-x mt-24 md:mt-32" aria-labelledby="what-title">
        <Reveal>
          <h2 id="what-title" className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            What we can brand
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {surfaces.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={i === 0 ? "shell md:col-span-1" : "shell"}>
              <div className={`core h-full p-7 ${i === 0 ? "bg-accent text-accent-ink" : ""}`}>
                <s.icon size={28} weight="light" aria-hidden="true" />
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className={`mt-2 leading-relaxed ${i === 0 ? "opacity-85" : "text-muted"}`}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 bg-sunk py-20 md:mt-32 md:py-28" aria-labelledby="how-title">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="how-title" className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              How it works
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">Three steps from your logo to branded stock in your store room.</p>
          </Reveal>
          <ol className="grid gap-4 md:col-span-7">
            {[
              { icon: PenNib, t: "Share your logo", d: "Send your logo and the products you want branded on WhatsApp or email." },
              { icon: Stamp, t: "Approve the artwork", d: "We prepare the design on each product and send it to you for approval." },
              { icon: Truck, t: "Receive branded stock", d: "Once approved, your branded amenities are produced and delivered to your property." },
            ].map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="shell">
                <div className="core flex gap-5 p-6 md:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
                    <s.icon size={22} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Send us your logo." text="Tell us your hotel name and which products you want branded. We will come back with artwork and a quote." product="Custom branding" />
    </>
  );
}
