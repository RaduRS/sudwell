import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = {
  title: `Project Gallery | ${siteConfig.company.tradingName}`,
  description: `View recent driveway and paving projects across ${siteConfig.contact.serviceArea.join(
    ", ",
  )}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/gallery`,
  },
  openGraph: {
    title: `Project Gallery | ${siteConfig.company.tradingName}`,
    description: `View recent driveway and paving projects across ${siteConfig.contact.serviceArea.join(
      ", ",
    )}.`,
    url: `${siteConfig.seo.siteUrl}/gallery`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Project Gallery | ${siteConfig.company.tradingName}`,
    description: `View recent driveway and paving projects across ${siteConfig.contact.serviceArea.join(
      ", ",
    )}.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function GalleryPage() {
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
    (item, index, all) =>
      all.findIndex((other) => other.src === item.src) === index,
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.company.tradingName} project gallery`,
    url: `${siteConfig.seo.siteUrl}/gallery`,
    associatedMedia: slides.map((slide) => ({
      "@type": "ImageObject",
      contentUrl: slide.src,
      name: slide.alt,
    })),
  };

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-14 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div className="space-y-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              <Link href="/" className="hover:text-(--color-foreground)">
                Home
              </Link>
              <span>/</span>
              <span className="text-(--color-foreground)">Gallery</span>
            </nav>
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
                Gallery
              </div>
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
                className="w-fit rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Call {siteConfig.contact.phone}
              </a>
              <Link
                href="/contact"
                className="w-fit rounded-full border border-(--color-secondary)/40 bg-(--color-secondary)/15 px-6 py-3 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-secondary)/25"
              >
                Request a free quote
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {siteConfig.contact.serviceArea.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-3 py-1 text-xs font-semibold text-(--color-foreground)/70"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                What you’ll see
              </div>
              <div className="mt-4 space-y-3 text-sm text-(--color-foreground)/70">
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Block paving, resin, tarmac, and patios
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Before/after style examples and finished installs
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Click any image to view full size
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionHeader
          eyebrow={siteConfig.home.gallery.eyebrow}
          title={siteConfig.home.gallery.title}
          description="Browse the gallery and tap an image to navigate left or right."
        />

        <GalleryGrid slides={slides} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}

