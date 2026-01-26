"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

type GalleryGridProps = {
  slides: { src: string; alt: string }[];
};

export function GalleryGrid({ slides }: GalleryGridProps) {
  const normalizedSlides = useMemo(
    () =>
      slides
        .map((slide) => ({ src: slide.src.trim(), alt: slide.alt }))
        .filter((slide) => slide.src),
    [slides],
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!normalizedSlides.length) {
    return (
      <div className="rounded-xl border border-(--color-foreground)/10 bg-(--color-background) p-8 text-sm text-(--color-foreground)/70 shadow-sm ring-1 ring-(--color-foreground)/5">
        No gallery images yet.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {normalizedSlides.map((slide, slideIndex) => (
          <button
            key={`${slide.src}-${slideIndex}`}
            type="button"
            aria-label={`Open image ${slideIndex + 1}`}
            onClick={() => {
              setIndex(slideIndex);
              setOpen(true);
            }}
            className="group relative aspect-4/3 cursor-pointer rounded-xl bg-(--color-background) shadow-lg shadow-black/10 ring-1 ring-black/5 transition-shadow duration-150 hover:shadow-xl hover:shadow-black/15"
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-150 ease-out will-change-transform group-hover:scale-[1.15]"
              />
              {slide.alt ? (
                <div className="pointer-events-none absolute left-3 top-3 z-10 inline-flex max-w-[calc(100%-1.5rem)] items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <span className="truncate">{slide.alt}</span>
                </div>
              ) : null}
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={normalizedSlides}
        index={index}
        carousel={{ finite: false }}
        on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
      />
    </>
  );
}
