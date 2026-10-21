import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import GalleryGrid from "@/components/GalleryGrid";
import gallery from "@/lib/gallery.json";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Hotel Amenities Gallery",
  description:
    "Photos of hotel amenity kits, toiletries, wall mounted dispensers and kettle tray sets supplied to hotels all over India by Amaravati Enterprises, Hyderabad.",
  alternates: { canonical: "/gallery" },
  openGraph: { images: [{ url: gallery.kits[0].src }] },
};

const groups = [
  { id: "kits", label: "Amenity Kits", items: gallery.kits },
  { id: "toiletries", label: "Toiletries", items: gallery.toiletries },
  { id: "dispensers", label: "Dispensers", items: gallery.dispensers },
  { id: "tea", label: "Tray & Kettle", items: gallery.tea },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        ld
        crumbs={[{ label: "Gallery" }]}
        title="Gallery"
        intro="Amenity kits, toiletries, dispensers and tray sets we have supplied to hotels, many with the hotel's own branding."
      >
        <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <ButtonLink fill href="/contact#enquiry" icon={ArrowRight}>
            Get a quote
          </ButtonLink>
          <ButtonLink fill href={whatsappLink("Hi, I saw your gallery and would like a quote.")} external icon={WhatsappLogo} variant="ghost">
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="container-x" aria-label="Photos">
        <GalleryGrid groups={groups} />
      </section>

      <CtaBand />
    </>
  );
}
