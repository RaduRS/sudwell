import { siteConfig } from "@/config/site.config";

export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.company.tradingName,
    image: `${siteConfig.seo.siteUrl}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.county,
      postalCode: siteConfig.contact.address.postcode,
      addressCountry: siteConfig.contact.address.country,
    },
    telephone: siteConfig.contact.phoneFormatted,
    url: siteConfig.seo.siteUrl,
    openingHours: [
      siteConfig.contact.openingHours.weekdays,
      siteConfig.contact.openingHours.weekends,
    ],
    areaServed: siteConfig.areas.map((area) => area.name),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.proof.averageRating,
      reviewCount: siteConfig.proof.reviewCount,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: siteConfig.seo.offerCatalogName,
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDesc,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
