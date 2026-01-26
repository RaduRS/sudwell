"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";
import Lightbox from "yet-another-react-lightbox";

export function Gallery() {
  type GalleryItem = (typeof siteConfig.home.gallery.items)[number];
  const items = siteConfig.home.gallery.items;
  const cardBase =
    "group relative cursor-pointer rounded-xl bg-(--color-background) shadow-lg shadow-black/10 ring-1 ring-black/5 transition-shadow duration-150 hover:shadow-xl hover:shadow-black/15";

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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const update = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const nextCanScrollLeft = el.scrollLeft > 4;
      const nextCanScrollRight = el.scrollLeft < maxScrollLeft - 4;

      setCanScrollLeft(nextCanScrollLeft);
      setCanScrollRight(nextCanScrollRight);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    el.scrollBy({
      left: direction * el.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

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
        className={[cardBase, "text-left disabled:cursor-default", extraClass]
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
        <div className={`relative overflow-hidden rounded-xl ${mediaHeight}`}>
          <div
            role="img"
            aria-label={item.label}
            style={imageStyle}
            className={`absolute inset-0 ${
              item.image ? "bg-cover bg-center" : "bg-(--color-foreground)/10"
            } transition-transform duration-150 ease-out will-change-transform group-hover:scale-[1.15]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={siteConfig.home.gallery.eyebrow}
            title={siteConfig.home.gallery.title}
            description={siteConfig.home.gallery.description}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/gallery"
              className="rounded-full border border-(--color-primary)/35 px-5 py-2 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
            >
              View full gallery
            </Link>
          </div>
        </div>
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto pt-4 pb-10 snap-x snap-mandatory scroll-px-4 sm:pt-5 sm:pb-12 sm:scroll-px-6 lg:scroll-px-10"
          >
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
          {canScrollLeft ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 -translate-x-1/4 bg-white backdrop-blur-sm [mask-image:linear-gradient(to_right,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] sm:w-16" />
          ) : null}
          {canScrollRight ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 translate-x-1/4 bg-white backdrop-blur-sm [mask-image:linear-gradient(to_left,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_0%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] sm:w-16" />
          ) : null}
          <div
            className={`absolute inset-y-0 left-2 z-20 flex items-center sm:left-4 ${
              canScrollLeft ? "" : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label="Scroll gallery left"
              onClick={() => scrollByPage(-1)}
              className="cursor-pointer rounded-full border border-(--color-foreground)/15 bg-white/95 p-3 text-(--color-foreground) shadow-lg shadow-black/10 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M12.79 14.77a.75.75 0 0 1-1.06.02L7.5 10.56a.75.75 0 0 1 0-1.06l4.23-4.23a.75.75 0 0 1 1.06 1.06L9.12 10l3.67 3.71a.75.75 0 0 1 0 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`absolute inset-y-0 right-2 z-20 flex items-center sm:right-4 ${
              canScrollRight ? "" : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label="Scroll gallery right"
              onClick={() => scrollByPage(1)}
              className="cursor-pointer rounded-full border border-(--color-foreground)/15 bg-white/95 p-3 text-(--color-foreground) shadow-lg shadow-black/10 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 0 1.06.02l4.23-4.23a.75.75 0 0 0 0-1.06L8.27 5.27a.75.75 0 1 0-1.06 1.06L10.88 10l-3.67 3.71a.75.75 0 0 0 0 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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
