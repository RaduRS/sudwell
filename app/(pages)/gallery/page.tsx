import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = {
  title: `Project Gallery | ${siteConfig.company.tradingName}`,
  description: `View recent driveway and paving projects across ${siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean)
    .join(", ")}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/gallery`,
  },
  openGraph: {
    title: `Project Gallery | ${siteConfig.company.tradingName}`,
    description: `View recent driveway and paving projects across ${siteConfig.areas
      .map((area) => area.name)
      .filter(Boolean)
      .join(", ")}.`,
    url: `${siteConfig.seo.siteUrl}/gallery`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Project Gallery | ${siteConfig.company.tradingName}`,
    description: `View recent driveway and paving projects across ${siteConfig.areas
      .map((area) => area.name)
      .filter(Boolean)
      .join(", ")}.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function GalleryPage() {
  const highlightedAreas = ["Reading", "Wokingham", "Bracknell", "Maidenhead"];
  const serviceAreaNames = siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean);
  const pillAreas = highlightedAreas.filter((area) =>
    serviceAreaNames.includes(area),
  );
  const featuredServices = siteConfig.services.slice(0, 6);

  const normalizeSrc = (src: string) => {
    const trimmed = src.trim();
    if (!trimmed) {
      return "";
    }
    if (trimmed.startsWith("/")) {
      return trimmed;
    }
    try {
      const siteUrl = new URL(siteConfig.seo.siteUrl);
      const url = new URL(trimmed);
      if (url.origin === siteUrl.origin) {
        return url.pathname;
      }
    } catch {}
    return trimmed;
  };

  const homeSlides = siteConfig.home.gallery.items
    .map((item) => ({ src: item.image?.trim() ?? "", alt: item.label }))
    .filter((item) => item.src);

  const serviceSlides = siteConfig.services
    .flatMap((service) =>
      service.gallery.map((src, index) => ({
        src: src.trim(),
        alt: `${service.name} example ${index + 1}`,
      })),
    )
    .filter((item) => item.src);

  const slides = [...homeSlides, ...serviceSlides].filter(
    (item, index, all) => {
      const normalized = normalizeSrc(item.src);
      if (!normalized) {
        return false;
      }
      return (
        all.findIndex((other) => normalizeSrc(other.src) === normalized) ===
        index
      );
    },
  );

  const absoluteSlides = slides.map((slide) => ({
    ...slide,
    src: slide.src.startsWith("/")
      ? `${siteConfig.seo.siteUrl}${slide.src}`
      : slide.src,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.company.tradingName} project gallery`,
    url: `${siteConfig.seo.siteUrl}/gallery`,
    associatedMedia: absoluteSlides.map((slide) => ({
      "@type": "ImageObject",
      contentUrl: slide.src,
      name: slide.alt,
    })),
  };

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-14 py-16 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div className="space-y-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              <Link href="/" className="hover:text-(--color-foreground)">
                Home
              </Link>
              <span>/</span>
              <span className="text-(--color-foreground)">Gallery</span>
            </nav>
            <div className="flex flex-wrap gap-2">
              {(pillAreas.length ? pillAreas : serviceAreaNames).map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Recent work gallery
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                {siteConfig.home.gallery.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call {siteConfig.contact.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Request a free quote
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Popular services
              </div>
              <div className="mt-4 grid gap-2 text-sm font-semibold">
                {featuredServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 transition hover:bg-(--color-foreground)/10 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                  >
                    <span>{service.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-(--color-foreground)/50">
                      View
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <GalleryGrid slides={slides} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
