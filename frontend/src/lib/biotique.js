// Biotique Hospitality Collection, distributed by Amaravati Enterprises.
// Every image is an original catalogue photo; Biotique branding appears only where it is printed on the products.

const I = "/images/biotique/";

export const biotiqueRanges = [
  {
    id: "assorted",
    title: "Biotique Assorted Range",
    text: "Shampoo, body wash, skin lotion, conditioner and hand wash in guest sizes, dispensers and refill cans.",
    items: [
      { src: `${I}assorted-bottles-25-35ml.jpg`, label: "25 ml & 35 ml Bottles", alt: "Biotique Assorted Range single-use bottles in 25 ml and 35 ml" },
      { src: `${I}assorted-dispensers-380ml.jpg`, label: "380 ml Dispensers", alt: "Biotique Assorted Range 380 ml dispensers" },
      { src: `${I}assorted-cans-5l.jpg`, label: "5 Litre Cans", alt: "Biotique Assorted Range 5 litre cans" },
    ],
  },
  {
    id: "almond-soap",
    title: "Biotique Nourishing Almond Soap",
    text: "Wrapped guest soap.",
    specs: ["15 g", "25 g", "30 g"],
    items: [{ src: `${I}almond-soap.jpg`, alt: "Biotique Nourishing soap in 15 g, 25 g and 30 g wraps" }],
  },
  {
    id: "dry-amenities",
    title: "Biotique Dry Amenities",
    text: "Shaving kit, dental kit and comb.",
    contain: true,
    items: [
      { src: `${I}dry-amenities-1.jpg`, alt: "Biotique shaving kit, dental kit and comb in white sleeves" },
      { src: `${I}dry-amenities-2.jpg`, alt: "Biotique shaving kit, dental kit and comb in kraft sleeves" },
      { src: `${I}dry-amenities-3.jpg`, alt: "Biotique comb, dental kit and shaving kit in kraft boxes" },
    ],
  },
  {
    id: "tubes",
    title: "Biotique Tubes",
    text: "Shampoo, shower gel, moisturizer and conditioner.",
    specs: ["Orchid 30 ml", "Terraverde 15 ml"],
    items: [{ src: `${I}tubes-orchid-terraverde.jpg`, alt: "Biotique Orchid and Terraverde tubes" }],
  },
  {
    id: "royal",
    title: "Biotique Royal",
    text: "Available in 380 ml dispensers and 5 litre cans.",
    items: [
      { src: `${I}royal-bergamot-patchouli.jpg`, label: "Bergamot & Patchouli", alt: "Biotique Royal Bergamot & Patchouli 380 ml dispensers and 5 litre cans" },
      { src: `${I}royal-cypress-citrus-neroli.jpg`, label: "Cypress Citrus & Neroli", alt: "Biotique Royal Cypress Citrus & Neroli 380 ml dispensers and 5 litre cans" },
      { src: `${I}royal-red-grapefruit-kopou-phool.jpg`, label: "Red Grapefruit & Kopou Phool", alt: "Biotique Royal Red Grapefruit & Kopou Phool 380 ml dispensers and 5 litre cans" },
    ],
  },
  {
    id: "farm-fresh",
    title: "Farm Fresh by Biotique",
    text: "Lemon Balm & Watermint, in dispensers, refill cans, single-use bottles and soap.",
    items: [
      { src: `${I}farm-fresh-dispensers.jpg`, label: "Dispensers", alt: "Biotique Farm Fresh dispensers" },
      { src: `${I}farm-fresh-cans-5l.jpg`, label: "5 Litre Cans", alt: "Biotique Farm Fresh 5 litre cans" },
      { src: `${I}farm-fresh-soap-bottles.jpg`, label: "Single-Use Bottles & Soap", alt: "Biotique Farm Fresh single-use bottles and soap" },
    ],
  },
];
