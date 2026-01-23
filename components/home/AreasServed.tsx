import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function AreasServed() {
  const description = siteConfig.home.areas.description
    .replace("{radius}", siteConfig.contact.serviceRadius.toString())
    .replace("{city}", siteConfig.contact.address.city);

  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeader
          eyebrow={siteConfig.home.areas.eyebrow}
          title={siteConfig.home.areas.title}
          description={description}
        />
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
      </Container>
    </section>
  );
}
