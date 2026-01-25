type ReviewCardProps = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export function ReviewCard({ name, date, rating, text }: ReviewCardProps) {
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
  return (
    <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5">
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
        <p className="text-sm leading-relaxed text-(--color-foreground)/75">
          {text}
        </p>
      </div>
    </div>
  );
}
