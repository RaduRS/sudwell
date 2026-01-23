import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

export function CTASection() {
  return (
    <section
      id="quote"
      className="bg-(--color-primary) py-16 text-white sm:py-20"
    >
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteConfig.home.cta.title}
          </h2>
          <p className="text-sm text-white/80 sm:text-base">
            {siteConfig.home.cta.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.contact.phoneFormatted}`}
            className="rounded-full bg-white/95 px-7 py-3.5 text-sm font-semibold text-(--color-primary) shadow-lg shadow-black/10 ring-1 ring-(--color-secondary)/35 transition hover:bg-white sm:text-base"
          >
            {siteConfig.home.cta.primaryCtaLabel}
          </a>
          <a
            href="/contact"
            className="rounded-full border border-(--color-secondary)/45 bg-(--color-secondary)/15 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-(--color-secondary)/20 sm:text-base"
          >
            {siteConfig.home.cta.secondaryCtaLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
