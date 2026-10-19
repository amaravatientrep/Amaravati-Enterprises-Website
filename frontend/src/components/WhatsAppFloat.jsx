import Link from "next/link";
import { WhatsappLogo, Phone, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { contact, whatsappLink } from "@/lib/site";
import WhatsAppFloatReveal from "./WhatsAppFloatReveal";

const waHref = whatsappLink("Hi, I'm interested in hotel amenities from Amaravati Enterprises.");

// Phones: a bottom action bar (call, WhatsApp, quote) that never covers page content.
// Tablets and desktops: the floating WhatsApp button.
export default function WhatsAppFloat() {
  return (
    <aside aria-label="Quick contact">
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line/10 bg-bg/90 px-3 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[auto_1fr_1fr] gap-2">
          <a
            href={contact.phoneHref}
            aria-label={`Call ${contact.phoneDisplay}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/[0.05] text-ink ring-1 ring-line/10 transition-transform duration-300 active:scale-95"
          >
            <Phone size={20} aria-hidden="true" />
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-accent-ink transition-transform duration-300 active:scale-[0.98]"
          >
            <WhatsappLogo size={20} aria-hidden="true" />
            WhatsApp
          </a>
          <Link
            href="/contact#enquiry"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-bg transition-transform duration-300 active:scale-[0.98]"
          >
            Get a quote
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      {/* Room under the footer so the bar never hides its last line */}
      <div className="h-[calc(4.25rem+env(safe-area-inset-bottom))] bg-[#0F1312] md:hidden" aria-hidden="true" />

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="wa-float fixed bottom-5 right-5 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_16px_40px_-12px_rgb(var(--accent)/0.6)] ring-4 ring-bg transition-transform duration-200 ease-snap hover:scale-105 active:scale-95 md:flex"
      >
        <WhatsappLogo size={28} weight="regular" aria-hidden="true" />
      </a>
      <WhatsAppFloatReveal />
    </aside>
  );
}
