import { Suspense } from "react";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import HousekeepingCatalogue from "@/components/HousekeepingCatalogue";
import { hkSections } from "@/lib/housekeeping";
import { categories, whatsappLink, SITE_URL } from "@/lib/site";

// Same items as the In-Room section of the housekeeping catalogue, offered as their own category.
const c = categories.find((x) => x.slug === "in-room-amenities");
const inRoom = hkSections.filter((s) => s.id === "in-room");
const count = inRoom[0].items.length;

export const metadata = {
  title: c.title,
  description: `${count} coded in-room amenities: hangers, kettle trays and kettles, leather room accessories, water bottles, mugs, irons and hair dryers for hotels.`,
  alternates: { canonical: "/products/in-room-amenities" },
  openGraph: { images: [{ url: c.cover }] },
};

export default function InRoomAmenitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/products/in-room-amenities` },
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
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?product=${encodeURIComponent(c.name)}#enquiry`} icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hi, I'd like a quote for in-room amenities.")} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container-x">
        <Suspense>
          <HousekeepingCatalogue sections={inRoom} product={c.name} />
        </Suspense>
      </div>

      <CtaBand product={c.name} />
    </>
  );
}
