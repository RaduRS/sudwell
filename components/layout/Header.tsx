"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import type { SiteConfig } from "@/config/site.config";
import { Container } from "./Container";

type HeaderProps = {
  siteConfig: SiteConfig;
};

export function Header({ siteConfig }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const primaryCtaLabel = siteConfig.header.primaryCtaLabel.replace(
    "{phone}",
    siteConfig.contact.phone,
  );
  const whatsappHref = siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`
    : null;
  const logo = siteConfig.company.logo;
  const isActiveHref = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (!reduceMotion) {
      window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-(--color-background) shadow-sm">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold text-(--color-foreground) sm:text-lg"
        >
          {logo ? (
            <Image
              src={logo}
              alt={siteConfig.company.tradingName}
              width={128}
              height={32}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span>{siteConfig.company.tradingName}</span>
          )}
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-(--color-foreground)/10 bg-(--color-secondary)/10 p-1 text-sm font-medium text-(--color-foreground)/80 lg:flex">
          {siteConfig.navigation.map((item) => {
            const isActive = isActiveHref(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-full bg-(--color-primary) px-3 py-2 text-white shadow-sm"
                    : "rounded-full px-3 py-2 transition hover:bg-(--color-background) hover:text-(--color-foreground)"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Message on WhatsApp"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-(--color-foreground)/15 bg-(--color-background) text-(--color-foreground) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:bg-(--color-foreground)/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:inline-flex"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </a>
          ) : null}
          <a
            href={`tel:${siteConfig.contact.phoneFormatted}`}
            className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:px-5 sm:py-2.5"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            {primaryCtaLabel}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            onClick={() => setMenuOpen((current) => !current)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-(--color-foreground)/15 bg-(--color-background) text-(--color-foreground) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:bg-(--color-foreground)/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 lg:hidden"
          >
            <span className="relative h-5 w-5">
              <Menu
                aria-hidden="true"
                className={`absolute inset-0 h-5 w-5 transition duration-200 ease-out ${
                  menuOpen
                    ? "scale-75 rotate-45 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
              <X
                aria-hidden="true"
                className={`absolute inset-0 h-5 w-5 transition duration-200 ease-out ${
                  menuOpen
                    ? "scale-100 opacity-100"
                    : "scale-75 -rotate-45 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id={menuPanelId}
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-dvh w-full max-w-sm border-l border-(--color-foreground)/10 bg-(--color-background) shadow-2xl shadow-black/20 transition-transform duration-250 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-(--color-foreground)/10 px-5 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-semibold text-(--color-foreground)"
              onClick={() => setMenuOpen(false)}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={siteConfig.company.tradingName}
                  width={112}
                  height={28}
                  className="h-7 w-auto"
                  priority
                />
              ) : (
                <span>{siteConfig.company.tradingName}</span>
              )}
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-(--color-foreground)/15 bg-(--color-background) text-(--color-foreground) transition hover:bg-(--color-foreground)/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 py-5">
            <nav className="space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive = isActiveHref(item.href);
                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                      isActive
                        ? "bg-(--color-primary) text-white shadow-sm"
                        : "text-(--color-foreground) hover:bg-(--color-foreground)/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      aria-hidden="true"
                      className={`h-5 w-5 ${
                        isActive
                          ? "text-white/90"
                          : "text-(--color-foreground)/40"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-5 rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Contact now
              </div>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-foreground)/15 bg-(--color-background) px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-foreground)/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              ) : null}
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {primaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
