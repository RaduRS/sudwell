"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/layout/Container";
import { TrustBadges } from "@/components/shared/TrustBadges";

export function Hero() {
  const title = siteConfig.home.hero.title
    .replace("{tradingName}", siteConfig.company.tradingName)
    .replace("{tagline}", siteConfig.company.tagline);
  const subheading = siteConfig.home.hero.subheading
    .replace("{serviceArea}", siteConfig.contact.serviceArea.join(", "))
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
  const highlights = [
    {
      label: "Average rating",
      value: `${siteConfig.proof.averageRating.toFixed(1)} ★`,
    },
    {
      label: "Reviews",
      value: `${siteConfig.proof.reviewCount}+`,
    },
    {
      label: "Service radius",
      value: `${siteConfig.contact.serviceRadius} mile radius`,
    },
  ];

  return (
    <section
      className={`relative overflow-hidden py-24 sm:py-32 ${
        hasBackground ? "" : "bg-(--color-background)"
      }`}
    >
      {backgroundVideo ? (
        <video
          src={backgroundVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : activeImage ? (
        <div className="absolute inset-0 h-full w-full">
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-8">
            <div
              className={`inline-flex w-fit items-center rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                hasBackground
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-(--color-secondary)/35 bg-(--color-secondary)/10 text-(--color-secondary)"
              }`}
            >
              {siteConfig.company.tagline}
            </div>
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
                className={`rounded-full bg-(--color-primary) px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                  hasBackground
                    ? "shadow-lg shadow-black/20 ring-1 ring-white/20"
                    : ""
                }`}
              >
                {siteConfig.home.hero.primaryCtaLabel}
              </a>
              <a
                href="#quote"
                className={`rounded-full px-7 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                  hasBackground
                    ? "bg-white/95 text-(--color-primary) shadow-lg shadow-black/10 ring-1 ring-(--color-secondary)/35 hover:bg-white"
                    : "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
                }`}
              >
                {siteConfig.home.hero.secondaryCtaLabel}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteConfig.contact.serviceArea.map((area) => (
                <span
                  key={area}
                  className={`rounded-full border px-4 py-1 text-xs font-semibold ${
                    hasBackground
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-(--color-secondary)/30 bg-(--color-secondary)/10 text-(--color-foreground)"
                  }`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`rounded-3xl border p-6 shadow-xl ring-1 ${
              hasBackground
                ? "border-white/15 bg-white/10 text-white ring-white/20 backdrop-blur"
                : "border-(--color-foreground)/10 bg-(--color-background) text-(--color-foreground) ring-(--color-foreground)/5"
            }`}
          >
            <div
              className={`overflow-hidden rounded-2xl border ${
                hasBackground
                  ? "border-white/20"
                  : "border-(--color-foreground)/10"
              }`}
            >
              {activeImage ? (
                <div
                  role="img"
                  aria-label={title}
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeImage})` }}
                />
              ) : (
                <div className="h-44 bg-(--color-foreground)/5" />
              )}
            </div>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                    hasBackground
                      ? "border-white/20 bg-white/10"
                      : "border-(--color-foreground)/10 bg-(--color-background)"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      hasBackground
                        ? "text-white/70"
                        : "text-(--color-foreground)/60"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-base font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
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
                  className={`h-2.5 w-2.5 rounded-full transition ${
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
