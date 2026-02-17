import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Phone, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Resin Bound Products | ${siteConfig.company.tradingName}`,
  description:
    "Explore resin bound gravel kits, permeable paving slabs, and rubber safety surfaces. Contact our team for product advice or a quote.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/services`,
  },
  openGraph: {
    title: `Resin Bound Products | ${siteConfig.company.tradingName}`,
    description:
      "Explore resin bound gravel kits, permeable paving slabs, and rubber safety surfaces.",
    url: `${siteConfig.seo.siteUrl}/services`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resin Bound Products | ${siteConfig.company.tradingName}`,
    description:
      "Explore resin bound gravel kits, permeable paving slabs, and rubber safety surfaces.",
    images: ["/images/og-image.jpg"],
  },
};

export default function ServicesPage() {
  const diyKitsImage = "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp";
  const diyKitCards = [
    {
      id: "autumn-quartz",
      name: "SUDwell™ Autumn Quartz Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "golden-pea",
      name: "SUDwell™ Golden Pea Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "golden-quartz",
      name: "SUDwell™ Golden Quartz Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "green",
      name: "SUDwell™ Green Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "pearl-quartz",
      name: "SUDwell™ Pearl Quartz Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "red",
      name: "SUDwell™ Red Kit",
      price: 29.46,
      exTax: 29.46,
    },
    {
      id: "silver",
      name: "SUDwell™ Silver Kit",
      subtitle: "Premium Grade U.V Resin-Driveway Kit",
      price: 29.46,
      exTax: 29.46,
    },
  ] as const;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.company.tradingName} products`,
    itemListElement: diyKitCards.map((kit, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: kit.name,
        image: `${siteConfig.seo.siteUrl}${diyKitsImage}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: kit.price,
          url: `${siteConfig.seo.siteUrl}/services/block-paving?variant=${kit.id}`,
        },
      },
    })),
  };
  const heroImage = siteConfig.home.hero.backgroundImage ?? "";
  const highlights = [
    {
      label: "Years supplying",
      value: `${new Date().getFullYear() - 2009}+`,
    },
    {
      label: "Coverage per kit",
      value: "1m²",
    },
    { label: "SuDS", value: "Permeable" },
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
              <span className="text-(--color-foreground)">Products</span>
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
                Resin bound products for DIY and trade
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Resin bound gravel kits, permeable paving slabs, and rubber
                safety surfaces—built for curb appeal, SuDS compliance, and
                long-term performance. Browse products, then contact us for
                pricing or advice.
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
                Get product pricing
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
                Current offer
              </div>
              <div className="mt-3 text-lg font-semibold text-(--color-foreground)">
                25% discount on primer
              </div>
              <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                Order a Trade Resin Bound Starter Pack and use code{" "}
                <span className="font-semibold text-(--color-foreground)">
                  PRIMER25
                </span>{" "}
                to get 25% off primer.
              </p>
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
        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-2xl font-semibold tracking-tight text-(--color-foreground) sm:text-3xl">
              Resin bound DIY kits
            </div>
            <div className="text-sm text-(--color-foreground)/70">
              Click a kit to view details.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diyKitCards.map((kit) => (
              <div
                key={kit.id}
                className="group overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:shadow-md"
              >
                <Link
                  href={`/services/block-paving?variant=${kit.id}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                >
                  <div className="relative h-44 overflow-hidden bg-(--color-secondary)/10">
                    <div
                      role="img"
                      aria-label={kit.name}
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${diyKitsImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                </Link>

                <div className="space-y-4 p-6">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-(--color-foreground)">
                      {kit.name}
                    </div>
                    {"subtitle" in kit ? (
                      <div className="text-xs text-(--color-foreground)/60">
                        {kit.subtitle}
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                      Only
                    </div>
                    <div className="text-3xl font-semibold tracking-tight text-(--color-foreground)">
                      £{kit.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-(--color-foreground)/60">
                      Ex Tax: £{kit.exTax.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/services/block-paving?variant=${kit.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:w-auto"
                    >
                      View
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/contact?product=${encodeURIComponent(
                        kit.name,
                      )}&price=${kit.price.toFixed(2)}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-5 py-2.5 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:w-auto"
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
