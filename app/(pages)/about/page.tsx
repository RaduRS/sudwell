import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  ClipboardCheck,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `About ${siteConfig.company.tradingName} | Driveway & Paving Specialists`,
  description: `Learn about ${siteConfig.company.tradingName}, a trusted local driveway and paving team serving ${siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean)
    .join(", ")}. Call ${siteConfig.contact.phone} for a free quote.`,
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
  const values = siteConfig.about.values;
  const howWeWork = siteConfig.about.howWeWorkSteps;
  const serviceAreaNames = siteConfig.areas
    .map((area) => area.name)
    .filter(Boolean);

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
              <span className="text-(--color-foreground)">About</span>
            </nav>
            <div className="flex flex-wrap gap-2">
              {serviceAreaNames.map((area) => (
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
                About {siteConfig.company.tradingName}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                {siteConfig.about.heroDescription}
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
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-lg font-semibold text-(--color-foreground)">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                    <span>
                      {siteConfig.contact.address.city},{" "}
                      {siteConfig.contact.address.county}
                    </span>
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
          eyebrow={siteConfig.about.standForEyebrow}
          title={siteConfig.about.standForTitle}
          description={siteConfig.about.standForDescription}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {values.map((item, index) => {
            const icon =
              index === 0 ? (
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              ) : index === 1 ? (
                <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              );

            return (
              <div
                key={`${item.title}-${index}`}
                className="group rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:border-(--color-foreground)/15 hover:bg-(--color-secondary)/6 hover:shadow-md sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 text-(--color-foreground) transition group-hover:bg-(--color-primary)/12 group-hover:text-(--color-primary)">
                    {icon}
                  </div>
                  <div className="min-w-0 text-base font-semibold tracking-tight text-(--color-foreground)">
                    {item.title}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
                  {item.description}
                </p>

                {item.bullets.length ? (
                  <ul className="mt-5 space-y-2 text-sm text-(--color-foreground)/75">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)/70" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-7 shadow-sm ring-1 ring-(--color-foreground)/5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              {siteConfig.about.howWeWorkTitle}
            </div>
            <ol className="mt-5 divide-y divide-(--color-foreground)/10">
              {howWeWork.map((step, index) => (
                <li
                  key={`${step.title}-${index}`}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--color-foreground)/15 bg-(--color-background) text-xs font-semibold text-(--color-foreground)">
                      {index + 1}
                    </div>
                    <div className="text-sm font-semibold text-(--color-foreground)">
                      {step.title}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-7 shadow-sm ring-1 ring-(--color-foreground)/5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              {siteConfig.about.quoteTitle}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-(--color-foreground)/70">
              {siteConfig.about.quoteDescription}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call {siteConfig.contact.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Request a free quote
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceAreaNames.map((area) => (
                <span
                  key={`about-coverage-${area}`}
                  className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                >
                  {area}
                </span>
              ))}
            </div>
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
