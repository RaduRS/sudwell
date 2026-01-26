import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `About ${siteConfig.company.tradingName} | Driveway & Paving Specialists`,
  description: `Learn about ${siteConfig.company.tradingName}, a trusted local driveway and paving team serving ${siteConfig.contact.serviceArea.join(
    ", ",
  )}. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/about`,
  },
  openGraph: {
    title: `About ${siteConfig.company.tradingName}`,
    description: `Learn about ${siteConfig.company.tradingName}, a trusted local driveway and paving team.`,
    url: `${siteConfig.seo.siteUrl}/about`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.company.tradingName}`,
    description: `Learn about ${siteConfig.company.tradingName}, a trusted local driveway and paving team.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function AboutPage() {
  const foundedLabel = siteConfig.company.founded
    ? `Established ${siteConfig.company.founded}`
    : "Local specialists";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.tradingName,
    url: `${siteConfig.seo.siteUrl}/about`,
    logo: siteConfig.company.logo
      ? `${siteConfig.seo.siteUrl}${siteConfig.company.logo}`
      : undefined,
    sameAs: [
      siteConfig.social.facebook?.url,
      siteConfig.social.instagram?.url,
      siteConfig.social.twitter?.url,
      siteConfig.social.linkedin?.url,
      siteConfig.social.youtube?.url,
    ].filter(Boolean),
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
              <span className="text-(--color-foreground)">About</span>
            </nav>
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
                {foundedLabel}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                About {siteConfig.company.tradingName}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                We’re a local team specialising in driveway installations,
                paving, and patios. Every project is planned for drainage,
                durability, and a clean finish that lifts curb appeal.
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
                className="w-fit rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Request a free quote
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {siteConfig.contact.serviceArea.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-(--color-foreground)">
                    {siteConfig.contact.address.city},{" "}
                    {siteConfig.contact.address.county}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3">
                      <div className="text-sm font-semibold text-(--color-foreground)">
                        {siteConfig.proof.insurance}
                      </div>
                      {siteConfig.proof.insuranceLogo ? (
                        <Image
                          src={siteConfig.proof.insuranceLogo}
                          alt={siteConfig.proof.insurance}
                          width={120}
                          height={40}
                          className="h-8 w-auto object-contain opacity-90"
                        />
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3">
                      <div className="text-sm font-semibold text-(--color-foreground)">
                        {siteConfig.proof.guarantee}
                      </div>
                      {siteConfig.proof.guaranteeLogo ? (
                        <Image
                          src={siteConfig.proof.guaranteeLogo}
                          alt={siteConfig.proof.guarantee}
                          width={120}
                          height={40}
                          className="h-8 w-auto object-contain opacity-90"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                    {siteConfig.proof.averageRating.toFixed(1)} ★ average rating
                  </div>
                  <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                    {siteConfig.proof.reviewCount}+ reviews
                  </div>
                </div>
                {siteConfig.proof.accreditations.length ? (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-(--color-foreground)/60">
                      Accreditations
                    </div>
                    <div className="space-y-3">
                      {siteConfig.proof.accreditations.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 py-3"
                        >
                          <div className="text-sm font-semibold text-(--color-foreground)">
                            {item.name}
                          </div>
                          {item.logo ? (
                            <Image
                              src={item.logo}
                              alt={item.name}
                              width={120}
                              height={40}
                              className="h-8 w-auto opacity-90"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <SectionHeader
          eyebrow="What we stand for"
          title="Quality work, clear communication, tidy installs"
          description="A simple approach that keeps your project on track from quote to completion."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-7 shadow-sm ring-1 ring-(--color-foreground)/5">
            <div className="text-sm font-semibold text-(--color-foreground)">
              Built to last
            </div>
            <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
              Proper sub-base preparation and neat detailing for long-term
              durability.
            </p>
          </div>
          <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-7 shadow-sm ring-1 ring-(--color-foreground)/5">
            <div className="text-sm font-semibold text-(--color-foreground)">
              Clear quotes
            </div>
            <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
              Transparent pricing and realistic timelines, with no surprises.
            </p>
          </div>
          <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-7 shadow-sm ring-1 ring-(--color-foreground)/5">
            <div className="text-sm font-semibold text-(--color-foreground)">
              Clean finish
            </div>
            <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
              Respectful, tidy workmanship and a finish designed to lift curb
              appeal.
            </p>
          </div>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
