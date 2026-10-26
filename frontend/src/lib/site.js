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
  { value: "600+", label: "SKUs in our product range" },
];

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/custom-branding", label: "Custom Branding" },
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
    title: "Hotel Toiletries Manufacturer & Supplier: Soap, Shampoo",
    h1: "Hotel Toiletries Supplier",
    description: "Hotel toiletries manufacturer and supplier: soaps, shampoo, shower gel and conditioner in 20 to 30 ml bottles, tubes and 5 litre cans, with your hotel's branding.",
    subtitle: "Soap, Shampoo, Shower Gel, Moisturizer, Conditioner",
    intro:
      "From single use products to bulk packaged toiletries for every room category: glycerin soaps, 30 ml bottles and tubes, and bulk cans for refilling. Available with your hotel's name on the label.",
    cover: "/images/tiles/cards/hotel-toiletries.jpg",
    images: ["/images/2025/hotel-toiletries-p.jpg", "/images/wet-amenities-1.jpg", "/images/soap-2.jpg", "/images/wet-amenities-3.jpg", "/images/soap-5.jpg"],
    gallery: [
      { title: "Cream Soap", captions: false, aspect: "square", items: [{ src: "/images/2026/soap-2.jpg", label: "Round Cream Soap" }, { src: "/images/2026/soap-3.jpg", label: "Oval Cream Soap" }, { src: "/images/2026/soap-4.jpg", label: "Square Cream Soap" }, { src: "/images/2026/soap-5.jpg", label: "Cream Soap bars" }] },
      { title: "Glycerin Soap", captions: false, aspect: "square", items: [{ src: "/images/2026/soap-1.jpg", label: "Amber Glycerin Soap" }, { src: "/images/2026/soap-6.jpg", label: "Green Glycerin Soap" }, { src: "/images/2026/soap-7.jpg", label: "Wrapped Glycerin Soap" }, { src: "/images/2026/soap-8.jpg", label: "Wrapped orange Glycerin Soap" }] },
      { title: "Soap with your hotel's identity.", layout: "carousel", captions: false, footnote: "Cream and glycerin soaps available in sizes 15 g to 50 g. Flavor & Fragrance customisable.", aspect: "square", items: [{ src: "/images/2026/soap-branded-1.jpg", label: "Royalton Hotels" }, { src: "/images/2026/soap-branded-2.jpg", label: "Ellaa Hotel" }, { src: "/images/2026/soap-branded-3.jpg", label: "Hotel 5 Elements" }, { src: "/images/2026/soap-branded-4.jpg", label: "ART Boutique Hotel" }, { src: "/images/2026/soap-branded-5.jpg", label: "Minerva Grand" }, { src: "/images/2026/soap-branded-6.jpg", label: "Signature" }, { src: "/images/2026/soap-branded-7.jpg", label: "Hyderabad Grand" }, { src: "/images/2026/soap-branded-8.jpg", label: "Hacana" }] },
      { title: "Hotel Toiletries Liquid", note: "Colour and fragrance customisable.", aspect: "landscape", items: [{ src: "/images/2026/bottles-20ml.jpg", label: "20 ml" }, { src: "/images/2026/bottles-25ml.jpg", label: "25 ml" }, { src: "/images/2026/bottles-30ml.jpg", label: "30 ml" }, { src: "/images/2026/bottles-20ml-hexa.jpg", label: "20 ml Hexa" }, { src: "/images/2026/bottles-30ml-gold-cap.jpg", label: "30 ml Gold Cap" }, { src: "/images/2026/tubes-15ml.jpg", label: "Tubes" }, { src: "/images/2026/cans-5-litre.jpg", label: "5 Litre Cans" }] },
    ],
    groups: [
      { title: "Soap", items: ["Cream Soap", "Glycerin Soap", "15 g to 50 g"] },
      {
        title: "Hotel Toiletries Liquid",
        items: ["Shampoo", "Shower Gel", "Conditioner", "Moisturizer", "20 ml, 25 ml and 30 ml Bottles", "Tubes", "5 Litre Cans", "Anti-Theft Wall Mounted Dispensers"],
      },
    ],
  },
  {
    slug: "anti-theft-dispensers",
    customPage: true, // has its own page at app/products/anti-theft-dispensers
    name: "Anti-Theft Dispensers",
    short: "Lockable wall mounted dispensers for shampoo, shower gel and conditioner, refilled from 5 litre cans.",
    title: "Wall Mounted Shampoo & Soap Dispensers for Hotels",
    h1: "Anti-Theft Wall Mounted Dispensers",
    subtitle: "Shampoo, Shower Gel, Conditioner, Body Lotion, Hand Wash",
    intro:
      "Wall Mounted Dispensers that stay in the bathroom, refilled from bulk cans instead of replacing small bottles every stay. Available in Purely Serene and Biotique ranges.",
    cover: "/images/tiles/cards/dispensers.jpg",
    images: ["/images/2025/anti-theft-dispensers-p.jpg", "/images/anti-theft-dispensers.jpg"],
    brochure: "/catalogues/ae-dispenser-system.pdf",
    gallery: [
      { title: "Dispensers and refills", aspect: "landscape", items: [{ src: "/images/2026/dispenser-500ml.jpg", label: "500 ml Dispenser bottles" }, { src: "/images/2026/cans-5-litre.jpg", label: "5 Litre Refill Cans" }, { src: "/images/2026/biotique-cypress-citrus.jpg", label: "Biotique Royal, Cypress Citrus & Neroli" }, { src: "/images/2026/biotique-bergamot.jpg", label: "Biotique Royal, Bergamot & Patchouli" }, { src: "/images/2026/biotique-spa-essentials.jpg", label: "Biotique Dispensers" }] },
    ],
    groups: [
      {
        title: "Dispensers",
        items: ["Wall Mounted Anti-Theft Dispensers", "Biotique 380 ml Dispensers with Brackets"],
      },
      { title: "What they hold", items: ["Shampoo", "Shower Gel", "Conditioner", "Body Lotion", "Hand Wash"] },
      { title: "Refills", items: ["Purely Serene 5 Litre Cans", "Biotique 5 Litre Cans"] },
    ],
  },
  {
    slug: "amenity-kits",
    customPage: true, // has its own page at app/products/amenity-kits (kit explorer)
    name: "Guest Amenities",
    short: "Dental, shaving, care and sewing kits, combs, slippers and more, in branded boxes and pouches.",
    title: "Hotel Amenity Kit Manufacturer & Supplier",
    h1: "Hotel Guest Amenity Kits",
    description: "Hotel amenity kit and toiletries kit supplier and manufacturer: dental, shaving, care and sewing kits, combs and slippers, packed with your hotel's branding.",
    subtitle: "Dental Kit, Shaving Kit, Comb, Sewing Kit, Shower Cap, Slippers, Laundry Bag",
    intro:
      "Hotel amenity and toiletries kits: the dry amenities guests reach for, in our standard design or packed in boxes and pouches that carry your branding. Kits can be put together per room category.",
    cover: "/images/tiles/cards/guest-amenities.jpg",
    images: ["/images/2025/guest-amenities-p.jpg", "/images/white-leaf-amenities.jpg", "/images/dental-kit.jpg", "/images/freshness-kit-1.jpg", "/images/kraft-board-boxes.jpg", "/images/shaving-kit.jpg", "/images/slipper.jpg"],
    groups: [
      {
        title: "Kits",
        items: ["Dental Kit", "Shaving Kit", "Care Kit", "Sewing Kit", "Room Kit", "Patient Admission Kit"],
      },
      {
        title: "In-room essentials",
        items: ["Comb", "Shower Cap", "Soap", "Sanitary Disposal Bag", "Shoe Shiner", "Loofah", "Laundry Bag", "Slippers"],
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
    slug: "eco-friendly",
    customPage: true, // has its own page at app/products/eco-friendly
    name: "Sustainable & Eco-Friendly Guest Amenities",
    short: "Bamboo, Wheat Starch, Jute and biodegradable packaging.",
    title: "Eco-Friendly Hotel Amenities Supplier: Bamboo, Wheat Starch, Jute",
    h1: "Sustainable & Eco-Friendly Guest Amenities",
    subtitle: "Bamboo, Wheat Starch, Jute & Biodegradable Packaging",
    cover: "/images/tiles/eco-friendly.jpg",
    images: ["/images/tiles/eco-friendly.jpg"],
  },
  {
    slug: "in-room-amenities",
    customPage: true, // has its own page at app/products/in-room-amenities
    name: "In-Room Amenities",
    short: "Hangers, kettle trays, leather room accessories, water bottles, mugs and more for the guest room.",
    title: "In-Room Amenities for Hotels",
    h1: "In-Room Amenities for Hotels",
    subtitle: "Hangers, Kettle Trays & Kettles, Leather Accessories, Water Bottles, Mugs & Glasses",
    intro: "The fixtures and accessories that furnish a guest room, from wardrobe hangers to the tea tray and the leather pieces on the desk.",
    cover: "/images/stationery/leather-products.jpg",
    images: ["/images/stationery/leather-products.jpg"],
    groups: [
      { title: "Wardrobe", items: ["Wooden, Clip, Coat and Anti-Theft Hangers", "Plastic Hangers", "Coat Stand"] },
      { title: "Desk and leather", items: ["Leather Note Pad, Remote Holder and Desk Blotter", "Leather Box Tissue Holder"] },
      { title: "Tea and coffee", items: ["ABS, Drawer and Wooden Kettle Trays", "Sachet Holder", "Kettles", "Mugs and Water Glasses"] },
      { title: "Room fixtures", items: ["Glass Water Bottle", "Dry Iron and Iron Board", "Wall Mounted Hair Dryers", "Anti-Skid Mat", "Amenities Trays", "Ash Tray"] },
    ],
  },
  {
    slug: "purely-serene",
    customPage: true, // has its own page at app/products/purely-serene
    name: "Purely Serene Range",
    short: "Our own registered brand of premium amenities: glycerin soaps, bottles and refill cans.",
    title: "Purely Serene Range",
    subtitle: "Glycerin Soap, Shampoo, Shower Gel, Conditioner, Moisturizer",
    intro:
      "Purely Serene is our own registered brand, made for properties that want their bathrooms to feel considered: glycerin soaps in Aloe Vera and Indian Spices, with matching liquids.",
    cover: "/images/tiles/cards/purely-serene.jpg",
    images: ["/images/purely-serene/dispensers-500ml-lineup.jpg", "/images/2025/purely-serene-p.jpg", "/images/2025/hotel-toiletries-p.jpg", "/images/purely-serene-2.jpg", "/images/purely-serene-5.jpg", "/images/purely-serene-1.jpg"],
    groups: [
      { title: "Soaps", items: ["Glycerin Soap, Aloe Vera", "Glycerin Soap, Indian Spices"] },
      { title: "Liquids", items: ["Shampoo", "Shower Gel", "Conditioner", "Moisturizer"] },
      { title: "Formats", items: ["500 ml Bottles", "5 Litre Refill Cans"] },
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
        items: ["Facial Tissue Holder", "Remote Holder", "Scribbling Pad Holder", "Blotter", "Menu Card", "Pen Stand", "Bill Book", "Coaster"],
      },
      {
        title: "Printed Stationery",
        side: "right",
        images: [
          { src: "/images/stationery/stationery-1.jpg", alt: "Printed hotel stationery: menus, key card jackets, tags, notepads, pencils and door hangers made for client hotels" },
          { src: "/images/stationery/stationery-2.jpg", alt: "Royalton Hotels letterheads, envelopes, menu, key card jacket, valet tag, visiting card and bill book" },
        ],
        items: ["Pencil", "Pen", "Bottle Tag", "Luggage Tag", "Valet Tag", "Key Card Jacket", "Visiting Card", "Scribbling Pad", "Menu Card", "Letterhead", "Envelope"],
      },
    ],
    name: "Hotel Stationery",
    short: "Key card jackets, pads, pens, tags, coasters, menu cards, envelopes and letterheads.",
    title: "Hotel Stationery Supplier: Key Card Jackets, Pads, Pens",
    description: "Hotel stationery supplier: key card jackets, scribbling pads, pens, coasters, menu cards, envelopes and letterheads printed with your hotel's name and logo.",
    h1: "Hotel Stationery",
    subtitle: "Key Card Jacket, Scribbling Pad, Pen, Coaster, Menu Card, Letterhead",
    cover: "/images/tiles/cards/stationery.jpg",
    images: ["/images/2025/stationery-p.jpg", "/images/stationery-1.jpg", "/images/stationery-2.jpg"],
    groups: [
      {
        title: "In-room stationery",
        items: ["Scribbling Pad", "Pen and Pencil", "Coaster", "Bottle Tag"],
      },
      {
        title: "Front office and F&B",
        items: ["Key Card Jacket", "Luggage and Valet Tag", "Menu Card", "Envelope and Letterhead"],
      },
    ],
  },
  {
    slug: "housekeeping",
    customPage: true, // has its own page at app/products/housekeeping
    name: "Housekeeping Consumables & Equipment",
    short: "Carts, in-room fixtures, paper products, cleaning consumables and kitchen disposables.",
    title: "Hotel Housekeeping Material & Supplies",
    h1: "Housekeeping Material: Consumables & Equipment",
    subtitle: "Carts & Trolleys, In-Room Fixtures, Paper Products, Bins, Cleaning Consumables",
    intro:
      "The back-of-house range that keeps rooms turned and kitchens running, so one supplier covers far more of your purchase list.",
    cover: "/images/tiles/cards/housekeeping.jpg",
    images: ["/images/2025/tissue-boxes-p.jpg"],
    groups: [
      { title: "Carts and trolleys", items: ["Janitorial Cart", "Linen Cart", "Restaurant Cart", "Bell Boy Trolley", "Platform Trolley", "Wringer Trolley"] },
      {
        title: "In-room fixtures",
        items: ["Wooden and Plastic Hangers", "Glass Water Bottles", "Iron and Iron Board", "Wall Mounted Hair Dryer", "Anti-Skid Mats", "Kettle Trays", "Electric Kettle", "Amenities Tray", "Water Glasses and Mugs"],
      },
      {
        title: "Housekeeping equipment",
        items: ["Shoe Shine Machine", "Shoe Cover Machine", "Fly Catcher", "Ladder", "Aerosol Dispenser", "Aroma Diffuser", "Queue Manager", "Safety Cones", "Hand Dryer", "Soap Dispenser"],
      },
      {
        title: "Paper products",
        items: ["M-Fold, L-Fold and Pop-Up Tissue Dispensers", "HRT and Kitchen Roll Dispensers", "Leather Box Tissue Holder", "Toilet Roll Holder", "Logo-Printed Soft Napkins", "M-Fold Napkins", "HRT and Utility Rolls", "Facial Tissue", "Toilet Rolls"],
      },
      {
        title: "Bins",
        items: ["Wheeled Bins, 120 to 1100 litres", "Pedal Bins", "Buckets and Mugs", "Steel Swing and Ash Bins"],
      },
      {
        title: "Cleaning consumables",
        items: ["Garbage Bags and Liners", "Phenyl, Acid and Bleaching Powder", "Mops, Brooms and Wipers", "Scrubbers, Cloths and Brushes", "Caution Boards and Caddy Baskets", "Gloves"],
      },
      {
        title: "Kitchen consumables",
        items: ["Food Containers", "Plastic and Bagasse Meal Trays", "Bowls and Glasses", "Cutlery", "Cling Film", "Aluminium Foil"],
      },
    ],
  },
  {
    slug: "tea-coffee",
    scenes: "tea", // styled tray-and-kettle scenes replace the old showcase slideshow
    name: "Tea & Coffee Tray & Kettle, Tea Supplies",
    short: "Goodwyn tea sachets, coffee, sugar and sugar-free sachets, stirrers, kettles and trays.",
    title: "Kettle Tray Sets for Hotel Rooms & Tea Supplies",
    h1: "Kettle Tray Sets & Tea Supplies",
    description: "Kettle tray sets for hotel rooms: trays, kettles, cups, Goodwyn tea sachets, coffee, sugar and sugar-free sachets and stirrers, supplied to hotels all over India.",
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
    summary: "1 Toothbrush and 1 Toothpaste",
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
    summary: "1 Razor and 1 Shaving Gel sachet",
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
        label: "Shower Cap",
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
    parts: [{ id: "soap", label: "Soap", options: ["Cream", "Glycerin"], images: { Cream: "/images/amenities/soap/soap-cream.webp", Glycerin: "/images/amenities/soap/soap-glycerin.webp" } }],
    packaging: true,
  },
  {
    slug: "care-kit",
    name: "Care Kit",
    pattern: "C",
    contents: ["2 Ear Buds", "1 Band Aid", "1 Emery Board"],
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
      "2 Ear Buds": "/images/amenities/care-kit/content-ear-buds.webp",
      "1 Band Aid": "/images/amenities/care-kit/content-band-aid.webp",
      "1 Emery Board": "/images/amenities/care-kit/content-emery-board.webp",
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
    name: "Sanitary Disposal Bag",
    pattern: "C",
    contents: ["1 biodegradable Sanitary Disposal Bag"],
    contentImages: { "1 biodegradable Sanitary Disposal Bag": "/images/amenities/disposal-sanitary-bag/content-bag-flat.webp" },
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
        label: "Shoe Shiner",
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
        label: "Laundry Bag",
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

// Note under an amenity's name, only for kits put together to order (contents are not listed).
export function amenityLine(p) {
  if (p.pattern === "D") return "Contents put together for your property, in your choice of container. Items can be added as per your requirement.";
  if (p.onRequest) return "Contents put together to your requirement. Items can be added as needed.";
  return null;
}

// Sustainable & Eco-Friendly page. Packaging first (three kinds, a few photos each), then the products.
// Styled bathroom scenes of each packaging kind (owner's photos)
const ecoPack = (name, n) => Array.from({ length: n }, (_, i) => `/images/eco/pack-${name}-${i + 1}.jpg`);
export const ecoPackaging = [
  { name: "Kraft Paper Pouch", images: ecoPack("kraft-pouch", 3) },
  { name: "Butter Paper Pouch", images: ecoPack("butter-pouch", 2) },
  { name: "Kraft Board Box", images: ecoPack("kraft-board", 4) },
];

// Eco products in the kit explorer's format (see amenityProducts). Every content and variety is a card the
// visitor can pick; packed kits also get a Packaging row with the three eco kinds. Options without a photo yet
// none at the moment; an option set to null would show "Photo soon".
export const ecoPackagingNames = ecoPackaging.map((p) => p.name);
// tile: the contents rising out of the opened kraft pouch, composited from these photos
const ecoPacked = (k) => ({
  packaging: true,
  tile: `/images/eco/${k}-pouch.webp`,
  packagingImages: {
    "Kraft Paper Pouch": `/images/amenities/${k}/pack-kraft-paper-pouch.webp`,
    "Butter Paper Pouch": `/images/amenities/${k}/pack-butter-paper-pouch.webp`,
    "Kraft Board Box": `/images/amenities/${k}/pack-kraft-board.webp`,
  },
});
const part = (id, label, images, extra = {}) => ({ id, label, options: Object.keys(images), images: Object.fromEntries(Object.entries(images).filter(([, v]) => v)), ...extra });
export const ecoKits = [
  { slug: "eco-dental-kit", name: "Dental Kit", ...ecoPacked("dental"), parts: [part("brush", "Brush", { "Bamboo Brush": "/images/amenities/dental/brush-bamboo.webp", "Wheat Starch Brush": "/images/amenities/dental/brush-wheat-starch.webp" }), part("toothpaste", "Paste", { "Toothpaste in Paper Pouch": "/images/amenities/dental/paste-personal-pouch.webp" })] },
  { slug: "eco-shaving-kit", name: "Shaving Kit", ...ecoPacked("shaving"), parts: [part("razor", "Razor", { "Bamboo Razor": "/images/amenities/shaving/razor-bamboo.webp", "Wheat Starch Razor": "/images/amenities/shaving/razor-wheat-starch.webp" }), part("gel", "Gel", { "Shaving Gel in Paper Pouch": "/images/amenities/shaving/gel-personal-pouch.webp" })] },
  { slug: "eco-comb", name: "Comb", ...ecoPacked("comb"), parts: [part("comb", "Comb", { "Bamboo Handle Comb": "/images/amenities/comb/comb-bamboo-handle.webp", "Bamboo Pocket Comb": "/images/amenities/comb/comb-bamboo-pocket.webp", "Wheat Starch Handle Comb": "/images/amenities/comb/comb-wheat-starch-handle.webp" })] },
  { slug: "eco-shower-cap", name: "Shower Cap", ...ecoPacked("shower-cap"), parts: [part("cap", "Shower Cap", { "Compostable Shower Cap": "/images/amenities/shower-cap/cap-compostable.webp" })] },
  { slug: "eco-soap", name: "Soap", ...ecoPacked("soap"), parts: [part("soap", "Soap", { "Cream Soap": "/images/amenities/soap/soap-cream.webp", "Glycerin Soap": "/images/amenities/soap/soap-glycerin.webp" })] },
  { slug: "eco-care-kit", name: "Care Kit", ...ecoPacked("care-kit"), parts: [part("contents", "Contents", { "2 Ear Buds": "/images/amenities/care-kit/content-ear-buds.webp", "1 Band Aid": "/images/amenities/care-kit/content-band-aid.webp", "1 Emery Board": "/images/amenities/care-kit/content-emery-board.webp" })] },
  { slug: "eco-sewing-kit", name: "Sewing Kit", ...ecoPacked("sewing-kit"), parts: [part("contents", "Contents", { "Needles, Buttons, Hooks & Thread": "/images/amenities/sewing-kit/content-sewing-card.webp" })] },
  { slug: "eco-disposal-sanitary-bag", name: "Sanitary Disposal Bag", ...ecoPacked("disposal-sanitary-bag"), parts: [part("bag", "Bag", { "Biodegradable Sanitary Disposal Bag": "/images/amenities/disposal-sanitary-bag/content-bag-flat.webp" })] },
  { slug: "eco-shoe-shiner", name: "Shoe Shiner", parts: [part("shoe", "Shoe Shiner", { "Wheat Starch Box": "/images/amenities/shoe-shiner/shoe-wheat-starch.webp", "Tin Box": "/images/amenities/shoe-shiner/shoe-tin.webp" })] },
  { slug: "eco-loofah", name: "Loofah", parts: [part("loofah", "Loofah", { "Natural Loofah": "/images/amenities/loofah/loofah-natural.webp", "Jute Loofah": "/images/amenities/loofah/loofah-jute.webp" })] },
  { slug: "eco-laundry-bag", name: "Laundry Bag", parts: [part("laundry", "Laundry Bag", { "Cloth Bag": "/images/amenities/laundry-bag/laundry-cloth.webp", "Paper Laundry Bag": "/images/amenities/laundry-bag/laundry-paper.webp" })] },
  { slug: "eco-slippers", name: "Slippers", parts: [part("slippers", "Slippers", { "Jute, Closed Toe": "/images/amenities/slippers/slipper-jute-closed.webp", "Jute, Open Toe": "/images/amenities/slippers/slipper-jute-open.webp" })] },
  { slug: "eco-room-kit", name: "Room Kit", parts: [part("container", "Container", { "Jute Bag": "/images/amenities/room-kit/room-jute.webp" })] },
  { slug: "eco-dispenser", name: "Wheat Starch Dispenser", parts: [part("dispenser", "Dispenser", { "Wheat Starch Dispenser, 380 ml": "/images/dispensers/photo-5.jpg" })] },
];

export const partnerBrands = [
  {
    slug: "biotique",
    name: "Biotique Range",
    line: "Bath and dry amenities for hotel rooms, from single-use bottles and soap to dispensers and refill cans.",
    image: "/images/2025/biotique-royal-p.jpg",
    images: ["/images/2025/biotique-royal-p.jpg", "/images/2025/biotique-tray-p.jpg", "/images/biotique-1.jpg"],
    items: [
      "Soaps, 15 g to 50 g",
      "Assorted range in 25 ml and 35 ml: Shampoo, Shower Gel, Moisturizer, Conditioner, Talcum Powder",
      "Orchid and Terraverde tubes",
      "380 ml Dispensers with brackets: Farm Fresh, Assorted, Cypress Citrus & Neroli, Bergamot Patchouli",
      "5 Litre Cans",
    ],
    brochure: "/catalogues/ae-biotique-2026.pdf",
    catalogue: "/products/biotique",
  },
];

// Real kits made for clients. Used as proof of Custom Branding.
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
  { file: "/catalogues/ae-brochure-2026.pdf", thumb: "/catalogues/thumbs/ae-brochure-2026-cover.jpg", name: "AE Guest Amenities & Hotel Toiletries" },
  { file: "/catalogues/ae-hk-2026.pdf", thumb: "/catalogues/thumbs/ae-hk-2026-cover.jpg", name: "AE Housekeeping Tools & Kitchen Consumables" },
  { file: "/catalogues/ae-dispenser-system.pdf", thumb: "/catalogues/thumbs/ae-dispenser-system-cover.jpg", name: "AE Dispenser Systems" },
  { file: "/catalogues/ae-biotique-2026.pdf", thumb: "/catalogues/thumbs/ae-biotique-2026-cover.jpg", name: "AE Biotique Amenities" },
];

// Region pages at /areas/[slug]. States and regions have no `state`; city pages name their state's slug, so the
// state page lists its cities and each city page links back. Title: "Hotel Amenities Suppliers in <titleName or name>"
// (the phrasing buyers search). Description: `description`, or a template built from `where` or `name`.
// House rule: "manufacturer" never sits next to dispensers.
const cityPoints = (focus) => [
  focus,
  "Toiletries, Amenity Kits, stationery and housekeeping material from one supplier",
  "Custom Branding with your hotel's name and logo",
  "Quotes on WhatsApp, call or email",
];

export const areas = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "telangana",
    featured: true,
    description: "Hotel amenities and housekeeping material suppliers in Banjara Hills, Hyderabad: toiletries, soaps, amenity kits and stationery, with Custom Branding.",
    intro:
      "Our office is in Banjara Hills, so hotels across Hyderabad and Secunderabad deal with a team that is close by and easy to reach.",
    points: [
      "Office in Banjara Hills, Hyderabad",
      "Clients include The Park, Deccan Serai and IIT Hyderabad",
      "Toiletries, Amenity Kits, stationery and housekeeping material from one supplier",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "telangana",
    name: "Telangana",
    intro:
      "We supply hotels, resorts and guest houses across Telangana from Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels across Telangana from Hyderabad",
      "One supplier for amenities, stationery, housekeeping and Tea Trays",
      "Partner brand Biotique Range",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    intro:
      "Hotels and resorts across Andhra Pradesh order their guest amenities, stationery and housekeeping supplies from us in Hyderabad.",
    points: [
      "Supplying hotels across Andhra Pradesh",
      "Branded Amenity Kits for every room category",
      "Partner brand Biotique Range",
      "Quotes on WhatsApp, call or email",
    ],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    intro:
      "We supply hotels, resorts and homestays across Karnataka, from Bangalore business hotels to Mysore, Mangalore and the Coorg resorts, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels and resorts across Karnataka",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Sustainable amenities in bamboo, wheat starch and jute",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    titleName: "Bangalore (Bengaluru)",
    state: "karnataka",
    featured: true,
    intro:
      "We supply hotels, resorts and guest houses in Bangalore from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels in Bangalore and across Karnataka",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Proposals on WhatsApp, call or email",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    intro:
      "We supply hotels, resorts and guest houses across Tamil Nadu from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels in Chennai, Coimbatore, Madurai and across Tamil Nadu",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Proposals on WhatsApp, call or email",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "kerala",
    name: "Kerala",
    intro:
      "We supply hotels, resorts and guest houses across Kerala from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels and resorts across Kerala",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Sustainable amenities in bamboo, wheat starch and jute",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "pondicherry",
    name: "Pondicherry",
    titleName: "Pondicherry (Puducherry)",
    intro:
      "We supply hotels, resorts and guest houses in Pondicherry from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels and guest houses in Pondicherry",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Sustainable amenities in bamboo, wheat starch and jute",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    where: "North and South Goa",
    intro:
      "We supply hotels, resorts and guest houses across Goa from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels and resorts across North and South Goa",
      "Clients include SN Blue Avenue, The Evren, Artistry Suites, Rosetum, Ginger and Rama Resort",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Sustainable amenities in bamboo, wheat starch and jute",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "odisha",
    name: "Odisha",
    where: "Odisha (Orissa), from Bhubaneswar to Puri",
    intro:
      "We supply hotels, resorts and guest houses across Odisha from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels in Bhubaneswar, Puri and across Odisha",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Proposals on WhatsApp, call or email",
      "Custom Branding with your hotel's name and logo",
    ],
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    titleName: "Mumbai & Maharashtra",
    where: "Mumbai, Pune and across Maharashtra",
    intro:
      "We supply hotels, resorts and guest houses across Maharashtra from our office in Hyderabad, with the full guest-room range and Custom Branding.",
    points: [
      "Supplying hotels in Mumbai, Pune and across Maharashtra",
      "One supplier for amenities, stationery, housekeeping and tea trays",
      "Proposals on WhatsApp, call or email",
      "Custom Branding with your hotel's name and logo",
    ],
  },

  // Telangana
  {
    slug: "warangal",
    name: "Warangal",
    state: "telangana",
    intro: "Hotels, function halls and guest houses in Warangal and Hanamkonda order their guest amenities from us in Hyderabad, with the same range and branding as our city clients.",
    points: cityPoints("Supplying hotels in Warangal and Hanamkonda"),
  },
  {
    slug: "karimnagar",
    name: "Karimnagar",
    state: "telangana",
    intro: "Business hotels and lodges in Karimnagar stock toiletries, dental and shaving kits and key card jackets from one supplier in Hyderabad.",
    points: cityPoints("Supplying hotels and lodges in Karimnagar"),
  },
  {
    slug: "nizamabad",
    name: "Nizamabad",
    state: "telangana",
    intro: "Hotels and lodges in Nizamabad get budget-room essentials and branded amenity kits from one supplier in Hyderabad.",
    points: cityPoints("Supplying hotels and lodges in Nizamabad"),
  },
  {
    slug: "khammam",
    name: "Khammam",
    state: "telangana",
    intro: "Hotels in Khammam and around Bhadrachalam stock soaps, toiletries and amenity kits for pilgrims and business travellers from our office in Hyderabad.",
    points: cityPoints("Supplying hotels in Khammam and Bhadrachalam"),
  },

  // Andhra Pradesh
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    titleName: "Visakhapatnam (Vizag)",
    state: "andhra-pradesh",
    intro: "Beach hotels, business hotels and resorts in Vizag order toiletries, amenity kits and housekeeping material from us, branded with the hotel's own name.",
    points: cityPoints("Supplying hotels and beach resorts in Visakhapatnam"),
  },
  {
    slug: "vijayawada",
    name: "Vijayawada",
    state: "andhra-pradesh",
    intro: "Hotels in Vijayawada and the Amaravati capital region order guest amenities, stationery and tea trays from one supplier in Hyderabad.",
    points: cityPoints("Supplying hotels in Vijayawada and the Amaravati region"),
  },
  {
    slug: "tirupati",
    name: "Tirupati",
    state: "andhra-pradesh",
    intro: "Pilgrim hotels and lodges in Tirupati turn rooms around every day, so they need dependable stock of soaps, toiletries, dental kits and combs. Wall mounted dispensers cut the daily bottle count.",
    points: cityPoints("Supplying pilgrim hotels and lodges in Tirupati"),
  },
  {
    slug: "guntur",
    name: "Guntur",
    state: "andhra-pradesh",
    intro: "Hotels and guest houses in Guntur order toiletries, amenity kits and housekeeping material from one supplier in Hyderabad.",
    points: cityPoints("Supplying hotels and guest houses in Guntur"),
  },
  {
    slug: "nellore",
    name: "Nellore",
    state: "andhra-pradesh",
    intro: "Hotels in Nellore stock guest-room essentials, from soaps and shampoo to dental and shaving kits, with their own name on the pack.",
    points: cityPoints("Supplying hotels in Nellore"),
  },
  {
    slug: "rajahmundry",
    name: "Rajahmundry",
    titleName: "Rajahmundry (Rajamahendravaram)",
    state: "andhra-pradesh",
    intro: "Hotels and river-view resorts in Rajahmundry order toiletries, amenity kits and tea trays from our office in Hyderabad.",
    points: cityPoints("Supplying hotels and resorts in Rajahmundry"),
  },
  {
    slug: "kakinada",
    name: "Kakinada",
    state: "andhra-pradesh",
    intro: "Business hotels in Kakinada stock toiletries, key card jackets and housekeeping material from one supplier.",
    points: cityPoints("Supplying hotels in Kakinada"),
  },
  {
    slug: "kurnool",
    name: "Kurnool",
    state: "andhra-pradesh",
    intro: "Hotels in Kurnool and pilgrim lodges around Srisailam and Mahanandi order soaps, toiletries and amenity kits from us in Hyderabad.",
    points: cityPoints("Supplying hotels in Kurnool and Srisailam"),
  },
  {
    slug: "anantapur",
    name: "Anantapur",
    titleName: "Anantapur & Puttaparthi",
    state: "andhra-pradesh",
    intro: "Hotels in Anantapur and guest houses around Puttaparthi order budget-room essentials and branded amenity kits from one supplier.",
    points: cityPoints("Supplying hotels in Anantapur and Puttaparthi"),
  },

  // Karnataka
  {
    slug: "mysore",
    name: "Mysore",
    titleName: "Mysore (Mysuru)",
    state: "karnataka",
    intro: "Heritage hotels and resorts in Mysore order premium toiletries, branded amenity kits and leather room accessories from us.",
    points: cityPoints("Supplying heritage hotels and resorts in Mysore"),
  },
  {
    slug: "mangalore",
    name: "Mangalore",
    titleName: "Mangalore (Mangaluru)",
    state: "karnataka",
    intro: "Business hotels and beach resorts in Mangalore and Udupi order toiletries, amenity kits and housekeeping material from one supplier.",
    points: cityPoints("Supplying hotels in Mangalore and Udupi"),
  },
  {
    slug: "hubli",
    name: "Hubli",
    titleName: "Hubli-Dharwad",
    state: "karnataka",
    intro: "Hotels in Hubli and Dharwad order guest amenities, stationery and tea trays from our office in Hyderabad.",
    points: cityPoints("Supplying hotels in Hubli and Dharwad"),
  },
  {
    slug: "coorg",
    name: "Coorg",
    titleName: "Coorg (Kodagu)",
    state: "karnataka",
    intro: "Plantation resorts and homestays in Coorg often choose eco-friendly amenities: bamboo dental kits, jute slippers and paper packaging, branded with the property's name.",
    points: cityPoints("Supplying resorts and homestays in Coorg"),
  },
  {
    slug: "belgaum",
    name: "Belgaum",
    titleName: "Belgaum (Belagavi)",
    state: "karnataka",
    intro: "Hotels in Belgaum stock toiletries, amenity kits and housekeeping material from one supplier.",
    points: cityPoints("Supplying hotels in Belgaum"),
  },

  // Tamil Nadu
  {
    slug: "chennai",
    name: "Chennai",
    state: "tamil-nadu",
    intro: "Business hotels, serviced apartments and beach resorts in Chennai and along the ECR order toiletries, amenity kits and stationery from us, branded with their own name.",
    points: cityPoints("Supplying hotels in Chennai and along the ECR"),
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "tamil-nadu",
    intro: "Business hotels in Coimbatore order guest amenities, key card jackets and housekeeping material from one supplier.",
    points: cityPoints("Supplying hotels in Coimbatore"),
  },
  {
    slug: "madurai",
    name: "Madurai",
    state: "tamil-nadu",
    intro: "Temple-town hotels and lodges in Madurai need steady stock of soaps, toiletries and dental kits for a constant flow of pilgrims and tourists.",
    points: cityPoints("Supplying hotels and lodges in Madurai"),
  },
  {
    slug: "ooty",
    name: "Ooty",
    titleName: "Ooty (Udhagamandalam)",
    state: "tamil-nadu",
    intro: "Hill resorts and cottages in Ooty and Coonoor order moisturizer, toiletries, amenity kits and kettle tray sets for guest rooms.",
    points: cityPoints("Supplying resorts and cottages in Ooty and Coonoor"),
  },
  {
    slug: "kodaikanal",
    name: "Kodaikanal",
    state: "tamil-nadu",
    intro: "Hill resorts in Kodaikanal stock toiletries, kettle tray sets and eco-friendly amenity kits from one supplier.",
    points: cityPoints("Supplying hill resorts in Kodaikanal"),
  },
  {
    slug: "trichy",
    name: "Trichy",
    titleName: "Trichy (Tiruchirappalli)",
    state: "tamil-nadu",
    intro: "Hotels in Trichy and around Srirangam order soaps, toiletries and amenity kits for pilgrims and business travellers.",
    points: cityPoints("Supplying hotels in Trichy and Srirangam"),
  },
  {
    slug: "salem",
    name: "Salem",
    state: "tamil-nadu",
    intro: "Hotels in Salem and resorts in Yercaud order guest amenities and housekeeping material from our office in Hyderabad.",
    points: cityPoints("Supplying hotels in Salem and Yercaud"),
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    state: "tamil-nadu",
    intro: "Hotels and lodges in Kanyakumari and Rameswaram stock soaps, toiletries and dental kits for a steady flow of tourists and pilgrims.",
    points: cityPoints("Supplying hotels in Kanyakumari and Rameswaram"),
  },

  // Kerala
  {
    slug: "kochi",
    name: "Kochi",
    titleName: "Kochi (Cochin)",
    state: "kerala",
    intro: "Business hotels, heritage stays in Fort Kochi and waterfront resorts order toiletries, amenity kits and stationery from us, branded with their own name.",
    points: cityPoints("Supplying hotels and resorts in Kochi and Fort Kochi"),
  },
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    titleName: "Trivandrum & Kovalam",
    state: "kerala",
    intro: "Hotels in Thiruvananthapuram and beach resorts in Kovalam and Varkala order toiletries, amenity kits and housekeeping material from one supplier.",
    points: cityPoints("Supplying hotels in Trivandrum, Kovalam and Varkala"),
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    titleName: "Kozhikode (Calicut)",
    state: "kerala",
    intro: "Hotels in Kozhikode order guest amenities, key card jackets and tea trays from our office in Hyderabad.",
    points: cityPoints("Supplying hotels in Kozhikode"),
  },
  {
    slug: "munnar",
    name: "Munnar",
    state: "kerala",
    intro: "Tea-country resorts in Munnar often choose eco-friendly amenities: bamboo and wheat starch kits, jute slippers and paper packaging, with the resort's own name.",
    points: cityPoints("Supplying resorts in Munnar"),
  },
  {
    slug: "alleppey",
    name: "Alleppey",
    titleName: "Alleppey (Alappuzha) & Kumarakom",
    state: "kerala",
    intro: "Backwater resorts and houseboats in Alleppey and Kumarakom order toiletries, compact amenity kits and eco-friendly packaging from one supplier.",
    points: cityPoints("Supplying resorts and houseboats in Alleppey and Kumarakom"),
  },
  {
    slug: "thrissur",
    name: "Thrissur",
    state: "kerala",
    intro: "Hotels in Thrissur and Guruvayur stock soaps, toiletries and dental kits for pilgrims and business travellers.",
    points: cityPoints("Supplying hotels in Thrissur and Guruvayur"),
  },
  {
    slug: "wayanad",
    name: "Wayanad",
    state: "kerala",
    intro: "Resorts and homestays in Wayanad order eco-friendly amenity kits, toiletries and kettle tray sets for their rooms.",
    points: cityPoints("Supplying resorts and homestays in Wayanad"),
  },
];

export const areaTitle = (a) => `Hotel Amenities Suppliers in ${a.titleName || a.name}`;

export const areaDescription = (a) =>
  a.description ||
  `Hotel amenities supplier and manufacturer for hotels in ${a.where || a.name}: toiletries, soaps and amenity kits with your branding, plus stationery and housekeeping material.`;

export const faqs = [
  {
    q: "Can you put our hotel's name and logo on the amenities?",
    a: "Yes. We brand soaps, bottles, kits, boxes, pouches and stationery with your hotel's name and logo. Share your logo with us and we will prepare the artwork for your approval.",
  },
  {
    q: "What products do you supply?",
    a: "Hotel toiletries and dispenser systems, guest amenities, Purely Serene Range (our own brand), stationery, housekeeping equipment and consumables, and in-room tea and coffee supplies. We also supply the Biotique Range.",
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
    a: "Send us your requirement on WhatsApp, call us, or fill in the enquiry form with your hotel name and the products you need. We will come back with a proposal for your property.",
  },
  {
    q: "Do you supply Biotique products?",
    a: "Yes. Biotique is our partner brand. We supply Biotique hotel amenities.",
  },
  {
    q: "Can I see your full product range?",
    a: "Yes. Our Brochures can be viewed and downloaded on this site, or ask us on WhatsApp and we will send them to you.",
  },
  {
    q: "Where is your office?",
    a: "C3, Banjara Gardens, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034.",
  },
];
