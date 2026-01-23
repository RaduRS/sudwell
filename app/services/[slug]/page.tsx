import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const getService = (slug: string) =>
  siteConfig.services.find((service) => service.slug === slug);

export const generateStaticParams = async () => {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
};

export const generateMetadata = async ({
  params,
}: ServicePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return {
      title: `Service not found | ${siteConfig.company.tradingName}`,
      description: siteConfig.seo.baseDescription,
      alternates: {
        canonical: `${siteConfig.seo.siteUrl}/services`,
      },
    };
  }

  const city = siteConfig.contact.address.city;
  const title = `${service.name} in ${city} | ${siteConfig.company.tradingName}`;
  const description = `${service.shortDesc} Call ${siteConfig.contact.phone} for a free quote.`;
  const url = `${siteConfig.seo.siteUrl}/services/${service.slug}`;

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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    notFound();
  }

  const city = siteConfig.contact.address.city;
  const pageTitle = `${service.name} in ${city}`;
  const mainImage = service.gallery[0] ?? "";
  const highlightFeatures = service.features.slice(0, 3);
  const galleryItems =
    service.gallery.length > 0 ? service.gallery : ["", "", ""];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.longDesc || service.shortDesc,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.company.tradingName,
      telephone: siteConfig.contact.phoneFormatted,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.county,
        postalCode: siteConfig.contact.address.postcode,
        addressCountry: siteConfig.contact.address.country,
      },
    },
    areaServed: siteConfig.areas.map((area) => area.name),
    offers: service.priceRange
      ? {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GBP",
            description: service.priceRange,
          },
        }
      : undefined,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.seo.siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${siteConfig.seo.siteUrl}/services/${service.slug}`,
      },
    ],
  };
  const faqSchema = service.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;
  const schema = [
    serviceSchema,
    breadcrumbSchema,
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-14 sm:py-20">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-(--color-foreground)/60">
          <Link href="/" className="hover:text-(--color-foreground)">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-(--color-foreground)">
            Services
          </Link>
          <span>/</span>
          <span className="text-(--color-foreground)">{service.name}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {pageTitle}
              </h1>
              {service.priceRange ? (
                <span className="rounded-full border border-(--color-secondary)/25 bg-(--color-secondary)/10 px-3 py-1 text-xs font-semibold text-(--color-foreground)">
                  {service.priceRange}
                </span>
              ) : null}
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
              {service.longDesc || service.shortDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="w-fit rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
              >
                Call {siteConfig.contact.phone}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary)/80"
              >
                Request a free quote
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
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 shadow-sm ring-1 ring-(--color-foreground)/5">
            {mainImage ? (
              <>
                <div
                  role="img"
                  aria-label={`${service.name} preview`}
                  style={{ backgroundImage: `url(${mainImage})` }}
                  className="absolute inset-0 bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="bg-(--color-secondary)/15" />
                <div className="bg-(--color-accent)/10" />
              </div>
            )}
            <div
              className={`relative z-10 flex h-full flex-col justify-end gap-3 p-6 ${
                mainImage ? "text-white" : "text-(--color-foreground)"
              }`}
            >
              <div
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                  mainImage
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-(--color-foreground)/10 bg-(--color-background)"
                }`}
              >
                Project preview
              </div>
              <div className="text-lg font-semibold">{service.name}</div>
              {highlightFeatures.length ? (
                <div className="flex flex-wrap gap-2">
                  {highlightFeatures.map((feature) => (
                    <span
                      key={feature}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        mainImage
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-(--color-foreground)/10 bg-(--color-background) text-(--color-foreground)/70"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {service.features.length ? (
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <h2 className="text-xl font-semibold text-(--color-foreground)">
                What’s included
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-(--color-foreground)/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Recent {service.name} work
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((image, index) => (
                <div
                  key={`${service.slug}-gallery-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5"
                >
                  {image ? (
                    <>
                      <div
                        role="img"
                        aria-label={`${service.name} example ${index + 1}`}
                        style={{ backgroundImage: `url(${image})` }}
                        className="absolute inset-0 bg-cover bg-center"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  ) : (
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="bg-(--color-secondary)/15" />
                      <div className="bg-(--color-accent)/10" />
                    </div>
                  )}
                  <div
                    className={`relative z-10 p-4 text-xs font-semibold ${
                      image ? "text-white" : "text-(--color-foreground)"
                    }`}
                  >
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 ${
                        image
                          ? "border-white/30 bg-white/10"
                          : "border-(--color-foreground)/10 bg-(--color-background)"
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {service.faqs.length ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-(--color-foreground)">
                Service FAQs
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, index) => (
                  <div
                    key={`${faq.q}-${index}`}
                    className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-5 shadow-sm ring-1 ring-(--color-foreground)/5"
                  >
                    <div className="text-sm font-semibold text-(--color-foreground)">
                      {faq.q}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
