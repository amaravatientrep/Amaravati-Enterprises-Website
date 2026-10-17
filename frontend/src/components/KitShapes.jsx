// Stand-in shapes for the kit explorer prototype. Flat placeholders, to be replaced by product photos.

const brushFill = {
  White: { fill: "#F7F7F4", stroke: "#9AA3A0" },
  Translucent: { fill: "#8FC3E6", stroke: "#5E95BB", opacity: 0.6 },
  Transparent: { fill: "#E3F1F6", stroke: "#8FB4C2", opacity: 0.3 },
  Bamboo: { fill: "#C99A5B", stroke: "#8E6634", grain: true },
  "Wheat Starch": { fill: "#E6D3A3", stroke: "#B39C61", speck: true },
};

export function Brush({ variant = "White", className }) {
  const v = brushFill[variant] || brushFill.White;
  return (
    <svg viewBox="0 0 24 96" className={className} aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2.5" fill="#FFFFFF" stroke="#B8C0BD" />
      {[9, 12, 15].map((x) => (
        <line key={x} x1={x} y1="5" x2={x} y2="19" stroke="#C9D1CE" strokeWidth="1.2" />
      ))}
      <rect x="8" y="22" width="8" height="72" rx="4" fill={v.fill} fillOpacity={v.opacity ?? 1} stroke={v.stroke} />
      {v.grain && [44, 66].map((y) => <line key={y} x1="8.5" y1={y} x2="15.5" y2={y} stroke={v.stroke} strokeWidth="1.2" />)}
      {v.speck && [34, 50, 61, 77, 86].map((y, i) => <circle key={y} cx={i % 2 ? 10.5 : 13.5} cy={y} r="0.9" fill={v.stroke} />)}
    </svg>
  );
}

const pasteFill = {
  Anchor: { body: "#FFFFFF", band: "#D7262E" },
  Meswak: { body: "#F3F0E4", band: "#2E7D3A" },
  Biotique: { body: "#ECE6D6", band: "#6A7B2F" },
  Colgate: { body: "#E4252B", band: "#FFFFFF" },
  "Colgate Total": { body: "#E4252B", band: "#2B4AA0" },
};

export function Paste({ variant = "Anchor", className }) {
  const v = pasteFill[variant] || pasteFill.Anchor;
  return (
    <svg viewBox="0 0 40 96" className={className} aria-hidden="true">
      {/* crimped end at the top, cap at the bottom */}
      <path d="M5 4 H35 V10 L31 76 H9 L5 10 Z" fill={v.body} stroke="#A9B2AE" strokeLinejoin="round" />
      <path d="M5 4 H35 V10 H5 Z" fill="#D9DFDC" stroke="#A9B2AE" />
      <path d="M6.6 34 H33.4 L32.5 50 H7.5 Z" fill={v.band} />
      <rect x="12" y="76" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#A9B2AE" />
    </svg>
  );
}

const packFill = {
  "Paper Board Boxes": { kind: "box", front: "#FAFAF7", top: "#ECEEEA", stroke: "#A9B2AE" },
  "Kraft Board Boxes": { kind: "box", front: "#B98A57", top: "#CDA171", stroke: "#8A6438" },
  "Paper Board Boxes with Matte Lamination": { kind: "box", front: "#2F3A36", top: "#3D4A45", stroke: "#1C2421" },
  "Textured Card Boxes": { kind: "box", front: "#EDE6D8", top: "#F5F0E6", stroke: "#B5AA94", dots: true },
  "Biodegradable Butter Paper Pouch": { kind: "pouch", front: "#F4F0DF", stroke: "#BDB495", opacity: 0.85 },
  "Biodegradable Kraft Paper Pouch": { kind: "pouch", front: "#A87B4F", stroke: "#7C5730" },
};

export function Pack({ variant = "Paper Board Boxes", className }) {
  const v = packFill[variant] || packFill["Paper Board Boxes"];
  if (v.kind === "pouch") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <path d="M14 8 H50 L52 58 H12 Z" fill={v.front} fillOpacity={v.opacity ?? 1} stroke={v.stroke} strokeLinejoin="round" />
        <path d="M14 8 H50 V15 H14 Z" fill={v.stroke} fillOpacity="0.25" />
        <path d="M18 20 H46" stroke={v.stroke} strokeDasharray="2 2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M8 22 L20 12 H56 L44 22 Z" fill={v.top} stroke={v.stroke} strokeLinejoin="round" />
      <path d="M44 22 L56 12 V44 L44 54 Z" fill={v.front} stroke={v.stroke} strokeLinejoin="round" style={{ filter: "brightness(0.88)" }} />
      <rect x="8" y="22" width="36" height="32" fill={v.front} stroke={v.stroke} />
      {v.dots && [14, 22, 30, 38].flatMap((x) => [29, 37, 45].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={v.stroke} />))}
    </svg>
  );
}
