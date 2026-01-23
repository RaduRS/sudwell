import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "./Container";

export function Header() {
  const primaryCtaLabel = siteConfig.header.primaryCtaLabel.replace(
    "{phone}",
    siteConfig.contact.phone,
  );
  const logo = siteConfig.company.logo;

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-foreground)/10 bg-(--color-background)/80 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold text-(--color-foreground) sm:text-lg"
        >
          {logo ? (
            <Image
              src={logo}
              alt={siteConfig.company.tradingName}
              width={128}
              height={32}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span>{siteConfig.company.tradingName}</span>
          )}
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-(--color-foreground)/10 bg-(--color-secondary)/8 p-1 text-sm font-medium text-(--color-foreground)/70 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-(--color-background) hover:text-(--color-foreground)"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.contact.phoneFormatted}`}
            className="rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 sm:px-5 sm:py-2.5"
          >
            {primaryCtaLabel}
          </a>
        </div>
      </Container>
    </header>
  );
}
