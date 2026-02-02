import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { QuoteRequestForm } from "@/components/shared/QuoteRequestForm";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.company.tradingName}`,
  description: `Get a free driveway quote from ${siteConfig.company.tradingName}. Call ${siteConfig.contact.phone} or email ${siteConfig.contact.email}.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact | ${siteConfig.company.tradingName}`,
    description: `Get a free driveway quote from ${siteConfig.company.tradingName}. Call ${siteConfig.contact.phone} today.`,
    url: `${siteConfig.seo.siteUrl}/contact`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.company.tradingName}`,
    description: `Get a free driveway quote from ${siteConfig.company.tradingName}. Call ${siteConfig.contact.phone} today.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function ContactPage() {
  const addressLines = [
    siteConfig.contact.address.street,
    siteConfig.contact.address.city,
    siteConfig.contact.address.county,
    siteConfig.contact.address.postcode,
    siteConfig.contact.address.country,
  ].filter(Boolean);
  const addressQuery = encodeURIComponent(addressLines.join(", "));
  const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.company.tradingName}`,
    url: `${siteConfig.seo.siteUrl}/contact`,
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.company.tradingName,
      url: siteConfig.seo.siteUrl,
      telephone: siteConfig.contact.phoneFormatted,
      email: siteConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.county,
        postalCode: siteConfig.contact.address.postcode,
        addressCountry: siteConfig.contact.address.country,
      },
      openingHours: [
        siteConfig.contact.openingHours.weekdays,
        siteConfig.contact.openingHours.weekends,
      ],
      areaServed: siteConfig.areas.map((area) => area.name).filter(Boolean),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phoneFormatted,
          contactType: "customer service",
          areaServed: "GB",
          availableLanguage: ["en"],
        },
      ],
    },
  };

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="space-y-8">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              <Link href="/" className="hover:text-(--color-foreground)">
                Home
              </Link>
              <span>/</span>
              <span className="text-(--color-foreground)">Contact</span>
            </nav>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Get a free quote
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Call, email, or send a quick quote request. We cover{" "}
                {siteConfig.contact.serviceRadius} miles around{" "}
                {siteConfig.contact.address.city}.
              </p>
            </div>

            <QuoteRequestForm
              endpoint={siteConfig.integrations.formEndpoint}
              phone={siteConfig.contact.phone}
              services={siteConfig.services.map((service) => ({
                slug: service.slug,
                name: service.name,
              }))}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Contact details
              </div>
              <div className="mt-4 space-y-3 text-sm text-(--color-foreground)/75">
                {siteConfig.contact.whatsapp ? (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(
                      /\D/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-4 py-3 font-semibold text-(--color-foreground) transition hover:bg-(--color-secondary)/10 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 text-(--color-foreground)">
                        <MessageCircle aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span>WhatsApp</span>
                    </span>
                    <span className="text-(--color-foreground)/60">
                      Message
                    </span>
                  </a>
                ) : null}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-4 py-3 font-semibold text-(--color-foreground) transition hover:bg-(--color-secondary)/10 hover:shadow-sm"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 text-(--color-foreground)">
                      <Mail aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="truncate">{siteConfig.contact.email}</span>
                  </span>
                  <span className="text-(--color-foreground)/60">Email</span>
                </a>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    Address
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-(--color-foreground)/75">
                    {addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                <Clock aria-hidden="true" className="h-4 w-4" />
                Opening hours
              </div>
              <div className="mt-4 space-y-2 text-sm text-(--color-foreground)/75">
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  {siteConfig.contact.openingHours.weekdays}
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  {siteConfig.contact.openingHours.weekends}
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-(--color-foreground)/70">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                  Prefer to call?
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Free quotes with honest advice and no pressure.
                </div>
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  Call {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="space-y-4">
        <Container>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
            Find us
          </div>
        </Container>
        <div className="h-[360px] w-full bg-(--color-foreground)/5">
          <iframe
            title={`${siteConfig.company.tradingName} location map`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
