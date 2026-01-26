import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";

export function ProcessSteps() {
  return (
    <section className="accent-surface bg-(--color-accent)/5 py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow={siteConfig.home.process.eyebrow}
          title={siteConfig.home.process.title}
          description={siteConfig.home.process.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.home.process.steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-(--color-foreground) bg-(--color-accent)/10 p-7 shadow-sm ring-1 ring-(--color-foreground)/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-accent)/30 bg-(--color-accent)/10 text-sm font-semibold text-(--color-accent)">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="text-base font-semibold text-(--color-foreground)">
                  {step.title}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
