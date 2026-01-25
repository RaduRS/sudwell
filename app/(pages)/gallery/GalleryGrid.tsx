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
      <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-8 text-sm text-(--color-foreground)/70 shadow-sm ring-1 ring-(--color-foreground)/5">
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
            className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 shadow-sm ring-1 ring-(--color-foreground)/5 transition hover:-translate-y-1 hover:border-(--color-accent)/30 hover:shadow-md"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 transition group-hover:opacity-100" />
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

