import PageHeader from "@/components/PageHeader";
import { contact } from "@/lib/site";

export const metadata = {
  title: "Privacy Notice",
  description: "How Amaravati Enterprises uses the details you share through this website.",
  alternates: { canonical: "/privacy" },
};

// Plain-English notice for the enquiry form, WhatsApp links and visitor statistics on this site.
const sections = [
  {
    title: "What we collect",
    items: [
      "When you send an enquiry: your name, phone number, hotel name, email, city, the products you pick and your message. The form sends these to our email inbox through Web3Forms.",
      "When you tap a WhatsApp button: the message opens in your own WhatsApp, and you choose whether to send it. The message names the page you sent it from.",
      "Anonymous visitor statistics: which pages are visited, the type of device and the country, counted with Vercel Web Analytics, and how quickly pages load, measured with Vercel Speed Insights, so we can improve the site. Neither uses cookies or identifies you.",
      "Google Analytics, only if you accept it in the cookie banner: the pages you visit, the links you tap, how you found us, your device and approximate location. It uses cookies, and Google processes this data for us. You can change your choice at any time under Cookie settings at the bottom of every page.",
      "The logo preview tool works on your device. Your logo is not uploaded unless you choose to send it to us.",
    ],
  },
  {
    title: "How we use it",
    items: ["To reply to your enquiry, send you a proposal and supply your order.", "We do not sell your details or share them for anyone else's marketing."],
  },
  {
    title: "How long we keep it",
    items: ["We keep enquiry details for as long as we need them to serve you, and delete them when you ask."],
  },
  {
    title: "Your choices",
    items: [`To see, correct or delete the details you have shared with us, email ${contact.email} or call ${contact.phoneDisplay}. We will reply within a reasonable time.`],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Privacy Notice" }]} title="Privacy Notice" intro="How we use the details you share through this website." />
      <section className="container-x max-w-3xl space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted marker:text-accent">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-[14px] text-muted">Amaravati Enterprises, {contact.address.join(", ")}.</p>
      </section>
    </>
  );
}
