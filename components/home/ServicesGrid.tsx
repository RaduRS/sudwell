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
    <section className="bg-(--color-background) py-16 sm:py-24">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={siteConfig.home.services.eyebrow}
            title={siteConfig.home.services.title}
            description={siteConfig.home.services.description}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/services"
              className="rounded-full border border-(--color-primary)/35 px-5 py-2 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
            >
              View all services
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const preview = service.gallery[0] ?? "";
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 shadow-sm ring-1 ring-(--color-foreground)/5 transition-shadow hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  {preview ? (
                    <div
                      role="img"
                      aria-label={service.name}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${preview})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="bg-(--color-secondary)/12" />
                      <div className="bg-(--color-accent)/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex h-full flex-col gap-4 p-5">
                  <div className="text-lg font-semibold text-(--color-foreground)">
                    {service.name}
                  </div>
                  <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                    {service.shortDesc}
                  </p>
                  <div className="mt-auto space-y-4">
                    {service.features.length ? (
                      <div className="flex flex-wrap gap-2">
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
                    <div className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-(--color-foreground) transition group-hover:text-(--color-foreground)/70">
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
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
