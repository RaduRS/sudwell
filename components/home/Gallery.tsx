"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";
import Lightbox from "yet-another-react-lightbox";

export function Gallery() {
  type GalleryItem = (typeof siteConfig.home.gallery.items)[number];
  const items = siteConfig.home.gallery.items;
  const cardBase =
    "group relative overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:-translate-y-1 hover:shadow-md";

  const { slides, slideIndexByItemIndex } = useMemo(() => {
    const nextSlides: { src: string; alt: string }[] = [];
    const nextIndexMap: Record<number, number | null> = {};

    items.forEach((item, itemIndex) => {
      const src = item.image?.trim() ?? "";
      if (!src) {
        nextIndexMap[itemIndex] = null;
        return;
      }

      nextIndexMap[itemIndex] = nextSlides.length;
      nextSlides.push({ src, alt: item.label });
    });

    return { slides: nextSlides, slideIndexByItemIndex: nextIndexMap };
  }, [items]);

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const renderCard = (
    item: GalleryItem,
    size: "featured" | "standard",
    key: string,
    itemIndex: number,
    extraClass?: string,
  ) => {
    const imageStyle = item.image
      ? { backgroundImage: `url(${item.image})` }
      : undefined;
    const mediaHeight =
      size === "featured"
        ? "min-h-[320px] sm:min-h-[360px] lg:min-h-[420px]"
        : "min-h-52 sm:min-h-56 lg:min-h-60";
    const labelSize =
      size === "featured" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";
    const slideIndex = slideIndexByItemIndex[itemIndex] ?? null;

    return (
      <button
        key={key}
        type="button"
        aria-label={item.image ? `Open ${item.label}` : item.label}
        disabled={slideIndex === null}
        className={[
          cardBase,
          "text-left disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-sm",
          extraClass,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (slideIndex === null) {
            return;
          }
          setLightboxIndex(slideIndex);
          setLightboxOpen(true);
        }}
      >
        <div className={`relative ${mediaHeight}`}>
          <div
            role="img"
            aria-label={item.label}
            style={imageStyle}
            className={`absolute inset-0 ${
              item.image ? "bg-cover bg-center" : "bg-(--color-foreground)/10"
            } transition duration-500 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="relative z-10 flex h-full items-end p-5 sm:p-6">
            <div
              className={`inline-flex w-fit items-center rounded-full bg-white/95 font-semibold text-(--color-foreground) shadow-sm ${labelSize}`}
            >
              {item.label}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow={siteConfig.home.gallery.eyebrow}
          title={siteConfig.home.gallery.title}
          description={siteConfig.home.gallery.description}
        />
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-(--color-background) to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-(--color-background) to-transparent sm:w-16" />
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 lg:scroll-px-10">
            {items.map((item, index) =>
              renderCard(
                item,
                "standard",
                `${item.label}-${index}`,
                index,
                "min-w-[85%] flex-1 snap-center sm:min-w-[55%] lg:min-w-[32%]",
              ),
            )}
          </div>
        </div>
      </Container>
      {slides.length ? (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
          carousel={{ finite: false }}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
        />
      ) : null}
    </section>
  );
}
