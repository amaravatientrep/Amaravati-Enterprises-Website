// Buyer guides: long-form answers to the questions hotels ask (Google and AI search).
// Each guide: slug, title (H1), seoTitle, description, answer (the short direct answer shown first), image,
// sections [{ h, blocks }], faqs [{ q, a }], related [{ href, label }].
// Block types: { p }, { list: [] }, { table: { head: [], rows: [[]] } }, { image: { src, alt, caption } }.
// House rules: no prices, MOQs or lead times; no manufacturing claims; real photos only.

export const guides = [
  {
    slug: "hotel-amenities-checklist",
    title: "Hotel Room Amenities List & Checklist by Room Category",
    seoTitle: "Hotel Room Amenities List & Checklist by Room Category",
    description:
      "A hotel room amenities list and checklist for budget, mid-scale, 4-star and 5-star rooms: toiletries, guest amenity kits, in-room items and the tea and coffee tray.",
    answer:
      "Every hotel guest room needs four groups of amenities: bathroom toiletries, guest amenity kits, in-room items and a tea and coffee tray. Budget rooms cover the essentials, mid-scale rooms add more kits and branded packaging, and premium rooms add fuller kits, premium toiletry ranges and leather in-room accessories.",
    image: { src: "/images/tiles/guest-amenities.jpg", alt: "Branded guest amenity kits made for The Park, Hyderabad" },
    sections: [
      {
        h: "The checklist at a glance",
        blocks: [
          { p: "Use this table as a starting list. Most hotels mix and match by room category, and every item can carry your hotel's identity." },
          {
            table: {
              head: ["Area", "Budget rooms", "Mid-scale rooms", "Premium rooms"],
              rows: [
                ["Bathroom toiletries", "Soap, Shampoo, Shower Gel", "Adds Conditioner and Moisturizer", "Premium range or wall mounted dispensers"],
                ["Guest amenity kits", "Dental Kit, Comb", "Adds Shaving Kit, Shower Cap, Sewing Kit", "Adds Care Kit, Shoe Shiner, Slippers"],
                ["Wardrobe and room", "Hangers", "Adds Laundry Bag, Slippers", "Adds wooden hangers, leather room accessories"],
                ["Tea and coffee tray", "Kettle, tray, tea and coffee sachets, sugar", "Adds cups, glasses, stirrers", "Adds wooden tray, sachet holder, premium tea"],
                ["Stationery", "Key Card Jacket, Scribbling Pad, Pen", "Adds Coaster, Menu Card", "Adds leather Scribbling Pad Holder and Menu Card"],
              ],
            },
          },
        ],
      },
      {
        h: "Bathroom toiletries",
        blocks: [
          { p: "Toiletries are what guests notice first. Choose between single-use bottles and wall mounted dispensers, and pick a soap size that suits the room." },
          {
            list: [
              "Soap: cream or glycerin, wrapped or boxed, in sizes from 15 g to 50 g.",
              "Liquids: Shampoo, Shower Gel, Conditioner and Moisturizer in 20 ml, 25 ml or 30 ml bottles, or in tubes.",
              "Dispensers: lockable wall mounted dispensers refilled from 5 litre cans, popular with hotels moving away from small bottles.",
            ],
          },
          { image: { src: "/images/showcase/scene-02.webp", alt: "Clarion Hotel amenities on a marble vanity", caption: "Branded toiletries and kits for Clarion." } },
        ],
      },
      {
        h: "Guest amenity kits",
        blocks: [
          { p: "Kits are small, but guests rely on them. Pack each one in a paper board box, kraft board box or paper pouch with your hotel's name." },
          {
            list: [
              "Dental Kit: a toothbrush (white, translucent, bamboo or wheat starch) with toothpaste.",
              "Shaving Kit: a razor with shaving gel.",
              "Comb, Shower Cap and Sewing Kit.",
              "Care Kit: ear buds, band aid and emery board.",
              "Sanitary Disposal Bag, Shoe Shiner, Loofah, Laundry Bag and Slippers.",
            ],
          },
        ],
      },
      {
        h: "Tea and coffee tray",
        blocks: [
          { p: "A well-stocked tray is one of the first things a guest uses. Restock it from the same order as your amenities." },
          { list: ["Kettle and tray (plastic, drawer or wooden)", "Tea sachets, coffee sachets, sugar and sugar-free sachets", "Cups, glasses, coasters and glass covers"] },
          { image: { src: "/images/tiles/tea-coffee.jpg", alt: "Kettle tray set with cups and tea sachets in a hotel room", caption: "A kettle tray set ready for the room." } },
        ],
      },
      {
        h: "4-star and 5-star hotel room amenities list",
        blocks: [
          { p: "4-star and 5-star rooms carry everything in the mid-scale list, in fuller kits and more finished packaging. A typical premium room amenities list:" },
          {
            list: [
              "Bathroom: a premium toiletry range (Shampoo, Conditioner, Shower Gel, Moisturizer) in bottles or wall mounted dispensers, plus glycerin or cream soap.",
              "Kits: Dental Kit, Shaving Kit, Care Kit, Sewing Kit, Shower Cap, Comb, Loofah and Sanitary Disposal Bag, in boxes or pouches with your hotel's name.",
              "Wardrobe: wooden hangers, Slippers, Laundry Bag and Shoe Shiner.",
              "Desk and bedside: leather Scribbling Pad Holder, Remote Holder, Menu Card and Box Tissue Holder.",
              "Tea and coffee: wooden or drawer kettle tray, kettle, cups, sachet holder and premium tea sachets.",
              "Room fixtures: glass water bottle, iron and iron board, wall mounted hair dryer and anti-skid mat.",
            ],
          },
        ],
      },
      {
        h: "Bottles or dispensers?",
        blocks: [
          { p: "Single-use bottles feel personal and suit hotels with frequent changeovers. Wall mounted dispensers stay on the wall and are refilled from bulk cans, so there are no half-used bottles to throw away after each stay. Many hotels use dispensers in standard rooms and bottles in suites." },
        ],
      },
      {
        h: "Make the set your own",
        blocks: [
          { p: "Bottles, soap, kit boxes, pouches and stationery can all carry your hotel's name and logo. Share your logo, approve the artwork, and receive branded stock at your property." },
        ],
      },
    ],
    faqs: [
      { q: "What are the basic amenities in a hotel room?", a: "Soap, Shampoo, Shower Gel, a Dental Kit, a Comb, hangers, a Key Card Jacket and a tea and coffee tray with kettle. Most hotels add a Shower Cap, Shaving Kit and Slippers." },
      { q: "What amenities should a budget hotel provide?", a: "At least soap, shampoo, shower gel, a dental kit, a comb, hangers and a basic tea and coffee tray. Adding a shower cap and slippers lifts the experience at little extra effort." },
      { q: "Can I mix amenities across room categories?", a: "Yes. Most hotels use one look across the property and add kits or premium toiletries in higher room categories." },
      { q: "Can every item carry my hotel's logo?", a: "Bottles, soap, kit boxes, pouches and stationery can all be branded. Share your logo and we prepare the artwork for your approval." },
      { q: "How do I order a full set?", a: "Pick the items in Build your Amenity Kit, or send us your room count and categories on WhatsApp and we will send a proposal for your property." },
    ],
    related: [
      { href: "/products/hotel-toiletries", label: "Hotel toiletries supplier" },
      { href: "/products/amenity-kits", label: "Hotel guest amenity kits" },
      { href: "/products/in-room-amenities", label: "In-room amenities for hotels" },
      { href: "/products/tea-coffee", label: "Kettle tray sets for hotel rooms" },
      { href: "/products/stationery", label: "Hotel stationery" },
      { href: "/custom-branding", label: "Custom branded hotel toiletries" },
    ],
  },
  {
    slug: "eco-friendly-hotel-amenities",
    title: "Plastic-Free Hotel Amenities: Swaps for Indian Hotels",
    seoTitle: "Plastic-Free Hotel Amenities: Swaps for Indian Hotels",
    description:
      "How hotels in India can replace plastic guest amenities: bamboo and wheat starch kits, paper pouches, jute slippers, paper laundry bags and wall mounted dispensers.",
    answer:
      "Most plastic guest amenities have a ready replacement: bamboo or wheat starch toothbrushes, razors and combs; toothpaste and shaving gel in paper pouches; kraft or butter paper packaging; paper or cloth laundry bags; jute slippers; and wall mounted dispensers refilled from bulk cans instead of small bottles.",
    image: { src: "/images/tiles/eco-friendly.jpg", alt: "Eco-friendly hotel amenities in kraft pouches and boxes on a bathroom counter" },
    sections: [
      {
        h: "Why hotels are switching",
        blocks: [
          { p: "Since 1 July 2022, India has banned the manufacture, sale and use of a list of single-use plastic items. Guests and hotel groups also increasingly expect less plastic in the room. Switching the guest amenities is one of the most visible changes a hotel can make." },
        ],
      },
      {
        h: "Item-by-item swaps",
        blocks: [
          {
            table: {
              head: ["Usual item", "Eco-friendly swap"],
              rows: [
                ["Plastic toothbrush", "Bamboo Brush or Wheat Starch Brush"],
                ["Toothpaste tube", "Toothpaste in Paper Pouch"],
                ["Plastic razor", "Bamboo Razor or Wheat Starch Razor"],
                ["Shaving gel tube", "Shaving Gel in Paper Pouch"],
                ["Plastic comb", "Bamboo Handle Comb, Bamboo Pocket Comb or Wheat Starch Handle Comb"],
                ["Plastic shower cap", "Compostable Shower Cap"],
                ["Plastic sanitary bag", "Biodegradable Sanitary Disposal Bag"],
                ["Plastic loofah", "Natural Loofah or Jute Loofah"],
                ["Non-woven laundry bag", "Paper Laundry Bag or Cloth Bag"],
                ["Non-woven slippers", "Jute Slippers, closed or open toe"],
                ["Plastic shoe shiner box", "Wheat Starch Box or Tin Box"],
                ["Small plastic bottles", "Wall mounted dispensers refilled from 5 litre cans"],
                ["Plastic dispenser bottle", "Wheat Starch Dispenser"],
              ],
            },
          },
        ],
      },
      {
        h: "Packaging matters as much as the product",
        blocks: [
          { p: "A bamboo brush in a plastic sleeve still adds plastic to the room. Pack kits in one of three plastic-free options, each of which can carry your hotel's name:" },
          { list: ["Kraft Paper Pouch: light and natural looking.", "Butter Paper Pouch: clean white with a soft finish.", "Kraft Board Box: sturdy, for kits that stand on the counter."] },
          { image: { src: "/images/eco/pack-kraft-pouch-1.jpg", alt: "Guest amenity kits in kraft paper pouches on a bathroom counter", caption: "Kits in kraft paper pouches." } },
        ],
      },
      {
        h: "Dispensers instead of small bottles",
        blocks: [
          { p: "Wall mounted dispensers stay in the bathroom and are refilled from bulk cans, so the room no longer goes through small bottles every stay. Lockable designs keep them on the wall, and wheat starch dispenser bottles reduce plastic further." },
        ],
      },
      {
        h: "Making the switch",
        blocks: [
          {
            list: [
              "Start with the items guests touch most: dental kit, comb and toiletries.",
              "Move packaging to kraft or butter paper at the same time.",
              "Replace small bottles with dispensers room by room as stock runs out.",
              "Keep one look across the property, with your hotel's identity on every pouch and box.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Are bamboo toothbrushes suitable for hotels?", a: "Yes. Bamboo and wheat starch brushes are used the same way as plastic ones and come packed in paper pouches or boxes that can carry your hotel's name." },
      { q: "Do eco-friendly kits look less premium?", a: "No. Kraft and butter paper packaging look natural and premium, and every pouch and box can be branded." },
      { q: "Can I switch only part of my amenities?", a: "Yes. Many hotels start with the dental kit, comb and packaging, then move to dispensers." },
      { q: "Which eco-friendly amenities do you supply?", a: "Bamboo and wheat starch kits, toothpaste and shaving gel in paper pouches, compostable shower caps, biodegradable sanitary bags, natural and jute loofahs, paper and cloth laundry bags, jute slippers, jute bags and wheat starch dispensers." },
    ],
    related: [
      { href: "/products/eco-friendly", label: "Eco-friendly hotel amenities" },
      { href: "/products/anti-theft-dispensers", label: "Wall mounted dispensers for hotels" },
      { href: "/products/amenity-kits", label: "Hotel guest amenity kits" },
    ],
    sources: [
      { href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/jul/doc20227169001.pdf", label: "Government of India (PIB): ban on identified single-use plastic items from 1 July 2022" },
    ],
  },
  {
    slug: "custom-branded-hotel-toiletries",
    title: "Hotel Toiletries with Your Logo: How Branding Works",
    seoTitle: "Hotel Toiletries with Your Logo: How Branding Works",
    description:
      "How hotels get toiletries, amenity kits and stationery with their own name and logo: what can be branded, what to send, artwork approval and packaging options.",
    answer:
      "Hotels can put their own name and logo on bottles, soap, amenity kit boxes and pouches, and stationery. You share your logo, approve the artwork prepared for each product, and receive branded stock at your property.",
    image: { src: "/images/2026/car-the-park.jpg", alt: "Branded amenities made for The Park, Hyderabad" },
    sections: [
      {
        h: "What can carry your hotel's identity",
        blocks: [
          {
            list: [
              "Toiletries: bottle labels for Shampoo, Shower Gel, Conditioner and Moisturizer, and soap wraps and boxes.",
              "Guest amenity kits: Dental Kit, Shaving Kit, Comb, Care Kit, Sewing Kit and Shower Cap boxes and pouches.",
              "Stationery: Key Card Jacket, Scribbling Pad, Menu Card, Letterhead, Envelope, Bottle Tag and Luggage Tag.",
              "In the room: Laundry Bag and DND card.",
            ],
          },
          { image: { src: "/images/2026/car-paper-board.jpg", alt: "Navy paper board amenity kits made for Deccan Serai", caption: "Navy paper board kits made for Deccan Serai." } },
        ],
      },
      {
        h: "How it works",
        blocks: [
          {
            list: [
              "Share your logo: send it with the products you want branded, on WhatsApp or email.",
              "Approve the artwork: we prepare the design on each product and send it to you for approval.",
              "Receive branded stock: once approved, your branded amenities are delivered to your property.",
            ],
          },
          { p: "Want to see it first? Upload your logo to the free preview tool and see it on the whole range in seconds." },
        ],
      },
      {
        h: "What to send",
        blocks: [
          {
            list: [
              "Your logo in the best quality you have: a vector file (SVG, PDF or AI) is ideal, a high-resolution PNG also works.",
              "Your brand colours, if you have them.",
              "The products and room categories you want branded.",
            ],
          },
        ],
      },
      {
        h: "Packaging options",
        blocks: [
          { p: "Every box and pouch can carry your hotel's identity. Choose from paper board boxes, kraft board boxes, paper board boxes with matte lamination, textured card boxes, and biodegradable butter paper or kraft paper pouches." },
          { image: { src: "/images/stationery/stationery-2.jpg", alt: "Royalton Hotels branded letterheads, envelopes, menu and key card jacket", caption: "Branded stationery for Royalton Hotels." } },
        ],
      },
    ],
    faqs: [
      { q: "Can I see my logo on the products before ordering?", a: "Yes. Upload your logo to the preview tool on our Custom Branding page, or send it on WhatsApp and we will prepare the artwork for your approval." },
      { q: "What logo file should I send?", a: "A vector file (SVG, PDF or AI) gives the sharpest print. A high-resolution PNG also works." },
      { q: "Can I brand eco-friendly amenities?", a: "Yes. Kraft paper pouches, butter paper pouches and kraft board boxes can all carry your hotel's name and logo." },
      { q: "Where do you supply?", a: "We supply to Hotels, Resorts, Hospitals, Institutions and Guest Houses all over India." },
    ],
    related: [
      { href: "/custom-branding", label: "Custom Branding (try your logo)" },
      { href: "/products/amenity-kits", label: "Guest Amenities" },
      { href: "/products/stationery", label: "Hotel Stationery" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
];
