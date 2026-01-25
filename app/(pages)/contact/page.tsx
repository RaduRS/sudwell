import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
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
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

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
      areaServed: siteConfig.contact.serviceArea,
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
      <Container className="space-y-12 py-16 sm:py-20">
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
              <div className="inline-flex w-fit items-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
                Contact
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Get a free quote
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Call, email, or send a quick quote request. We cover{" "}
                {siteConfig.contact.serviceRadius} miles around{" "}
                {siteConfig.contact.address.city}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="w-fit rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Call {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-fit rounded-full border border-(--color-secondary)/40 bg-(--color-secondary)/15 px-6 py-3 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-secondary)/25"
              >
                Email us
              </a>
            </div>

            <form
              action={siteConfig.integrations.formEndpoint}
              method="post"
              className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span>Full name</span>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span>Postcode</span>
                  <input
                    name="postcode"
                    autoComplete="postal-code"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
                  <span>Service</span>
                  <select
                    name="service"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {siteConfig.services.map((service) => (
                      <option key={service.slug} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
                  <span>Message (optional)</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 text-sm text-(--color-foreground)/75">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 rounded border-(--color-foreground)/30 text-(--color-primary)"
                />
                <span>
                  I consent to being contacted about my enquiry. You can also
                  call {siteConfig.contact.phone} for a faster response.
                </span>
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  Send quote request
                </button>
                <div className="text-xs text-(--color-foreground)/60">
                  Typical response within 24 hours.
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Contact details
              </div>
              <div className="mt-4 space-y-3 text-sm text-(--color-foreground)/75">
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 font-semibold text-(--color-foreground) transition hover:border-(--color-accent)/30"
                >
                  <span>{siteConfig.contact.phone}</span>
                  <span className="text-(--color-foreground)/60">Call</span>
                </a>
                {siteConfig.contact.whatsapp ? (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(
                      /\D/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 font-semibold text-(--color-foreground) transition hover:border-(--color-accent)/30"
                  >
                    <span>WhatsApp</span>
                    <span className="text-(--color-foreground)/60">
                      Message
                    </span>
                  </a>
                ) : null}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 font-semibold text-(--color-foreground) transition hover:border-(--color-accent)/30"
                >
                  <span className="truncate">{siteConfig.contact.email}</span>
                  <span className="text-(--color-foreground)/60">Email</span>
                </a>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
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

            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
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
                  className="inline-flex w-full items-center justify-center rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  Call {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="space-y-4 pb-12">
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
        <Container className="flex flex-col gap-3">
          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-4 py-2 text-xs font-semibold text-(--color-foreground)/70 transition hover:border-(--color-foreground)/25 hover:text-(--color-foreground)"
          >
            Open in Google Maps
          </a>
          <div className="text-sm text-(--color-foreground)/70">
            Serving {siteConfig.contact.serviceArea.join(", ")} and nearby areas
            within {siteConfig.contact.serviceRadius} miles of{" "}
            {siteConfig.contact.address.city}.
          </div>
        </Container>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
