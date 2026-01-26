import { CTASection } from "@/components/home/CTASection";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Reviews } from "@/components/home/Reviews";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { siteConfig } from "@/config/site.config";

export default function Home() {
  const addressLines = [
    siteConfig.contact.address.street,
    siteConfig.contact.address.city,
    siteConfig.contact.address.county,
    siteConfig.contact.address.postcode,
    siteConfig.contact.address.country,
  ].filter(Boolean);
  const addressQuery = encodeURIComponent(addressLines.join(", "));
  const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <SchemaMarkup />
      <Hero />
      <ScrollReveal delayMs={40}>
        <Reviews />
      </ScrollReveal>
      <ScrollReveal delayMs={70}>
        <ServicesGrid />
      </ScrollReveal>
      <ScrollReveal delayMs={80}>
        <ProcessSteps />
      </ScrollReveal>
      <ScrollReveal delayMs={90}>
        <Gallery />
      </ScrollReveal>
      <ScrollReveal delayMs={100}>
        <CTASection />
      </ScrollReveal>
      <ScrollReveal delayMs={110}>
        <section>
          <div className="h-[260px] w-full bg-(--color-foreground)/5 sm:h-[360px]">
            <iframe
              title={`${siteConfig.company.tradingName} location map`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
