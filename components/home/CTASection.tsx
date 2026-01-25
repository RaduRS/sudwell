import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site.config";

export function CTASection() {
  return (
    <section
      id="quote"
      className="bg-(--color-foreground)/5 py-12 text-(--color-foreground) sm:py-16 pt-0!"
    >
      <Container>
        <div className="flex flex-col gap-6 rounded-3xl bg-(--color-primary) px-6 py-10 text-white shadow-xl shadow-black/10 ring-1 ring-white/20 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Start your project
            </div>
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
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-white/15 sm:text-base"
            >
              {siteConfig.home.cta.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
