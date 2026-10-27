// Search copy for the single-product pages at /products/amenity-kits/[item]. Product facts (parts, options, photos,
// packaging) stay in amenityProducts in site.js; this file adds only each page's title, description, intro, a short
// "where it fits" note and its questions. House rules: no prices, MOQs or lead times; "Supplier", never
// "Manufacturer", on these pages; branding is promised only where the product comes in a box or pouch.

export const amenityPages = {
  "dental-kit": {
    title: "Hotel Dental Kit Supplier: Toothbrush & Toothpaste Kits",
    h1: "Hotel Dental Kit",
    description:
      "Hotel dental kits with 1 toothbrush and 1 toothpaste: white, translucent, bamboo or wheat starch brushes, Colgate, Biotique or Meswak paste, boxed with your hotel's name.",
    intro:
      "A guest dental kit with one toothbrush and one toothpaste, packed in a box or pouch that carries your hotel's name. Choose the brush, the paste brand and the packaging.",
    fit: "The dental kit is the one amenity almost every guest uses, so it belongs in every room category, from budget rooms up. Many hotels pair it with a Comb and Shaving Kit in matching packaging.",
    faqs: [
      { q: "What is inside the hotel dental kit?", a: "One toothbrush and one toothpaste. Brushes come in white, translucent, transparent, bamboo or wheat starch; paste in Anchor, Meswak, Biotique, Colgate or Colgate Total." },
      { q: "Is there a plastic-free dental kit?", a: "Yes. A bamboo or wheat starch toothbrush with toothpaste in a paper pouch, packed in kraft or butter paper. See our eco-friendly amenities." },
    ],
  },
  "shaving-kit": {
    title: "Hotel Shaving Kit Supplier: Razor & Shaving Gel Kits",
    h1: "Hotel Shaving Kit",
    description:
      "Hotel shaving kits with 1 razor and 1 shaving gel sachet: twin blade, laser, Gillette, bamboo or wheat starch razors with Glide, Personal, Dabur Oxylife or Gillette gel, branded.",
    intro:
      "A guest shaving kit with one razor and one shaving gel sachet, packed in a box or pouch with your hotel's name. Choose the razor, the gel and the packaging.",
    fit: "Shaving kits are standard from mid-scale rooms upward and are often kept at the front desk for budget rooms. They usually sit next to the Dental Kit in the same packaging style.",
    faqs: [
      { q: "Which razors and gels are available?", a: "Razors: Twin Blade (black or blue), Laser, Gillette, Bamboo and Wheat Starch. Gels: Glide, Personal, Dabur Oxylife and Gillette." },
      { q: "Is there an eco-friendly shaving kit?", a: "Yes. A bamboo or wheat starch razor with shaving gel in a paper pouch, in kraft or butter paper packaging." },
    ],
  },
  comb: {
    title: "Hotel Comb Supplier: Plastic, Bamboo & Wheat Starch Combs",
    h1: "Hotel Comb",
    description:
      "Guest combs for hotels: white, black and translucent handle combs, bamboo pocket and handle combs, and wheat starch combs, packed in boxes or pouches with your hotel's name.",
    intro:
      "Guest combs in six styles, from classic plastic handle combs to bamboo and wheat starch, each packed in a box or pouch that carries your hotel's name.",
    fit: "A comb is one of the basic amenities for every room category. Bamboo and wheat starch combs suit hotels moving away from plastic.",
    faqs: [
      { q: "Which comb styles do you supply?", a: "White Handle, Black Handle, Translucent Handle, Bamboo Pocket, Bamboo Handle and Wheat Starch Handle combs." },
      { q: "Do you have a plastic-free comb?", a: "Yes. Bamboo pocket and handle combs, and wheat starch handle combs, packed in kraft or butter paper." },
    ],
  },
  "shower-cap": {
    title: "Hotel Shower Cap Supplier: Plastic & Compostable Caps",
    h1: "Hotel Shower Cap",
    description:
      "Disposable shower caps for hotels in plastic or compostable material, packed in paper board boxes, kraft boxes or biodegradable pouches with your hotel's name.",
    intro:
      "Single-use shower caps for guest bathrooms, in plastic or compostable material, packed in a box or pouch with your hotel's name.",
    fit: "Shower caps are expected from mid-scale rooms upward and are a small, low-effort way to make a budget room feel complete.",
    faqs: [
      { q: "Do you have compostable shower caps?", a: "Yes. Shower caps come in plastic or compostable material, and the compostable cap can be packed in kraft or butter paper." },
    ],
  },
  soap: {
    title: "Hotel Soap Supplier: Cream & Glycerin Guest Soaps",
    h1: "Hotel Soap",
    description:
      "Hotel guest soaps in cream or glycerin, 15 g to 50 g, wrapped or boxed with your hotel's name, in round, oval and square shapes, with fragrance customisable.",
    intro:
      "Cream and glycerin guest soaps in sizes from 15 g to 50 g, wrapped or boxed with your hotel's name. Fragrance can be customised.",
    fit: "Soap is in every room. Smaller sizes suit budget rooms and quick stays; larger bars and glycerin soaps suit premium rooms and suites.",
    faqs: [
      { q: "Which soap sizes are available?", a: "Cream and glycerin soaps from 15 g to 50 g, in round, oval and square shapes." },
      { q: "Can the soap fragrance be changed?", a: "Yes. Fragrance can be customised for your hotel." },
    ],
    links: [{ href: "/products/hotel-toiletries", label: "Hotel toiletries: soaps, shampoo and shower gel" }],
  },
  "care-kit": {
    title: "Hotel Vanity Kit (Care Kit) Supplier: Ear Buds, Band Aid",
    h1: "Hotel Vanity Kit (Care Kit)",
    description:
      "Hotel vanity kits (care kits) with 2 ear buds, 1 band aid and 1 emery board, packed in boxes or biodegradable pouches that carry your hotel's name.",
    intro:
      "A small vanity kit, which we call the Care Kit: 2 ear buds, 1 band aid and 1 emery board, packed in a box or pouch with your hotel's name.",
    fit: "The vanity kit is a premium-room amenity that guests remember, and many hotels add it to suites and higher room categories.",
    faqs: [
      { q: "What is inside the care kit?", a: "2 ear buds, 1 band aid and 1 emery board." },
    ],
  },
  "sewing-kit": {
    title: "Hotel Sewing Kit Supplier: Needles, Buttons & Thread",
    h1: "Hotel Sewing Kit",
    description:
      "Hotel sewing kits with a pack of needles, buttons, hooks and thread on a card, packed in boxes or biodegradable pouches with your hotel's name.",
    intro:
      "A compact sewing kit with needles, buttons, hooks and thread, packed in a box or pouch that carries your hotel's name.",
    fit: "Sewing kits are a mid-scale and premium room amenity, popular with business travellers who need a quick fix before a meeting.",
    faqs: [
      { q: "What is in the sewing kit?", a: "A pack of needles, buttons, hooks and thread." },
    ],
  },
  "disposal-sanitary-bag": {
    title: "Sanitary Disposal Bags for Hotels: Biodegradable",
    h1: "Sanitary Disposal Bag",
    description:
      "Biodegradable sanitary disposal bags for hotel bathrooms, packed in paper board boxes, kraft boxes or biodegradable pouches with your hotel's name.",
    intro:
      "A biodegradable sanitary disposal bag for the guest bathroom, packed in a box or pouch with your hotel's name.",
    fit: "A thoughtful bathroom amenity for every room category. It also keeps drains clear and saves housekeeping time.",
    faqs: [
      { q: "Are the sanitary disposal bags biodegradable?", a: "Yes. Each kit holds 1 biodegradable sanitary disposal bag." },
    ],
  },
  "shoe-shiner": {
    title: "Hotel Shoe Shiner Supplier: Plastic, Tin & Wheat Starch",
    h1: "Hotel Shoe Shiner",
    description:
      "Shoe shiners for hotel rooms in white or black plastic boxes, tin boxes or wheat starch boxes, for business hotels and premium rooms.",
    intro: "A guest shoe shiner in a white or black plastic box, a tin box or a wheat starch box.",
    fit: "Shoe shiners suit business hotels and premium rooms, where guests head to meetings straight from the room.",
    faqs: [
      { q: "Which shoe shiner boxes are available?", a: "White Plastic Box, Black Plastic Box, Wheat Starch Box and Tin Box." },
    ],
  },
  loofah: {
    title: "Hotel Loofah Supplier: Natural & Jute Loofahs",
    h1: "Hotel Loofah",
    description: "Natural and jute loofahs for hotel bathrooms, a plastic-free bath amenity for resorts, spas and premium rooms.",
    intro: "Natural loofahs and jute loofahs for the guest bathroom, both free of plastic.",
    fit: "Loofahs suit resorts, spa rooms and premium bathrooms, and fit an eco-friendly amenity set.",
    faqs: [
      { q: "Which loofahs do you supply?", a: "Natural Loofah and Jute Loofah." },
    ],
  },
  "laundry-bag": {
    title: "Hotel Laundry Bag Supplier: Non Woven, Cloth & Paper",
    h1: "Hotel Laundry Bag",
    description: "Laundry bags for hotel rooms in white or black non woven fabric, cloth or paper, for the wardrobe of every room category.",
    intro: "Guest laundry bags for the wardrobe, in white or black non woven fabric, cloth or paper.",
    fit: "A laundry bag in the wardrobe keeps laundry service simple for guests and housekeeping. Paper and cloth bags replace plastic.",
    faqs: [
      { q: "Which laundry bags are available?", a: "White Non Woven, Black Non Woven, Cloth Bag and Paper Laundry Bag." },
    ],
  },
  slippers: {
    title: "Hotel Slippers Supplier: Non Woven, Terry Cloth & Jute",
    h1: "Hotel Slippers",
    description:
      "Hotel slippers in non woven, terry cloth (open or closed toe, black), polar cloth, honeycomb and jute (open or closed toe), for every room category.",
    intro: "Guest room slippers in nine styles, from light non woven slippers to terry cloth, polar cloth, honeycomb and jute.",
    fit: "Non woven slippers suit budget and mid-scale rooms; terry, polar and honeycomb slippers suit premium rooms and suites; jute slippers suit eco-friendly properties.",
    faqs: [
      { q: "Which slipper styles do you supply?", a: "Non Woven; Terry Cloth closed toe, open toe and black; Polar Cloth closed toe and big size; Honeycomb; and Jute closed toe and open toe." },
      { q: "Do you have eco-friendly slippers?", a: "Yes. Jute slippers in open toe and closed toe styles." },
    ],
  },
  "room-kit": {
    title: "Hotel Room Kit: Guest Amenities Packed Together",
    h1: "Hotel Room Kit",
    description:
      "Hotel room kits: the guest amenities your property needs, packed together in a paper board box, kraft paper pouch, zip lock bag or jute bag.",
    intro:
      "Your chosen guest amenities packed together as one room kit, in a paper board box, kraft paper pouch, zip lock bag or jute bag. Contents are put together for your property.",
    fit: "Room kits make housekeeping faster: one kit per room instead of placing each amenity separately. They suit hotels, serviced apartments and guest houses.",
    faqs: [
      { q: "What goes inside a room kit?", a: "The amenities you choose, such as a dental kit, comb, shaving kit and shower cap. Items can be added as per your requirement." },
      { q: "Which containers are available?", a: "Paper Board Box, Kraft Paper Pouch, Zip Lock Bag and Jute Bag." },
    ],
  },
  "patient-admission-kit": {
    title: "Patient Admission Kit Supplier for Hospitals",
    h1: "Patient Admission Kit",
    description:
      "Patient admission kits for hospitals, with contents put together to each hospital's needs and packed with the hospital's name, like the welcome kit made for Amor Hospitals.",
    intro:
      "Admission kits for hospital patients, with contents put together to each hospital's needs and packed with the hospital's name. We supply them to hospitals as well as hotels.",
    fit: "Hospitals hand admission kits to patients on arrival. Shown here: our standard kit and the welcome kit made for Amor Hospitals.",
    faqs: [
      { q: "What is in a patient admission kit?", a: "Contents are put together to your hospital's requirement, and items can be added as needed." },
    ],
  },
  "other-amenities": {
    title: "DND Cards, WC Bands & Glass Covers for Hotels",
    h1: "DND Cards, WC Bands & Glass Covers",
    description: "Hotel DND cards in laminated paper, MDF or acrylic, plus WC bands, glass covers and match boxes for guest rooms.",
    intro: "The small room items that finish a guest room: DND cards in laminated paper, MDF or acrylic, WC bands, glass covers and match boxes.",
    fit: "These items signal a cleaned, ready room to the guest and are part of every room category's setup.",
    faqs: [
      { q: "Which DND cards are available?", a: "DND cards in Laminated Paper, MDF and Acrylic." },
    ],
  },
};
