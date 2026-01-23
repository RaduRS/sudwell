import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ServicesGrid() {
  const services = siteConfig.services.slice(
    0,
    siteConfig.home.services.featuredCount,
  );

  return (
    <section className="bg-(--color-background) py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeader
          eyebrow={siteConfig.home.services.eyebrow}
          title={siteConfig.home.services.title}
          description={siteConfig.home.services.description}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-(--color-foreground)/60">
            Explore the best surface for your home.
          </span>
          <Link
            href="/services"
            className="text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary)/80"
          >
            View all services
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:-translate-y-1 hover:border-(--color-accent)/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3 border-b border-(--color-foreground)/10 bg-(--color-foreground)/5 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--color-secondary)/15 text-sm font-semibold text-(--color-secondary)">
                  {service.name.charAt(0)}
                </div>
                <div className="text-lg font-semibold text-(--color-foreground)">
                  {service.name}
                </div>
              </div>
              <div className="flex h-full flex-col p-5">
                <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                  {service.shortDesc}
                </p>
                {service.features.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-(--color-foreground)/10 bg-(--color-background) px-3 py-1 text-xs font-semibold text-(--color-foreground)/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-(--color-foreground) transition group-hover:text-(--color-foreground)/70"
                >
                  {siteConfig.home.services.ctaLabel}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-(--color-accent)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
