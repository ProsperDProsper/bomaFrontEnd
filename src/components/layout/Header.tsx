"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { nav, brand, contact } = site;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-(--header-h) transition-colors duration-(--duration-ui) ease-(--ease-out-quart)",
          scrolled || open
            ? "bg-paper/80 shadow-[0_1px_0_0_rgb(223_229_240/0.7)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-6">
          <a href="#top" aria-label={brand.homeLinkLabel} className="flex items-center gap-2.5">
            <Image src={brand.logoSrc} alt="" width={109} height={115} className="h-7 w-auto" priority />
            <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">{brand.name}</span>
          </a>

          <nav aria-label={nav.label} className="hidden items-center gap-1 md:flex">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-pill px-3.5 py-2 text-[0.92rem] font-medium text-ink-soft transition-colors duration-(--duration-micro) hover:bg-surface hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#start"
              className="hidden rounded-pill px-3.5 py-2 text-[0.92rem] font-medium text-ink-soft transition-colors hover:text-brand-700 sm:inline-flex"
            >
              {nav.signIn.label}
            </a>
            <ThemeToggle className="inline-flex size-10 items-center justify-center rounded-pill border border-line bg-surface/70 text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700" />
            <ButtonLink
              href={contact.whatsappHref}
              external
              variant="primary"
              className="hidden px-5 py-2.5 text-[0.9rem] sm:inline-flex"
            >
              {nav.cta.label}
              <WhatsappLogo size={16} weight="fill" aria-hidden />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? nav.menuClose : nav.menuOpen}
              className="inline-flex size-10 items-center justify-center rounded-pill border border-line bg-surface text-ink md:hidden"
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-(--header-h) z-40 bg-paper/95 shadow-[0_12px_30px_-24px_rgb(16_23_40/0.5)] backdrop-blur-xl transition-[opacity,transform] duration-(--duration-ui) ease-(--ease-out-quart) md:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label={site.nav.label} className="container-site flex flex-col py-3">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-3.5 text-lg font-medium text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 py-4">
            <ButtonLink href={contact.whatsappHref} external variant="primary" className="py-3.5">
              {nav.cta.label}
              <WhatsappLogo size={17} weight="fill" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#start" variant="secondary" className="py-3.5" onClick={() => setOpen(false)}>
              {nav.signIn.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
