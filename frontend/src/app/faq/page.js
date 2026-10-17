import PageHeader from "@/components/PageHeader";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/site";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions from hotels about custom branded amenities, our product range, areas we supply and how to get a quote.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader ld crumbs={[{ label: "FAQ" }]} title="Questions hotels ask us." intro="Can't find your answer? Ask us on WhatsApp and we will reply." />
      <section className="container-x max-w-4xl">
        <FaqList items={faqs} />
      </section>
      <CtaBand />
    </>
  );
}
