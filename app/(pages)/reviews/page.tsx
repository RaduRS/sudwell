import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Phone, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getReviewId, ReviewCard } from "@/components/shared/ReviewCard";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Customer Reviews | ${siteConfig.company.tradingName}`,
  description: `${siteConfig.proof.averageRating.toFixed(1)} average rating from ${siteConfig.proof.reviewCount}+ reviews. Call ${siteConfig.contact.phone} for a free quote.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/reviews`,
  },
  openGraph: {
    title: `Customer Reviews | ${siteConfig.company.tradingName}`,
    description: `${siteConfig.proof.averageRating.toFixed(1)} average rating from ${siteConfig.proof.reviewCount}+ reviews.`,
    url: `${siteConfig.seo.siteUrl}/reviews`,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Customer Reviews | ${siteConfig.company.tradingName}`,
    description: `${siteConfig.proof.averageRating.toFixed(1)} average rating from ${siteConfig.proof.reviewCount}+ reviews.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function ReviewsPage() {
  const reviews = siteConfig.home.reviews.items;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.tradingName,
    url: `${siteConfig.seo.siteUrl}/reviews`,
    telephone: siteConfig.contact.phoneFormatted,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.county,
      postalCode: siteConfig.contact.address.postcode,
      addressCountry: siteConfig.contact.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.proof.averageRating,
      reviewCount: siteConfig.proof.reviewCount,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

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
              <span className="text-(--color-foreground)">Reviews</span>
            </nav>
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
              <div className="rounded-full border border-(--color-foreground)/15 bg-transparent px-4 py-2 text-xs font-semibold text-(--color-foreground)/80">
                {siteConfig.contact.serviceRadius} miles service radius
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Customer reviews
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
                Recent customer feedback from local projects..
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
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Why customers choose us
              </div>
              <div className="mt-4 space-y-3 text-sm text-(--color-foreground)/70">
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Clear quotes and reliable timelines
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Tidy installation with clean edges
                </div>
                <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                  Built for drainage, durability, and curb appeal
                </div>
              </div>
            </div>

            {siteConfig.proof.reviewsEmbed ? (
              <div className="overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 shadow-sm ring-1 ring-(--color-foreground)/5">
                <div className="border-b border-(--color-foreground)/10 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                    Verified reviews
                  </div>
                </div>
                <div
                  className="p-6"
                  dangerouslySetInnerHTML={{
                    __html: siteConfig.proof.reviewsEmbed,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={`${review.name}-${review.date}`}
              id={getReviewId(review.name, review.date)}
              {...review}
            />
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
