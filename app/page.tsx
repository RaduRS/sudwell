import { CTASection } from "@/components/home/CTASection";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Reviews } from "@/components/home/Reviews";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export default function Home() {
  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <SchemaMarkup />
      <Hero />
      <Reviews />
      <ServicesGrid />
      <ProcessSteps />
      <Gallery />
      {/* <AreasServed /> */}
      <CTASection />
    </main>
  );
}
