import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  MapPin,
  MapPinned,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Areas We Serve | ${siteConfig.company.tradingName}`,
  description: `Explore the areas we serve within ${siteConfig.contact.serviceRadius} miles of ${siteConfig.contact.address.city}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/areas`,
  },
  openGraph: {
    title: `Areas We Serve | ${siteConfig.company.tradingName}`,
    description: `Explore the areas we serve within ${siteConfig.contact.serviceRadius} miles of ${siteConfig.contact.address.city}.`,
    url: `${siteConfig.seo.siteUrl}/areas`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Areas We Serve | ${siteConfig.company.tradingName}`,
    description: `Explore the areas we serve within ${siteConfig.contact.serviceRadius} miles of ${siteConfig.contact.address.city}.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function AreasPage() {
  const description = siteConfig.home.areas.description
    .replace("{radius}", siteConfig.contact.serviceRadius.toString())
    .replace("{city}", siteConfig.contact.address.city);
  const serviceAreaNames = siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean)
    .join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.company.tradingName} areas served`,
    itemListElement: siteConfig.areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: area.name,
        url: `${siteConfig.seo.siteUrl}/areas/${area.slug}`,
      },
    })),
  };

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div className="space-y-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              <Link href="/" className="hover:text-(--color-foreground)">
                Home
              </Link>
              <span>/</span>
              <span className="text-(--color-foreground)">Areas</span>
            </nav>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                <Star
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-amber-500"
                  fill="currentColor"
                />
                {siteConfig.proof.averageRating.toFixed(1)} average rating
              </div>
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.proof.reviewCount}+ reviews
              </div>
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.contact.serviceRadius} miles service radius
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Areas we serve
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                {description}
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
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Based in
              </div>
              <div className="mt-3 space-y-2 text-sm text-(--color-foreground)/75">
                <div className="font-semibold text-(--color-foreground)">
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.county}
                </div>
                <div>
                  {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.postcode}
                </div>
                <div>
                  Serving{" "}
                  <span className="font-semibold text-(--color-foreground)">
                    {serviceAreaNames}
                  </span>{" "}
                  and surrounding areas.
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/services"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-5 py-2.5 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-foreground)/10"
                >
                  Browse services
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-(--color-foreground)">
                    {area.name}
                  </div>
                  <div className="text-sm text-(--color-foreground)/70">
                    Driveway and paving services across {area.name} and nearby
                    streets.
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-2xl border border-(--color-secondary)/25 bg-(--color-secondary)/10 px-3 py-1 text-xs font-semibold text-(--color-secondary)">
                  <MapPinned aria-hidden="true" className="h-3.5 w-3.5" />
                  Area
                </div>
              </div>
              {area.postcodes?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.postcodes.map((postcode) => (
                    <span
                      key={`${area.slug}-${postcode}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                    >
                      <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
                      {postcode}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition group-hover:text-(--color-primary)/80">
                View {area.name}
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
