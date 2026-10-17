import showcase from "./showcase.json";

// The styled scenes (owner's real products placed in hotel rooms), split for the product pages.
// Each scene has a `group` (the same kit or tray photographed more than once) and a `kind` (kit or tea).
const isTea = (s) => s.kind === "tea";
const isDispenser = (s) => /shower/i.test(s.alt);

// Small seeded hash, so the order is the same on the server and in the browser (no flicker).
const hash = (str, seed) => {
  let h = 2166136261 ^ seed;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};

// Reorder so photos of the same kit never sit side by side (nor within two places when that can be avoided),
// and tea scenes are spread between kit scenes. Deterministic for a given seed.
export function spread(list, seed = 1) {
  const buckets = new Map();
  [...list]
    .sort((a, b) => hash(a.image, seed) - hash(b.image, seed))
    .forEach((it) => {
      const g = it.group || it.image;
      if (!buckets.has(g)) buckets.set(g, []);
      buckets.get(g).push(it);
    });
  const out = [];
  while (out.length < list.length) {
    const recent = out.slice(-2).map((x) => x.group || x.image);
    const lastKind = out.at(-1)?.kind;
    const open = [...buckets.entries()].filter(([, items]) => items.length);
    const score = ([g, items]) =>
      (recent.includes(g) ? -1000 : 0) + (items[0].kind && items[0].kind === lastKind && lastKind === "tea" ? -100 : 0) + items.length * 10 - (hash(g, seed) % 10) / 10;
    const [g, items] = open.sort((a, b) => score(b) - score(a))[0];
    out.push(items.shift());
  }
  return out;
}

export const teaScenes = spread(showcase.filter(isTea), 7);
export const kitScenes = spread(showcase.filter((s) => !isTea(s) && !isDispenser(s)), 3);

// Start a page's carousel at a different scene, so pages don't all open on the same photo.
export const rotate = (list, start) => [...list.slice(start), ...list.slice(0, start)];
