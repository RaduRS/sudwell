import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function Gallery() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeader
          eyebrow={siteConfig.home.gallery.eyebrow}
          title={siteConfig.home.gallery.title}
          description={siteConfig.home.gallery.description}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.home.gallery.items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="group overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                role="img"
                aria-label={item.label}
                style={
                  item.image
                    ? { backgroundImage: `url(${item.image})` }
                    : undefined
                }
                className="aspect-[4/3] bg-(--color-foreground)/5 bg-cover bg-center"
              />
              <div className="flex items-center justify-between gap-3 border-t border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3">
                <div className="text-sm font-semibold text-(--color-foreground)">
                  {item.label}
                </div>
                <span className="h-2 w-2 rounded-full bg-(--color-accent)" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
