import Link from "next/link";
import type { Metadata } from "next";
import { Check, ChevronRight, Phone, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
  description: `Explore driveway and paving services across ${siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean)
    .join(", ")}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/services`,
  },
  openGraph: {
    title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
    description: `Explore driveway and paving services across ${siteConfig.areas
      .map((area) => area.name)
      .filter(Boolean)
      .join(", ")}.`,
    url: `${siteConfig.seo.siteUrl}/services`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
    description: `Explore driveway and paving services across ${siteConfig.areas
      .map((area) => area.name)
      .filter(Boolean)
      .join(", ")}.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.company.tradingName} services`,
    itemListElement: siteConfig.services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.shortDesc,
        url: `${siteConfig.seo.siteUrl}/services/${service.slug}`,
      },
    })),
  };
  const heroImage = siteConfig.home.hero.backgroundImage ?? "";
  const highlights = [
    {
      label: "Average rating",
      value: siteConfig.proof.averageRating.toFixed(1),
    },
    {
      label: "Reviews",
      value: `${siteConfig.proof.reviewCount}+`,
    },
    {
      label: "Service radius",
      value: `${siteConfig.contact.serviceRadius} miles`,
    },
  ];
  const steps = siteConfig.home.process.steps.slice(0, 3);

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
              <span className="text-(--color-foreground)">Services</span>
            </nav>
            <div className="flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                >
                  {item.label === "Average rating" ? (
                    <Star
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-amber-500"
                      fill="currentColor"
                    />
                  ) : null}
                  {item.value} {item.label.toLowerCase()}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Our Driveway & Paving Services
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Built to last, tailored to your home, and installed by a trusted
                local team. Browse every service and request a free quote today.
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
              <a
                href="/contact"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Request a free quote
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 shadow-sm ring-1 ring-(--color-foreground)/5">
              {heroImage ? (
                <>
                  <div
                    role="img"
                    aria-label="Driveway services"
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/35" />
                </>
              ) : (
                <div className="absolute inset-0 bg-(--color-foreground)/5" />
              )}
              <div className="relative z-10 flex min-h-[220px] flex-col justify-end gap-3 p-6 text-white">
                <div className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold">
                  Premium finish
                </div>
                <div className="text-lg font-semibold">
                  Designed for curb appeal and durability
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                How we deliver
              </div>
              <div className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/30 bg-(--color-accent)/10 text-xs font-semibold text-(--color-accent)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-(--color-foreground)">
                        {step.title}
                      </div>
                      <div className="text-xs text-(--color-foreground)/70">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => {
            const preview = service.gallery[0] ?? "";
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 shadow-sm ring-1 ring-(--color-foreground)/5 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                <div className="relative h-44 overflow-hidden">
                  {preview ? (
                    <div
                      role="img"
                      aria-label={service.name}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${preview})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="bg-(--color-secondary)/12" />
                      <div className="bg-(--color-accent)/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex h-full items-end justify-between gap-4 px-5 py-4">
                    <div className="rounded-2xl border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                      {service.name}
                    </div>
                    {service.priceRange ? (
                      <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        {service.priceRange}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex h-full flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                    {service.shortDesc}
                  </p>
                  <div className="mt-auto space-y-4">
                    {service.features.length ? (
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1.5 rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-3 py-1 text-xs font-semibold text-(--color-foreground)/70"
                          >
                            <Check aria-hidden="true" className="h-3.5 w-3.5" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-(--color-primary)/35 px-5 py-2 text-sm font-semibold text-(--color-primary) transition group-hover:bg-(--color-primary) group-hover:text-white">
                      Learn more
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
