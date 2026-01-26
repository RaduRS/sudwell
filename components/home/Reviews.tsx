import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getReviewId, ReviewCard } from "@/components/shared/ReviewCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function Reviews() {
  const description = siteConfig.home.reviews.description
    .replace("{rating}", siteConfig.proof.averageRating.toString())
    .replace("{count}", siteConfig.proof.reviewCount.toString());

  const reviews = siteConfig.home.reviews.items;
  const featuredReviews = reviews.slice(0, 3);
  const clampThreshold = 110;
  const hasMoreReviews = reviews.length > featuredReviews.length;
  const hasClampedReview = featuredReviews.some(
    (review) => review.text.trim().length > clampThreshold,
  );
  const showAllReviewsLink = hasMoreReviews || hasClampedReview;

  return (
    <section className="bg-(--color-secondary)/5 py-16 sm:py-24">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <SectionHeader
              eyebrow={siteConfig.home.reviews.eyebrow}
              title={siteConfig.home.reviews.title}
              description={description}
            />
          </div>
          {showAllReviewsLink ? (
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/reviews"
                className="rounded-full border border-(--color-primary)/35 px-5 py-2 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
              >
                View all reviews
              </Link>
            </div>
          ) : null}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => {
            const reviewId = getReviewId(review.name, review.date);
            const isClamped = review.text.trim().length > clampThreshold;
            return (
              <ReviewCard
                key={`${review.name}-${review.date}`}
                id={reviewId}
                {...review}
                clampLines={2}
                readMoreHref={isClamped ? `/reviews#${reviewId}` : undefined}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
