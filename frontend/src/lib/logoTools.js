// Browser-only helpers for the logo preview tool. Nothing here leaves the device.

export function readFile(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export function loadImage(src) {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

// Draw an image into a canvas no larger than `max` on its long side.
export function toCanvas(img, max = 900) {
  const iw = img.naturalWidth || img.width || 600;
  const ih = img.naturalHeight || img.height || 600;
  const scale = Math.min(1, max / Math.max(iw, ih));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(iw * scale));
  c.height = Math.max(1, Math.round(ih * scale));
  c.getContext("2d", { willReadFrequently: true }).drawImage(img, 0, 0, c.width, c.height);
  return c;
}

export const toHex = (r, g, b) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// The most common opaque colour along the image border = the logo's background.
// Returns null when the border is mostly transparent (background already removed).
export function detectBackground(data, w, h) {
  const counts = new Map();
  let opaque = 0;
  let total = 0;
  const visit = (x, y) => {
    const i = (y * w + x) * 4;
    total++;
    if (data[i + 3] < 200) return;
    opaque++;
    const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
    const e = counts.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    e.n++;
    e.r += data[i];
    e.g += data[i + 1];
    e.b += data[i + 2];
    counts.set(key, e);
  };
  for (let x = 0; x < w; x++) {
    visit(x, 0);
    visit(x, h - 1);
  }
  for (let y = 1; y < h - 1; y++) {
    visit(0, y);
    visit(w - 1, y);
  }
  if (opaque / total < 0.5) return null;
  let best = null;
  for (const e of counts.values()) if (!best || e.n > best.n) best = e;
  return best ? [best.r / best.n, best.g / best.n, best.b / best.n] : null;
}

// Remove every pixel close to the background colour, including inside letters
// (the holes in O, R, A). Pixels just outside the tolerance fade for soft edges.
export function removeBackground(imageData, bg, tolerance) {
  const { data } = imageData;
  const [br, bgc, bb] = bg;
  const soft = tolerance * 1.8;
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - br;
    const dg = data[i + 1] - bgc;
    const db = data[i + 2] - bb;
    const d = Math.sqrt(dr * dr + dg * dg + db * db);
    if (d <= tolerance) data[i + 3] = 0;
    else if (d < soft) data[i + 3] = Math.round(data[i + 3] * ((d - tolerance) / (soft - tolerance)));
  }
  return imageData;
}

// Build a full label colour set from any hex: readable text plus box shading.
export function swatchFromHex(hex, name = "Custom") {
  const [r, g, b] = hexToRgb(hex);
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const mix = (t, k) => toHex(r + (t - r) * k, g + (t - g) * k, b + (t - b) * k);
  return {
    name,
    label: toHex(r, g, b),
    ink: lum > 0.4 ? "#1B211E" : "#F5F7F6",
    side: mix(0, 0.22),
    top: mix(255, 0.14),
  };
}
