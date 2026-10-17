import { Suspense } from "react";
import { Phone, EnvelopeSimple, MapPin, WhatsappLogo, GoogleLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { contact, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Contact and Get a Quote",
  description: "Get a quote for hotel amenities, branded packaging and housekeeping supplies. WhatsApp or call +91 94946 00101, or send an enquiry.",
  alternates: { canonical: "/contact" },
};

const ways = [
  { icon: WhatsappLogo, label: "WhatsApp", value: "Chat with our team", href: whatsappLink("Hi, I'd like a quote for hotel amenities."), external: true },
  { icon: Phone, label: "Call", value: contact.phoneDisplay, href: contact.phoneHref },
  { icon: EnvelopeSimple, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: "Office", value: contact.address.join(", "), href: contact.mapsHref, external: true },
  { icon: GoogleLogo, label: "Google", value: "See us on Google, reviews and directions", href: contact.googleProfile, external: true },
  { icon: InstagramLogo, label: "Instagram", value: "Stay updated about our next trade shows and events", href: contact.instagram, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader ld crumbs={[{ label: "Contact" }]} title="Get a quote." intro="Tell us your hotel and what you need. WhatsApp is the fastest way to reach us." />

      <section id="enquiry" className="container-x grid scroll-mt-28 grid-cols-1 gap-10 md:grid-cols-12 [&>*]:min-w-0">
        {/* Phones: WhatsApp and Call before the form, since that is how most buyers reach us */}
        <div className="-mb-4 grid grid-cols-2 gap-3 md:hidden">
          {ways.slice(0, 2).map((w) => (
            <a
              key={w.label}
              href={w.href}
              {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex min-h-[56px] items-center justify-center gap-2 rounded-full px-4 text-[15px] font-medium transition-transform duration-300 active:scale-[0.98] ${
                w.label === "WhatsApp" ? "bg-accent text-accent-ink" : "bg-ink/[0.05] text-ink ring-1 ring-line/10"
              }`}
            >
              <w.icon size={20} aria-hidden="true" />
              {w.label === "WhatsApp" ? "WhatsApp" : "Call us"}
            </a>
          ))}
        </div>
        <div className="md:col-span-7">
          <div className="shell">
            <div className="core p-6 sm:p-8 md:p-10">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight">Send an enquiry</h2>
              <Suspense fallback={<div className="h-[520px] animate-pulse rounded-field bg-ink/[0.04]" />}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
        <ul className="grid content-start gap-3 md:col-span-5">
          {ways.map((w) => (
            <li key={w.label}>
              <a
                href={w.href}
                {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-shell p-4 ring-1 ring-line/[0.08] transition-colors duration-300 hover:bg-surface"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
                  <w.icon size={22} weight="light" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] text-muted">{w.label}</span>
                  <span className={`block font-medium ${w.label === "Email" ? "[overflow-wrap:anywhere]" : ""}`}>{w.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
