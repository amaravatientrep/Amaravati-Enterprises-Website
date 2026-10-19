import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import ButtonLink from "./Button";
import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/site";

// Same heading and text on every page; product only pre-fills the quote form and WhatsApp message
const title = "Tell us what your hotel needs.";
const text = "Share us your details & requirements. We will send a proposal accordingly for your property.";

export default function CtaBand({ product }) {
  const quoteHref = product ? `/contact?product=${encodeURIComponent(product)}#enquiry` : "/contact#enquiry";
  return (
    <section className="container-x mt-24 md:mt-32">
      <Reveal className="relative overflow-hidden rounded-shell bg-accent px-6 py-14 text-accent-ink sm:px-12 md:py-20">
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-85">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref} icon={ArrowRight} variant="dark" className="!bg-accent-ink !text-accent hover:!bg-accent-ink/90">
              Get a quote
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(product ? `Hi, I'd like a quote for ${product}.` : "Hi, I'd like a quote for hotel amenities.")}
              external
              icon={WhatsappLogo}
              variant="ghost"
              className="!bg-accent-ink/10 !text-accent-ink !ring-accent-ink/20"
            >
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
