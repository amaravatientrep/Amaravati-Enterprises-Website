import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";
import { CookieSettingsLink } from "./CookieConsent";
import { areas, categories, contact, nav } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-[#0F1312] text-[#E6ECE8]">
      {/* Phones: Products and Company side by side */}
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-12 md:gap-12">
        <div className="col-span-2 md:col-span-4">
          <Logo size="lg" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            Complete Hospitality Solutions for Modern Hospitality.
          </p>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-medium text-white">Product Range</h2>
          <ul className="mt-1 text-[14px] text-white/65 md:mt-3 md:space-y-0.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href={`/products/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href="/products/biotique">
                Biotique Range
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-medium text-white">Company</h2>
          <ul className="mt-1 text-[14px] text-white/65 md:mt-3 md:space-y-0.5">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href="/brochures">
                Brochures
              </Link>
            </li>
            <li>
              <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href="/guides">
                Guides
              </Link>
            </li>
            <li>
              <Link className="block py-3 leading-snug hover:text-white md:inline-block md:py-1.5" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4">
          <h2 className="text-sm font-medium text-white">Contact</h2>
          <address className="mt-2 space-y-1 text-[14px] not-italic text-white/65 md:mt-4 md:space-y-2.5">
            <p>
              <a className="inline-block py-3 hover:text-white md:py-1" href={contact.phoneHref}>
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="inline-block py-3 [overflow-wrap:anywhere] hover:text-white md:py-1" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
            <p>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-block py-3 hover:text-white md:py-1">
                {contact.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="sr-only"> (opens Google Maps)</span>
              </a>
            </p>
          </address>
          {/* Small map; the whole frame opens the office in Google Maps. */}
          <a
            href={contact.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open our office in Google Maps"
            className="group relative mt-5 block h-40 max-w-sm overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <iframe
              title="Map of the Amaravati Enterprises office"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Amaravati Enterprises, " + contact.address.join(", "))}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              className="pointer-events-none h-full w-full border-0 grayscale-[30%] transition duration-500 group-hover:grayscale-0"
            />
          </a>
          <a href={contact.googleProfile} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex py-3 text-[14px] text-white/65 underline md:mt-4 md:py-0 decoration-white/30 underline-offset-4 hover:text-white">
            See us on Google
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex w-fit items-center gap-3 rounded-2xl py-2 text-white/80 hover:text-white"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 transition-colors group-hover:bg-white/[0.12]" aria-hidden="true">
              <InstagramLogo size={22} />
            </span>
            <span className="text-[14px] font-medium leading-snug text-white">Follow us on Instagram</span>
          </a>
          <p className="mt-6 text-[14px] text-white/65">Providing solutions to Hotels all over India.</p>
        </div>
      </div>
      {/* Region pages, so buyers (and search engines) reach the one for their state or city */}
      <div className="container-x pb-10">
        <h2 className="text-sm font-medium text-white">Areas we supply</h2>
        <ul className="mt-2 flex flex-wrap gap-x-5 text-[14px] text-white/65">
          {areas.filter((a) => !a.state || a.featured).map((a) => (
            <li key={a.slug}>
              <Link className="inline-block py-2 hover:text-white md:py-1" href={`/areas/${a.slug}`}>
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-white/50 sm:flex-row sm:justify-between">
          <p>© {year} Amaravati Enterprises. All rights reserved.</p>
          <Link href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:text-white">
            Privacy Notice
          </Link>
          <CookieSettingsLink className="text-left underline decoration-white/30 underline-offset-4 hover:text-white" />
        </div>
      </div>
    </footer>
  );
}
