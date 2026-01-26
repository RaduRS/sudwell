import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function AreasServed() {
  const description = siteConfig.home.areas.description
    .replace("{radius}", siteConfig.contact.serviceRadius.toString())
    .replace("{city}", siteConfig.contact.address.city);

  return (
    <section className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow={siteConfig.home.areas.eyebrow}
          title={siteConfig.home.areas.title}
          description={description}
        />
        <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
            Service areas
          </div>
          <div className="flex flex-wrap gap-3">
            {siteConfig.areas.map((area) => (
              <span
                key={area.slug}
                className="rounded-full border border-(--color-secondary)/25 bg-(--color-secondary)/10 px-4 py-2 text-sm font-medium text-(--color-foreground)"
              >
                {area.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
