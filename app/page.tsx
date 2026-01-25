import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Reviews } from "@/components/home/Reviews";
import { ServicesGrid } from "@/components/home/ServicesGrid";
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
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <SchemaMarkup />
      <Hero />
      <Reviews />
      <ServicesGrid />
      <ProcessSteps />
      <Gallery />
      <CTASection />
      <section>
        <Container className="flex flex-col gap-3 py-6">
          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-4 py-2 text-xs font-semibold text-(--color-foreground)/70 transition hover:border-(--color-foreground)/25 hover:text-(--color-foreground)"
          >
            Open in Google Maps
          </a>
          <div className="text-sm text-(--color-foreground)/70">
            Serving {siteConfig.contact.serviceArea.join(", ")} and nearby areas
            within {siteConfig.contact.serviceRadius} miles of{" "}
            {siteConfig.contact.address.city}.
            <span className="ml-1">
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:underline"
              >
                Contact us
              </Link>
              .
            </span>
          </div>
        </Container>
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
    </main>
  );
}
