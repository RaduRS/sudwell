import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

const getArea = (slug: string) =>
  siteConfig.areas.find((area) => area.slug === slug);

export const generateStaticParams = async () => {
  return siteConfig.areas.map((area) => ({ slug: area.slug }));
};

export const generateMetadata = async ({
  params,
}: AreaPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) {
    return {
      title: `Area not found | ${siteConfig.company.tradingName}`,
      description: siteConfig.seo.baseDescription,
      alternates: {
        canonical: `${siteConfig.seo.siteUrl}/areas`,
      },
    };
  }

  const title = `Driveway & Paving in ${area.name} | ${siteConfig.company.tradingName}`;
  const description = `Local driveway and paving specialists serving ${area.name}. Call ${siteConfig.contact.phone} for a free quote.`;
  const url = `${siteConfig.seo.siteUrl}/areas/${area.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.company.tradingName,
      type: "website",
      images: [{ url: "/images/og-image.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
};

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) {
    notFound();
  }

  const postcodes = area.postcodes?.filter(Boolean) ?? [];
  const pageTitle = `Driveway & paving in ${area.name}`;
  const serviceHighlights = siteConfig.services.slice(0, 6);
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.tradingName,
    url: `${siteConfig.seo.siteUrl}/areas/${area.slug}`,
    telephone: siteConfig.contact.phoneFormatted,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.county,
      postalCode: siteConfig.contact.address.postcode,
      addressCountry: siteConfig.contact.address.country,
    },
    areaServed: [
      {
        "@type": "Place",
        name: area.name,
      },
    ],
    makesOffer: siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div className="space-y-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              <Link href="/" className="hover:text-(--color-foreground)">
                Home
              </Link>
              <span>/</span>
              <Link href="/areas" className="hover:text-(--color-foreground)">
                Areas
              </Link>
              <span>/</span>
              <span className="text-(--color-foreground)">{area.name}</span>
            </nav>
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
                Local coverage
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {pageTitle}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Professional driveway and paving services across {area.name} and
                nearby streets. Get a free quote from a local team you can
                trust.
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
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.contact.serviceRadius} mile radius
              </div>
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.proof.averageRating.toFixed(1)} ★ average rating
              </div>
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.proof.reviewCount}+ reviews
              </div>
            </div>
            {postcodes.length ? (
              <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                  Postcode areas
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {postcodes.map((postcode) => (
                    <span
                      key={`${area.slug}-${postcode}`}
                      className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80"
                    >
                      {postcode}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Get a quote
              </div>
              <div className="mt-3 space-y-3 text-sm text-(--color-foreground)/75">
                <div className="font-semibold text-(--color-foreground)">
                  {siteConfig.company.tradingName}
                </div>
                <div>
                  Based in {siteConfig.contact.address.city}, serving{" "}
                  {area.name}.
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href={`tel:${siteConfig.contact.phoneFormatted}`}
                    className="inline-flex items-center justify-center rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                  >
                    Call {siteConfig.contact.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-5 py-2.5 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                  >
                    Request a free quote
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Popular services
              </div>
              <div className="mt-4 grid gap-2 text-sm font-semibold">
                {serviceHighlights.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-4 py-3 transition hover:bg-(--color-secondary)/10 hover:shadow-sm"
                  >
                    <span>{service.name}</span>
                    <span className="text-(--color-foreground)/50">View</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
              Explore services
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.services.map((service) => {
                const preview = service.gallery[0] ?? "";
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 shadow-sm ring-1 ring-(--color-foreground)/5 transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-36 overflow-hidden">
                      {preview ? (
                        <Image
                          src={preview}
                          alt={service.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="absolute inset-0 grid grid-cols-2">
                          <div className="bg-(--color-secondary)/12" />
                          <div className="bg-(--color-accent)/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/15" />
                      <div className="relative z-10 flex h-full items-end px-5 py-4">
                        <div className="rounded-2xl border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                          {service.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full flex-col gap-2 p-4">
                      <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                        {service.shortDesc}
                      </p>
                      <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition group-hover:text-(--color-primary)/80">
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
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </main>
  );
}
