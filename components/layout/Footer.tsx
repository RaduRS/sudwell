import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "./Container";

export function Footer() {
  const socialLinks = [
    { key: "facebook", item: siteConfig.social.facebook },
    { key: "instagram", item: siteConfig.social.instagram },
    { key: "twitter", item: siteConfig.social.twitter },
    { key: "linkedin", item: siteConfig.social.linkedin },
    { key: "youtube", item: siteConfig.social.youtube },
  ];
  const copyrightLabel = siteConfig.footer.copyrightLabel
    .replace("{year}", new Date().getFullYear().toString())
    .replace("{tradingName}", siteConfig.company.tradingName);

  return (
    <footer className="border-t border-(--color-foreground)/10 bg-(--color-background)">
      <Container className="grid gap-10 py-12 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold text-(--color-foreground)">
            {siteConfig.company.tradingName}
          </div>
          <p className="text-sm text-(--color-foreground)/70">{siteConfig.company.tagline}</p>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-(--color-foreground)">
            {siteConfig.footer.quickLinksLabel}
          </div>
          <ul className="space-y-2 text-sm text-(--color-foreground)/70">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-(--color-foreground)">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-(--color-foreground)/70">
          <div className="text-sm font-semibold text-(--color-foreground)">
            {siteConfig.footer.contactLabel}
          </div>
          <div>{siteConfig.contact.phone}</div>
          <div>{siteConfig.contact.email}</div>
          <div>
            {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{" "}
            {siteConfig.contact.address.postcode}
          </div>
        </div>
        <div className="space-y-3 text-sm text-(--color-foreground)/70">
          <div className="text-sm font-semibold text-(--color-foreground)">
            {siteConfig.footer.socialLabel}
          </div>
          <ul className="space-y-2">
            {socialLinks
              .filter((item) => item.item?.url)
              .map((item) => (
                <li key={item.key}>
                  <a
                    href={item.item?.url ?? ""}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-(--color-foreground)"
                  >
                    {item.item?.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-(--color-foreground)/10 py-6 text-xs text-(--color-foreground)/60">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>{copyrightLabel}</div>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-(--color-foreground)">
              {siteConfig.footer.privacyLabel}
            </Link>
            <Link href="/terms" className="hover:text-(--color-foreground)">
              {siteConfig.footer.termsLabel}
            </Link>
            {siteConfig.company.registeredNumber ? (
              <span>{siteConfig.company.legalName} | Company No. {siteConfig.company.registeredNumber}</span>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
