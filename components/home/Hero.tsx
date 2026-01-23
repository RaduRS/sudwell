import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/layout/Container";
import { TrustBadges } from "@/components/shared/TrustBadges";

export function Hero() {
  const title = siteConfig.home.hero.title
    .replace("{tradingName}", siteConfig.company.tradingName)
    .replace("{tagline}", siteConfig.company.tagline);
  const subheading = siteConfig.home.hero.subheading
    .replace("{serviceArea}", siteConfig.contact.serviceArea.join(", "))
    .replace("{city}", siteConfig.contact.address.city);
  const backgroundImage = siteConfig.home.hero.backgroundImage ?? "";
  const backgroundVideo = siteConfig.home.hero.backgroundVideo ?? "";
  const hasBackground = Boolean(backgroundImage || backgroundVideo);
  const highlights = [
    {
      label: "Average rating",
      value: `${siteConfig.proof.averageRating.toFixed(1)} ★`,
    },
    {
      label: "Reviews",
      value: `${siteConfig.proof.reviewCount}+`,
    },
    {
      label: "Service radius",
      value: `${siteConfig.contact.serviceRadius} mile radius`,
    },
  ];

  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-28 ${
        hasBackground ? "" : "bg-(--color-background)"
      }`}
    >
      {backgroundVideo ? (
        <video
          src={backgroundVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : backgroundImage ? (
        <div
          role="img"
          aria-label={title}
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}
      {hasBackground ? <div className="absolute inset-0 bg-black/65" /> : null}
      <Container className="relative z-10 space-y-12">
        <div className="max-w-3xl space-y-6">
          <h1
            className={`text-4xl font-semibold tracking-tight sm:text-6xl ${
              hasBackground
                ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]"
                : "text-(--color-foreground)"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-base leading-relaxed sm:text-xl ${
              hasBackground
                ? "text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                : "text-(--color-foreground)/70"
            }`}
          >
            {subheading}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.contact.phoneFormatted}`}
              className={`rounded-full bg-(--color-primary) px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                hasBackground
                  ? "shadow-lg shadow-black/20 ring-1 ring-white/20"
                  : ""
              }`}
            >
              {siteConfig.home.hero.primaryCtaLabel}
            </a>
            <a
              href="#quote"
              className={`rounded-full px-7 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:text-base ${
                hasBackground
                  ? "bg-white/95 text-(--color-primary) shadow-lg shadow-black/10 ring-1 ring-(--color-secondary)/35 hover:bg-white"
                  : "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
              }`}
            >
              {siteConfig.home.hero.secondaryCtaLabel}
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border px-4 py-3 text-left shadow-sm ring-1 ring-(--color-foreground)/5 ${
                  hasBackground
                    ? "border-white/20 bg-white/10 text-white shadow-black/10"
                    : "border-(--color-foreground)/10 bg-(--color-background) text-(--color-foreground)"
                }`}
              >
                <div
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    hasBackground
                      ? "text-white/70"
                      : "text-(--color-foreground)/60"
                  }`}
                >
                  {item.label}
                </div>
                <div className="mt-1 text-lg font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <TrustBadges />
      </Container>
    </section>
  );
}
