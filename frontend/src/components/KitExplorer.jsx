"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { animate } from "motion/react";
import { Check, X, ArrowRight, WhatsappLogo, ArrowCounterClockwise } from "@phosphor-icons/react";
import { amenityProducts, amenityPackaging, amenityLine, whatsappLink } from "@/lib/site";
import { Brush, Paste, Pack } from "./KitShapes";
/* eslint-disable @next/next/no-img-element -- small pre-sized product photos, animated directly */

// Products that have the full open-the-box sequence. Others show their settled view straight away.
const ANIMATED = new Set(["dental-kit", "shaving-kit", "comb", "shower-cap", "care-kit", "sewing-kit", "disposal-sanitary-bag", "soap", "shoe-shiner"]);
const SHAPES = { brush: Brush, paste: Paste, packaging: Pack };
const ease = [0.16, 1, 0.3, 1];
// Soft hyphens so long one-word labels break cleanly in the narrow phone cards.
const soft = (t) => t.replace(/^(Trans)(lucent|parent)$/, "$1­$2");

function rowsOf(p, packaging = amenityPackaging) {
  const rows = (p.parts || []).map((part) => ({ id: part.id, label: part.label, options: part.options, images: part.images, hideLabel: part.hideLabel }));
  if (p.packaging) rows.push({ id: "packaging", label: "Packaging", options: packaging, images: p.packagingImages });
  return rows;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Where an image sits so that a box inside it (the carton body, given as fractions of the image) lands on `body` (px).
const place = (f, body) => {
  const width = body.w / (f.right - f.left);
  const height = body.h / (f.bottom - f.top);
  return { left: body.x - f.left * width, top: body.y - f.top * height, width, height };
};
const inset = (f) => `inset(${f.top * 100}% ${(1 - f.right) * 100}% ${(1 - f.bottom) * 100}% ${f.left * 100}%)`;

// Hero layout per kit, in px inside a 180x320 panel. `closed` and `open` are where the carton body sits in each
// carton photo (measured from the photos), so the two line up when they crossfade. The two pieces (one option of
// each part) rise out of the opening; they are clipped at `rim`, so they appear from inside the carton.
const HEROES = {
  "dental-kit": {
    body: { x: 70, y: 108, w: 40, h: 200 },
    closed: { top: 0.0107, bottom: 0.9908, left: 0.105, right: 0.895 },
    open: { top: 0.1275, bottom: 0.993, left: 0.105, right: 0.895 },
    pieces: [
      { option: "Bamboo", left: 66, height: 150, rise: -100, tilt: -5, z: 1 },
      { option: "Colgate", left: 82, height: 84, rise: -66, tilt: 6, z: 2 },
    ],
  },
  "shaving-kit": {
    body: { x: 58, y: 136, w: 64, h: 172 },
    closed: { top: 0.0075, bottom: 0.9806, left: 0.1464, right: 0.8464 },
    open: { top: 0.17, bottom: 0.9793, left: 0.1464, right: 0.8435 },
    pieces: [
      { option: "Twin Blade Razor – Black", left: 58, height: 130, rise: -96, tilt: -6, z: 2 },
      { option: "Glide", left: 67, height: 74, rise: -60, tilt: 7, z: 1 },
    ],
  },
  comb: {
    body: { x: 69, y: 112, w: 42, h: 196 },
    closed: { top: 0.0072, bottom: 0.992, left: 0.1432, right: 0.8514 },
    open: { top: 0.1263, bottom: 0.9895, left: 0.1432, right: 0.8514 },
    pieces: [{ option: "White Handle", left: 77, height: 150, rise: -100, tilt: -4, z: 1 }],
  },
  "shower-cap": {
    body: { x: 35, y: 193, w: 110, h: 115 },
    closed: { top: 0.0211, bottom: 0.9665, left: 0.0346, right: 0.9346 },
    open: { top: 0.345, bottom: 0.977, left: 0.121, right: 0.878 },
    pieces: [{ option: "Plastic", left: 52, height: 150, rise: -120, tilt: 0, z: 1 }],
  },
  // Fixed-contents kit: each piece is one item of `contents` and lands on its own card in "In the kit".
  "care-kit": {
    body: { x: 58, y: 128, w: 63, h: 180 },
    closed: { top: 0.0106, bottom: 0.9894, left: 0.1416, right: 0.8584 },
    open: { top: 0.1856, bottom: 0.9914, left: 0.1416, right: 0.8567 },
    pieces: [
      { content: "2 Ear Buds", left: 54, height: 120, rise: -96, tilt: -7, z: 1 },
      { content: "1 Emery Board", left: 94, height: 110, rise: -82, tilt: 7, z: 2 },
      { content: "1 Band Aid", left: 74, height: 95, rise: -64, tilt: 0, z: 3 },
    ],
  },
  // Contents mounted on one card: the whole card rises and lands on the single "In the kit" photo.
  "sewing-kit": {
    body: { x: 35, y: 191, w: 110, h: 117 },
    closed: { top: 0.0199, bottom: 0.9815, left: 0.0959, right: 0.903 },
    open: { top: 0.295, bottom: 0.983, left: 0.0959, right: 0.9018 },
    pieces: [{ kit: true, left: 49, height: 115, rise: -112, tilt: -3, z: 1 }],
  },
  // The folded bag rises (its own photo, `src`) and lands on the "In the kit" card, which shows the bag laid flat.
  "disposal-sanitary-bag": {
    // The open box photo is squarer than the closed one, so each gets its own body box (same width and bottom
    // edge) instead of stretching one to fit the other.
    body: { x: 35, y: 194, w: 110, h: 114 },
    closedBody: { x: 35, y: 175, w: 110, h: 133 },
    closed: { top: 0.0167, bottom: 0.9656, left: 0.1656, right: 0.95 },
    open: { top: 0.3411, bottom: 0.9688, left: 0.1267, right: 0.8822 },
    pieces: [
      {
        content: "1 biodegradable Sanitary Disposal Bag",
        src: "/images/amenities/disposal-sanitary-bag/content-bag-folded.webp",
        // Narrower than the box opening (about 70 of its 110 px) and only partly out, so it reads as coming out
        // of the box rather than sitting on top of it.
        left: 55,
        height: 62,
        rise: -50,
        tilt: -6,
        z: 1,
      },
    ],
  },
  // The closed tin opens into the open tin with its lid beside it; the variety cards fly out of it.
  "shoe-shiner": {
    // Photos cropped tight; the open tin with its lid beside it is centred in the scene, the closed tin sits on
    // the same spot as the open tin's base.
    body: { x: 9, y: 118, w: 88, h: 93 },
    closedBody: { x: 9, y: 117, w: 88, h: 94 },
    closed: { top: 0.0171, bottom: 0.9215, left: 0.0194, right: 0.9806 },
    open: { top: 0.0155, bottom: 0.8845, left: 0.0127, right: 0.544 },
    pieces: [],
  },
  soap: {
    body: { x: 35, y: 191, w: 110, h: 117 },
    closed: { top: 0.0222, bottom: 0.9765, left: 0.0935, right: 0.9041 },
    open: { top: 0.2684, bottom: 0.9837, left: 0.0947, right: 0.9041 },
    pieces: [{ option: "Cream", left: 48, height: 84, rise: -86, tilt: 0, z: 1 }],
  },
};

// The photo for a hero piece: an option of a part (brush, razor…) or an item of a fixed-contents kit.
const pieceSrc = (p, pc, i) => pc.src || (pc.kit ? p.kitImage : pc.content ? p.contentImages[pc.content] : p.parts[i].images[pc.option]);

const isDesk = () => window.matchMedia("(min-width: 1024px)").matches;
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

// Desktop: the size of the left column that holds the open carton once the rows are shown. The 180x320 scene is
// scaled to the rows' height (capped), and the column is as wide as the scaled scene plus padding.
function fitFor(rowsHeight) {
  const h = Math.round(rowsHeight);
  const s = Math.min(Math.max((h - 24) / 320, 0.9), 1.9);
  return { h, s, m: (h - 320 * s) / 2, w: Math.round(180 * s + 24) };
}

// The carton scene (180x320, scaled by its parent). `settled`: open carton with its pieces risen, used for the
// desktop column after the sequence; otherwise the starting state the sequence animates.
function Scene({ p, hero, settled }) {
  return (
    <>
      <img
        data-hero="open"
        src={p.carton.open}
        alt=""
        className={clsx("absolute max-w-none mix-blend-multiply", !settled && "opacity-0")}
        style={place(hero.open, hero.body)}
      />
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: hero.body.y + 4 }}>
        {hero.pieces.map((pc, i) => (
          <img
            key={pc.option || pc.content || "kit"}
            data-hero={`piece-${i}`}
            src={pieceSrc(p, pc, i)}
            alt=""
            className="absolute w-auto max-w-none mix-blend-multiply"
            style={{
              left: pc.left,
              top: hero.body.y + 4,
              height: pc.height,
              zIndex: pc.z,
              transform: settled ? `translateY(${pc.rise}px) rotate(${pc.tilt}deg)` : undefined,
            }}
          />
        ))}
      </div>
      {/* Clipped to the carton body, so no white margin shows when it slides over a dark background */}
      {!settled && (
        <img
          data-hero="closed"
          src={p.carton.closed}
          alt=""
          className="absolute max-w-none"
          style={{ ...place(hero.closed, hero.closedBody || hero.body), clipPath: inset(hero.closed) }}
        />
      )}
    </>
  );
}

// The explorer's last frame (open carton with its pieces risen) as a still, scaled to fill its parent and cropped
// to the carton and pieces. Returns null for products without the open-the-box sequence.
export function KitSnapshot({ slug }) {
  const ref = useRef(null);
  const [s, setS] = useState(0);
  const hero = HEROES[slug];
  const p = amenityProducts.find((x) => x.slug === slug);
  // Vertical extent of the frame: highest risen piece (or the carton top) down to the carton bottom
  const top = Math.min(hero?.body.y ?? 0, ...(hero?.pieces || []).map((pc) => hero.body.y + 4 + pc.rise)) - 6;
  const h = (hero?.body.y ?? 0) + (hero?.body.h ?? 0) + 6 - top;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setS(Math.min(el.clientWidth / 180, el.clientHeight / h));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [h]);

  if (!hero || !p?.carton) return null;
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: 180, height: h, transform: `translate(-50%, -50%) scale(${s})`, visibility: s ? "visible" : "hidden" }}
      >
        <div className="absolute inset-x-0" style={{ top: -top, height: 320 }}>
          <Scene p={p} hero={hero} settled />
        </div>
      </div>
    </div>
  );
}

const centre = (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

// Pick an amenity, watch the kit open into its parts, varieties and packaging, and collect options for one enquiry.
// product: the enquiry form option to preselect. products/packaging/title: another range in the same format
// (the eco page); products without a HEROES entry show their rows straight away.
export default function KitExplorer({ product, products = amenityProducts, packaging = amenityPackaging, title = "Build your Amenity Kit" }) {
  const [slug, setSlug] = useState(products[0].slug);
  // intro: closed box waiting to play (server render) · play: sequence running · done: settled view
  const [phase, setPhase] = useState(ANIMATED.has(products[0].slug) ? "intro" : "done");
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState([]); // [{ key, slug, row, option }]
  const reduce = useRef(false);
  const token = useRef(0);
  const stageRef = useRef(null);
  const rowsRef = useRef(null);
  const chipsRef = useRef(null);
  const [fit, setFit] = useState(null); // desktop column size, see fitFor()
  const heroRef = useRef(null);

  const p = products.find((x) => x.slug === slug);
  const animated = ANIMATED.has(slug);
  const hero = HEROES[slug];
  const rows = rowsOf(p, packaging);
  const settled = phase === "done" || !animated;
  const still = !animated && Boolean(p.tile);

  // Deep link (#dental-kit), reduced motion, and play the first time the stage comes into view.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fromHash = products.find((x) => `#${x.slug}` === window.location.hash);
    if (fromHash) setSlug(fromHash.slug);
    const s = fromHash?.slug ?? slug;
    if (reduce.current || !ANIMATED.has(s)) {
      setPhase("done");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setPhase((ph) => (ph === "intro" ? "play" : ph));
        // Fetch the other animated kits' carton and hero pieces while idle, so tapping them starts at once.
        const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
        idle(() => {
          products
            .filter((x) => ANIMATED.has(x.slug) && x.slug !== s)
            .forEach((x) => {
              const urls = [x.carton.closed, x.carton.open, ...HEROES[x.slug].pieces.map((pc, i) => pieceSrc(x, pc, i))];
              urls.forEach((u) => (new Image().src = u));
            });
        });
      },
      { threshold: 0.35 }
    );
    io.observe(stageRef.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On phones the chip row scrolls sideways: keep the selected chip in view (deep links land on chips far along
  // the row). Scrolls the row only, never the page.
  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.querySelector('[aria-pressed="true"]');
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: reduce.current ? "auto" : "smooth" });
  }, [slug]);

  // Keyboard and screen readers skip the rows while they are hidden or moving.
  useEffect(() => {
    const el = rowsRef.current;
    if (!el) return;
    if (settled) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [settled]);

  // The sequence. Layout effect so the rows are hidden before the browser paints them.
  useLayoutEffect(() => {
    if (phase !== "play" || !animated) return;
    const t = ++token.current;
    const rowsEl = rowsRef.current;
    const hero = heroRef.current;
    const items = (id) => [...rowsEl.querySelectorAll(`[data-row="${id}"] [data-item]`)];
    const labels = [...rowsEl.querySelectorAll("[data-label]")];
    [...rowsEl.querySelectorAll("[data-item]"), ...labels].forEach((el) => (el.style.opacity = "0"));

    const q = (name) => hero.querySelector(`[data-hero="${name}"]`);
    const panel = q("panel");
    const closed = q("closed");
    const open = q("open");
    const H = HEROES[slug];
    // One rising piece per part: brush + paste, razor + gel, or a single comb.
    // Where each piece lands: every option card of its part, or (for contents) just its own card.
    const pieces = H.pieces.map((pc, i) => ({
      pc,
      el: q(`piece-${i}`),
      cards: () =>
        pc.kit ? items("contents") : pc.content ? [items("contents")[p.contents.indexOf(pc.content)]] : items(p.parts[i].id),
    }));
    const pieceEls = pieces.map((x) => x.el);
    // Part rows that no rising piece lands in: their cards fly out of the open carton instead.
    const covered = new Set(H.pieces.map((pc, i) => (pc.content || pc.kit ? null : p.parts[i]?.id)));
    const loose = (from) => (p.parts || []).filter((part) => !covered.has(part.id)).flatMap((part) => fan(items(part.id), from, 0.1));
    const alive = () => t === token.current;

    // Fly each option out of the hero piece it belongs to, one after another.
    const fan = (els, from, delay = 0) => {
      const o = centre(from);
      return els.map((el, i) => {
        const c = centre(el);
        return animate(el, { x: [o.x - c.x, 0], y: [o.y - c.y, 0], scale: [0.35, 1], opacity: [0, 1] }, { duration: 0.75, delay: delay + i * 0.07, ease });
      });
    };

    (async () => {
      animate(panel, { opacity: 0 }, { duration: 0 });
      animate(closed, { opacity: 0, scale: 0.92, x: 0, y: 0 }, { duration: 0 });
      animate(open, { opacity: 0 }, { duration: 0 });
      pieces.forEach(({ pc, el }) => animate(el, { opacity: 1, y: 0, scale: 1, rotate: pc.tilt }, { duration: 0 }));

      // Wait for the photos so nothing plays blank: the carton and its two pieces matter most (up to 4 s on a
      // slow connection); the option cards get a short grace period and fade in as they arrive.
      const ready = (els, ms) => Promise.race([Promise.all(els.map((im) => im.decode().catch(() => {}))), wait(ms)]);
      await ready([...hero.querySelectorAll("img")], 4000);
      if (!alive()) return;
      await ready([...rowsEl.querySelectorAll("img")], 800);
      if (!alive()) return;

      animate(panel, { opacity: 1 }, { duration: 0.3 });
      await animate(closed, { opacity: 1, scale: 1 }, { duration: 0.45, ease });
      if (!alive()) return;
      // The carton opens (closed and open photos crossfade), then its pieces rise out of it.
      animate(open, { opacity: 1 }, { duration: 0.3 });
      await animate(closed, { opacity: 0 }, { duration: 0.3, delay: 0.05 });
      if (!alive()) return;
      await Promise.all([
        ...pieces.map(({ pc, el }, i) => animate(el, { y: pc.rise }, { duration: 0.65, delay: i * 0.08, ease })),
      ]);
      if (!alive()) return;
      await wait(250);
      if (!alive()) return;

      // Desktop: the white stage, with the open carton and its pieces, slides left and shrinks into the column
      // beside the rows (as tall as they are). It stays there; the cards then fly out of it.
      if (isDesk()) {
        const f = fitFor(rowsEl.offsetHeight);
        setFit(f);
        await nextFrame();
        if (!alive()) return;
        const f2 = fitFor(rowsEl.offsetHeight); // rows re-measured at the new column width
        if (f2.w !== f.w) setFit(f2);
        await nextFrame();
        if (!alive()) return;
        const box = panel.firstElementChild;
        await Promise.all([
          animate(panel, { width: [panel.offsetWidth, f2.w], height: [panel.offsetHeight, f2.h] }, { duration: 0.75, ease }),
          animate(box, { scale: [1.65, f2.s], marginTop: [12, f2.m] }, { duration: 0.75, ease }),
        ]);
        if (!alive()) return;
        labels.forEach((el, i) => animate(el, { opacity: [0, 1] }, { duration: 0.4, delay: i * 0.12 }));
        const partsIn = [...pieces.flatMap(({ el, cards }, i) => fan(cards(), el, i * 0.15)), ...loose(open)];
        const packIn = fan(items("packaging"), open, 0.3);
        await Promise.all([...partsIn, ...packIn]);
        if (alive()) setPhase("done");
        return;
      }

      labels.forEach((el, i) => animate(el, { opacity: [0, 1] }, { duration: 0.4, delay: i * 0.15 }));
      const partsIn = [...pieces.flatMap(({ el, cards }, i) => fan(cards(), el, i * 0.15)), ...loose(open)];
      if (pieceEls.length) animate(pieceEls, { opacity: 0, scale: 0.6 }, { duration: 0.35, delay: 0.1 });

      // Phones: the carton closes, slides to the packaging row and splits into its six options.
      // The light panel (dark mode) goes first so it never sits over the cards flying in.
      animate(closed, { opacity: 1 }, { duration: 0.15 });
      animate(open, { opacity: 0 }, { duration: 0.15, delay: 0.05 });
      animate(panel, { opacity: 0 }, { duration: 0.3, delay: 0.15 });
      const packRow = rowsEl.querySelector('[data-row="packaging"] [data-options]');
      if (!packRow) {
        animate(closed, { opacity: 0, scale: 0.6 }, { duration: 0.4, delay: 0.1 });
        await Promise.all(partsIn);
        if (alive()) setPhase("done");
        return;
      }
      const b = centre(closed);
      const r = centre(packRow);
      await animate(closed, { x: r.x - b.x, y: r.y - b.y, scale: 0.8 }, { duration: 0.6, delay: 0.25, ease });
      if (!alive()) return;
      const packIn = fan(items("packaging"), closed);
      animate(closed, { opacity: 0, scale: 0.4 }, { duration: 0.35, delay: 0.05 });

      await Promise.all([...partsIn, ...packIn]);
      if (alive()) setPhase("done");
    })();

    return () => {
      token.current++;
    };
  }, [phase, run, animated, slug]);

  // After the sequence (or when skipping it), clear any inline styles it left on the rows. On desktop the carton
  // stays in its column: put it back, closed, and fade it in (phones hide it once the sequence is done).
  useLayoutEffect(() => {
    if (phase !== "done" || !animated || !rowsRef.current || !isDesk()) return;
    const f = fitFor(rowsRef.current.offsetHeight);
    setFit((old) => (old && Math.abs(old.h - f.h) < 8 ? old : f));
  }, [phase, slug, animated]);

  useLayoutEffect(() => {
    if (phase !== "done" || !rowsRef.current) return;
    rowsRef.current.querySelectorAll("[data-item], [data-label]").forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    const hero = heroRef.current;
    if (!hero) return;
    // Reset through motion itself: it keeps its own transform values, so clearing the style is not enough.
    const q = (name) => hero.querySelector(`[data-hero="${name}"]`);
    const pieceEls = [...hero.querySelectorAll('[data-hero^="piece-"]')];
    animate(q("panel"), { opacity: 1 }, { duration: 0 });
    animate(q("open"), { opacity: 0 }, { duration: 0 });
    if (pieceEls.length) animate(pieceEls, { opacity: 1, x: 0, y: 0, scale: 1 }, { duration: 0 });
    const closed = q("closed");
    animate(closed, { x: 0, y: 0 }, { duration: 0 });
    if (reduce.current) animate(closed, { opacity: 1, scale: 1 }, { duration: 0 });
    else animate(closed, { opacity: [0, 1], scale: [0.94, 1] }, { duration: 0.45, ease });
  }, [phase, slug]);

  const choose = (s) => {
    setSlug(s);
    history.replaceState(null, "", `#${s}`);
    if (ANIMATED.has(s) && !reduce.current) {
      setPhase("play");
      setRun((n) => n + 1);
    } else {
      token.current++;
      setPhase("done");
    }
  };
  const replay = () => {
    setPhase("play");
    setRun((n) => n + 1);
  };

  const keyOf = (row, option) => `${slug}|${row}|${option}`;
  const isPicked = (key) => picked.some((x) => x.key === key);
  const toggle = (row, option) => {
    const key = keyOf(row, option);
    setPicked((list) => (list.some((x) => x.key === key) ? list.filter((x) => x.key !== key) : [...list, { key, slug, row, option }]));
  };

  // "Dental Kit (Brush: Bamboo, White; Packaging: Kraft Board Boxes); Care Kit"
  const pickedText = products
    .filter((x) => picked.some((k) => k.slug === x.slug))
    .map((x) => {
      const mine = picked.filter((k) => k.slug === x.slug && k.row !== "kit");
      const byRow = [...new Set(mine.map((k) => k.row))].map((row) => `${row}: ${mine.filter((k) => k.row === row).map((k) => k.option).join(", ")}`);
      return byRow.length ? `${x.name} (${byRow.join("; ")})` : x.name;
    })
    .join("; ");
  const enquireHref = `/contact?product=${encodeURIComponent(product)}&range=${encodeURIComponent(pickedText)}#enquiry`;
  const kitKey = keyOf("kit", p.name);

  return (
    <section ref={stageRef} className="container-x scroll-mt-24" aria-labelledby="explorer-title">
      {/* Without JavaScript the sequence never plays, so show the settled view */}
      <noscript>
        <style>{`.kx-rows{opacity:1!important}.kx-hero{display:none}.kx-stage{display:block!important}`}</style>
      </noscript>
      {/* Deep-link targets: /products/amenity-kits#dental-kit lands here, even without JavaScript */}
      {products.map((x) => (
        <span key={x.slug} id={x.slug} className="block scroll-mt-28" aria-hidden="true" />
      ))}
      <h2 id="explorer-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted">{products.length > 1 ? "Pick a product. " : ""}Tap the options you want, then send them to us in one enquiry.</p>

      {/* A single-product page (/products/amenity-kits/dental-kit) needs no product chips */}
      <div ref={chipsRef} style={products.length < 2 ? { display: "none" } : undefined} role="group" aria-label="Choose an amenity" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {products.map((x) => (
          <button
            key={x.slug}
            type="button"
            onClick={() => choose(x.slug)}
            aria-pressed={x.slug === slug}
            className={clsx(
              "shrink-0 rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]",
              x.slug === slug ? "bg-accent text-accent-ink ring-accent" : "bg-surface ring-line/15 hover:bg-ink/[0.05]"
            )}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="shell mt-4">
        <div className="core p-3.5 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div aria-live="polite">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{p.name}</h3>
              {amenityLine(p) && <p className="mt-1 text-[15px] text-muted">{amenityLine(p)}</p>}
            </div>
            {animated && (
              <div className="flex items-center gap-2">
                {phase === "done" && !reduce.current && (
                  <button type="button" onClick={replay} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-muted ring-1 ring-line/15 hover:text-ink">
                    <ArrowCounterClockwise size={14} aria-hidden="true" /> Replay
                  </button>
                )}
              </div>
            )}
          </div>

          <div
            data-phase={animated ? phase : "done"}
            style={{ "--kx-col": `${fit?.w ?? 260}px` }}
            className={clsx(
              "kx-stage relative mt-6",
              animated && "lg:grid lg:grid-cols-[var(--kx-col)_minmax(0,1fr)] lg:gap-12",
              still && "lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12",
              // room for the full-width stage while the sequence plays, even for kits with few rows
              animated && phase !== "done" && "min-h-[320px] lg:min-h-[560px]"
            )}
          >
            {/* The carton and its pieces, played over the whole stage. Decorative: the rows carry all the content.
                Photos have white backgrounds, so they multiply onto a light panel (visible only in dark mode). */}
            {animated && phase !== "done" && (
              <div ref={heroRef} data-phase={phase} className="kx-hero pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center lg:justify-start" aria-hidden="true">
                {/* Full-width stage in pure white, the same white as the photos' own backgrounds, so no photo edge shows
                    (the scaled box below is its own layer, so the photos cannot blend into a tinted background). */}
                <div data-hero="panel" className="flex h-[320px] w-full justify-center overflow-hidden rounded-3xl bg-white lg:h-[560px]">
                <div className="relative h-[320px] w-[180px] shrink-0 origin-top lg:mt-3 lg:scale-[1.65]">
                  <Scene p={p} hero={hero} />
                </div>
                </div>
              </div>
            )}

            {/* Desktop: the open carton with its contents stands beside the rows, as tall as they are. It takes over
                exactly where the sequence leaves the shrunken stage. Absolutely placed, so it never stretches the rows. */}
            {animated && (
              <div className="relative hidden lg:block" aria-hidden="true">
                {phase === "done" && fit && (
                  <div className="absolute inset-x-0 top-0 flex justify-center overflow-hidden rounded-3xl bg-white" style={{ height: fit.h }}>
                    <div className="relative h-[320px] w-[180px] shrink-0 origin-top" style={{ transform: `scale(${fit.s})`, marginTop: fit.m }}>
                      <Scene p={p} hero={hero} settled />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Still kits (eco range): one photo of the pack with its contents, beside the rows on desktop, above them on
                phones. Decorative: the rows carry the content. */}
            {still && (
              <div key={`photo-${slug}`} className="anim-swap mb-5 lg:mb-0" aria-hidden="true">
                <div className="flex h-52 items-center justify-center overflow-hidden rounded-3xl bg-white sm:h-64 lg:sticky lg:top-28 lg:aspect-square lg:h-auto">
                  <img src={p.tile} alt="" decoding="async" className="h-full w-full object-contain p-3" />
                </div>
              </div>
            )}

            <div ref={rowsRef} key={animated ? "rows" : `rows-${slug}`} data-phase={animated ? phase : "done"} className={clsx("kx-rows lg:self-start space-y-5 sm:space-y-6", !animated && "anim-swap")} style={animated && phase === "intro" ? { opacity: 0 } : undefined}>
              {/* Example kits (shown, not chosen) for kits whose contents are made to order */}
              {p.examples && (
                <div data-row="examples">
                  <h4 className="sr-only">Example kits</h4>
                  <ul className="grid max-w-3xl grid-cols-2 gap-2">
                    {p.examples.map((ex) => (
                      <li key={ex.src} className="flex flex-col items-center gap-1.5 rounded-xl bg-surface p-1.5 ring-1 ring-line/10 sm:gap-2 sm:rounded-2xl sm:p-2">
                        <span className="flex h-[120px] w-full items-center justify-center rounded-lg dark:bg-[#EEF0ED] sm:h-[190px]">
                          <img src={ex.src} alt={ex.label} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain p-1 mix-blend-multiply" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.contents && !p.onRequest && (
                <div data-row="contents">
                  <h4 data-label className="text-[13px] font-semibold uppercase tracking-wide text-accent">
                    In the kit
                  </h4>
                  {p.kitImage ? (
                    // Everything comes mounted on one card: one photo, with the item list beside it
                    <div className="mt-2 flex max-w-3xl items-center gap-3 sm:gap-5">
                      <ul data-options className="w-[34%] shrink-0 sm:w-40">
                        <li data-item className="flex flex-col items-center rounded-xl bg-surface p-1.5 ring-1 ring-line/10 sm:rounded-2xl sm:p-2">
                          <span className="flex h-[120px] w-full items-center justify-center rounded-lg dark:bg-[#EEF0ED] sm:h-[150px]">
                            <img src={p.kitImage} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain p-1 mix-blend-multiply" />
                          </span>
                        </li>
                      </ul>
                      <ul data-label className="flex flex-wrap gap-2">
                        {p.contents.map((it) => (
                          <li key={it} className="rounded-full bg-sunk px-3.5 py-1.5 text-[14px]">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : p.contentImages ? (
                    // Fixed contents: shown, not chosen, so these cards are not buttons
                    <ul data-options className="mt-2 grid max-w-3xl grid-cols-3 gap-1 sm:grid-cols-5 sm:gap-2">
                      {p.contents.map((it) => (
                        <li key={it} data-item className="flex flex-col items-center gap-1.5 rounded-xl bg-surface px-0.5 pb-2 pt-2.5 ring-1 ring-line/10 sm:gap-2 sm:rounded-2xl sm:px-1 sm:pb-2.5 sm:pt-3">
                          <span className="flex h-[84px] w-full items-center justify-center rounded-lg dark:bg-[#EEF0ED] sm:h-[120px]">
                            <img src={p.contentImages[it]} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain px-1 py-1 mix-blend-multiply" />
                          </span>
                          <span className="w-full text-center text-[11px] leading-tight sm:text-[13px]">{it}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul data-label className="mt-2 flex flex-wrap gap-2">
                      {p.contents.map((it) => (
                        <li key={it} className="rounded-full bg-sunk px-3.5 py-1.5 text-[14px]">
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {(p.pattern === "C" || p.onRequest) && (
                <button
                  type="button"
                  data-label
                  onClick={() => toggle("kit", p.name)}
                  aria-pressed={isPicked(kitKey)}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 transition-colors",
                    isPicked(kitKey) ? "bg-accent-soft text-accent ring-2 ring-accent" : "ring-line/15 hover:bg-ink/[0.05]"
                  )}
                >
                  <Check size={16} weight="bold" className={isPicked(kitKey) ? "anim-pop" : "opacity-30"} aria-hidden="true" />
                  Add {p.name.toLowerCase()} to enquiry
                </button>
              )}

              {rows.map((row) => {
                // Photo cards for animated kits, and for any row that already has photos
                const card = animated || Boolean(row.images);
                const Shape = SHAPES[row.id];
                return (
                  <div key={row.id} data-row={row.id} role="group" aria-labelledby={`kx-${row.id}`}>
                    <h4 id={`kx-${row.id}`} data-label className={row.hideLabel ? "sr-only" : "text-[13px] font-semibold uppercase tracking-wide text-accent"}>
                      {row.label}
                    </h4>
                    <ul
                      data-options
                      className={clsx(
                        "mt-2",
                        card && "max-w-3xl",
                        card
                          ? clsx("grid gap-1 sm:gap-2", row.options.length > 5 ? "grid-cols-3 sm:grid-cols-6" : row.options.length === 4 ? "grid-cols-4" : row.options.length <= 3 ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-5")
                          : "flex flex-wrap gap-2"
                      )}
                    >
                      {row.options.map((opt) => {
                        const on = isPicked(keyOf(row.label, opt));
                        return (
                          <li key={opt} data-item>
                            <button
                              type="button"
                              onClick={() => toggle(row.label, opt)}
                              aria-pressed={on}
                              className={clsx(
                                "relative ring-1 transition-[box-shadow,background-color,transform] duration-150 ease-out active:scale-[0.97]",
                                card ? "flex h-full w-full flex-col items-center gap-1.5 rounded-xl px-0.5 pb-2 pt-2.5 sm:gap-2 sm:rounded-2xl sm:px-1 sm:pb-2.5 sm:pt-3" : "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px]",
                                on ? "bg-accent-soft ring-2 ring-accent" : "bg-surface ring-line/10 hover:ring-line/25"
                              )}
                            >
                              {card ? (
                                <>
                                  {row.images?.[opt] ? (
                                    // Photo on a white background: multiplied onto the card, on a light well in dark mode
                                    <span className="flex h-[84px] w-full items-center justify-center rounded-lg dark:bg-[#EEF0ED] sm:h-[120px]">
                                      <img src={row.images[opt]} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain px-1 py-1 mix-blend-multiply" />
                                    </span>
                                  ) : Shape ? (
                                    <span className="flex h-[56px] w-full items-center justify-center sm:h-[88px]">
                                      <Shape variant={opt} className={row.id === "packaging" ? "h-11 w-11 sm:h-16 sm:w-16" : "h-full w-auto"} />
                                    </span>
                                  ) : (
                                    <span className="flex h-[84px] w-full items-center justify-center rounded-lg bg-sunk text-[11px] text-muted sm:h-[120px]">Photo soon</span>
                                  )}
                                  <span className="w-full text-center text-[11px] leading-tight sm:text-[13px]">{soft(opt)}</span>
                                  <span
                                    className={clsx(
                                      "absolute right-1 top-1 flex h-[18px] w-[18px] sm:right-1.5 sm:top-1.5 sm:h-5 sm:w-5 items-center justify-center rounded-full ring-1 transition-colors",
                                      on ? "bg-accent text-accent-ink ring-accent" : "bg-surface text-transparent ring-line/20"
                                    )}
                                    aria-hidden="true"
                                  >
                                    <Check size={12} weight="bold" className={on ? "anim-pop" : ""} />
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Check size={16} weight="bold" className={on ? "anim-pop text-accent" : "opacity-25"} aria-hidden="true" />
                                  {opt}
                                </>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry tray (same pattern as the housekeeping catalogue) */}
      {picked.length > 0 && (
        <div className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-2xl md:bottom-6" role="region" aria-label="Selected options">
          <div className="anim-tray flex items-center gap-2 rounded-full bg-[#131816] p-2 pl-4 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:gap-3 sm:p-3 sm:pl-5">
            <p className="mr-auto flex items-center gap-1 whitespace-nowrap text-[14px] sm:text-[15px]">
              <span className="font-semibold">{picked.length}</span> selected
              <button type="button" onClick={() => setPicked([])} aria-label="Clear selection" className="ml-2 inline-flex items-center gap-1 text-white/60 hover:text-white sm:ml-3">
                <X size={14} aria-hidden="true" /> <span className="hidden sm:inline">Clear</span>
              </button>
            </p>
            <a
              href={whatsappLink(`Hi, I'd like a quote for: ${pickedText}`)}
              target="_blank"
              rel="noopener"
              aria-label="Send selection on WhatsApp"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 p-2.5 text-[14px] font-medium ring-1 ring-white/20 hover:bg-white/20 sm:px-4"
            >
              <WhatsappLogo size={16} aria-hidden="true" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link href={enquireHref} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#5CBF9C] px-4 py-2.5 text-[14px] font-medium text-[#0C0F0E] hover:bg-[#5CBF9C]/90 sm:px-5">
              Enquire <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
