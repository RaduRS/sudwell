import Link from "next/link";
import type { CSSProperties } from "react";

type ReviewCardProps = {
  id?: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  clampLines?: number;
  readMoreHref?: string;
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getReviewId = (name: string, date: string) => {
  const nameSlug = toSlug(name) || "customer";
  const dateSlug = toSlug(date) || "date";
  return `review-${nameSlug}-${dateSlug}`;
};

export function ReviewCard({
  id,
  name,
  date,
  rating,
  text,
  clampLines,
  readMoreHref,
}: ReviewCardProps) {
  const trimmedName = name.trim();
  const initial = trimmedName ? (trimmedName[0]?.toUpperCase() ?? "R") : "R";
  const avatarBackgrounds = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-teal-500",
    "bg-amber-500",
  ];
  const avatarIndex =
    trimmedName.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarBackgrounds.length;
  const avatarBackgroundClass = avatarBackgrounds[avatarIndex] ?? "bg-blue-500";

  const filledStars = Math.max(0, Math.min(5, Math.round(rating)));
  const textClampStyle: CSSProperties | undefined =
    clampLines && clampLines > 0
      ? {
          display: "-webkit-box",
          WebkitLineClamp: clampLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : undefined;

  return (
    <div
      id={id}
      className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 shadow-sm ring-1 ring-(--color-foreground)/5"
    >
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${avatarBackgroundClass}`}
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-(--color-foreground)">
                {trimmedName || "Customer"}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--color-foreground)/60">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`${rating.toFixed(1)} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < filledStars
                          ? "text-amber-400"
                          : "text-(--color-foreground)/25"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span aria-hidden="true">•</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="relative text-sm leading-relaxed text-(--color-foreground)/75">
          <span
            style={textClampStyle}
            className={readMoreHref ? "pr-8" : undefined}
          >
            {text}
          </span>
          {readMoreHref ? (
            <Link
              href={readMoreHref}
              aria-label={`Read full review from ${trimmedName || "Customer"}`}
              className="absolute right-0 bottom-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-(--color-foreground)/15 bg-(--color-background) text-(--color-primary) shadow-sm transition hover:text-(--color-primary)/80"
            >
              <span className="pointer-events-none absolute inset-y-0 right-0 z-0 w-10 bg-gradient-to-l from-(--color-secondary)/6 via-(--color-secondary)/6 to-transparent" />
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative z-10 h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : null}
        </p>
      </div>
    </div>
  );
}
