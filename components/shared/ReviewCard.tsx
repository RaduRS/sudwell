type ReviewCardProps = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export function ReviewCard({ name, date, rating, text }: ReviewCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) shadow-sm ring-1 ring-(--color-foreground)/5">
      <div className="h-1 w-full bg-(--color-accent)/70" />
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-(--color-foreground)/60">
          <span>{name}</span>
          <span>{date}</span>
        </div>
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-3 py-1 text-sm font-semibold text-(--color-foreground)">
            {rating.toFixed(1)} ★
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-(--color-foreground)/70">
          {text}
        </p>
      </div>
    </div>
  );
}
