// Dispenser range, from the AE Dispenser System catalogue. Specifications as printed there.
// `photos` are our own product photographs.

const I = "/images/dispensers/";

export const dispenserGroups = [
  {
    id: "lockable",
    title: "Lockable Bottles",
    text: "Refillable from bulk cans.",
    items: [
      {
        name: "Anti-Theft Dispenser",
        capacity: ["380 ml"],
        photos: [`${I}photo-1.jpg`, `${I}photo-2.jpg`],
        alt: "Matte black anti-theft dispensers for shampoo, shower gel and conditioner",
        specs: [
          ["Material", "ABS bottle, ABS bracket"],
          ["Lock", "Top key release"],
          ["Colours", "Matte Black, Classic White"],
          ["Size", "H 19.5 × W 7.2 × D 8.5 cm"],
        ],
      },
      {
        name: "Single Chamber Dispenser",
        capacity: ["500 ml"],
        photos: [`${I}photo-4.jpg`, `${I}photo-3.jpg`],
        alt: "Square single chamber dispensers in black",
        specs: [
          ["Material", "ABS bottle, ABS bracket"],
          ["Lock", "Concealed, top key release"],
          ["Colours", "Matte Black, Classic White"],
          ["For", "Shampoo, Shower Gel, Conditioner, Moisturizer"],
        ],
      },
      {
        name: "Wheat Starch Dispenser",
        capacity: ["380 ml"],
        photos: [`${I}photo-5.jpg`],
        alt: "Natural wheat starch dispensers",
        specs: [
          ["Material", "Wheat starch bottle, ABS bracket"],
          ["Lock", "Concealed, top key release"],
          ["Colour", "Natural Wheat"],
          ["Why", "Plant-based, lower plastic use"],
        ],
      },
      {
        name: "Premium Amber Dispenser",
        capacity: ["380 ml"],
        photos: [`${I}photo-6.jpg`],
        alt: "Amber dispensers for shampoo, shower gel and conditioner",
        specs: [
          ["Material", "Recyclable PETG bottle, ABS bracket"],
          ["Lock", "Concealed, top key release"],
          ["Colour", "Transparent amber"],
          ["Why", "UV protection for the contents"],
        ],
      },
      {
        name: "Wall Mounted Bottle Dispenser System",
        capacity: ["300 ml"],
        options: ["Single", "Double", "Triple"],
        photos: [`${I}photo-7.jpg`],
        alt: "Clear 300 ml bottles in stainless steel wall brackets",
        specs: [
          ["Bottle", "PETG, transparent or smoked"],
          ["Bracket", "SS 304, or black powder-coated MS"],
          ["Pump", "ABS + PP"],
          ["For", "Liquid Soap, Sanitizer, Shampoo, Shower Gel, Conditioner, lotion"],
        ],
      },
      {
        name: "Wall Mounted Liquid Dispenser",
        capacity: ["300 ml"],
        photos: [`${I}photo-11.jpg`],
        alt: "Matte black stainless steel wall mounted liquid dispenser",
        specs: [
          ["Material", "304 stainless steel"],
          ["Finish", "Matte black powder coating"],
          ["Refill", "Top fill"],
          ["Size", "H 167 × W 60 mm"],
        ],
      },
    ],
  },
  {
    id: "soap-sanitizer",
    title: "Soap & Sanitizer Dispensers",
    text: "Wall mounted units for liquid soap, sanitizer and lotion, for guest bathrooms and public washrooms.",
    items: [
      {
        name: "Soap & Sanitizer Dispenser",
        capacity: ["500 ml"],
        photos: [`${I}photo-9.jpg`],
        alt: "White and black push soap dispensers",
        specs: [
          ["Material", "ABS"],
          ["Lock", "Key lock"],
          ["Colours", "White, Black"],
        ],
      },
      {
        name: "Premium Soap & Sanitizer Dispenser, Round",
        capacity: ["500 ml"],
        photos: [`${I}photo-10.jpg`],
        alt: "Round soap dispensers in gold, silver, white and black",
        specs: [
          ["Material", "ABS"],
          ["Refill", "Direct top fill, level window"],
          ["Operation", "Push lever, about 1 ml per push"],
          ["Colours", "White, Black, Silver, Gold, Chrome"],
        ],
      },
      {
        name: "Premium Soap & Sanitizer Dispenser, Slim",
        capacity: ["500 ml"],
        photos: [`${I}photo-12.jpg`],
        alt: "Slim white and black soap dispensers",
        specs: [
          ["Material", "ABS"],
          ["Refill", "Front opening, bulk refill"],
          ["Colours", "White, Black"],
        ],
      },
      {
        name: "Premium Soap & Sanitizer Dispenser, Compact",
        capacity: ["250 ml"],
        photos: [`${I}photo-8.jpg`],
        alt: "Double compact soap dispensers with clear reservoirs",
        specs: [
          ["Material", "ABS, transparent reservoir"],
          ["Refill", "Top fill"],
          ["Operation", "Push button, about 1 ml per push"],
          ["For", "Liquid Soap, Sanitizer, Shampoo, Shower Gel"],
        ],
      },
      {
        name: "SS Soap Dispenser",
        capacity: ["500 ml", "800 ml", "1000 ml"],
        photos: [`${I}photo-13.jpg`],
        alt: "Polished stainless steel soap dispenser",
        specs: [
          ["Material", "SS 304, polished"],
          ["Refill", "Top fill"],
          ["Operation", "Manual push"],
          ["Sizes", "150 × 100 × 60, 185 × 115 × 65, 215 × 125 × 65 mm"],
        ],
      },
    ],
  },
  {
    id: "automatic",
    title: "Automatic Soap Dispenser",
    text: "Touch-free sensor dispensers for washrooms, lobbies and back-of-house areas.",
    items: [
      {
        name: "Automatic Soap Dispenser",
        capacity: ["500 ml", "800 ml", "1000 ml"],
        photos: [`${I}photo-14b.jpg`],
        alt: "Touch-free automatic soap dispenser",
        specs: [
          ["Sensor", "Infrared, touch-free"],
          ["Material", "ABS, lockable lid"],
          ["Power", "4 × AA batteries"],
        ],
      },
    ],
  },
];

// Prefilled brand dispensers have their own pages.
export const prefilled = [
  { name: "Biotique Range", text: "380 ml prefilled dispensers with a concealed anti-theft bracket.", href: "/products/biotique", image: "/images/biotique/assorted-dispensers-380ml.jpg" },
  { name: "Purely Serene Range", text: "500 ml dispensers and 5 litre refill cans from our own brand.", href: "/products/purely-serene", image: "/images/purely-serene/dispensers-500ml-lineup.jpg" },
];
