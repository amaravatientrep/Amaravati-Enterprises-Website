// Buyer guides: long-form answers to the questions hotels ask (Google and AI search).
// Each guide: slug, title (H1), seoTitle, description, answer (the short direct answer shown first), image (position: optional crop focus),
// published / updated (ISO dates), checklist (key into checklists, the free PDF), sections [{ h, blocks }],
// faqs [{ q, a }], related [{ href, label }].
// Block types: { p }, { h3 }, { list: [] } (items are text or { label, href, text }), { table: { head: [], rows: [[]] } },
// { image: { src, alt, caption } }, { grid: [{ name, img, href, text, code }] } (product photos), { download: key }.
// House rules: no prices, MOQs or lead times; no manufacturing claims; real photos only.

import { amenityProducts } from "./site";
import { amenityPages } from "./amenityPages";
import { hkSections } from "./housekeeping";

// Anchor id for a section heading, used by the "On this page" list.
export const sectionId = (h) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Free checklist PDFs in /public/checklists, generated from this file by scripts/build-checklists.mjs.
export const checklists = {
  amenities: {
    href: "/checklists/hotel-room-amenities-checklist.pdf",
    title: "Hotel Room Amenities Checklist",
    blurb: "The full list by room category with tick boxes and a column for quantities per room.",
    pages: 2,
  },
  housekeeping: {
    href: "/checklists/housekeeping-items-list-with-pictures.pdf",
    title: "Housekeeping Items List with Pictures",
    blurb: "All seven housekeeping groups with photos, catalogue codes and uses, plus the R1 to R9 table and a cart checklist.",
    pages: 5,
  },
};

// A guest amenity as a photo card: its box photo (or first variety photo) and a link to its own page.
const amenity = (slug, text) => {
  const p = amenityProducts.find((x) => x.slug === slug);
  // The item itself (first variety, or what is inside the kit) tells a reader more than the closed box.
  const img = Object.values(p.parts?.[0]?.images || {})[0] || Object.values(p.contentImages || {})[0] || p.kitImage || p.carton?.closed || p.examples?.[0]?.src;
  return { name: amenityPages[slug]?.h1 || p.name, img, href: `/products/amenity-kits/${slug}`, text, alt: `${amenityPages[slug]?.h1 || p.name} for hotel guest rooms` };
};
const amenityLink = (slug, text) => ({ label: amenityProducts.find((x) => x.slug === slug).name, href: `/products/amenity-kits/${slug}`, text });

// A housekeeping catalogue item as a photo card, by its catalogue code (or its name, for Diversey items without one).
// In-room items open the In-Room Amenities page.
const hkItems = new Map();
for (const sec of hkSections)
  for (const it of sec.items) {
    const key = it.code || it.name;
    if (!hkItems.has(key)) hkItems.set(key, { ...it, href: sec.id === "in-room" ? "/products/in-room-amenities" : `/products/housekeeping#${sec.id}` });
  }
const hk = (key, text) => {
  const it = hkItems.get(key);
  return { name: it.name, code: it.code, img: it.img, href: it.href, text, alt: it.code ? `${it.name} (${it.code}), hotel housekeeping item` : `Diversey ${it.name} for hotels` };
};

export const guides = [
  {
    slug: "hotel-amenities-checklist",
    title: "Hotel Amenities List & Room Amenities Checklist",
    seoTitle: "Hotel Amenities List & Room Checklist (Free PDF)",
    description:
      "Hotel amenities list for Indian hotels: basic to 5-star room amenities with photos, what housekeeping restocks, and a free printable checklist PDF.",
    answer:
      "A hotel amenities list has five groups: bathroom toiletries, guest amenity kits, wardrobe and room items, the tea and coffee tray, and stationery. Budget rooms cover the basics, mid-scale rooms add more kits and branded packaging, and 4-star and 5-star rooms add premium toiletries, fuller kits and leather in-room accessories.",
    image: { src: "/images/tiles/guest-amenities.jpg", alt: "Branded guest amenity kits made for The Park, Hyderabad" },
    published: "2026-10-21",
    updated: "2026-11-02",
    checklist: "amenities",
    sections: [
      {
        h: "Hotel amenities list",
        blocks: [
          { p: "Every item a hotel guest room needs, grouped the way housekeeping stocks them. Tap an item to see its options and packaging." },
          { h3: "Bathroom toiletries" },
          {
            list: [
              amenityLink("soap", "cream or glycerin, 15 g to 50 g"),
              { label: "Shampoo, Shower Gel, Conditioner and Moisturizer", href: "/products/hotel-toiletries", text: "20 ml, 25 ml or 30 ml bottles, tubes, or 5 litre cans" },
              { label: "Wall mounted dispensers", href: "/products/anti-theft-dispensers", text: "lockable, refilled from bulk cans" },
              { label: "Hand Wash", href: "/products/anti-theft-dispensers", text: "at the wash basin, in a wall mounted dispenser" },
            ],
          },
          { h3: "Guest amenity kits" },
          {
            list: [
              amenityLink("dental-kit", "toothbrush and toothpaste"),
              amenityLink("shaving-kit", "razor and shaving gel"),
              amenityLink("comb"),
              amenityLink("shower-cap"),
              amenityLink("care-kit", "ear buds, band aid and emery board"),
              amenityLink("sewing-kit", "needles, buttons, hooks and thread"),
              amenityLink("disposal-sanitary-bag"),
              amenityLink("loofah", "natural or jute"),
              amenityLink("shoe-shiner"),
            ],
          },
          { h3: "Wardrobe and room" },
          {
            list: [
              amenityLink("slippers", "non woven, terry, polar, honeycomb or jute"),
              amenityLink("laundry-bag", "non woven, cloth or paper"),
              { label: "Hangers", href: "/products/in-room-amenities", text: "wooden, clip, coat and anti-theft" },
              { label: "WC band, glass cover, DND card and match box", href: "/products/amenity-kits/other-amenities" },
            ],
          },
          { h3: "Tea and coffee tray" },
          {
            list: [
              { label: "Kettle and kettle tray", href: "/products/tea-coffee", text: "plastic, drawer or wooden tray" },
              { label: "Tea, coffee, sugar and sugar-free sachets", href: "/products/tea-coffee", text: "with stirrers" },
              { label: "Cups, glasses and sachet holder", href: "/products/in-room-amenities" },
            ],
          },
          { h3: "Stationery" },
          {
            list: [
              { label: "Key Card Jacket, Scribbling Pad, Pen and Pencil", href: "/products/stationery" },
              { label: "Coaster, Menu Card, Bottle Tag and Luggage Tag", href: "/products/stationery" },
              { label: "Leather Scribbling Pad Holder, Remote Holder and Box Tissue Holder", href: "/products/stationery" },
            ],
          },
          { h3: "Room fixtures" },
          {
            list: [
              { label: "Glass water bottle and water glasses", href: "/products/in-room-amenities" },
              { label: "Dry iron and iron board", href: "/products/in-room-amenities" },
              { label: "Wall mounted hair dryer and anti-skid mat", href: "/products/in-room-amenities" },
            ],
          },
        ],
      },
      {
        h: "Basic amenities in a hotel room",
        blocks: [
          { p: "If you are setting up a budget or standard room, start with this short list. Every room category needs it." },
          {
            list: [
              "Soap, Shampoo and Shower Gel",
              "Dental Kit and Comb",
              "Hangers and a Laundry Bag",
              "A kettle tray with tea, coffee and sugar sachets",
              "Key Card Jacket, Scribbling Pad and Pen",
            ],
          },
          { p: "Adding a Shower Cap, Shaving Kit and Slippers is the easiest way to lift a standard room." },
        ],
      },
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
          { download: "amenities" },
        ],
      },
      {
        h: "Guest amenities list",
        blocks: [
          { p: "Guest amenities are the complimentary items placed in the room for the guest to use and keep. These are the ones hotels order most, each packed in a box or pouch that can carry your hotel's name." },
          {
            grid: [
              amenity("dental-kit", "Toothbrush and toothpaste"),
              amenity("shaving-kit", "Razor and shaving gel"),
              amenity("comb", "Plastic, bamboo or wheat starch"),
              amenity("shower-cap", "Standard or compostable"),
              amenity("soap", "Cream or glycerin"),
              amenity("care-kit", "Ear buds, band aid, emery board"),
              amenity("sewing-kit", "Needles, buttons, hooks, thread"),
              amenity("disposal-sanitary-bag", "Biodegradable bag"),
              amenity("shoe-shiner", "For the wardrobe"),
              amenity("loofah", "Natural or jute"),
              amenity("laundry-bag", "Non woven, cloth or paper"),
              amenity("slippers", "Closed or open toe"),
              amenity("room-kit", "Your items in one pack"),
              amenity("other-amenities", "WC band, glass cover, match box"),
            ],
          },
        ],
      },
      {
        h: "Bathroom toiletries",
        blocks: [
          { p: "Toiletries are what guests notice first. Choose between single-use bottles and wall mounted dispensers, and pick a soap size that suits the room." },
          {
            list: [
              { label: "Soap", href: "/products/amenity-kits/soap", text: "cream or glycerin, wrapped or boxed, in sizes from 15 g to 50 g." },
              { label: "Liquids", href: "/products/hotel-toiletries", text: "Shampoo, Shower Gel, Conditioner and Moisturizer in 20 ml, 25 ml or 30 ml bottles, or in tubes." },
              { label: "Dispensers", href: "/products/anti-theft-dispensers", text: "lockable wall mounted dispensers refilled from 5 litre cans, popular with hotels moving away from small bottles." },
              { label: "Premium ranges", href: "/products/biotique", text: "Biotique, our partner brand, and Purely Serene, our own brand, for higher room categories." },
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
              amenityLink("dental-kit", "a toothbrush (white, translucent, bamboo or wheat starch) with toothpaste."),
              amenityLink("shaving-kit", "a razor with shaving gel."),
              { label: "Comb, Shower Cap and Sewing Kit", href: "/products/amenity-kits/comb" },
              amenityLink("care-kit", "ear buds, band aid and emery board."),
              { label: "Sanitary Disposal Bag, Shoe Shiner, Loofah, Laundry Bag and Slippers", href: "/products/amenity-kits" },
            ],
          },
        ],
      },
      {
        h: "Tea and coffee tray",
        blocks: [
          { p: "A well-stocked tray is one of the first things a guest uses. Restock it from the same order as your amenities." },
          {
            list: [
              { label: "Kettle and tray", href: "/products/tea-coffee", text: "plastic, drawer or wooden" },
              { label: "Tea sachets, coffee sachets, sugar and sugar-free sachets", href: "/products/tea-coffee" },
              { label: "Cups, glasses, coasters and glass covers", href: "/products/in-room-amenities" },
            ],
          },
          { image: { src: "/images/tiles/tea-coffee.jpg", alt: "Kettle tray set with cups and tea sachets in a hotel room", caption: "A kettle tray set ready for the room." } },
        ],
      },
      {
        h: "Room amenities housekeeping restocks",
        blocks: [
          { p: "Room amenities fall into two groups for housekeeping: what is replaced or topped up after every stay, and what stays in the room and is only checked." },
          { h3: "Replaced or topped up after every stay" },
          {
            list: [
              "Soap and liquid toiletries (or dispenser levels checked and refilled)",
              "Dental Kit, Shaving Kit, Comb, Shower Cap and other kits that were opened",
              "Tea, coffee, sugar and sugar-free sachets, and stirrers",
              "Slippers, Laundry Bag and Sanitary Disposal Bag",
              "Scribbling Pad, Pen, WC band and glass covers",
            ],
          },
          { h3: "Stays in the room and is checked" },
          {
            list: [
              "Hangers, kettle, kettle tray and sachet holder",
              "Cups, glasses and glass water bottle",
              "Hair dryer, iron and iron board",
              "Leather desk and bedside accessories",
              "Wall mounted dispensers",
            ],
          },
          { list: [{ label: "Housekeeping Items List for Hotels", href: "/guides/housekeeping-items-list", text: "the tools, chemicals and supplies housekeeping uses to clean the room." }] },
        ],
      },
      {
        h: "4-star and 5-star hotel room amenities list",
        blocks: [
          { p: "4-star and 5-star rooms carry everything in the mid-scale list, in fuller kits and more finished packaging." },
          { h3: "4-star hotel room amenities" },
          {
            list: [
              "Bathroom: Shampoo, Conditioner, Shower Gel and Moisturizer in bottles or wall mounted dispensers, plus glycerin or cream soap.",
              "Kits: Dental Kit, Shaving Kit, Sewing Kit, Shower Cap and Comb, in boxes or pouches with your hotel's name.",
              "Wardrobe: wooden hangers, Slippers and Laundry Bag.",
              "Desk: leather Scribbling Pad Holder, Menu Card and Key Card Jacket.",
              "Tea and coffee: kettle, drawer or wooden kettle tray, cups and sachets.",
              "Room fixtures: iron and iron board, wall mounted hair dryer.",
            ],
          },
          { h3: "5-star hotel room amenities" },
          {
            list: [
              "Bathroom: a premium toiletry range such as Biotique or Purely Serene, in bottles or wall mounted dispensers.",
              "Kits: everything in the 4-star list, plus Care Kit, Loofah, Shoe Shiner and Sanitary Disposal Bag.",
              "Desk and bedside: leather Remote Holder and Box Tissue Holder.",
              "Tea and coffee: wooden kettle tray with sachet holder and premium tea sachets.",
              "Room fixtures: glass water bottle and anti-skid mat.",
              "Every box, pouch and bottle carrying your hotel's identity.",
            ],
          },
        ],
      },
      {
        h: "Hotel amenity ideas guests notice",
        blocks: [
          { p: "Small touches that make a room feel looked after, all from the standard range:" },
          {
            list: [
              { label: "Kits with your hotel's name", href: "/custom-branding", text: "the same look on every box, pouch and bottle." },
              { label: "Plastic-free kits", href: "/products/eco-friendly", text: "bamboo and wheat starch brushes and combs in kraft paper pouches." },
              { label: "A Care Kit and Sewing Kit", href: "/products/amenity-kits/care-kit", text: "small, and guests on longer stays use them." },
              { label: "Jute or terry slippers", href: "/products/amenity-kits/slippers", text: "instead of basic non woven ones." },
              { label: "A glass water bottle", href: "/products/in-room-amenities", text: "in place of plastic bottles in the room." },
              { label: "A wooden kettle tray with sachet holder", href: "/products/tea-coffee", text: "a neater tea and coffee corner." },
              { label: "Leather desk accessories", href: "/products/stationery", text: "scribbling pad holder, remote holder and box tissue holder." },
              { label: "Premium toiletries", href: "/products/purely-serene", text: "Purely Serene or Biotique in suites and premium rooms." },
              { label: "Wall mounted dispensers", href: "/products/anti-theft-dispensers", text: "a tidier bathroom and no half-used bottles." },
            ],
          },
        ],
      },
      {
        h: "Hotel amenities vs hotel facilities",
        blocks: [
          { p: "Hotel facilities are part of the building and its services: Wi-Fi, air conditioning, TV, lifts, parking, the restaurant, the pool or the gym. Hotel room amenities are the items in the room that the guest uses during the stay and that housekeeping restocks: toiletries, kits, slippers, the tea and coffee tray and stationery. This list covers room amenities." },
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
          { list: [{ label: "Custom Branding", href: "/custom-branding", text: "upload your logo and see it on the range." }] },
        ],
      },
      {
        h: "Download the hotel room amenities checklist",
        blocks: [
          { p: "Print it, tick what each room category gets, and fill in the quantity per room. Send it to us on WhatsApp and we will prepare a proposal for your property." },
          { download: "amenities" },
        ],
      },
    ],
    faqs: [
      { q: "What is included in a hotel amenities list?", a: "Bathroom toiletries (soap, shampoo, shower gel, conditioner, moisturizer), guest amenity kits (dental, shaving, comb, shower cap, sewing and care kits), wardrobe items (hangers, slippers, laundry bag), the tea and coffee tray, stationery and room fixtures such as a hair dryer and iron." },
      { q: "What are the basic amenities in a hotel room?", a: "Soap, Shampoo, Shower Gel, a Dental Kit, a Comb, hangers, a Key Card Jacket and a tea and coffee tray with kettle. Most hotels add a Shower Cap, Shaving Kit and Slippers." },
      { q: "What are guest amenities in a hotel?", a: "Complimentary items placed in the room for the guest to use and keep: toiletries, dental and shaving kits, combs, shower caps, sewing and care kits, slippers and tea and coffee sachets." },
      { q: "What amenities does a 4-star hotel room have?", a: "A full toiletry set with conditioner and moisturizer, dental, shaving and sewing kits, shower cap, comb, slippers, wooden hangers, a laundry bag, leather desk stationery, a kettle tray with cups and sachets, and an iron and hair dryer." },
      { q: "What amenities does a 5-star hotel room have?", a: "Everything a 4-star room has, with a premium toiletry range, a care kit, loofah and shoe shiner, leather bedside accessories, a wooden kettle tray with sachet holder, a glass water bottle, and the hotel's identity on every item." },
      { q: "What is the difference between hotel amenities and hotel facilities?", a: "Facilities are part of the building and its services, such as Wi-Fi, parking, the restaurant or the pool. Room amenities are the items in the room that the guest uses and housekeeping restocks." },
      { q: "Which room amenities does housekeeping replace after every stay?", a: "Toiletries, opened kits, tea, coffee and sugar sachets, slippers, laundry bags, sanitary bags, scribbling pads and pens. Hangers, kettles, trays and fixtures stay in the room and are checked." },
      { q: "What amenities should a budget hotel provide?", a: "At least soap, shampoo, shower gel, a dental kit, a comb, hangers and a basic tea and coffee tray. Adding a shower cap and slippers lifts the experience at little extra effort." },
      { q: "Is there a printable hotel amenities checklist?", a: "Yes. Download the free Hotel Room Amenities Checklist PDF on this page: no sign-up, with tick boxes by room category and a column for quantities per room." },
      { q: "Can I mix amenities across room categories?", a: "Yes. Most hotels use one look across the property and add kits or premium toiletries in higher room categories." },
      { q: "Can every item carry my hotel's logo?", a: "Bottles, soap, kit boxes, pouches and stationery can all be branded. Share your logo and we prepare the artwork for your approval." },
      { q: "How do I order a full set?", a: "Pick the items in Build your Amenity Kit, or send us your room count and categories on WhatsApp and we will send a proposal for your property." },
    ],
    related: [
      { href: "/guides/housekeeping-items-list", label: "Housekeeping items list" },
      { href: "/products/hotel-toiletries", label: "Hotel toiletries supplier" },
      { href: "/products/amenity-kits", label: "Hotel guest amenity kits" },
      { href: "/products/in-room-amenities", label: "In-room amenities for hotels" },
      { href: "/products/tea-coffee", label: "Kettle tray sets for hotel rooms" },
      { href: "/products/stationery", label: "Hotel stationery" },
      { href: "/custom-branding", label: "Custom branded hotel toiletries" },
    ],
  },
  {
    slug: "housekeeping-items-list",
    title: "Housekeeping Items List for Hotels",
    seoTitle: "Housekeeping Items List for Hotels (with Pictures & PDF)",
    description:
      "Hotel housekeeping items list with pictures: cleaning tools, R1–R9 chemicals, cloths, carts, bins, gloves and washroom supplies, with their uses and a free PDF.",
    answer:
      "A hotel housekeeping items list has seven groups: cleaning tools, cleaning chemicals, cloths and dusters, carts and trolleys, bins and liners, gloves and safety items, and washroom and paper supplies. Room attendants also carry the guest-room amenities they restock after every stay.",
    image: { src: "/images/tiles/housekeeping.jpg", alt: "Housekeeping cart with cleaning supplies in a hotel corridor", position: "50% 30%" },
    published: "2026-11-02",
    updated: "2026-11-02",
    checklist: "housekeeping",
    sections: [
      {
        h: "Housekeeping items list at a glance",
        blocks: [
          { p: "The seven groups every hotel housekeeping store needs, what is in each, and what it is used for." },
          {
            table: {
              head: ["Group", "Main items", "Used for"],
              rows: [
                ["Cleaning tools", "Mops, brooms, brushes, wipers, squeegees, dust pans", "Floors, bathrooms, glass and high corners"],
                ["Cleaning chemicals", "TASKI R1 to R9, SUMA and Crew ranges, phenyle, bleaching powder", "Bathrooms, floors, glass, furniture and kitchens"],
                ["Cloths and dusters", "Microfibre, glass, dusting and mop cloths, scrubbers, sponges", "Dusting, wiping and scrubbing"],
                ["Carts and trolleys", "Janitorial carts, laundry carts, wringer trolleys", "Moving supplies between rooms and floors"],
                ["Bins and liners", "Room bins, pedal bins, wheel dustbins, garbage bags, liners", "Rooms, corridors, kitchens and back of house"],
                ["Gloves and safety", "Rubber, nitrile, latex and cotton gloves, caution boards, cones", "Staff safety and wet floor warnings"],
                ["Washroom and paper supplies", "Hand wash, toilet rolls, napkins, tissue, dispensers, hand dryers, air fresheners", "Guest and public washrooms"],
              ],
            },
          },
        ],
      },
      {
        h: "Cleaning tools",
        blocks: [
          { p: "Mops and brooms for floors, brushes for bathrooms and corners, and wipers and squeegees for wet floors and glass." },
          {
            grid: [
              hk("H-129", "Floors in rooms and corridors"),
              hk("H-130", "Wet and dry mopping"),
              hk("H-132", "Dust control on hard floors"),
              hk("H-194", "Sweeping indoor floors"),
              hk("H-170", "Toilet cleaning"),
              hk("H-142", "Bathroom floors and tiles"),
              hk("H-145", "Ceilings and high corners"),
              hk("H-140", "Pushing water off floors"),
              hk("H-179", "Glass and mirrors"),
              hk("H-181", "Reaching high glass"),
              hk("H-155", "Lobby and corridor sweeping"),
              hk("H-151", "Carrying chemicals room to room"),
            ],
          },
        ],
      },
      {
        h: "Cleaning chemicals: R1 to R9 explained",
        blocks: [
          { p: "In hotel housekeeping, R1 to R9 are the codes of the TASKI room-care range from Diversey, our partner brand for cleaning chemicals. Each code is a cleaner for one job, so staff can pick the right bottle quickly." },
          {
            table: {
              head: ["Code", "Product", "Where it is used"],
              rows: [
                ["TASKI R1", "Bathroom Cleaner", "Daily cleaning of bathroom surfaces"],
                ["TASKI R2", "Hard Surface Cleaner, Concentrate", "Hard surfaces such as tables, doors and walls"],
                ["TASKI R3", "Glass Cleaner", "Glass, mirrors and windows"],
                ["TASKI R4", "Furniture Maintainer", "Wooden furniture"],
                ["TASKI R5", "Air Freshener", "Rooms and corridors"],
                ["TASKI R6", "Toilet Bowl Cleaner", "Toilet bowls"],
                ["TASKI R7", "Floor Cleaner, Concentrate", "Floors"],
                ["TASKI R9", "Bathroom Cleaner, Concentrate", "Bathrooms"],
              ],
            },
          },
          { p: "Concentrates are diluted before use: follow the dilution on the label. For kitchens, the SUMA range covers stainless steel polish, all purpose cleaning, descaling and oven and grill cleaning. The Crew range offers ready-to-use room, bathroom, glass and floor cleaners." },
          { h3: "Everyday cleaning consumables" },
          { list: ["Phenyle", "Bleaching Powder", "Soap Oil", "Liquid Chlorine", "Acid", "Caustic Soda", "Naphthalene Balls", "Urinal Cubes"] },
        ],
      },
      {
        h: "Cloths, dusters and scrubbers",
        blocks: [
          {
            grid: [
              hk("H-116", "Dusting and wiping without streaks"),
              hk("H-117", "Glass and mirrors"),
              hk("H-119", "General dusting"),
              hk("H-115", "Wiping surfaces"),
              hk("H-118", "Floor mopping"),
              hk("H-147", "Dusting fragile surfaces"),
              hk("H-109", "Scrubbing sinks and tiles"),
              hk("H-113", "Washing and wiping"),
            ],
          },
        ],
      },
      {
        h: "Housekeeping carts and trolleys",
        blocks: [
          { p: "Carts keep a room attendant's supplies in one place; laundry carts and wringer trolleys move linen and water between floors." },
          {
            grid: [
              hk("CT-101", "Room attendant's supplies"),
              hk("CT-104", "Cleaning with mop bucket"),
              hk("CT-106", "Collecting used linen"),
              hk("CT-108", "Heavy laundry loads"),
              hk("CT-115", "Mopping large floors"),
              hk("CT-109", "Moving supplies"),
            ],
          },
        ],
      },
      {
        h: "Bins and liners",
        blocks: [
          {
            grid: [
              hk("D-3", "Bathrooms and rooms"),
              hk("D-5", "Lobbies and corridors"),
              hk("D-11", "Guest rooms"),
              hk("D-1", "Back of house waste"),
              hk("H-102", "Lining large bins"),
              hk("H-103", "Lining room bins"),
            ],
          },
        ],
      },
      {
        h: "Gloves and safety",
        blocks: [
          {
            grid: [
              hk("H-157", "Cleaning with chemicals"),
              hk("H-162", "Bathroom and toilet cleaning"),
              hk("H-158", "Dry work and handling linen"),
              hk("H-150", "Wet floor warning"),
              hk("F-114", "Blocking off areas"),
              hk("H-163", "Hair cover for staff"),
            ],
          },
        ],
      },
      {
        h: "Washroom and paper supplies",
        blocks: [
          { p: "For guest bathrooms, public washrooms and back-of-house areas." },
          {
            grid: [
              hk("P-208", "Guest and public washrooms"),
              hk("P-101", "Hand towels in washrooms"),
              hk("P-105", "Paper roll in washrooms"),
              hk("P-204", "Rooms and reception"),
              hk("Soft Care Hand Wash", "Diversey hand wash for wash basins"),
              hk("Softcare Blossom Hand Wash", "Scented hand wash for guest washrooms"),
              hk("F-123", "Liquid soap at wash basins"),
              hk("F-116", "Drying hands in washrooms"),
              hk("H-189", "Urinals"),
              hk("F-110", "Lobby and corridor fragrance"),
            ],
          },
        ],
      },
      {
        h: "What goes on a housekeeping cart",
        blocks: [
          { p: "A well-stocked cart saves trips back to the store. A typical room attendant's cart carries:" },
          { h3: "Cleaning" },
          {
            list: [
              "Bathroom, glass, toilet bowl and floor cleaners (TASKI R1, R3, R6 and R7) in labelled spray bottles",
              "Microfibre and glass cloths, a dusting cloth and a scrubber",
              "A WC brush, a hand wiper and a caddy basket",
              "Rubber or nitrile gloves and a caution board",
              "Garbage bags and bin liners",
            ],
          },
          { h3: "Guest room restock" },
          {
            list: [
              { label: "Toiletries and guest amenity kits", href: "/guides/hotel-amenities-checklist#room-amenities-housekeeping-restocks", text: "soap, liquids, dental kits, combs, shower caps and the other kits." },
              "Tea, coffee and sugar sachets",
              "Slippers, laundry bags and sanitary bags",
              "Scribbling pads, pens and WC bands",
              "Toilet rolls, box tissue and hand wash refills",
            ],
          },
        ],
      },
      {
        h: "Housekeeping material list with pictures",
        blocks: [
          { p: "Every item on this page is from our housekeeping catalogue. See all of them with photos and codes, section by section:" },
          { list: hkSections.map((sec) => ({ label: sec.title, href: sec.id === "in-room" ? "/products/in-room-amenities" : `/products/housekeeping#${sec.id}`, text: `${sec.items.length} items` })) },
          { list: [{ label: "Housekeeping Tools & Kitchen Consumables catalogue (PDF)", href: "/brochures" }] },
        ],
      },
      {
        h: "Housekeeping items for hospitals, offices and institutions",
        blocks: [
          { p: "Hospitals, offices and institutions use the same groups, with extra attention to waste handling and hygiene:" },
          {
            list: [
              { label: "Hazardous Waste Bin", href: "/products/housekeeping#plastic-dustbins", text: "for segregating waste." },
              { label: "Nitrile and latex gloves", href: "/products/housekeeping#consumables" },
              { label: "Disinfectant floor cleaner, hand wash and hand sanitizer", href: "/products/housekeeping#diversey-crew-sumabrite" },
              { label: "Patient Admission Kit", href: "/products/amenity-kits/patient-admission-kit", text: "for hospital admissions." },
            ],
          },
        ],
      },
      {
        h: "Download the housekeeping items list",
        blocks: [
          { p: "Print it for your store or training room, tick what you need, and send it to us on WhatsApp for a proposal." },
          { download: "housekeeping" },
        ],
      },
    ],
    faqs: [
      { q: "What are housekeeping items in a hotel?", a: "The tools, chemicals and supplies used to clean rooms and public areas: mops, brooms and brushes; cleaning chemicals; cloths and dusters; housekeeping carts; bins and liners; gloves; and washroom and paper supplies." },
      { q: "What is R1 to R9 in housekeeping?", a: "They are the codes of the TASKI cleaning range from Diversey: R1 bathroom cleaner, R2 hard surface cleaner, R3 glass cleaner, R4 furniture maintainer, R5 air freshener, R6 toilet bowl cleaner, R7 floor cleaner and R9 concentrated bathroom cleaner." },
      { q: "What should be on a housekeeping cart?", a: "Bathroom, glass, toilet and floor cleaners in spray bottles, cloths and a scrubber, a WC brush, gloves, garbage bags and liners, and the guest-room amenities to restock: toiletries, kits, sachets, slippers, laundry bags, stationery and toilet rolls." },
      { q: "What is the difference between housekeeping material and room amenities?", a: "Housekeeping material is what staff use to clean: tools, chemicals, cloths and bins. Room amenities are what the guest uses and housekeeping restocks: toiletries, kits, slippers, tea and coffee sachets and stationery." },
      { q: "Is there a housekeeping items list with pictures as a PDF?", a: "Yes. Download the free Housekeeping Items List with Pictures on this page: no sign-up, with photos, catalogue codes and uses." },
      { q: "Do you supply hospitals, offices and institutions?", a: "Yes. We supply to Hotels, Resorts, Hospitals, Institutions and Guest Houses all over India." },
    ],
    related: [
      { href: "/products/housekeeping", label: "Housekeeping material and supplies" },
      { href: "/guides/hotel-amenities-checklist", label: "Hotel amenities list" },
      { href: "/products/in-room-amenities", label: "In-room amenities for hotels" },
      { href: "/products/anti-theft-dispensers", label: "Wall mounted dispensers" },
      { href: "/brochures", label: "Brochures" },
    ],
  },
  {
    slug: "eco-friendly-hotel-amenities",
    title: "Plastic-Free Hotel Amenities: Swaps for Indian Hotels",
    seoTitle: "Plastic-Free Hotel Amenities: Swaps for Indian Hotels",
    description:
      "How Indian hotels can replace plastic guest amenities: bamboo and wheat starch kits, paper pouches, jute slippers, paper laundry bags and dispensers.",
    answer:
      "Most plastic guest amenities have a ready replacement: bamboo or wheat starch toothbrushes, razors and combs; toothpaste and shaving gel in paper pouches; kraft or butter paper packaging; paper or cloth laundry bags; jute slippers; and wall mounted dispensers refilled from bulk cans instead of small bottles.",
    image: { src: "/images/tiles/eco-friendly.jpg", alt: "Eco-friendly hotel amenities in kraft pouches and boxes on a bathroom counter" },
    updated: "2026-11-06",
    sections: [
      {
        h: "Why hotels are switching",
        blocks: [
          { p: "Since 1 July 2022, India has banned the manufacture, sale and use of a list of single-use plastic items. Guests and hotel groups also increasingly expect less plastic in the room. Switching the guest amenities is one of the most visible changes a hotel can make." },
          { p: "Guests notice it in the first minute: the dental kit, the comb and the bottles by the basin are the things they pick up. A room with bamboo, paper and refillable dispensers looks considered, and the same items carry your hotel's name just as well as plastic ones do." },
        ],
      },
      {
        h: "What the 2022 ban means for a hotel",
        blocks: [
          { p: "The ban names specific items rather than all plastic. Several of them turn up in hotels, so they are worth checking first:" },
          {
            list: [
              "Ear buds with plastic sticks, which often sit in the care kit.",
              "Plastic stirrers on the tea and coffee tray: wooden stirrers replace them.",
              "Plastic cutlery, plates, cups and glasses in room service and banquets.",
              "Plastic film wrapped around sweet boxes and gift packs.",
            ],
          },
          { p: "Toothbrushes, combs, razors and shower caps are not on the list, but they are the plastic items a guest handles most, which is why most hotels switch them too." },
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
          { p: "Housekeeping tops up shampoo, shower gel, conditioner and moisturizer from 5 litre cans during the room clean. The bottle stays, so a dispenser with your hotel's label on it keeps carrying your identity for months." },
        ],
      },
      {
        h: "Beyond the bathroom",
        blocks: [
          { p: "The same thinking applies to the rest of the room and the back of house:" },
          {
            list: [
              "Tea and coffee tray: wooden stirrers in place of plastic ones.",
              "Wardrobe: paper or cloth laundry bags, and jute slippers in place of non-woven pairs.",
              "Room service and banquets: bagasse meal trays in place of plastic trays.",
              "Shopping and gift bags: jute bags that guests can reuse.",
            ],
          },
        ],
      },
      {
        h: "How to check a plastic-free claim",
        blocks: [
          { p: "Ask two questions about every item: what is the item itself made of, and what is it packed in? A bamboo brush is only half the change if it arrives in a plastic sleeve, and a paper pouch does not help if the comb inside is plastic." },
          {
            list: [
              "Ask what each item and its packaging are made of, item by item.",
              "Check that the eco version can carry your hotel's name, so the switch does not cost you your branding.",
              "Ask to see photos of the actual product, not a mood board.",
              "Make sure the same items can be restocked steadily, so rooms do not drift back to plastic when stock runs out.",
            ],
          },
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
      { q: "Does India's single-use plastic ban cover hotel toiletries?", a: "The ban from 1 July 2022 lists specific items. For hotels the relevant ones are ear buds with plastic sticks, plastic stirrers, and plastic cutlery, plates and cups. Toothbrushes, combs and shower caps are not on the list, but most hotels replace them too because guests handle them every stay." },
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
    updated: "2026-11-06",
    sections: [
      {
        h: "Why hotels brand their amenities",
        blocks: [
          { p: "The soap, the dental kit and the key card jacket are the parts of your brand a guest actually holds. When they carry your name, the room feels like yours rather than a supplier's, and the kit a guest takes home keeps your name in front of them after check-out." },
          { p: "Branding also keeps a group consistent: every property can share one look, or each can carry its own name in the same design." },
        ],
      },
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
          { p: "Want to see it first? Upload your logo to the free preview tool and see it on the whole range in seconds. Pick a label colour, then download the preview to share with your team, or press “Email this design to us” to send it straight to our team with your logo." },
        ],
      },
      {
        h: "Where to start",
        blocks: [
          { p: "If you are branding for the first time, start with the items that appear in every room and that guests pick up:" },
          {
            list: [
              "Soap and bottle labels: on the basin every stay.",
              "Dental Kit and Shaving Kit: the kits guests use most.",
              "Key Card Jacket: the first branded item a guest receives, at check-in.",
              "Scribbling Pad and DND card: on view for the whole stay.",
            ],
          },
          { p: "Kits for your top room categories can then move to a more premium box, such as textured card or paper board with matte lamination, while standard rooms keep a simpler pouch in the same design." },
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
        h: "Logo tips for small items",
        blocks: [
          { p: "A comb handle or a soap wrap is much smaller than a letterhead, so a logo that works on a sign can get lost on a kit. A few things help it print clearly:" },
          {
            list: [
              "Send a version on a transparent background, so it sits cleanly on any label colour.",
              "Include a one-colour version if you have one: it reads well on small items and on kraft paper.",
              "If your logo has a long tagline or fine detail, send a simpler mark or just the hotel name for the smallest items.",
              "Send light and dark versions if your brand uses both, for white and coloured labels.",
            ],
          },
          { p: "If you are not sure which file to use, send what you have. We will tell you if it needs a cleaner version before preparing the artwork." },
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
      { q: "Can each property in our group have its own name?", a: "Yes. A group can share one design across properties, with each hotel's own name, or use one name everywhere." },
      { q: "Can I brand only some rooms or items?", a: "Yes. Many hotels start with soap, bottle labels, the dental kit and key card jackets, then brand more items and room categories later." },
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
