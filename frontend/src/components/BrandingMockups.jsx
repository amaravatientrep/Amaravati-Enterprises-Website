import { useId } from "react";

// Real-photo product mockups for the logo preview tool, drawn to true scale in millimetres.
// Boxes reuse the cleaned box-surface photo on the front face and are drawn as 3D boxes (top + side faces).
// Bottles use the real bottle photo (22 x 50 mm) with the liquid recoloured per product.

const BOX_TEXTURE = "/images/branding-tool/dental-kit-box.webp";
const PRINT_BROWN = "#5A3416";
const FONT = "Montserrat, 'Century Gothic', Futura, 'Trebuchet MS', Arial, sans-serif";

// Bottle photo geometry: 1024 x 1536 px; bottle spans x 232-792, y 132-1423 (22 mm wide).
const BOTTLE_PX = { w: 1024, h: 1536, left: 232, top: 132, body: 560, bottom: 1423 };
const MM_PER_PX = 22 / BOTTLE_PX.body;
export const BOTTLE_MM = { w: 22, h: (BOTTLE_PX.bottom - BOTTLE_PX.top) * MM_PER_PX };

export const PRODUCTS = [
  { id: "dental", name: "Dental Kit", kind: "box", mm: [190.5, 35] },
  { id: "comb", name: "Comb", kind: "box", mm: [195.5, 42] },
  { id: "shaving", name: "Shaving Kit", kind: "box", mm: [125, 50] },
  { id: "care", name: "Care Kit", kind: "box", mm: [110, 39] },
  { id: "soap", name: "Soap", kind: "box", mm: [50, 50] },
  { id: "shower-cap", name: "Shower Cap", kind: "box", mm: [50, 50] },
  { id: "sewing", name: "Sewing Kit", kind: "box", mm: [50, 50] },
  { id: "shampoo", name: "Shampoo", kind: "bottle", img: "/images/branding-tool/shampoo-bottle.webp" },
  { id: "shower-gel", name: "Shower Gel", kind: "bottle", img: "/images/branding-tool/shower-gel-bottle.webp" },
  { id: "moisturiser", name: "Moisturizer", kind: "bottle", img: "/images/branding-tool/moisturiser-bottle.webp" },
  { id: "conditioner", name: "Conditioner", kind: "bottle", img: "/images/branding-tool/conditioner-bottle.webp" },
];

export const productById = (id) => PRODUCTS.find((p) => p.id === id);

// Box depths in mm (front face is mm[0] x mm[1]); drawn in a light oblique projection, light from the top-left.
const DEPTH = { dental: 19.5, comb: 9.5, shaving: 20, care: 10, soap: 16, "shower-cap": 16, sewing: 16 };
const OBLIQUE = { k: 0.5, angle: (34 * Math.PI) / 180 };
function boxDepth(product) {
  const d = (DEPTH[product.id] || 12) * OBLIQUE.k;
  return { dx: d * Math.cos(OBLIQUE.angle), dy: d * Math.sin(OBLIQUE.angle) };
}

function isTinted(sw) {
  return sw.label.toUpperCase() !== "#FFFFFF";
}

function LogoMark({ logo, name, x, y, w, h, ink, scale, textBoost = 1 }) {
  const sw = w * scale;
  const sh = h * scale;
  const sx = x + (w - sw) / 2;
  const sy = y + (h - sh) / 2;
  if (logo) {
    return <image href={logo} x={sx} y={sy} width={sw} height={sh} preserveAspectRatio="xMidYMid meet" />;
  }
  const text = (name || "Your Hotel").trim().slice(0, 28);
  if (!text) return null;
  const words = text.split(/\s+/);
  const lines = words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")] : [text];
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.min((sw / Math.max(longest, 4)) * 1.55 * textBoost, sh / (lines.length * 1.25));
  return (
    <text x={x + w / 2} y={y + h / 2 - (lines.length - 1) * size * 0.6} fill={ink} fontFamily="Georgia, 'Times New Roman', serif" fontSize={size} textAnchor="middle" dominantBaseline="middle">
      {lines.map((l, i) => (
        <tspan key={i} x={x + w / 2} dy={i === 0 ? 0 : size * 1.2}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

// Box front face. Long boxes: name left, logo at the right end. Square boxes: logo centred, name below.
// Box icons: the owner's line-icon set (made 2026-10), cut into white-on-black luminance masks so each icon
// takes the box's ink colour. vb is each mask's own pixel size.
const mask = (id, w, h) => ({ vb: `0 0 ${w} ${h}`, mask: `/images/branding-tool/icon-${id}-mask.png` });
const ICONS = {
  dental: mask("dental", 208, 388),
  shaving: mask("shaving", 277, 361),
  comb: mask("comb", 115, 385),
  "shower-cap": mask("shower-cap", 345, 242),
  sewing: mask("sewing", 296, 258),
  care: mask("care", 265, 289),
  soap: mask("soap", 325, 289),
};

function BoxIcon({ id, x, y, w: size, h: sizeH, ink }) {
  const maskId = `icon-mask-${useId().replace(/:/g, "")}`;
  const icon = ICONS[id];
  if (!icon) return null;
  if (icon.mask) {
    const [, , w, h] = icon.vb.split(" ").map(Number);
    return (
      <svg x={x} y={y} width={size} height={sizeH} viewBox={icon.vb} preserveAspectRatio="xMaxYMax meet" overflow="visible">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
            <image href={icon.mask} x="0" y="0" width={w} height={h} />
          </mask>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={ink} mask={`url(#${maskId})`} />
      </svg>
    );
  }
  return (
    <svg x={x} y={y} width={size} height={sizeH} viewBox={icon.vb} preserveAspectRatio="xMaxYMax meet" overflow="visible">
      <g fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {icon.d}
      </g>
    </svg>
  );
}

// Box front face. Long boxes: name left, logo towards the right, icon in the bottom-right corner.
// Square boxes: logo centred at the top, name bottom-left, icon bottom-right.
function BoxFace({ product, sw, logo, name, scale }) {
  const [L, H] = product.mm;
  const tinted = isTinted(sw);
  const ink = tinted ? sw.ink : PRINT_BROWN;
  const edge = L * 0.008;
  const long = L / H >= 1.8;
  // Icons sit small in the bottom-right corner: on long boxes every icon gets the same height (so the set looks
  // even across boxes) with its width capped; on square boxes each icon fits a fixed corner area.
  const [, , ivw, ivh] = (ICONS[product.id]?.vb || "0 0 1 1").split(" ").map(Number);
  const aspect = ivw / ivh;
  let logoBox, nameEl, iconSize, iconW, iconX, iconY;
  if (long) {
    iconSize = H * 0.4;
    iconW = Math.min(iconSize * aspect, L * 0.1);
    iconSize = iconW / aspect;
    iconX = L - L * 0.03 - iconW;
    iconY = H - H * 0.12 - iconSize;
    const lw = Math.min(H * 1.0, L * 0.34);
    logoBox = { x: iconX - L * 0.025 - lw, y: H * 0.1, w: lw, h: H * 0.8 };
    const maxW = logoBox.x - L * 0.08;
    const fs = Math.min(H * 0.3, maxW / (product.name.length * 0.56));
    nameEl = (
      <text x={L * 0.048} y={H * 0.5 + fs * 0.36} fill={ink} fontFamily={FONT} fontSize={fs}>
        {product.name}
      </text>
    );
  } else {
    const fit = Math.min((L * 0.26) / aspect, H * 0.25);
    iconSize = fit;
    iconW = fit * aspect;
    iconX = L - L * 0.07 - iconW;
    iconY = H - H * 0.07 - iconSize;
    logoBox = { x: L * 0.07, y: H * 0.05, w: L * 0.86, h: H * 0.62, textBoost: 1.45 };
    const maxW = iconX - L * 0.14;
    const fs = Math.min(H * 0.12, maxW / (product.name.length * 0.74));
    nameEl = (
      <text x={L * 0.08} y={H * 0.86} fill={ink} fontFamily={FONT} fontSize={fs} letterSpacing={fs * 0.04}>
        {product.name}
      </text>
    );
  }
  return (
    <>
      <image href={BOX_TEXTURE} x="0" y="0" width={L} height={H} preserveAspectRatio="none" />
      {tinted && <rect x={edge} y="0" width={L - edge * 2} height={H} fill={sw.label} style={{ mixBlendMode: "multiply" }} />}
      {nameEl}
      <LogoMark logo={logo} name={name} {...logoBox} ink={ink} scale={scale} />
      <BoxIcon id={product.id} x={iconX} y={iconY} w={iconW} h={iconSize} ink={ink} />
    </>
  );
}

// Box with depth: blurred contact shadow, printed front face, lit top face and shaded side face.
function Box3D({ product, sw, ...rest }) {
  const uid = useId().replace(/:/g, "");
  const [L, H] = product.mm;
  const { dx, dy } = boxDepth(product);
  const base = isTinted(sw) ? sw.label : "#F2EEE6";
  const top = `0,0 ${dx},${-dy} ${L + dx},${-dy} ${L},0`;
  const side = `${L},0 ${L + dx},${-dy} ${L + dx},${H - dy} ${L},${H}`;
  return (
    <>
      <defs>
        <filter id={`sh-${uid}`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation={Math.max(1.2, H * 0.06)} />
        </filter>
        <linearGradient id={`lt-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`sd-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0.34" />
        </linearGradient>
      </defs>
      {/* contact shadow on the surface */}
      <rect x={dx * 0.2} y={H - dy * 0.9} width={L + dx * 1.1} height={dy * 0.9 + H * 0.07} rx={H * 0.05} fill="#000" opacity="0.32" filter={`url(#sh-${uid})`} />
      {/* top and side faces */}
      <polygon points={top} fill={base} />
      <polygon points={top} fill="#fff" opacity="0.38" />
      <polygon points={side} fill={base} />
      <polygon points={side} fill={`url(#sd-${uid})`} />
      {/* printed front face, then soft light across it */}
      <BoxFace product={product} sw={sw} {...rest} />
      <rect x="0" y="0" width={L} height={H} fill={`url(#lt-${uid})`} />
      {/* crisp edges */}
      <g fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth={Math.max(0.15, L * 0.0015)} strokeLinejoin="round">
        <polygon points={top} />
        <polygon points={side} />
        <rect x="0" y="0" width={L} height={H} />
      </g>
    </>
  );
}

// Bottle in its own photo pixel space (1024 x 1536).
function BottleFace({ product, sw, logo, name, scale }) {
  const tinted = isTinted(sw);
  const ink = tinted ? sw.ink : PRINT_BROWN;
  const label = product.name.toUpperCase();
  const fs = Math.min(52, 470 / (label.length * 0.72));
  const uid = useId().replace(/:/g, "");
  return (
    <>
      <defs>
        <filter id={`bs-${uid}`} x="-30%" y="-200%" width="160%" height="500%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <ellipse cx="520" cy={BOTTLE_PX.bottom - 6} rx="300" ry="34" fill="#000" opacity="0.3" filter={`url(#bs-${uid})`} />
      <image href={product.img} x="0" y="0" width={BOTTLE_PX.w} height={BOTTLE_PX.h} />
      {tinted && <rect x="235" y="621" width="556" height="636" fill={sw.label} style={{ mixBlendMode: "multiply" }} />}
      <LogoMark logo={logo} name={name} x={268} y={668} w={488} h={440} ink={ink} scale={scale} textBoost={1.45} />
      <text x="512" y="1190" fill={ink} fontFamily={FONT} fontSize={fs} letterSpacing={fs * 0.06} textAnchor="middle">
        {label}
      </text>
    </>
  );
}

// Place a product inside a parent SVG in millimetres; (x, y) is the top-left of the product itself.
export function PlacedProduct({ product, x, y, ...rest }) {
  if (product.kind === "box") {
    const [L, H] = product.mm;
    const { dx, dy } = boxDepth(product);
    return (
      <svg x={x} y={y} width={L + dx} height={H + dy} viewBox={`0 ${-dy} ${L + dx} ${H + dy}`} overflow="visible">
        <Box3D product={product} {...rest} />
      </svg>
    );
  }
  // Bottle photo includes transparent padding; offset so the bottle body lands at (x, y).
  return (
    <svg
      x={x - BOTTLE_PX.left * MM_PER_PX}
      y={y - BOTTLE_PX.top * MM_PER_PX}
      width={BOTTLE_PX.w * MM_PER_PX}
      height={BOTTLE_PX.h * MM_PER_PX}
      viewBox={`0 0 ${BOTTLE_PX.w} ${BOTTLE_PX.h}`}
      overflow="visible"
    >
      <BottleFace product={product} {...rest} />
    </svg>
  );
}

const sizeOf = (p) => {
  if (p.kind !== "box") return [BOTTLE_MM.w, BOTTLE_MM.h];
  const { dx, dy } = boxDepth(p);
  return [p.mm[0] + dx, p.mm[1] + dy];
};

// Lay products out in rows (true scale), bottoms aligned on each row, rows centred.
export function layoutRows(rows, { gap = 6, rowGap = 9, pad = 6 } = {}) {
  const placed = [];
  const widths = rows.map((r) => r.reduce((s, p, i) => s + sizeOf(p)[0] + (i ? gap : 0), 0));
  const W = Math.max(...widths) + pad * 2;
  let y = pad;
  rows.forEach((r, ri) => {
    const rowH = Math.max(...r.map((p) => sizeOf(p)[1]));
    let x = pad + (W - pad * 2 - widths[ri]) / 2;
    r.forEach((p) => {
      const [w, h] = sizeOf(p);
      placed.push({ product: p, x, y: y + rowH - h });
      x += w + gap;
    });
    y += rowH + rowGap;
  });
  return { placed, W, H: y - rowGap + pad };
}

const P = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export const VIEWS = {
  all: {
    label: "All products",
    rows: [
      [P.shampoo, P["shower-gel"], P.moisturiser, P.conditioner, P.soap, P["shower-cap"]],
      [P.shaving, P.sewing],
      [P.care],
      [P.dental],
      [P.comb],
    ],
  },
  bottles: { label: "Bottles", rows: [[P.shampoo, P["shower-gel"], P.moisturiser, P.conditioner]] },
  dental: { label: "Dental Kit", rows: [[P.dental]] },
  comb: { label: "Comb", rows: [[P.comb]] },
  shaving: { label: "Shaving Kit", rows: [[P.shaving]] },
  care: { label: "Care Kit", rows: [[P.care]] },
  small: { label: "Soap, Shower Cap, Sewing Kit", rows: [[P.soap, P["shower-cap"], P.sewing]] },
};

// Amaravati Enterprises mark, part of every scene so it appears in screenshots and downloads.
export const SCENE_LOGO = { src: "/amaravati-logo-transparent.png", ratio: 588 / 801 };

// A whole scene (one view) as a single SVG, in millimetres, with the logo in a band below the products.
export function ProductScene({ view = "all", svgRef, className = "block h-auto w-full", ...rest }) {
  const { placed, W, H } = layoutRows(VIEWS[view].rows);
  const lw = Math.min(Math.max(W * 0.16, 26), 46);
  const lh = lw * SCENE_LOGO.ratio;
  const band = lh + 4;
  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H + band}`} className={className} role="img" aria-label={`${VIEWS[view].label} with your logo, by Amaravati Enterprises`} xmlns="http://www.w3.org/2000/svg">
      {placed.map(({ product, x, y }) => (
        <PlacedProduct key={product.id} product={product} x={x} y={y} {...rest} />
      ))}
      <image href={SCENE_LOGO.src} x={W - lw - 4} y={H + band - lh - 3} width={lw} height={lh} preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

// Single products used by the homepage teaser.
export function DentalBox(props) {
  return <ProductScene view="dental" {...props} />;
}
export function ShampooBottle({ svgRef, ...props }) {
  const { placed, W, H } = layoutRows([[P.shampoo]], { pad: 1 });
  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Shampoo bottle with your logo" xmlns="http://www.w3.org/2000/svg">
      {placed.map(({ product, x, y }) => (
        <PlacedProduct key={product.id} product={product} x={x} y={y} {...props} />
      ))}
    </svg>
  );
}
