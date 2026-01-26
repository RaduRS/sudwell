import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
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

            <form
              action={siteConfig.integrations.formEndpoint}
              method="post"
              className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span className="block pb-0.5 pl-1">Full name</span>
                  <div className="relative">
                    <User
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
                    />
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                    />
                  </div>
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span className="block pb-0.5 pl-1">Email</span>
                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
                    />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                    />
                  </div>
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span className="block pb-0.5 pl-1">Phone</span>
                  <div className="relative">
                    <Phone
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
                    />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                    />
                  </div>
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground)">
                  <span className="block pb-0.5 pl-1">Postcode</span>
                  <input
                    name="postcode"
                    autoComplete="postal-code"
                    required
                    className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
                  <span className="block pb-0.5 pl-1">Service</span>
                  <div className="relative">
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
                    />
                    <select
                      name="service"
                      required
                      className="w-full appearance-none rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-11 pl-4 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
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
                  </div>
                </label>
                <label className="space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
                  <span className="block pb-0.5 pl-1">Message (optional)</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-(--color-foreground)/10 bg-white px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  Send quote request
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <div className="text-xs text-(--color-foreground)/60">
                  Typical response within 24 hours.
                </div>
              </div>
            </form>
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
