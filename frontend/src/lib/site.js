export const SITE_URL = "https://www.amaravatienterprises.com";

export const contact = {
  phoneDisplay: "+91 94946 00101",
  phoneHref: "tel:+919494600101",
  whatsappNumber: "919494600101",
  email: "amaravatienterprises.info@gmail.com",
  address: ["C3, Banjara Gardens, Road No. 12", "Banjara Hills, Hyderabad", "Telangana 500034"],
  mapsHref: "https://maps.app.goo.gl/xgaWArfsQybF7Zn19",
  googleProfile: "https://share.google/oWMWQ4cZBhAhs94gU", // Google Business Profile
  instagram: "https://www.instagram.com/amaravatienterprises/", // trade shows and events
};

export function whatsappLink(text) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const stats = [
  { value: "1000+", label: "hotels and resorts supplied" },
  { value: "10+", label: "years in hospitality supply" },
  { value: "600+", label: "SKUs in our range" },
];

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/custom-branding", label: "Custom branding" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/gallery", label: "Gallery" },
];

export const categories = [
  {
    slug: "hotel-toiletries",
    scenes: "kits", // styled kit scenes slideshow at the top of the page
    name: "Hotel Toiletries",
    short: "Soaps, shampoo, shower gel, conditioner and moisturizer in guest sizes and bulk cans.",
    title: "Hotel Toiletries: Soaps, Shampoo and Shower Gel",
    subtitle: "Soap, Shampoo, Shower Gel, Moisturizer, Conditioner",
    intro:
      "Guest-size toiletries for every room category, from glycerin soaps to 30 ml bottles and tubes, with bulk cans for refilling. Available with your hotel's name on the label.",
    cover: "/images/tiles/cards/hotel-toiletries.jpg",
    images: ["/images/2025/hotel-toiletries-p.jpg", "/images/wet-amenities-1.jpg", "/images/soap-2.jpg", "/images/wet-amenities-3.jpg", "/images/soap-5.jpg"],
    gallery: [
      { title: "Cream Soap", captions: false, aspect: "square", items: [{ src: "/images/2026/soap-2.jpg", label: "Round cream soap" }, { src: "/images/2026/soap-3.jpg", label: "Oval cream soap" }, { src: "/images/2026/soap-4.jpg", label: "Square cream soap" }, { src: "/images/2026/soap-5.jpg", label: "Cream soap bars" }] },
      { title: "Glycerin Soap", captions: false, aspect: "square", items: [{ src: "/images/2026/soap-1.jpg", label: "Amber glycerin soap" }, { src: "/images/2026/soap-6.jpg", label: "Green glycerin soap" }, { src: "/images/2026/soap-7.jpg", label: "Wrapped glycerin soap" }, { src: "/images/2026/soap-8.jpg", label: "Wrapped orange glycerin soap" }] },
      { title: "Soaps with your hotel's branding", layout: "carousel", captions: false, footnote: "Cream and glycerin soaps available in sizes 15 g to 50 g. Fragrance customisable.", aspect: "square", items: [{ src: "/images/2026/soap-branded-1.jpg", label: "Royalton Hotels" }, { src: "/images/2026/soap-branded-2.jpg", label: "Ellaa Hotel" }, { src: "/images/2026/soap-branded-3.jpg", label: "Hotel 5 Elements" }, { src: "/images/2026/soap-branded-4.jpg", label: "ART Boutique Hotel" }, { src: "/images/2026/soap-branded-5.jpg", label: "Minerva Grand" }, { src: "/images/2026/soap-branded-6.jpg", label: "Signature" }, { src: "/images/2026/soap-branded-7.jpg", label: "Hyderabad Grand" }, { src: "/images/2026/soap-branded-8.jpg", label: "Hacana" }] },
      { title: "Hotel Toiletries Liquid", note: "Colour and fragrance customisable.", aspect: "landscape", items: [{ src: "/images/2026/bottles-20ml.jpg", label: "20 ml" }, { src: "/images/2026/bottles-25ml.jpg", label: "25 ml" }, { src: "/images/2026/bottles-30ml.jpg", label: "30 ml" }, { src: "/images/2026/bottles-20ml-hexa.jpg", label: "20 ml Hexa" }, { src: "/images/2026/bottles-30ml-gold-cap.jpg", label: "30 ml Gold Cap" }, { src: "/images/2026/tubes-15ml.jpg", label: "Tubes" }, { src: "/images/2026/cans-5-litre.jpg", label: "5 Ltr refillable cans" }] },
    ],
    groups: [
      { title: "Soap", items: ["Cream Soap", "Glycerin Soap", "15 g to 50 g"] },
      {
        title: "Hotel Toiletries Liquid",
        items: ["Shampoo", "Shower gel", "Conditioner", "Moisturizer", "20 ml, 25 ml and 30 ml bottles", "Tubes", "5 litre cans", "Wall-mount dispensers"],
      },
    ],
  },
  {
    slug: "anti-theft-dispensers",
    customPage: true, // has its own page at app/products/anti-theft-dispensers
    name: "Anti-Theft Dispensers",
    short: "Lockable wall-mounted dispensers for shampoo, shower gel and conditioner, refilled from 5 litre cans.",
    title: "Wall Mounted Soap and Shampoo Dispensers for Hotels",
    subtitle: "Shampoo, Shower Gel, Conditioner, Body Lotion, Hand Wash",
    intro:
      "Wall-mounted dispensers that stay in the bathroom, refilled from bulk cans instead of replacing small bottles every stay. Available in Purely Serene and Biotique ranges.",
    cover: "/images/tiles/cards/dispensers.jpg",
    images: ["/images/2025/anti-theft-dispensers-p.jpg", "/images/anti-theft-dispensers.jpg"],
    brochure: "/catalogues/ae-dispenser-system.pdf",
    gallery: [
      { title: "Dispensers and refills", aspect: "landscape", items: [{ src: "/images/2026/dispenser-500ml.jpg", label: "500 ml dispenser bottles" }, { src: "/images/2026/cans-5-litre.jpg", label: "5 litre refill cans" }, { src: "/images/2026/biotique-cypress-citrus.jpg", label: "Biotique Royal, Cypress Citrus & Neroli" }, { src: "/images/2026/biotique-bergamot.jpg", label: "Biotique Royal, Bergamot & Patchouli" }, { src: "/images/2026/biotique-spa-essentials.jpg", label: "Biotique dispensers" }] },
    ],
    groups: [
      {
        title: "Dispensers",
        items: ["Wall-mount anti-theft dispensers", "Biotique 380 ml dispensers with brackets"],
      },
      { title: "What they hold", items: ["Shampoo", "Shower gel", "Conditioner", "Body lotion", "Hand wash"] },
      { title: "Refills", items: ["Purely Serene 5 litre cans", "Biotique 5 litre cans"] },
    ],
  },
  {
    slug: "amenity-kits",
    customPage: true, // has its own page at app/products/amenity-kits (kit explorer)
    name: "Guest Amenities",
    short: "Dental, shaving, care and sewing kits, combs, slippers and more, in branded boxes and pouches.",
    title: "Hotel Amenity Kits: Dental, Shaving and Vanity Kits",
    h1: "Hotel Amenity Kits",
    subtitle: "Dental Kit, Shaving Kit, Comb, Sewing Kit, Shower Cap, Slippers",
    intro:
      "Hotel amenity and toiletries kits: the dry amenities guests reach for, in our standard design or packed in boxes and pouches that carry your branding. Kits can be put together per room category.",
    cover: "/images/tiles/cards/guest-amenities.jpg",
    images: ["/images/2025/guest-amenities-p.jpg", "/images/white-leaf-amenities.jpg", "/images/dental-kit.jpg", "/images/freshness-kit-1.jpg", "/images/kraft-board-boxes.jpg", "/images/shaving-kit.jpg", "/images/slipper.jpg"],
    groups: [
      {
        title: "Kits",
        items: ["Dental kit", "Shaving kit", "Care kit", "Sewing kit", "Room kit", "Patient admission kit"],
      },
      {
        title: "In-room essentials",
        items: ["Comb", "Shower cap", "Soap", "Disposal sanitary bag", "Shoe shiner", "Loofah", "Laundry bag", "Slippers"],
      },
      {
        title: "Packaging",
        items: [
          "Paper board boxes",
          "Kraft board boxes",
          "Paper board boxes with matte lamination",
          "Textured card boxes",
          "Biodegradable butter paper pouches",
          "Biodegradable kraft paper pouches",
        ],
      },
    ],
  },
  {
    slug: "in-room-amenities",
    customPage: true, // has its own page at app/products/in-room-amenities
    name: "In-Room Amenities",
    short: "Hangers, kettle trays, leather room accessories, water bottles, mugs and more for the guest room.",
    title: "In-Room Amenities for Hotels: Hangers, Kettle Trays and More",
    subtitle: "Hangers, Kettle Trays & Kettles, Leather Accessories, Water Bottles, Mugs & Glasses",
    intro: "The fixtures and accessories that furnish a guest room, from wardrobe hangers to the tea tray and the leather pieces on the desk.",
    cover: "/images/stationery/leather-products.jpg",
    images: ["/images/stationery/leather-products.jpg"],
    groups: [
      { title: "Wardrobe", items: ["Wooden, clip, coat and anti-theft hangers", "Plastic hangers", "Coat stand"] },
      { title: "Desk and leather", items: ["Leather note pad, remote holder and desk blotter", "Leather box tissue holder"] },
      { title: "Tea and coffee", items: ["ABS, drawer and wooden kettle trays", "Sachet holder", "Kettles", "Mugs and water glasses"] },
      { title: "Room fixtures", items: ["Glass water bottle", "Dry iron and iron board", "Wall-mount hair dryers", "Anti-skid mat", "Amenities trays", "Ash tray"] },
    ],
  },
  {
    slug: "purely-serene",
    customPage: true, // has its own page at app/products/purely-serene
    name: "Purely Serene Luxury Toiletries",
    short: "Our own registered brand of premium amenities: glycerin soaps, bottles and refill cans.",
    title: "Purely Serene Luxury Toiletries",
    subtitle: "Glycerin Soap, Shampoo, Shower Gel, Conditioner, Moisturizer",
    intro:
      "Purely Serene is our own registered brand, made for properties that want their bathrooms to feel considered: glycerin soaps in Aloe Vera and Indian Spices, with matching liquids.",
    cover: "/images/tiles/cards/purely-serene.jpg",
    images: ["/images/purely-serene/dispensers-500ml-lineup.jpg", "/images/2025/purely-serene-p.jpg", "/images/2025/hotel-toiletries-p.jpg", "/images/purely-serene-2.jpg", "/images/purely-serene-5.jpg", "/images/purely-serene-1.jpg"],
    groups: [
      { title: "Soaps", items: ["Glycerin soap, Aloe Vera", "Glycerin soap, Indian Spices"] },
      { title: "Liquids", items: ["Shampoo", "Shower gel", "Conditioner", "Moisturizer"] },
      { title: "Formats", items: ["500 ml bottles", "5 litre refill cans"] },
    ],
  },
  {
    slug: "stationery",
    hideRange: true, // the feature banners list the range
    features: [
      {
        title: "Leather Room Accessories",
        side: "left",
        images: [{ src: "/images/stationery/leather-products.jpg", alt: "Brown leather tissue box holder, remote holder, pad holder, blotter, menu card, pen stand, bill book and coasters on a hotel room desk" }],
        items: ["Tissue Box Holder", "Remote Holder", "Scribbling Pad Holder", "Blotter", "Menu Card", "Pen Stand", "Bill Book", "Coaster"],
      },
      {
        title: "Printed Stationery",
        side: "right",
        images: [
          { src: "/images/stationery/stationery-1.jpg", alt: "Printed hotel stationery: menus, key card jackets, tags, notepads, pencils and door hangers made for client hotels" },
          { src: "/images/stationery/stationery-2.jpg", alt: "Royalton Hotels letterheads, envelopes, menu, key card jacket, valet tag, visiting card and bill book" },
        ],
        items: ["Pencil", "Pens", "Bottle Tag", "Luggage Tag", "Valet Tag", "Key Jacket", "Visiting Card", "Scribbling Pad", "Menu Card", "Letter Heads", "Envelopes"],
      },
    ],
    name: "Stationery",
    short: "Key card jackets, pads, pens, tags, coasters, menu cards, envelopes and letterheads.",
    title: "Hotel Stationery Supplier: Key Card Jackets, Pads and Menus",
    h1: "Hotel Stationery",
    subtitle: "Key Card Jackets, Scribbling Pads, Pens, Coasters, Menu Cards, Letterheads",
    intro: "The printed pieces guests handle every day, from the key card jacket at check-in to the pad by the bed, all carrying your hotel's identity.",
    cover: "/images/tiles/cards/stationery.jpg",
    images: ["/images/2025/stationery-p.jpg", "/images/stationery-1.jpg", "/images/stationery-2.jpg"],
    groups: [
      {
        title: "In-room stationery",
        items: ["Scribbling pads", "Pens and pencils", "Coasters", "Bottle tags"],
      },
      {
        title: "Front office and F&B",
        items: ["Key card jackets", "Luggage and valet tags", "Menu cards", "Envelopes and letterheads"],
      },
    ],
  },
  {
    slug: "housekeeping",
    customPage: true, // has its own page at app/products/housekeeping
    name: "Housekeeping Consumables & Equipment",
    short: "Carts, in-room fixtures, paper products, cleaning consumables and kitchen disposables.",
    title: "Housekeeping Material Supplier for Hotels",
    subtitle: "Carts & Trolleys, In-Room Fixtures, Paper Products, Bins, Cleaning Consumables",
    intro:
      "The back-of-house range that keeps rooms turned and kitchens running, so one supplier covers far more of your purchase list.",
    cover: "/images/tiles/cards/housekeeping.jpg",
    images: ["/images/2025/tissue-boxes-p.jpg"],
    groups: [
      { title: "Carts and trolleys", items: ["Janitorial cart", "Linen cart", "Restaurant cart", "Bell boy trolley", "Platform trolley", "Wringer trolley"] },
      {
        title: "In-room fixtures",
        items: ["Wooden and plastic hangers", "Glass water bottles", "Iron and iron board", "Wall-mount hair dryer", "Anti-skid mats", "Kettle trays", "Electric kettle", "Amenities tray", "Water glasses and mugs"],
      },
      {
        title: "Housekeeping equipment",
        items: ["Shoe shine machine", "Shoe cover machine", "Fly catcher", "Ladder", "Aerosol dispenser", "Aroma diffuser", "Queue manager", "Safety cones", "Hand dryer", "Soap dispenser"],
      },
      {
        title: "Paper products",
        items: ["M-fold, L-fold and pop-up tissue dispensers", "HRT and kitchen roll dispensers", "Leather box tissue holder", "Toilet roll holder", "Logo-printed soft napkins", "M-fold napkins", "HRT and utility rolls", "Facial tissue", "Toilet rolls"],
      },
      {
        title: "Bins",
        items: ["Wheeled bins, 120 to 1100 litres", "Pedal bins", "Buckets and mugs", "Steel swing and ash bins"],
      },
      {
        title: "Cleaning consumables",
        items: ["Garbage bags and liners", "Phenyl, acid and bleaching powder", "Mops, brooms and wipers", "Scrubbers, cloths and brushes", "Caution boards and caddy baskets", "Gloves"],
      },
      {
        title: "Kitchen consumables",
        items: ["Food containers", "Plastic and bagasse meal trays", "Bowls and glasses", "Cutlery", "Cling film", "Aluminium foil"],
      },
    ],
  },
  {
    slug: "tea-coffee",
    scenes: "tea", // styled tray-and-kettle scenes replace the old showcase slideshow
    name: "TCM Tray & Kettle, Tea Supplies",
    short: "Goodwyn tea sachets, coffee, sugar and sugar-free sachets, stirrers, kettles and trays.",
    title: "Kettle Tray Sets and Tea Supplies for Hotel Rooms",
    h1: "Kettle Trays & Tea Supplies",
    subtitle: "Kettle, Tray, Tea & Coffee Sachets, Sugar, Stirrers",
    intro: "Everything for the in-room tea and coffee tray, restocked from the same order as your amenities.",
    cover: "/images/tiles/cards/tea-coffee.jpg",
    images: ["/images/2025/tcm-tray-kettle-p.jpg", "/images/tcm-1.jpg", "/images/tcm-3.jpg", "/images/tcm-2.jpg", "/images/tcm-5.jpg"],
    showcase: [
      { src: "/images/2026/tcm-show-1.jpg", alt: "Black kettle on a black tea tray with glasses and sachets" },
      { src: "/images/2026/tcm-show-2.jpg", alt: "Steel kettle on a black tray with cups and glasses" },
      { src: "/images/2026/tcm-show-3.jpg", alt: "Black kettle on a wooden tray with tissue box" },
      { src: "/images/2026/tcm-show-4.jpg", alt: "Wooden tea tray with black kettle, cups and glasses" },
      { src: "/images/2026/tcm-show-5.jpg", alt: "Steel kettle on a kettle box with a sachet drawer" },
    ],
    trays: [
      { src: "/images/2026/trays/tray-walnut-long-v2.webp", label: "Walnut tray with drip grill" },
      { src: "/images/2026/trays/tray-black-box-v2.webp", label: "Kettle box with drawer" },
      { src: "/images/2026/trays/tray-black-long-v2.webp", label: "Black tray with drip grill" },
      { src: "/images/2026/trays/tray-wood-square-v2.webp", label: "Wooden tray with cup rests" },
      { src: "/images/2026/trays/tray-black-square-v2.webp", label: "Black tray with cup rests" },
    ],
    groups: [
      {
        title: "Tea & Coffee Supplies",
        items: [
          "Goodwyn tea sachets: Assam, Green Tea, Masala, Chamomile, Darjeeling, Earl Grey, English Breakfast",
          "Coffee sachets",
          "Sugar, Brown Sugar and Sugar-free sachets",
          "Salt & Pepper sachets",
          "Wooden and plastic stirrers",
          "Coasters",
          "Glass covers",
        ],
      },
      { title: "Tray & Kettle", items: ["Tray", "Kettle", "Tea Cups", "Glasses", "Tea Spoons", "Ash Trays"] },
    ],
  },
];

// Guest amenities kit explorer (/products/amenity-kits). Content from the owner, 2026-10.
// pattern: A = kit made of parts, each part with varieties; B = single item with varieties;
// C = fixed contents; D = contents on request, choice of container.
// packaging: true = can be packed in any of amenityPackaging.
export const amenityPackaging = [
  "Paper Board Boxes",
  "Kraft Board Boxes",
  "Paper Board Boxes with Matte Lamination",
  "Textured Card Boxes",
  "Biodegradable Butter Paper Pouch",
  "Biodegradable Kraft Paper Pouch",
];

export const amenityProducts = [
  {
    slug: "dental-kit",
    name: "Dental Kit",
    pattern: "A",
    summary: "1 toothbrush and 1 toothpaste",
    // Product photos (white background, upright). The explorer shows them in the open-the-box sequence.
    carton: { closed: "/images/amenities/dental/carton-closed.webp", open: "/images/amenities/dental/carton-open.webp" },
    // Dental kits made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/dental/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/dental/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/dental/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/dental/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/dental/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/dental/pack-kraft-paper-pouch.webp",
    },
    parts: [
      {
        id: "brush",
        label: "Brush",
        options: ["White", "Translucent", "Transparent", "Bamboo", "Wheat Starch"],
        images: {
          White: "/images/amenities/dental/brush-white.webp",
          Translucent: "/images/amenities/dental/brush-translucent.webp",
          Transparent: "/images/amenities/dental/brush-transparent.webp",
          Bamboo: "/images/amenities/dental/brush-bamboo.webp",
          "Wheat Starch": "/images/amenities/dental/brush-wheat-starch.webp",
        },
      },
      {
        id: "paste",
        label: "Paste",
        options: ["Anchor", "Meswak", "Biotique", "Colgate", "Colgate Total"],
        images: {
          Anchor: "/images/amenities/dental/paste-anchor.webp",
          Meswak: "/images/amenities/dental/paste-meswak.webp",
          Biotique: "/images/amenities/dental/paste-biotique.webp",
          Colgate: "/images/amenities/dental/paste-colgate.webp",
          "Colgate Total": "/images/amenities/dental/paste-colgate-total.webp",
        },
      },
    ],
    packaging: true,
  },
  {
    slug: "shaving-kit",
    name: "Shaving Kit",
    pattern: "A",
    summary: "1 razor and 1 shaving gel sachet",
    carton: { closed: "/images/amenities/shaving/carton-closed.webp", open: "/images/amenities/shaving/carton-open.webp" },
    // Shaving kits made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/shaving/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/shaving/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/shaving/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/shaving/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/shaving/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/shaving/pack-kraft-paper-pouch.webp",
    },
    parts: [
      {
        id: "razor",
        label: "Razor",
        options: ["Twin Blade Razor – Black", "Twin Blade Razor – Blue", "Laser Razor", "Gillette Razor", "Bamboo Razor", "Wheat Starch Razor"],
        images: {
          "Twin Blade Razor – Black": "/images/amenities/shaving/razor-twin-black.webp",
          "Twin Blade Razor – Blue": "/images/amenities/shaving/razor-twin-blue.webp",
          "Laser Razor": "/images/amenities/shaving/razor-laser.webp",
          "Gillette Razor": "/images/amenities/shaving/razor-gillette.webp",
          "Bamboo Razor": "/images/amenities/shaving/razor-bamboo.webp",
          "Wheat Starch Razor": "/images/amenities/shaving/razor-wheat-starch.webp",
        },
      },
      {
        id: "gel",
        label: "Gel",
        options: ["Glide", "Personal", "Dabur Oxylife", "Gillette"],
        images: {
          Glide: "/images/amenities/shaving/gel-glide.webp",
          Personal: "/images/amenities/shaving/gel-personal.webp",
          "Dabur Oxylife": "/images/amenities/shaving/gel-dabur-oxylife.webp",
          Gillette: "/images/amenities/shaving/gel-gillette.webp",
        },
      },
    ],
    packaging: true,
  },
  {
    slug: "comb",
    name: "Comb",
    pattern: "B",
    carton: { closed: "/images/amenities/comb/carton-closed.webp", open: "/images/amenities/comb/carton-open.webp" },
    // Combs made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/comb/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/comb/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/comb/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/comb/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/comb/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/comb/pack-kraft-paper-pouch.webp",
    },
    parts: [
      {
        id: "comb",
        label: "Comb",
        options: ["White Handle", "Black Handle", "Translucent Handle", "Bamboo Pocket", "Bamboo Handle", "Wheat Starch Handle"],
        images: {
          "White Handle": "/images/amenities/comb/comb-white-handle.webp",
          "Black Handle": "/images/amenities/comb/comb-black-handle.webp",
          "Translucent Handle": "/images/amenities/comb/comb-translucent-handle.webp",
          "Bamboo Pocket": "/images/amenities/comb/comb-bamboo-pocket.webp",
          "Bamboo Handle": "/images/amenities/comb/comb-bamboo-handle.webp",
          "Wheat Starch Handle": "/images/amenities/comb/comb-wheat-starch-handle.webp",
        },
      },
    ],
    packaging: true,
  },
  {
    slug: "shower-cap",
    name: "Shower Cap",
    pattern: "B",
    carton: { closed: "/images/amenities/shower-cap/carton-closed.webp", open: "/images/amenities/shower-cap/carton-open.webp" },
    // Shower caps made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/shower-cap/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/shower-cap/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/shower-cap/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/shower-cap/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/shower-cap/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/shower-cap/pack-kraft-paper-pouch.webp",
    },
    parts: [
      {
        id: "cap",
        label: "Shower cap",
        options: ["Plastic", "Compostable"],
        images: { Plastic: "/images/amenities/shower-cap/cap-plastic.webp", Compostable: "/images/amenities/shower-cap/cap-compostable.webp" },
      },
    ],
    packaging: true,
  },
  {
    slug: "soap",
    name: "Soap",
    pattern: "B",
    carton: { closed: "/images/amenities/soap/carton-closed.webp", open: "/images/amenities/soap/carton-open.webp" },
    // Soaps made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/soap/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/soap/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/soap/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/soap/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/soap/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/soap/pack-kraft-paper-pouch.webp",
    },
    parts: [{ id: "soap", label: "Soap", options: ["Cream"], images: { Cream: "/images/amenities/soap/soap-cream.webp" } }],
    packaging: true,
  },
  {
    slug: "care-kit",
    name: "Care Kit",
    pattern: "C",
    contents: ["2 ear buds", "1 band aid", "1 emery board"],
    carton: { closed: "/images/amenities/care-kit/carton-closed.webp", open: "/images/amenities/care-kit/carton-open.webp" },
    // Care kits made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/care-kit/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/care-kit/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/care-kit/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/care-kit/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/care-kit/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/care-kit/pack-kraft-paper-pouch.webp",
    },
    contentImages: {
      "2 ear buds": "/images/amenities/care-kit/content-ear-buds.webp",
      "1 band aid": "/images/amenities/care-kit/content-band-aid.webp",
      "1 emery board": "/images/amenities/care-kit/content-emery-board.webp",
    },
    packaging: true,
  },
  {
    slug: "sewing-kit",
    name: "Sewing Kit",
    pattern: "C",
    contents: ["Pack of needles", "Buttons", "Hooks", "Thread"],
    carton: { closed: "/images/amenities/sewing-kit/carton-closed.webp", open: "/images/amenities/sewing-kit/carton-open.webp" },
    // Sewing kits made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/sewing-kit/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/sewing-kit/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/sewing-kit/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/sewing-kit/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/sewing-kit/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/sewing-kit/pack-kraft-paper-pouch.webp",
    },
    kitImage: "/images/amenities/sewing-kit/content-sewing-card.webp", // everything comes mounted on one card
    packaging: true,
  },
  {
    slug: "disposal-sanitary-bag",
    name: "Disposal Sanitary Bag",
    pattern: "C",
    contents: ["1 biodegradable disposal sanitary bag"],
    contentImages: { "1 biodegradable disposal sanitary bag": "/images/amenities/disposal-sanitary-bag/content-bag-flat.webp" },
    carton: { closed: "/images/amenities/disposal-sanitary-bag/carton-closed.webp", open: "/images/amenities/disposal-sanitary-bag/carton-open.webp" },
    // Sanitary bags made for clients, one in each packaging style (keys match amenityPackaging).
    packagingImages: {
      "Paper Board Boxes": "/images/amenities/disposal-sanitary-bag/pack-paper-board.webp",
      "Kraft Board Boxes": "/images/amenities/disposal-sanitary-bag/pack-kraft-board.webp",
      "Paper Board Boxes with Matte Lamination": "/images/amenities/disposal-sanitary-bag/pack-matte-laminated.webp",
      "Textured Card Boxes": "/images/amenities/disposal-sanitary-bag/pack-textured-card.webp",
      "Biodegradable Butter Paper Pouch": "/images/amenities/disposal-sanitary-bag/pack-butter-paper-pouch.webp",
      "Biodegradable Kraft Paper Pouch": "/images/amenities/disposal-sanitary-bag/pack-kraft-paper-pouch.webp",
    },
    packaging: true,
  },
  {
    slug: "shoe-shiner",
    name: "Shoe Shiner",
    pattern: "B",
    carton: { closed: "/images/amenities/shoe-shiner/carton-closed.webp", open: "/images/amenities/shoe-shiner/carton-open.webp" },
    parts: [
      {
        id: "box",
        label: "Shoe shiner",
        options: ["White Plastic Box", "Black Plastic Box", "Wheat Starch Box", "Tin Box"],
        images: {
          "White Plastic Box": "/images/amenities/shoe-shiner/shoe-white.webp",
          "Black Plastic Box": "/images/amenities/shoe-shiner/shoe-black.webp",
          "Wheat Starch Box": "/images/amenities/shoe-shiner/shoe-wheat-starch.webp",
          "Tin Box": "/images/amenities/shoe-shiner/shoe-tin.webp",
        },
      },
    ],
    packaging: false,
  },
  {
    slug: "loofah",
    name: "Loofah",
    pattern: "B",
    parts: [
      {
        id: "loofah",
        label: "Loofah",
        options: ["Natural Loofah", "Jute Loofah"],
        images: {
          "Natural Loofah": "/images/amenities/loofah/loofah-natural.webp",
          "Jute Loofah": "/images/amenities/loofah/loofah-jute.webp",
        },
      },
    ],
    packaging: false,
  },
  {
    slug: "laundry-bag",
    name: "Laundry Bag",
    pattern: "B",
    parts: [
      {
        id: "bag",
        label: "Laundry bag",
        options: ["White Non Woven", "Black Non Woven", "Cloth Bag", "Paper Laundry Bag"],
        // Laundry bags made for clients
        images: {
          "White Non Woven": "/images/amenities/laundry-bag/laundry-white.webp",
          "Black Non Woven": "/images/amenities/laundry-bag/laundry-black.webp",
          "Cloth Bag": "/images/amenities/laundry-bag/laundry-cloth.webp",
          "Paper Laundry Bag": "/images/amenities/laundry-bag/laundry-paper.webp",
        },
      },
    ],
    packaging: false,
  },
  {
    slug: "slippers",
    name: "Slippers",
    pattern: "B",
    parts: [
      {
        id: "slippers",
        label: "Slippers",
        options: [
          "Non Woven",
          "Terry Cloth, Closed Toe",
          "Terry Cloth, Open Toe",
          "Terry Cloth, Black",
          "Polar Cloth, Closed Toe",
          "Polar Cloth, Big Size",
          "Honeycomb",
          "Jute, Closed Toe",
          "Jute, Open Toe",
        ],
        // Slippers made for clients
        images: {
          "Non Woven": "/images/amenities/slippers/slipper-non-woven.webp",
          "Terry Cloth, Closed Toe": "/images/amenities/slippers/slipper-terry-closed.webp",
          "Terry Cloth, Open Toe": "/images/amenities/slippers/slipper-terry-open.webp",
          "Terry Cloth, Black": "/images/amenities/slippers/slipper-terry-black.webp",
          "Polar Cloth, Closed Toe": "/images/amenities/slippers/slipper-polar-closed.webp",
          "Polar Cloth, Big Size": "/images/amenities/slippers/slipper-polar-big.webp",
          Honeycomb: "/images/amenities/slippers/slipper-honeycomb.webp",
          "Jute, Closed Toe": "/images/amenities/slippers/slipper-jute-closed.webp",
          "Jute, Open Toe": "/images/amenities/slippers/slipper-jute-open.webp",
        },
      },
    ],
    packaging: false,
  },
  {
    slug: "room-kit",
    name: "Room Kit",
    pattern: "D",
    onRequest: true, // contents put together to the property's needs
    parts: [
      {
        id: "container",
        label: "Container",
        hideLabel: true, // the subtitle already says "in your choice of container"
        options: ["Paper Board Box", "Kraft Paper Pouch", "Zip Lock Bag", "Jute Bag"],
        // Room kits made for clients, shown with their contents
        images: {
          "Paper Board Box": "/images/amenities/room-kit/room-paper-board.webp",
          "Kraft Paper Pouch": "/images/amenities/room-kit/room-kraft-pouch.webp",
          "Zip Lock Bag": "/images/amenities/room-kit/room-zip-lock.webp",
          "Jute Bag": "/images/amenities/room-kit/room-jute.webp",
        },
      },
    ],
    packaging: false,
  },
  {
    slug: "patient-admission-kit",
    name: "Patient Admission Kit",
    pattern: "C",
    onRequest: true,
    // Example kits made for clients; contents are put together to each hospital's needs.
    examples: [
      { src: "/images/amenities/patient-admission-kit/patient-leaf-kit.webp", label: "Our standard kit" },
      { src: "/images/amenities/patient-admission-kit/patient-amor.webp", label: "Amor Hospitals welcome kit" },
    ],
    packaging: true,
  },
  {
    slug: "other-amenities",
    name: "Other Amenities",
    pattern: "B",
    summary: "WC band, glass cover, DND card and match box",
    parts: [
      {
        id: "other",
        label: "Items",
        options: ["WC Band", "Glass Cover", "Match Box"],
        images: {
          "WC Band": "/images/amenities/other-amenities/other-wc-band.webp",
          "Glass Cover": "/images/amenities/other-amenities/other-glass-cover.webp",
          "Match Box": "/images/amenities/other-amenities/other-matchbox.webp",
        },
      },
      {
        id: "dnd",
        label: "DND card",
        options: ["Laminated Paper", "MDF", "Acrylic"],
        images: {
          "Laminated Paper": "/images/amenities/other-amenities/dnd-laminated.webp",
          MDF: "/images/amenities/other-amenities/dnd-mdf.webp",
          Acrylic: "/images/amenities/other-amenities/dnd-acrylic.webp",
        },
      },
    ],
    packaging: false,
  },
];

// One-line description of an amenity for the text list and the explorer.
export function amenityLine(p) {
  if (p.pattern === "A") return p.summary;
  if (p.pattern === "D") return "Contents put together for your property, in your choice of container. Items can be added as per your requirement.";
  if (p.onRequest) return "Contents put together to your requirement. Items can be added as needed.";
  if (p.contents) return p.contents.join(", ");
  if (p.summary) return p.summary;
  const n = p.parts[0].options.length;
  return n === 1 ? p.parts[0].options[0] : `${n} options`;
}

export const partnerBrands = [
  {
    slug: "biotique",
    name: "Biotique",
    line: "Ayurvedic hotel amenities from a name guests already know.",
    image: "/images/2025/biotique-royal-p.jpg",
    images: ["/images/2025/biotique-royal-p.jpg", "/images/2025/biotique-tray-p.jpg", "/images/biotique-1.jpg"],
    items: [
      "Soaps, 15 g to 50 g",
      "Assorted range in 25 ml and 35 ml: shampoo, shower gel, moisturizer, conditioner, talcum powder",
      "Orchid and Terraverde tubes",
      "380 ml dispensers with brackets: Farm Fresh, Assorted, Cypress Citrus & Neroli, Bergamot Patchouli",
      "5 litre cans",
    ],
    brochure: "/catalogues/ae-biotique-2026.pdf",
    catalogue: "/products/biotique",
  },
  {
    slug: "diversey",
    name: "Diversey",
    line: "The Diversey housekeeping chemicals your team already trusts.",
    image: "/images/hk/taski-r7-floor-cleaner-concentrate.webp",
    images: ["/images/hk/taski-r7-floor-cleaner-concentrate.webp", "/images/hk/suma-multi-d2-all-purpose-cleaner.webp", "/images/hk/crew-bathroom-cleaner.webp"],
    items: [
      "TASKI floor, bathroom, glass and furniture care",
      "Suma kitchen, grill and stainless steel care",
      "Crew and Sumabrite cleaners",
      "Soft Care hand wash and sanitizer",
      "TASKI carpet shampoo and detergent",
    ],
    brochure: null,
  },
];

// Real kits made for clients. Used as proof of custom branding.
export const brandedWork = [
  { image: "/images/2026/brand-the-park.jpg", client: "The Park, Hyderabad" },
  { image: "/images/2026/brand-clarion.jpg", client: "Clarion" },
  { image: "/images/2026/brand-deccan-serai.jpg", client: "Deccan Serai" },
  { image: "/images/2026/brand-tre.jpg", client: "trē" },
  { image: "/images/2026/brand-premium-flatlay.jpg", client: "a hotel client" },
]

export const clients = [
  { src: "/images/client-royalton-hotels.png", name: "Royalton Hotels", bg: "#10110C" },
  { src: "/images/client-iit-hyderabad.png", name: "IIT Hyderabad" },
  { src: "/images/client-ellaa-hotel.png", name: "Ellaa Hotel", bg: "#0D502F" },
  { src: "/images/client-regenta-place.png", name: "Regenta Place" },
  { src: "/images/client-greenpark-hotels.png", name: "Greenpark Hotels" },
  { src: "/images/client-stae-hotels.png", name: "Stae Hotels", bg: "#E94F37" },
  { src: "/images/client-priya.png", name: "Priya" },
  { src: "/images/client-royal-orchid-transparent.png", name: "Royal Orchid Hotels" },
  { src: "/images/client-lemon-tree-transparent.png", name: "Lemon Tree Hotels" },
  { src: "/images/client-fairfield-marriott.png", name: "Fairfield by Marriott" },
  { src: "/images/client-daspalla.png", name: "Daspalla" },
  { src: "/images/client-casa-hotel-suites.png", name: "Casa Hotel & Suites", bg: "#8A4347" },
  { src: "/images/client-deccan-serai-hotels.png", name: "Deccan Serai Hotels" },
  { src: "/images/client-avasa-hotels.png", name: "Avasa Hotels" },
  { src: "/images/client-ginger-ihcl.png", name: "Ginger Hotels (IHCL)" },
  { src: "/images/client-dhanturi-group.png", name: "Dhanturi Group", bg: "#123462" },
  { src: "/images/client-sarovar-hotels.png", name: "Sarovar Hotels" },
  { src: "/images/client-monday-hotels.png", name: "Monday Hotels", bg: "#003B95" },
  { src: "/images/client-clarks-inn-transparent.png", name: "Clarks Inn" },
  { src: "/images/client-skyla-transparent.png", name: "Skyla" },
  { src: "/images/client-the-park-transparent.png", name: "The Park Hotels" },
  { src: "/images/client-best-western.png", name: "Best Western" },
  { src: "/images/client-click-hotels-suba.png", name: "Click Hotels by Suba" },
  { src: "/images/client-trunk-and-trolley.png", name: "Trunk & Trolley", bg: "#0D3455" },
  { src: "/images/client-clarion-choice-hotels.png", name: "Clarion" },
];

export const brochures = [
  { file: "/catalogues/ae-brochure-2026.pdf", thumb: "/catalogues/thumbs/ae-brochure-2026-cover.jpg", name: "Amenities Brochure" },
  { file: "/catalogues/ae-hk-2026.pdf", thumb: "/catalogues/thumbs/ae-hk-2026-cover.jpg", name: "House Keeping & Kitchen Consumables" },
  { file: "/catalogues/ae-dispenser-system.pdf", thumb: "/catalogues/thumbs/ae-dispenser-system-cover.jpg", name: "Dispenser systems" },
  { file: "/catalogues/ae-biotique-2026.pdf", thumb: "/catalogues/thumbs/ae-biotique-2026-cover.jpg", name: "Biotique amenities" },
];

export const areas = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    title: "Hotel amenities supplier in Hyderabad",
    description: "Hotel amenities supplier in Banjara Hills, Hyderabad: toiletries, amenity kits, stationery and housekeeping material, with custom branding.",
    intro:
      "Our office is in Banjara Hills, so hotels across Hyderabad and Secunderabad deal with a team that is close by and easy to reach.",
    points: [
      "Office in Banjara Hills, Hyderabad",
      "Clients include The Park, Deccan Serai and IIT Hyderabad",
      "Toiletries, amenity kits, stationery and housekeeping from one supplier",
      "Custom branding with your hotel's name and logo",
    ],
  },
  {
    slug: "telangana",
    name: "Telangana",
    title: "Hotel amenities supplier in Telangana",
    description: "Hotel toiletries, amenity kits, stationery and housekeeping material for hotels and resorts across Telangana, with custom branding.",
    intro:
      "We supply hotels, resorts and guest houses across Telangana from Hyderabad, with the full guest-room range and custom branding.",
    points: [
      "Supplying hotels across Telangana from Hyderabad",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Partner brands Biotique and Diversey",
      "Custom branding with your hotel's name and logo",
    ],
  },
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    title: "Hotel amenities supplier in Andhra Pradesh",
    description: "Hotel toiletries, amenity kits, stationery and housekeeping material for hotels and resorts across Andhra Pradesh, from Hyderabad.",
    intro:
      "Hotels and resorts across Andhra Pradesh order their guest amenities, stationery and housekeeping supplies from us in Hyderabad.",
    points: [
      "Supplying hotels across Andhra Pradesh",
      "Branded amenity kits for every room category",
      "Partner brands Biotique and Diversey",
      "Quotes on WhatsApp, call or email",
    ],
  },
];

export const faqs = [
  {
    q: "Can you put our hotel's name and logo on the amenities?",
    a: "Yes. We brand soaps, bottles, kits, boxes, pouches and stationery with your hotel's name and logo. Share your logo with us and we will prepare the artwork for your approval.",
  },
  {
    q: "What products do you supply?",
    a: "Hotel toiletries and dispenser systems, guest amenities, Purely Serene Luxury Toiletries (our own brand), stationery, housekeeping equipment and consumables, and in-room tea and coffee supplies. We also supply Biotique and Diversey products.",
  },
  {
    q: "Which areas do you supply?",
    a: "We are based in Hyderabad and supply hotels all over India.",
  },
  {
    q: "Do you only work with hotels?",
    a: "Hotels and resorts are most of our clients, but we also supply guest houses, serviced apartments, hospitals (including patient admission kits) and institutions such as IIT Hyderabad.",
  },
  {
    q: "How do I get a quote?",
    a: "Send us your requirement on WhatsApp, call us, or fill in the enquiry form with your hotel name and the products you need. We will come back with a quote for your property.",
  },
  {
    q: "Do you supply Biotique and Diversey products?",
    a: "Yes. Biotique and Diversey are our partner brands. We supply Biotique hotel amenities and Diversey housekeeping chemicals such as TASKI, Suma, Crew and Clax.",
  },
  {
    q: "Can I see your full product range?",
    a: "Yes. Our brochures can be viewed and downloaded on this site, or ask us on WhatsApp and we will send them to you.",
  },
  {
    q: "Where is your office?",
    a: "C3, Banjara Gardens, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034.",
  },
];
