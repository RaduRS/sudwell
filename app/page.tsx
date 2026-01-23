import { AreasServed } from "@/components/home/AreasServed";
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
      <ServicesGrid />
      <ProcessSteps />
      <Gallery />
      <Reviews />
      <AreasServed />
      <CTASection />
    </main>
  );
}
