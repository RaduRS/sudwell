type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      {eyebrow ? (
        <div className="inline-flex w-fit items-center rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-(--color-foreground) sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
