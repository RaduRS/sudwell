import { Container } from "@/components/layout/Container";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function Reviews() {
  const description = siteConfig.home.reviews.description
    .replace("{rating}", siteConfig.proof.averageRating.toString())
    .replace("{count}", siteConfig.proof.reviewCount.toString());

  return (
    <section className="bg-(--color-secondary)/5 py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeader
          eyebrow={siteConfig.home.reviews.eyebrow}
          title={siteConfig.home.reviews.title}
          description={description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.home.reviews.items.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
