import { Suspense } from "react";
import { ArrowRight, WhatsappLogo, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import HousekeepingCatalogue from "@/components/HousekeepingCatalogue";
import { hkItemCount } from "@/lib/housekeeping";
import { categories, brochures, whatsappLink, SITE_URL } from "@/lib/site";
import { fileSize } from "@/lib/fileSize";

const c = categories.find((x) => x.slug === "housekeeping");
const hkBrochure = brochures.find((b) => b.file.includes("ae-hk"));

export const metadata = {
  title: c.title,
  description: `Hotel housekeeping material supplier: ${hkItemCount} coded products, from janitorial carts, trolleys and dustbins to cleaning consumables, Diversey chemicals and kitchen disposables.`,
  alternates: { canonical: "/products/housekeeping" },
};

export default function HousekeepingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/products/housekeeping` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]}
        title={c.h1 || c.name}
        intro="Search by product name or code, tap the products you need, and send them to us in one enquiry."
      >
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink("Hi, I'd like a quote for housekeeping supplies.")} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
          {hkBrochure && (
            <ButtonLink fill href={hkBrochure.file} external icon={DownloadSimple} variant="ghost" className="col-span-2">
              Download Brochure{fileSize(hkBrochure.file) ? ` (${fileSize(hkBrochure.file)})` : ""}
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <div className="container-x">
        <Suspense>
          <HousekeepingCatalogue />
        </Suspense>
      </div>

      <CtaBand product={c.name} />
    </>
  );
}
