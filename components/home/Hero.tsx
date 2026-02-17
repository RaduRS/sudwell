"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/layout/Container";
import { TrustBadges } from "@/components/shared/TrustBadges";

export function Hero() {
  const title = siteConfig.home.hero.title
    .replace("{tradingName}", siteConfig.company.tradingName)
    .replace("{tagline}", siteConfig.company.tagline);
  const serviceAreaNames = siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean)
    .join(", ");
  const subheading = siteConfig.home.hero.subheading
    .replace("{serviceArea}", serviceAreaNames)
    .replace("{city}", siteConfig.contact.address.city);
  const backgroundVideo = siteConfig.home.hero.backgroundVideo ?? "";
  const backgroundImages = useMemo(() => {
    const configured = (siteConfig.home.hero.backgroundImages ?? []).filter(
      Boolean,
    );
    if (configured.length > 0) {
      return configured;
    }
    return siteConfig.home.hero.backgroundImage
      ? [siteConfig.home.hero.backgroundImage]
      : [];
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const activeImage = backgroundImages[activeIndex] ?? "";
  const hasBackground = Boolean(activeImage || backgroundVideo);
  const hasCarousel = backgroundImages.length > 1 && !backgroundVideo;
  useEffect(() => {
    if (!hasCarousel) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgroundImages.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [backgroundImages.length, hasCarousel]);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduceMotion) {
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const next = Math.max(0, Math.min(56, window.scrollY * 0.12));
      setParallaxY(next);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      className={`relative overflow-hidden py-24 sm:py-32 ${
        hasBackground ? "" : "bg-(--color-background)"
      }`}
    >
      {backgroundVideo ? (
        <div
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.06)`,
          }}
        >
          <video
            src={backgroundVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      ) : activeImage ? (
        <div
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.06)`,
          }}
        >
          {backgroundImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              role="img"
              aria-label={title}
              className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      ) : null}
      {hasBackground ? <div className="absolute inset-0 bg-black/65" /> : null}
      <Container className="relative z-10">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-5">
            <h1
              className={`text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl ${
                hasBackground
                  ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]"
                  : "text-(--color-foreground)"
              }`}
            >
              {title}
            </h1>
            <p
              className={`max-w-2xl text-base leading-relaxed sm:text-xl ${
                hasBackground
                  ? "text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                  : "text-(--color-foreground)/70"
              }`}
            >
              {subheading}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.contact.phoneFormatted}`}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                hasBackground
                  ? "shadow-lg shadow-black/20 ring-1 ring-white/20"
                  : ""
              }`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {siteConfig.home.hero.primaryCtaLabel}
            </a>
            <a
              href="/contact"
              className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                hasBackground
                  ? "bg-white/95 text-(--color-primary) shadow-lg shadow-black/10 ring-1 ring-(--color-secondary)/35 hover:bg-white"
                  : "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
              }`}
            >
              {siteConfig.home.hero.secondaryCtaLabel}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <TrustBadges />
        </div>
      </Container>
      {hasCarousel ? (
        <div className="absolute inset-x-0 bottom-6 z-20">
          <Container className="flex justify-center">
            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
                hasBackground
                  ? "border-white/25 bg-white/10 backdrop-blur"
                  : "border-(--color-foreground)/10 bg-(--color-background)"
              }`}
              role="tablist"
              aria-label="Hero background slides"
            >
              {backgroundImages.map((image, index) => (
                <button
                  key={`${image}-${index}-dot`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-label={`Show slide ${index + 1}`}
                  aria-selected={index === activeIndex}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2.5 w-2.5 cursor-pointer rounded-full transition ${
                    index === activeIndex
                      ? hasBackground
                        ? "bg-white"
                        : "bg-(--color-primary)"
                      : hasBackground
                        ? "bg-white/40 hover:bg-white/70"
                        : "bg-(--color-foreground)/30 hover:bg-(--color-foreground)/50"
                  }`}
                />
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
}
