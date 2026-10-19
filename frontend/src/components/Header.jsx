"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, CaretDown, WhatsappLogo } from "@phosphor-icons/react";
import clsx from "clsx";
import Logo from "./Logo";
import { nav, whatsappLink, contact, categories } from "@/lib/site";

// Everything listed under Products: our categories plus the Biotique catalogue.
const productLinks = [
  ...categories.map((c) => ({ href: `/products/${c.slug}`, label: c.name })),
  { href: "/products/biotique", label: "Biotique Range" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false); // Products dropdown (desktop)
  const closeTimer = useRef(null);
  const wrapRef = useRef(null);
  const productsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [menuLeft, setMenuLeft] = useState(0);
  // The pill clips overflow, so the panel lives outside it; line it up under the Products button.
  const placeMenu = () => {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const btn = productsRef.current?.getBoundingClientRect();
    if (wrap && btn) setMenuLeft(btn.left - wrap.left);
  };
  const showMenu = () => {
    clearTimeout(closeTimer.current);
    placeMenu();
    setMenu(true);
  };
  const hideMenu = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(false), 160);
  };
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") {
        // Closing the phone menu with Escape hands focus back to the button that opened it
        if (open) menuButtonRef.current?.focus();
        setOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4">
      <div ref={wrapRef} className="container-x relative">
        <div className="pointer-events-auto relative flex h-16 items-center justify-between gap-4 overflow-hidden rounded-full bg-[#121715]/90 pl-3 pr-2 text-[#EEF2EF] shadow-[0_12px_40px_-20px_rgb(0_0_0/0.5)] ring-1 ring-white/10 backdrop-blur-xl sm:pl-4">
          <motion.span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full bg-[#5CBF9C]" style={{ scaleX: progress }} />
          <Link href="/" className="flex items-center gap-3 rounded-full" aria-label="Amaravati Enterprises home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                if (item.href === "/products") {
                  return (
                    <li key={item.href} onPointerEnter={showMenu} onPointerLeave={hideMenu}>
                      <button
                        ref={productsRef}
                        type="button"
                        onClick={() => {
                          placeMenu();
                          setMenu((v) => !v);
                        }}
                        aria-expanded={menu}
                        aria-controls="products-menu"
                        className={clsx(
                          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                          active || menu ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                        )}
                      >
                        {item.label}
                        <CaretDown size={13} weight="bold" aria-hidden="true" className={clsx("transition-transform duration-300", menu && "rotate-180")} />
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                        active ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="hidden rounded-full px-5 py-2.5 text-[14px] font-medium text-white ring-1 ring-white/25 transition-colors duration-300 hover:bg-white/10 md:inline-flex"
            >
              Contact us
            </Link>
            <Link
              href="/contact#enquiry"
              className="hidden rounded-full bg-[#5CBF9C] px-5 py-2.5 text-[14px] font-medium text-[#0A1A14] transition-transform duration-200 ease-snap active:scale-[0.98] sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-current transition-transform duration-200 ease-snap",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-current transition-transform duration-200 ease-snap",
                  open ? "-rotate-45" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              id="products-menu"
              onPointerEnter={showMenu}
              onPointerLeave={hideMenu}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              style={{ left: menuLeft }}
              className="pointer-events-auto absolute top-full z-10 mt-2 hidden w-[560px] rounded-[1.5rem] bg-[#121715]/95 p-3 text-[#EEF2EF] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/10 backdrop-blur-xl lg:block"
            >
              <ul className="grid grid-cols-2 gap-1">
                {productLinks.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      onClick={() => setMenu(false)}
                      aria-current={pathname === p.href ? "page" : undefined}
                      className={clsx(
                        "block rounded-2xl px-4 py-3 text-[14px] leading-snug transition-colors duration-200",
                        pathname === p.href ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/[0.07] hover:text-white"
                      )}
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                onClick={() => setMenu(false)}
                className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pb-2 pt-4 text-[14px] font-medium text-[#5CBF9C]"
              >
                View all products
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="pointer-events-auto fixed inset-0 -z-10 bg-[#0C0F0E]/95 pt-28 text-[#EEF2EF] backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x">
              <ul className="space-y-1">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={item.href} className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-medium tracking-tight">
                      {item.label}
                      <ArrowUpRight size={22} weight="light" aria-hidden="true" />
                    </Link>
                    {item.href === "/products" && (
                      <ul className="grid gap-1 border-b border-white/10 py-3">
                        {productLinks.map((p) => (
                          <li key={p.href}>
                            <Link href={p.href} className="block py-1.5 text-[15px] text-white/70 hover:text-white">
                              {p.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 grid gap-3"
              >
                <a
                  href={whatsappLink("Hi, I'd like a quote for hotel amenities.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#5CBF9C] py-4 text-base font-medium text-[#0A1A14]"
                >
                  <WhatsappLogo size={20} weight="regular" aria-hidden="true" /> WhatsApp us
                </a>
                <a href={contact.phoneHref} className="rounded-full py-3 text-center text-white/70">
                  Call {contact.phoneDisplay}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
