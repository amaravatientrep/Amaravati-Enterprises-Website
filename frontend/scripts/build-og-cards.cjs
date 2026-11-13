// Builds 1200x630 JPEG link-preview cards for the guest amenity pages.
// Usage (from frontend/): node scripts/build-og-cards.cjs . scripts/og-cards.txt   (list lines: "slug /image/path")
const path = require("path");
const fs = require("fs");
const [dir, listFile] = process.argv.slice(2);
const sharp = require(path.join(dir, "node_modules/sharp"));

const names = {
  "dental-kit": "Hotel Dental Kit",
  "shaving-kit": "Hotel Shaving Kit",
  comb: "Hotel Comb",
  "shower-cap": "Hotel Shower Cap",
  soap: "Hotel Soap",
  "care-kit": "Hotel Vanity Kit",
  "sewing-kit": "Hotel Sewing Kit",
  "disposal-sanitary-bag": "Sanitary Disposal Bag",
  "shoe-shiner": "Hotel Shoe Shiner",
  "patient-admission-kit": "Patient Admission Kit",
  "laundry-bag": "Hotel Laundry Bag",
  slippers: "Hotel Slippers",
  loofah: "Hotel Loofah",
  "room-kit": "Hotel Room Kit",
  "other-amenities": "DND Cards, WC Bands & Glass Covers",
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Wrap the name so no line is wider than the 520 px text column (about 17 characters at 54 px).
function lines(name) {
  const out = [];
  let cur = "";
  for (const w of name.split(" ")) {
    if ((cur + " " + w).trim().length > 17 && cur) {
      out.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  out.push(cur);
  return out;
}

(async () => {
  const outDir = path.join(dir, "public/images/og/amenities");
  fs.mkdirSync(outDir, { recursive: true });
  for (const row of fs.readFileSync(listFile, "utf8").trim().split(/\r?\n/)) {
    const [slug, src] = row.trim().split(/\s+/);
    const product = await sharp(path.join(dir, "public", src)).resize(540, 540, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const ls = lines(names[slug] || slug);
    const size = ls.length > 2 ? 46 : 54;
    const step = size + 10;
    const text = ls.map((l, i) => `<text x="640" y="${270 + i * step}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" fill="#131816">${esc(l)}</text>`).join("");
    const y2 = 270 + ls.length * step + 10;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect width="1200" height="630" fill="#F3F5F3"/>
      <rect x="40" y="45" width="560" height="540" rx="36" fill="#FFFFFF"/>
      <rect x="640" y="190" width="64" height="6" rx="3" fill="#0E5A47"/>
      ${text}
      <text x="640" y="${y2}" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#4E5753">Custom branded for hotels all over India</text>
      <text x="640" y="560" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#0E5A47">Amaravati Enterprises</text>
      <text x="640" y="598" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#4E5753">amaravatienterprises.com</text>
    </svg>`;
    const out = path.join(outDir, `${slug}.jpg`);
    await sharp(Buffer.from(svg))
      .composite([{ input: product, left: 50, top: 45 }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    console.log(slug, fs.statSync(out).size);
  }
})();
