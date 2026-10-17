"use client";

import { useEffect, useId, useRef, useState } from "react";
import { UploadSimple, DownloadSimple, ArrowRight, X, WhatsappLogo, Eyedropper, Palette } from "@phosphor-icons/react";
import clsx from "clsx";
import ButtonLink from "./Button";
import { ProductScene, VIEWS } from "./BrandingMockups";
import { whatsappLink } from "@/lib/site";
import { readFile, loadImage, toCanvas, toHex, detectBackground, removeBackground, swatchFromHex } from "@/lib/logoTools";

const WATERMARK = "/amaravati-logo-transparent.png"; // stamped on downloaded previews
const PNG_NAME = "amaravati-branding-preview.png";

// Preset label colours. ink = text colour that stays readable on the label.
const SWATCHES = [
  { name: "White", label: "#FFFFFF", ink: "#1B211E", side: "#E3E7E4", top: "#F4F6F5" },
  { name: "Forest", label: "#0E5A47", ink: "#F3F7F5", side: "#0A4436", top: "#16705A" },
  { name: "Charcoal", label: "#24292B", ink: "#F3F5F4", side: "#16191A", top: "#33393C" },
  { name: "Navy", label: "#1C2F5A", ink: "#F2F5FA", side: "#132243", top: "#28407A" },
  { name: "Maroon", label: "#6B1E2C", ink: "#FAF2F3", side: "#4F1520", top: "#852A3A" },
  { name: "Sand", label: "#E6D8BF", ink: "#2A241A", side: "#CDBD9F", top: "#F0E6D4" },
];

const MAX_BYTES = 5 * 1024 * 1024;

export default function BrandingPreview() {
  const uid = useId().replace(/:/g, "");
  const [file, setFile] = useState(null);
  const [source, setSource] = useState(null); // { canvas, isSvg, url } original logo
  const [logo, setLogo] = useState(null); // processed data URL shown on products
  const [bgColor, setBgColor] = useState(null); // detected background [r,g,b]
  const [name, setName] = useState("");
  const [swatch, setSwatch] = useState(SWATCHES[0]);
  const [scale, setScale] = useState(0.9);
  const [removeBg, setRemoveBg] = useState(true);
  const [tolerance, setTolerance] = useState(45);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("");
  const [hasEyeDropper, setHasEyeDropper] = useState(false);
  const sceneRef = useRef(null);
  const [view, setView] = useState("all");
  const inputRef = useRef(null);
  const pickRef = useRef(null);

  useEffect(() => setHasEyeDropper(typeof window !== "undefined" && "EyeDropper" in window), []);

  // Re-process the logo whenever the source or removal settings change.
  useEffect(() => {
    if (!source) return;
    if (source.isSvg) {
      setLogo(source.url);
      return;
    }
    const c = document.createElement("canvas");
    c.width = source.canvas.width;
    c.height = source.canvas.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(source.canvas, 0, 0);
    if (removeBg && bgColor) {
      const d = ctx.getImageData(0, 0, c.width, c.height);
      ctx.putImageData(removeBackground(d, bgColor, tolerance), 0, 0);
    }
    setLogo(c.toDataURL("image/png"));
  }, [source, removeBg, tolerance, bgColor]);

  // Draw the original logo into the picker canvas.
  useEffect(() => {
    const el = pickRef.current;
    if (!el || !source) return;
    el.width = source.canvas.width;
    el.height = source.canvas.height;
    el.getContext("2d").drawImage(source.canvas, 0, 0);
  }, [source, picking]);

  async function load(f) {
    setError("");
    if (!f) return;
    if (!/^image\/(png|jpe?g|webp|svg\+xml)$/.test(f.type)) {
      setError("Please choose a PNG, JPG, WebP or SVG file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("That file is over 5 MB. Please choose a smaller logo file.");
      return;
    }
    try {
      const url = await readFile(f);
      const img = await loadImage(url);
      const canvas = toCanvas(img);
      const isSvg = f.type === "image/svg+xml";
      const d = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
      const bg = detectBackground(d.data, canvas.width, canvas.height);
      setFile(f);
      setBgColor(bg);
      setSource({ canvas, isSvg, url });
      setStatus(bg ? `Logo added. Background colour ${toHex(...bg)} detected.` : "Logo added.");
    } catch {
      setError("We couldn't read that file. Please try another image.");
    }
  }

  function clear() {
    setFile(null);
    setSource(null);
    setLogo(null);
    setBgColor(null);
    setPicking(false);
    setStatus("Logo removed");
    if (inputRef.current) inputRef.current.value = "";
  }

  function applyColor(hex, label = "Custom") {
    setSwatch(swatchFromHex(hex, label));
    setStatus(`Label colour set to ${hex}`);
  }

  function pickFromLogo(e) {
    const el = pickRef.current;
    const rect = el.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * el.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * el.height);
    const [r, g, b, a] = el.getContext("2d").getImageData(x, y, 1, 1).data;
    if (a < 20) {
      setStatus("That spot is transparent. Pick a coloured part of the logo.");
      return;
    }
    applyColor(toHex(r, g, b), "From your logo");
    setPicking(false);
  }

  async function pickFromScreen() {
    try {
      const res = await new window.EyeDropper().open();
      applyColor(res.sRGBHex.toUpperCase(), "Picked colour");
    } catch {
      /* cancelled */
    }
  }

  // Product photos must be embedded as data URLs: an SVG drawn into a canvas cannot load other files.
  async function toDataUrl(url) {
    const blob = await (await fetch(url)).blob();
    return readFile(blob);
  }

  // Render the current scene to a watermarked 1600 x 1200 PNG. Resolves to a Blob, or null on failure.
  async function renderPng() {
    const el = sceneRef.current;
    if (!el) return null;
    let markup = new XMLSerializer().serializeToString(el);
    // Embed every product photo the scene uses, and the Amaravati logo it carries.
    const srcs = [...new Set([...markup.matchAll(/href="(\/images\/branding-tool\/[^"]+|\/amaravati-logo[^"]*)"/g)].map((m) => m[1]))];
    try {
      const datas = await Promise.all(srcs.map(toDataUrl));
      srcs.forEach((s, i) => {
        markup = markup.split(`"${s}"`).join(`"${datas[i]}"`);
      });
    } catch {
      setError("The preview could not be saved in this browser. Please take a screenshot instead.");
      return null;
    }
    // Fit the scene into a 1600 x 1200 canvas with a margin and a footer line.
    const [, , vw, vh] = el.getAttribute("viewBox").split(" ").map(Number);
    const CW = 1600;
    const CH = 1200;
    const s = Math.min((CW - 160) / vw, (CH - 200) / vh);
    const w = vw * s;
    const h = vh * s;
    const scene = markup.replace("<svg", `<svg x="${(CW - w) / 2}" y="${(CH - 80 - h) / 2}" width="${w}" height="${h}"`);
    const composite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" fill="#EEF1EF"/>${scene}<text x="800" y="1150" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#5A635E">Preview by Amaravati Enterprises, Hyderabad. Final artwork is shared for approval before printing.</text></svg>`;
    return new Promise((resolve) => {
    const img = new Image();
    img.onload = async () => {
      const c = document.createElement("canvas");
      c.width = CW;
      c.height = CH;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, CW, CH);
      // Watermark the download (only the saved image, never the on-page preview):
      // a large faint mark across the centre. The scene itself carries the clear logo in its corner.
      try {
        const mark = await loadImage(WATERMARK);
        const ratio = mark.height / mark.width;
        ctx.globalAlpha = 0.09;
        const bw = 900;
        ctx.drawImage(mark, (CW - bw) / 2, (CH - 80 - bw * ratio) / 2, bw, bw * ratio);
        ctx.globalAlpha = 1;
      } catch {
        // If the logo cannot load, still save the preview.
      }
      c.toBlob((blob) => resolve(blob), "image/png");
    };
    img.onerror = () => {
      setError("The preview could not be saved in this browser. Please take a screenshot instead.");
      resolve(null);
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(composite);
    });
  }

  function saveBlob(blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = PNG_NAME;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // Phones save downloads to Files/Downloads, not the photo gallery. On phones we show the finished image
  // in a sheet instead, with the phone's own "Save Image" (share sheet) and long-press, which both go to Photos.
  const isPhone = () => window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(max-width: 1024px)").matches;
  const [sheet, setSheet] = useState(null); // { url, blob, whatsapp }
  useEffect(() => () => sheet && URL.revokeObjectURL(sheet.url), [sheet]);

  async function saveToPhotos() {
    if (!sheet) return;
    const file = new File([sheet.blob], PNG_NAME, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        window.posthog?.capture?.("branding_preview_saved_to_photos");
        return;
      } catch (e) {
        if (e?.name === "AbortError") return;
      }
    }
    saveBlob(sheet.blob); // no share sheet: fall back to a normal download
  }

  const whatsappMessage = () => `Hi, I designed my amenities with the branding preview on your website. Please quote for ${hotel}. Attaching my design.`;

  async function download() {
    const blob = await renderPng();
    if (!blob) return;
    if (isPhone()) {
      setSheet({ url: URL.createObjectURL(blob), blob, whatsapp: false });
    } else {
      saveBlob(blob);
    }
    window.posthog?.capture?.("branding_preview_downloaded");
  }

  // Send the design to us on WhatsApp. Computers: the image downloads and our chat opens with a message.
  // Phones: the sheet lets them save the image to Photos first, then open the chat and attach it from the gallery.
  async function sendOnWhatsApp() {
    if (isPhone()) {
      const blob = await renderPng();
      if (!blob) return;
      setSheet({ url: URL.createObjectURL(blob), blob, whatsapp: true });
      return;
    }
    // Open the chat window now, while the click still counts, so the browser does not block it.
    const chat = window.open("", "_blank");
    const blob = await renderPng();
    if (!blob) {
      chat?.close();
      return;
    }
    saveBlob(blob);
    const link = whatsappLink(whatsappMessage());
    if (chat) chat.location.href = link;
    else window.location.href = link;
    window.posthog?.capture?.("branding_preview_whatsapp");
  }

  const hotel = name.trim() || "my hotel";
  const bgHex = bgColor ? toHex(...bgColor) : null;
  const isPreset = SWATCHES.some((s) => s.label === swatch.label);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Stage */}
      <div className="shell lg:col-span-7">
        <div className="core relative flex h-full flex-col overflow-hidden bg-sunk">
          <div className="flex flex-wrap gap-2 p-4 sm:p-5" role="group" aria-label="Choose products to preview">
            {Object.entries(VIEWS).map(([key, v]) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={clsx(
                  "rounded-full px-3.5 py-2 text-[13px] ring-1 transition-colors duration-300",
                  view === key ? "bg-ink text-bg ring-ink" : "bg-surface text-ink ring-line/15 hover:ring-line/30"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center px-4 pb-2 sm:px-8">
            <div className={clsx("w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.16)]", view === "small" || view === "bottles" ? "max-w-[460px]" : "max-w-[620px]")}>
              <ProductScene view={view} sw={swatch} logo={logo} name={name} scale={scale} svgRef={sceneRef} />
            </div>
          </div>
          <p className="px-6 pb-5 pt-4 text-center text-[13px] text-muted">
            {view === "all" ? "Shown at true relative size. " : ""}Preview only. Final artwork is shared for your approval before printing.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="lg:col-span-5">
        <div className="shell h-full">
          <div className="core flex h-full flex-col gap-7 p-6 sm:p-8">
            <div>
              <p className="mb-3 text-sm font-medium" id={`${uid}-logo-label`}>
                Your logo
              </p>
              {source ? (
                <div className="flex items-center gap-4 rounded-field bg-bg p-3 ring-1 ring-line/10">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[repeating-conic-gradient(#D9DEDB_0_25%,#FFFFFF_0_50%)] bg-[length:12px_12px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {logo && <img src={logo} alt="" className="max-h-12 max-w-12 object-contain" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[15px]">{file?.name}</span>
                  <button type="button" onClick={clear} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/[0.06]" aria-label="Remove logo">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    load(e.dataTransfer.files?.[0]);
                  }}
                  className={clsx(
                    "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-field border-2 border-dashed px-4 py-8 text-center transition-colors duration-300",
                    dragging ? "border-accent bg-accent-soft" : "border-line/20 bg-bg hover:border-accent/60"
                  )}
                >
                  <UploadSimple size={26} weight="light" className="text-accent" aria-hidden="true" />
                  <span className="font-medium">Upload your logo</span>
                  <span className="text-[13px] text-muted">PNG, JPG, WebP or SVG, up to 5 MB</span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="sr-only"
                    aria-labelledby={`${uid}-logo-label`}
                    onChange={(e) => load(e.target.files?.[0])}
                  />
                </label>
              )}
              {error && (
                <p className="mt-2 text-[13px] text-[#B42318] dark:text-[#FDA29B]" role="alert">
                  {error}
                </p>
              )}
              <p className="sr-only" aria-live="polite">
                {status}
              </p>
            </div>

            {!source && (
              <div>
                <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">
                  No file handy? Type your hotel name
                </label>
                <input
                  id={`${uid}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={28}
                  placeholder="Your Hotel"
                  className="w-full rounded-field bg-bg px-4 py-3.5 text-[15px] ring-1 ring-line/15 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            )}

            {/* Background removal */}
            {source && !source.isSvg && (
              <div className="grid gap-4 rounded-field bg-bg p-4 ring-1 ring-line/10">
                <label className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium">
                  <span className="flex items-center gap-2.5">
                    Remove logo background
                    {bgHex && <span className="h-4 w-4 rounded-full ring-1 ring-line/20" style={{ backgroundColor: bgHex }} title={`Detected background ${bgHex}`} aria-hidden="true" />}
                  </span>
                  <input type="checkbox" checked={removeBg} disabled={!bgColor} onChange={(e) => setRemoveBg(e.target.checked)} className="h-5 w-5 accent-[rgb(var(--accent))]" />
                </label>
                {!bgColor && <p className="text-[13px] text-muted">Your logo already has a transparent background.</p>}
                {bgColor && removeBg && (
                  <div>
                    <label htmlFor={`${uid}-tol`} className="mb-2 flex justify-between text-[13px] text-muted">
                      Removal strength <span>{tolerance}</span>
                    </label>
                    <input id={`${uid}-tol`} type="range" min="10" max="140" step="5" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="w-full accent-[rgb(var(--accent))]" />
                  </div>
                )}
              </div>
            )}

            {/* Label colour */}
            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                Label colour: <span className="font-normal text-muted">{isPreset ? swatch.name : `${swatch.name} ${swatch.label}`}</span>
              </legend>
              <div className="flex flex-wrap items-center gap-2.5">
                {SWATCHES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSwatch(s)}
                    aria-pressed={swatch.label === s.label}
                    aria-label={s.name}
                    className={clsx(
                      "h-10 w-10 rounded-full ring-1 ring-line/20 transition-transform duration-300 ease-snap",
                      swatch.label === s.label ? "scale-110 outline outline-2 outline-offset-2 outline-accent" : "hover:scale-105"
                    )}
                    style={{ backgroundColor: s.label }}
                  />
                ))}
                {bgHex && (
                  <button
                    type="button"
                    onClick={() => applyColor(bgHex, "Logo background")}
                    aria-pressed={swatch.label === bgHex}
                    className={clsx(
                      "flex h-10 items-center gap-2 rounded-full py-1 pl-1 pr-3.5 text-[13px] ring-1 ring-line/20 transition-transform duration-300 ease-snap",
                      swatch.label === bgHex ? "outline outline-2 outline-offset-2 outline-accent" : "hover:scale-[1.03]"
                    )}
                  >
                    <span className="h-8 w-8 rounded-full ring-1 ring-line/20" style={{ backgroundColor: bgHex }} aria-hidden="true" />
                    From your logo
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <label className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-bg px-3.5 py-2 text-[13px] ring-1 ring-line/15 hover:ring-line/30">
                  <Palette size={16} aria-hidden="true" />
                  Custom colour
                  <input type="color" value={swatch.label.toLowerCase()} onChange={(e) => applyColor(e.target.value.toUpperCase())} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Choose a custom label colour" />
                </label>
                {source && (
                  <button type="button" onClick={() => setPicking((v) => !v)} aria-pressed={picking} className={clsx("inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] ring-1", picking ? "bg-accent text-accent-ink ring-accent" : "bg-bg ring-line/15 hover:ring-line/30")}>
                    <Eyedropper size={16} aria-hidden="true" />
                    Pick from logo
                  </button>
                )}
                {hasEyeDropper && (
                  <button type="button" onClick={pickFromScreen} className="inline-flex items-center gap-2 rounded-full bg-bg px-3.5 py-2 text-[13px] ring-1 ring-line/15 hover:ring-line/30">
                    <Eyedropper size={16} aria-hidden="true" />
                    Pick from screen
                  </button>
                )}
              </div>

              {picking && source && (
                <div className="mt-3 rounded-field bg-[repeating-conic-gradient(#D9DEDB_0_25%,#FFFFFF_0_50%)] bg-[length:16px_16px] p-3 ring-1 ring-line/15">
                  <p className="mb-2 text-[13px] text-[#3D4642]">Click any colour in your logo.</p>
                  <canvas ref={pickRef} onClick={pickFromLogo} className="mx-auto block max-h-48 max-w-full cursor-crosshair object-contain" aria-label="Your logo. Click a colour to use it for the label." />
                </div>
              )}
            </fieldset>

            {source && (
              <div>
                <label htmlFor={`${uid}-size`} className="mb-2 flex justify-between text-sm font-medium">
                  Logo size <span className="font-normal text-muted">{Math.round(scale * 100)}%</span>
                </label>
                <input id={`${uid}-size`} type="range" min="0.5" max="1" step="0.05" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full accent-[rgb(var(--accent))]" />
              </div>
            )}

            <p className="text-[13px] text-muted">Your logo stays on your device. Nothing is uploaded until you choose to send it to us.</p>

            <div className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ButtonLink href="/contact?product=Custom%20branding#enquiry" icon={ArrowRight} className="justify-between">
                Get a quote
              </ButtonLink>
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink/[0.05] px-6 py-3 text-[15px] font-medium ring-1 ring-line/10 transition-transform duration-500 ease-snap hover:bg-ink/[0.08] active:scale-[0.98]"
              >
                <DownloadSimple size={18} aria-hidden="true" /> Download preview
              </button>
            </div>
            <button
              type="button"
              onClick={sendOnWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] font-medium text-[#0B2A17] transition-[transform,background-color] duration-500 ease-snap hover:bg-[#25D366]/90 active:scale-[0.98]"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" /> Send this design to us on WhatsApp
            </button>
            <a
              href={whatsappLink(`Hi, I tried the branding preview on your website. I'd like branded amenities for ${hotel}. I'll attach my logo here.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="-mt-3 inline-flex items-center justify-center gap-2 text-[14px] text-muted hover:text-ink"
            >
              <WhatsappLogo size={16} aria-hidden="true" /> Or send your logo on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Phone save sheet: the finished design, saved to Photos via the phone's own share sheet or long-press */}
      {sheet && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label="Your design">
          <div className="w-full max-w-md rounded-[1.75rem] bg-surface p-4 text-ink shadow-2xl ring-1 ring-line/10">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[15px] font-semibold">{sheet.whatsapp ? "Send your design" : "Your design"}</p>
              <button type="button" onClick={() => setSheet(null)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.06]">
                <X size={16} />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sheet.url} alt="Your branded amenities design" className="w-full rounded-2xl ring-1 ring-line/10" />
            <p className="mt-2 text-center text-[13px] text-muted">Or press and hold the image and choose Save to Photos.</p>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={saveToPhotos}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] font-medium text-bg active:scale-[0.98]"
              >
                <DownloadSimple size={18} aria-hidden="true" /> {sheet.whatsapp ? "1. Save to Photos" : "Save to Photos"}
              </button>
              {sheet.whatsapp && (
                <a
                  href={whatsappLink(whatsappMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.posthog?.capture?.("branding_preview_whatsapp")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-[15px] font-medium text-[#0B2A17] active:scale-[0.98]"
                >
                  <WhatsappLogo size={18} weight="fill" aria-hidden="true" /> 2. Open WhatsApp and attach it
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
