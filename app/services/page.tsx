import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
  description: `Explore driveway and paving services across ${siteConfig.contact.serviceArea.join(
    ", ",
  )}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/services`,
  },
  openGraph: {
    title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
    description: `Explore driveway and paving services across ${siteConfig.contact.serviceArea.join(
      ", ",
    )}.`,
    url: `${siteConfig.seo.siteUrl}/services`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Driveway & Paving Services | ${siteConfig.company.tradingName}`,
    description: `Explore driveway and paving services across ${siteConfig.contact.serviceArea.join(
      ", ",
    )}.`,
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

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-20">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-(--color-foreground)/60">
          <Link href="/" className="hover:text-(--color-foreground)">
            Home
          </Link>
          <span>/</span>
          <span className="text-(--color-foreground)">Services</span>
        </nav>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Our Driveway & Paving Services
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
            Built to last, tailored to your home, and installed by a trusted
            local team. Browse every service and request a free quote today.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.contact.phoneFormatted}`}
              className="w-fit rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
            >
              Call {siteConfig.contact.phone}
            </a>
            <a
              href="/contact"
              className="w-fit rounded-full border border-(--color-secondary)/40 bg-(--color-secondary)/15 px-6 py-3 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-secondary)/25"
            >
              Request a free quote
            </a>
          </div>
        </div>
        <SectionHeader
          eyebrow="Services"
          title="Choose the right surface for your property"
          description="Every install is planned for drainage, durability, and curb appeal."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => (
            <div
              key={service.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:-translate-y-1 hover:border-(--color-accent)/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4 border-b border-(--color-foreground)/10 bg-(--color-foreground)/5 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--color-secondary)/15 text-sm font-semibold text-(--color-secondary)">
                    {service.name.charAt(0)}
                  </div>
                  <h2 className="text-lg font-semibold text-(--color-foreground)">
                    {service.name}
                  </h2>
                </div>
                {service.priceRange ? (
                  <span className="rounded-full border border-(--color-secondary)/25 bg-(--color-secondary)/10 px-3 py-1 text-xs font-semibold text-(--color-foreground)">
                    {service.priceRange}
                  </span>
                ) : null}
              </div>
              <div className="flex h-full flex-col p-5">
                <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                  {service.shortDesc}
                </p>
                {service.features.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-3 py-1 text-xs font-semibold text-(--color-foreground)/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary)/80"
                >
                  Learn more
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
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
