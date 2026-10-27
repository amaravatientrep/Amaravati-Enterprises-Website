import { SITE_URL, contact, categories, partnerBrands, clients, stats, faqs, areas } from "@/lib/site";
import { guides } from "@/lib/guides";
import { amenityPages } from "@/lib/amenityPages";

// Plain-text summary for AI assistants (ChatGPT, Gemini, Perplexity), built from the same data as the site.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Amaravati Enterprises",
    "",
    "> Hotel amenities supplier based in Hyderabad, India, supplying hotels, resorts, guest houses, hospitals and institutions all over India. Guest-room amenities can carry the hotel's own name and logo (Custom Branding).",
    "",
    ...stats.map((s) => `- ${s.value} ${s.label}`),
    "",
    "## Product range",
    "",
    ...categories.map((c) => `- [${c.name}](${SITE_URL}/products/${c.slug}): ${c.short}`),
    "",
    "## Guest amenities, one page each",
    "",
    ...Object.entries(amenityPages).map(([slug, s]) => `- [${s.h1}](${SITE_URL}/products/amenity-kits/${slug}): ${s.description}`),
    "",
    "## Brands",
    "",
    "- Purely Serene: Amaravati Enterprises' own registered brand of premium toiletries.",
    ...partnerBrands.map((b) => `- ${b.name} (partner brand): ${b.line}`),
    "",
    "## Custom Branding",
    "",
    `- [Custom Branding](${SITE_URL}/custom-branding): Soaps, bottles, Amenity Kits, boxes, pouches and stationery printed with the hotel's name and logo. The hotel shares its logo, approves the artwork, and receives branded stock.`,
    "",
    "## Areas supplied",
    "",
    `Hotels all over India, including: ${areas.map((a) => `[${a.name}](${SITE_URL}/areas/${a.slug})`).join(", ")}.`,
    "",
    "## Guides",
    "",
    ...guides.map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.answer}`),
    "",
    "## Clients include",
    "",
    clients.map((c) => c.name).filter((n, i, a) => a.indexOf(n) === i).join(", "),
    "",
    "## Common questions",
    "",
    ...faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
    "## Contact",
    "",
    `- WhatsApp and phone: ${contact.phoneDisplay}`,
    `- Email: ${contact.email}`,
    `- Office: ${contact.address.join(", ")}`,
    `- Quotes: ${SITE_URL}/contact`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
