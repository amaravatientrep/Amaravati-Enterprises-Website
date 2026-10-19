"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, WhatsappLogo, ArrowRight, WarningCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { categories, whatsappLink, contact } from "@/lib/site";

// Email delivery uses Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is set (free key tied to the owner's inbox).
// Without a key the enquiry is sent as a pre-filled WhatsApp message, so no enquiry is ever lost.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const productOptions = [...categories.map((c) => c.name), "Biotique Range"];

function buildMessage(d) {
  return [
    "New enquiry from the website",
    `Name: ${d.name}`,
    `Hotel: ${d.hotel}`,
    `Phone: ${d.phone}`,
    d.email && `Email: ${d.email}`,
    d.city && `City: ${d.city}`,
    d.products.length && `Interested in: ${d.products.join(", ")}`,
    d.message && `Details: ${d.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

const field =
  "w-full rounded-field bg-bg px-4 py-3.5 text-[15px] text-ink ring-1 ring-line/15 placeholder:text-muted transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent";

export default function EnquiryForm() {
  const params = useSearchParams();
  const preset = params.get("product");
  const range = params.get("range"); // e.g. a Biotique range picked on its catalogue page
  const [data, setData] = useState({
    name: "",
    hotel: "",
    phone: "",
    email: "",
    city: "",
    products: preset && productOptions.includes(preset) ? [preset] : [],
    message: range ? `I'd like to know more about ${range}.` : "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [botcheck, setBotcheck] = useState(false); // hidden spam trap: people never see it, bots tick it

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const toggle = (p) =>
    setData((d) => ({ ...d, products: d.products.includes(p) ? d.products.filter((x) => x !== p) : [...d.products, p] }));

  function validate() {
    const e = {};
    if (!data.name.trim()) e.name = "Please enter your name.";
    if (!data.hotel.trim()) e.hotel = "Please enter your hotel or business name.";
    if (!/^[+\d][\d\s-]{8,}$/.test(data.phone.trim())) e.phone = "Please enter a phone number we can call or WhatsApp.";
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Please check the email address, or leave it empty.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    if (botcheck) {
      setStatus("sent"); // a bot filled the trap: show success, send nothing
      return;
    }
    const text = buildMessage(data);
    if (!ACCESS_KEY) {
      window.open(whatsappLink(text), "_blank", "noopener");
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Website enquiry: ${data.hotel}`,
          from_name: "Amaravati website",
          name: data.name,
          hotel: data.hotel,
          phone: data.phone,
          // Web3Forms uses "email" as the reply-to, so replying to the enquiry email goes straight to the buyer
          ...(data.email.trim() && { email: data.email.trim() }),
          city: data.city,
          products: data.products.join(", "),
          message: data.message,
          botcheck,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      window.posthog?.capture?.("enquiry_submitted", { products: data.products.join(", ") });
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="anim-rise flex flex-col items-start gap-5 py-6" role="status">
        <CheckCircle size={44} weight="light" className="anim-pop-slow text-accent" aria-hidden="true" />
        <h3 className="text-2xl font-semibold tracking-tight">Thank you, {data.name.split(" ")[0]}.</h3>
        <p className="max-w-md text-muted">
          {ACCESS_KEY
            ? "Your enquiry has reached our team. We will call or WhatsApp you on the number you shared."
            : "Your enquiry is ready in WhatsApp. Press send there and our team will reply."}
        </p>
        {(
          <a
            href={whatsappLink(buildMessage(data))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink/[0.05] px-5 py-3 text-[15px] font-medium ring-1 ring-line/10"
          >
            <WhatsappLogo size={18} aria-hidden="true" /> {ACCESS_KEY ? "Also send on WhatsApp" : "Open WhatsApp again"}
          </a>
        )}
      </div>
    );
  }

  const err = (k) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] text-[#B42318] dark:text-[#FDA29B]">
        <WarningCircle size={15} aria-hidden="true" /> {errors[k]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" value={data.name} onChange={set("name")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone or WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={set("phone")} className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {err("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hotel" className="mb-2 block text-sm font-medium">
            Hotel or business
          </label>
          <input id="hotel" name="hotel" autoComplete="organization" value={data.hotel} onChange={set("hotel")} className={field} aria-invalid={!!errors.hotel} aria-describedby={errors.hotel ? "hotel-error" : undefined} />
          {err("hotel")}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={data.email} onChange={set("email")} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            City <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="city" name="city" autoComplete="address-level2" value={data.city} onChange={set("city")} className={field} />
        </div>
      </div>

      {/* Spam trap (Web3Forms botcheck): hidden from people and screen readers */}
      <input type="checkbox" name="botcheck" checked={botcheck} onChange={(e) => setBotcheck(e.target.checked)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          What do you need? <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {productOptions.map((p) => {
            const on = data.products.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(p)}
                className={clsx(
                  "rounded-full px-4 py-2 text-[14px] ring-1 transition-colors duration-300",
                  on ? "bg-accent text-accent-ink ring-accent" : "bg-bg text-ink ring-line/15 hover:ring-line/30"
                )}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} value={data.message} onChange={set("message")} className={clsx(field, "resize-none")} placeholder="Number of rooms, products, branding needs" />
      </div>

      {status === "failed" && (
        <p className="rounded-field bg-[#B42318]/10 px-4 py-3 text-[14px] text-[#B42318] dark:text-[#FDA29B]" role="alert">
          The form could not send just now. Please{" "}
          <a className="underline" href={whatsappLink(buildMessage(data))} target="_blank" rel="noopener noreferrer">
            send it on WhatsApp
          </a>{" "}
          or call{" "}
          <a className="underline" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-between rounded-full bg-accent py-2 pl-6 pr-2 text-[15px] font-medium text-accent-ink transition-transform duration-200 ease-snap active:scale-[0.99] disabled:opacity-70 sm:w-auto sm:justify-start sm:gap-4"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-ink/15 transition-transform duration-200 ease-snap group-hover:translate-x-0.5" aria-hidden="true">
          <ArrowRight size={18} />
        </span>
      </button>
      <p className="text-[13px] text-muted">
        We use your details only to reply to your enquiry.{" "}
        <a href="/privacy" className="underline decoration-line/30 underline-offset-4 hover:text-ink">
          Privacy Notice
        </a>
      </p>
    </form>
  );
}
