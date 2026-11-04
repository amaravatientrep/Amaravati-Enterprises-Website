import nodemailer from "nodemailer";

// Emails a visitor's logo and branding preview to the dedicated sales Gmail account, sent from that same account
// (GMAIL_USER + GMAIL_APP_PASSWORD, set in Vercel). Only runs when the visitor taps "Email this design to us".
export const runtime = "nodejs";

const MAX_FILE = 4 * 1024 * 1024; // Vercel caps a request at 4.5 MB, so the client keeps both files under that
const LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const clean = (v, max = 120) => String(v ?? "").replace(/[\r\n<>]/g, " ").trim().slice(0, max);

export async function POST(req) {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""); // Google shows it in groups of four; spaces are not part of it
  if (!user || !pass) return Response.json({ ok: false, error: "not-configured" }, { status: 503 });

  let form;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // Spam trap: people never see this field, bots fill it. Pretend success, send nothing.
  if (form.get("botcheck")) return Response.json({ ok: true });

  const name = clean(form.get("name"));
  const phone = clean(form.get("phone"), 30);
  const hotel = clean(form.get("hotel"));
  const email = clean(form.get("email"), 120);
  if (!name || !hotel || !/^[+\d][\d\s-]{8,}$/.test(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const attachments = [];
  for (const [field, fallback] of [
    ["logo", "logo"],
    ["preview", "branding-preview.jpg"],
  ]) {
    const f = form.get(field);
    if (!f || typeof f === "string") continue;
    if (f.size > MAX_FILE) return Response.json({ ok: false, error: "too-large" }, { status: 413 });
    if (field === "logo" && !LOGO_TYPES.includes(f.type)) return Response.json({ ok: false, error: "type" }, { status: 400 });
    attachments.push({ filename: clean(f.name, 80) || fallback, content: Buffer.from(await f.arrayBuffer()), contentType: f.type });
  }
  if (!attachments.length) return Response.json({ ok: false, error: "no-files" }, { status: 400 });

  const lines = [
    "A visitor sent their logo from the branding preview on the website.",
    "",
    `Name: ${name}`,
    `Hotel: ${hotel}`,
    `Phone: ${phone}`,
    ...(email ? [`Email: ${email}`] : []),
    "",
    `Attached: ${attachments.map((a) => a.filename).join(", ")}`,
  ];

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transport.sendMail({
      from: `"Amaravati website" <${user}>`,
      to: user, // logos land in the sales inbox itself (owner's choice, 2026-11-04)
      replyTo: email || undefined,
      subject: `Logo from website: ${hotel}`,
      text: lines.join("\n"),
      attachments,
    });
  } catch {
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
