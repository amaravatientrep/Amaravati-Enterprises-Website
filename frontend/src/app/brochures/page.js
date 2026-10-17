import PageHeader from "@/components/PageHeader";
import BrochureGrid from "@/components/BrochureGrid";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Brochures",
  description: "Download Amaravati Enterprises brochures: company range, housekeeping and kitchen, dispenser systems and Biotique hotel amenities.",
  alternates: { canonical: "/brochures" },
};

export default function BrochuresPage() {
  return (
    <>
      <PageHeader ld crumbs={[{ label: "Brochures" }]} title="Brochures" intro="View or download our brochures. Each one opens as a PDF." />
      <section className="container-x">
        <BrochureGrid />
      </section>
      <CtaBand />
    </>
  );
}
