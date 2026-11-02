// Builds the free checklist PDFs in public/checklists from the guide data in src/lib/guides.js, so the PDFs never
// disagree with the pages. Run after changing a guide or the housekeeping range: `npm run checklists`.
// Needs Google Chrome or Microsoft Edge installed (set CHROME_PATH if it is somewhere unusual).
// House rules as on the site: no prices, MOQs or lead times; real product photos only.

import { register } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

// The site's data files use extensionless and JSON imports (resolved by Next.js); teach plain Node the same.
register(
  "data:text/javascript," +
    encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".js", ctx); throw e; }
}
export async function load(url, ctx, next) {
  return next(url, url.endsWith(".json") ? { ...ctx, importAttributes: { type: "json" } } : ctx);
}`)
);

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const lib = (f) => pathToFileURL(path.join(root, "src/lib", f)).href;
const { guides, checklists } = await import(lib("guides.js"));
const { contact, SITE_URL } = await import(lib("site.js"));

const pub = (src) => pathToFileURL(path.join(root, "public", src)).href;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "checklists-"));

// Chrome stores WebP photos uncompressed in a PDF; JPEG goes in as is. With ffmpeg installed, photos are converted
// to JPEG first, which keeps the housekeeping PDF small enough for mobile data.
const ffmpeg = (() => {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();
const photo = (src) => {
  if (!ffmpeg || !src.endsWith(".webp")) return pub(src);
  const jpg = path.join(tmp, src.replace(/[\/]/g, "_").replace(/\.webp$/, ".jpg"));
  if (!fs.existsSync(jpg)) execFileSync("ffmpeg", ["-y", "-v", "error", "-i", path.join(root, "public", src), "-vf", "scale='min(320,iw)':-2", "-q:v", "4", jpg]);
  return pathToFileURL(jpg).href;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const site = SITE_URL.replace(/^https?:\/\//, "");

function chrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  const found = candidates.find((p) => p && fs.existsSync(p));
  if (!found) throw new Error("Chrome or Edge not found: set CHROME_PATH");
  return found;
}

// Shared page frame: logo header, branded footer on every printed page, A4.
const page = (title, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  @page {
    size: A4;
    margin: 13mm 13mm 16mm;
    @bottom-left { content: "Amaravati Enterprises · ${esc(site)}"; font: 8.5pt "Segoe UI", Arial, sans-serif; color: #555; }
    @bottom-right { content: "WhatsApp ${esc(contact.phoneDisplay)} · Page " counter(page) " of " counter(pages); font: 8.5pt "Segoe UI", Arial, sans-serif; color: #555; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font: 10pt/1.4 "Segoe UI", Arial, sans-serif; color: #131816; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0e5a47; padding-bottom: 8px; margin-bottom: 12px; }
  header img { height: 34px; }
  header span { font-size: 9pt; color: #555; }
  h1 { font-size: 20pt; margin: 0 0 4px; letter-spacing: -0.01em; }
  .lead { margin: 0 0 12px; color: #333; font-size: 10.5pt; }
  h2 { font-size: 13pt; margin: 16px 0 6px; color: #0e5a47; break-after: avoid; }
  h3 { font-size: 11pt; margin: 10px 0 4px; break-after: avoid; }
  p { margin: 0 0 6px; }
  table { width: 100%; border-collapse: collapse; margin: 4px 0 8px; break-inside: auto; }
  th, td { border: 1px solid #c9d3cf; padding: 1.6px 6px; text-align: left; vertical-align: top; }
  thead th { background: #deece6; }
  tr { break-inside: avoid; }
  tr.group td { background: #f1f5f3; font-weight: 600; color: #0e5a47; }
  td.c { text-align: center; width: 15mm; }
  table.check { font-size: 9pt; line-height: 1.2; }
  td.q { width: 22mm; }
  .box { display: inline-block; width: 10px; height: 10px; border: 1.2px solid #131816; border-radius: 2px; vertical-align: -1px; margin-right: 5px; }
  .dot { color: #0e5a47; font-size: 11pt; }
  ul.ticks { list-style: none; padding: 0; margin: 0 0 6px; columns: 2; column-gap: 8mm; }
  ul.ticks li { margin: 0 0 4px; break-inside: avoid; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 4px 0 8px; }
  .card { border: 1px solid #c9d3cf; border-radius: 6px; padding: 5px; break-inside: avoid; }
  .card img { width: 100%; height: 26mm; object-fit: contain; display: block; background: #fff; }
  .card b { display: block; font-size: 8.8pt; line-height: 1.25; margin-top: 3px; }
  .card i { display: block; font-style: normal; font-size: 8pt; color: #0e5a47; font-weight: 600; }
  .card small { display: block; font-size: 8pt; color: #555; line-height: 1.25; }
  .cta { margin-top: 14px; border-radius: 8px; background: #0e5a47; color: #f7faf8; padding: 10px 14px; break-inside: avoid; }
  .cta b { font-size: 11.5pt; }
  .notes { border: 1px solid #c9d3cf; border-radius: 6px; height: 34mm; padding: 6px; color: #777; break-inside: avoid; }
</style></head><body>
<header><img src="${pub("/amaravati-logo-transparent.png")}" alt="Amaravati Enterprises"><span>Hotel amenities supplier, Hyderabad &middot; Hotels all over India</span></header>
${body}
</body></html>`;

const cta = (what) => `<div class="cta"><b>Want ${what} with your hotel's name and logo?</b><br>
Send this list on WhatsApp to ${esc(contact.phoneDisplay)} or email ${esc(contact.email)} and we will prepare a proposal for your property. ${esc(site)}</div>`;

// 1. Hotel room amenities checklist: every item, the room categories that usually include it, tick boxes and a quantity column.
// Level = the first room category that usually includes the item (1 budget, 2 mid-scale, 3 4-star, 4 5-star, 0 optional).
const amenityRows = [
  ["Bathroom toiletries", [["Soap", 1], ["Shampoo", 1], ["Shower Gel", 1], ["Conditioner", 2], ["Moisturizer", 2], ["Hand Wash at the wash basin", 0], ["Wall mounted dispensers (instead of bottles)", 0]]],
  ["Guest amenity kits", [["Dental Kit", 1], ["Comb", 1], ["Shower Cap", 2], ["Shaving Kit", 2], ["Sewing Kit", 2], ["Care Kit", 4], ["Loofah", 4], ["Shoe Shiner", 4], ["Sanitary Disposal Bag", 4]]],
  ["Wardrobe and room", [["Hangers", 1], ["Laundry Bag", 2], ["Slippers", 2], ["Wooden hangers", 3], ["WC band and glass covers", 2], ["DND card", 1]]],
  ["Tea and coffee tray", [["Kettle and kettle tray", 1], ["Tea, coffee, sugar and sugar-free sachets", 1], ["Cups and glasses", 2], ["Stirrers", 2], ["Wooden kettle tray with sachet holder", 4]]],
  ["Stationery", [["Key Card Jacket", 1], ["Scribbling Pad and Pen", 1], ["Coaster", 2], ["Menu Card", 2], ["Leather Scribbling Pad Holder", 3], ["Leather Remote Holder and Box Tissue Holder", 4]]],
  ["Room fixtures", [["Dry iron and iron board", 3], ["Wall mounted hair dryer", 3], ["Glass water bottle", 4], ["Anti-skid mat", 4]]],
];
function amenitiesPdf() {
  const g = guides.find((x) => x.checklist === "amenities");
  const restock = g.sections.find((s) => s.h === "Room amenities housekeeping restocks").blocks.filter((b) => b.list && typeof b.list[0] === "string");
  const cell = (level, col) => `<td class="c">${level && col >= level ? '<span class="dot">&#9679;</span>' : '<span class="box"></span>'}</td>`;
  const rows = amenityRows
    .map(([group, items]) => `<tr class="group"><td colspan="6">${esc(group)}</td></tr>` + items.map(([name, lv]) => `<tr><td>${esc(name)}</td>${[1, 2, 3, 4].map((c) => cell(lv, c)).join("")}<td class="q"></td></tr>`).join(""))
    .join("");
  return page(
    `${checklists.amenities.title} | Amaravati Enterprises`,
    `<h1>${esc(checklists.amenities.title)}</h1>
<p class="lead">Hotel amenities list by room category. <span class="dot">&#9679;</span> = usually included in that category; tick the boxes for anything you want to add, and fill in the quantity per room.</p>
<table class="check"><thead><tr><th>Item</th><th>Budget</th><th>Mid-scale</th><th>4-star</th><th>5-star</th><th>Qty per room</th></tr></thead><tbody>${rows}</tbody></table>
<h2>Room amenities housekeeping restocks</h2>
<h3>Replaced or topped up after every stay</h3><ul class="ticks">${restock[0].list.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join("")}</ul>
<h3>Stays in the room and is checked</h3><ul class="ticks">${restock[1].list.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join("")}</ul>
<h2>Basic amenities in a hotel room</h2>
<ul class="ticks">${g.sections.find((s) => s.h === "Basic amenities in a hotel room").blocks.find((b) => b.list).list.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join("")}</ul>
<h2>Your property</h2>
<table><tbody>
<tr><td style="width:45mm">Hotel name and city</td><td></td></tr>
<tr><td>Rooms by category</td><td></td></tr>
<tr><td>Packaging preference</td><td><span class="box"></span>Paper board &nbsp; <span class="box"></span>Kraft board &nbsp; <span class="box"></span>Paper pouch &nbsp; <span class="box"></span>Eco-friendly</td></tr>
<tr><td>Toiletries</td><td><span class="box"></span>Bottles &nbsp; <span class="box"></span>Tubes &nbsp; <span class="box"></span>Wall mounted dispensers</td></tr>
</tbody></table>
<h3>Notes</h3><div class="notes"></div>
${cta("these amenities")}
<p style="margin-top:8px;font-size:8.5pt;color:#555">The full guide with photos: ${esc(site)}/guides/${g.slug}</p>`
  );
}

// 2. Housekeeping items list with pictures: the guide's own sections, printed with tick boxes.
function housekeepingPdf() {
  const g = guides.find((x) => x.checklist === "housekeeping");
  const skip = new Set(["Housekeeping material list with pictures", "Download the housekeeping items list"]);
  const item = (it) => (typeof it === "string" ? esc(it) : `${esc(it.label)}${it.text ? `: ${esc(it.text)}` : ""}`);
  const block = (b) => {
    if (b.p) return `<p>${esc(b.p)}</p>`;
    if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
    if (b.list) return `<ul class="ticks">${b.list.map((it) => `<li><span class="box"></span>${item(it)}</li>`).join("")}</ul>`;
    if (b.table) return `<table><thead><tr>${b.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    if (b.grid) return `<div class="grid">${b.grid.map((it) => `<div class="card"><img src="${photo(it.img)}" alt="${esc(it.alt || it.name)}"><i>${esc(it.code || "")}</i><b><span class="box"></span>${esc(it.name)}</b><small>${esc(it.text || "")}</small></div>`).join("")}</div>`;
    return "";
  };
  const body = g.sections
    .filter((s) => !skip.has(s.h))
    .map((s) => `<h2>${esc(s.h)}</h2>${s.blocks.map(block).join("")}`)
    .join("");
  return page(
    `${checklists.housekeeping.title} | Amaravati Enterprises`,
    `<h1>${esc(checklists.housekeeping.title)}</h1>
<p class="lead">${esc(g.answer)} Tick what you need and send us the list.</p>
${body}
${cta("a quote for these items")}
<p style="margin-top:8px;font-size:8.5pt;color:#555">All 300+ items with photos and codes: ${esc(site)}/products/housekeeping &middot; Full guide: ${esc(site)}/guides/${g.slug}</p>`
  );
}

const out = path.join(root, "public/checklists");
fs.mkdirSync(out, { recursive: true });
const browser = chrome();
for (const [key, html] of [["amenities", amenitiesPdf()], ["housekeeping", housekeepingPdf()]]) {
  const htmlFile = path.join(tmp, `${key}.html`);
  fs.writeFileSync(htmlFile, html);
  const pdf = path.join(root, "public", checklists[key].href);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files", `--print-to-pdf=${pdf}`, pathToFileURL(htmlFile).href], { stdio: "ignore" });
  const bytes = fs.statSync(pdf).size;
  const pages = (fs.readFileSync(pdf, "latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`${checklists[key].href}: ${pages} pages, ${(bytes / 1e3).toFixed(0)} KB${pages !== checklists[key].pages ? `  <- update checklists.${key}.pages in src/lib/guides.js` : ""}`);
}
fs.rmSync(tmp, { recursive: true, force: true });
