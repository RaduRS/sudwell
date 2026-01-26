import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CookiePreferencesButton } from "@/components/shared/CookiePreferencesButton";
import { getSiteConfig } from "@/config/site-config.server";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Information about cookies and similar technologies used on this website.",
};

export default async function CookiesPage() {
  const siteConfig = await getSiteConfig();
  const usesGoogleAnalytics = Boolean(
    siteConfig.integrations.googleAnalyticsId,
  );
  const usesFacebookPixel = Boolean(siteConfig.integrations.facebookPixel);
  const hasNonEssential = usesGoogleAnalytics || usesFacebookPixel;

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-16">
        <div className="space-y-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
            <Link href="/" className="hover:text-(--color-foreground)">
              Home
            </Link>
            <span>/</span>
            <span className="text-(--color-foreground)">Cookies</span>
          </nav>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Cookies
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
              This page explains how cookies and similar technologies are used
              on this website, and how you can manage your choices.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              What Cookies Are
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Cookies are small text files stored on your device. They are used
              to help websites function, improve user experience, and (where
              enabled) understand how visitors use a site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Cookies We Use
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-(--color-foreground)/70">
              <div className="space-y-2">
                <div className="font-semibold text-(--color-foreground)">
                  Essential
                </div>
                <p>
                  These are needed for the website to function securely. We do
                  not use analytics or advertising cookies unless configured and
                  enabled.
                </p>
              </div>

              {!siteConfig.cookies.enabled ? (
                <div className="space-y-2">
                  <div className="font-semibold text-(--color-foreground)">
                    Analytics and marketing
                  </div>
                  <p>
                    This website is currently configured not to use
                    non-essential cookies for analytics or advertising.
                  </p>
                </div>
              ) : !hasNonEssential ? (
                <div className="space-y-2">
                  <div className="font-semibold text-(--color-foreground)">
                    Analytics and marketing
                  </div>
                  <p>
                    Cookie preferences are enabled, but no analytics or
                    advertising integrations are currently configured.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="font-semibold text-(--color-foreground)">
                      Analytics and marketing
                    </div>
                    <p>
                      Where required under UK law (including UK GDPR and PECR),
                      we ask for your consent before placing non-essential
                      cookies.
                    </p>
                    <CookiePreferencesButton className="inline-flex w-full items-center justify-center rounded-full bg-(--color-primary) px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary)/90 sm:w-auto">
                      Change cookie preferences
                    </CookiePreferencesButton>
                  </div>

                  {usesGoogleAnalytics ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-(--color-foreground)">
                        Google Analytics
                      </div>
                      <p>
                        Used to measure website traffic and usage patterns (for
                        example, pages viewed). This helps improve content and
                        performance.
                      </p>
                    </div>
                  ) : null}

                  {usesFacebookPixel ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-(--color-foreground)">
                        Facebook Pixel
                      </div>
                      <p>
                        Used to measure the effectiveness of advertising and to
                        help understand which marketing results in enquiries.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Managing Cookies
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You can usually manage cookies through your browser settings,
              including blocking cookies and deleting existing cookies. Please
              note that disabling some cookies may affect how websites function.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              More Information
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              For broader information on how personal data is handled, see our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                Privacy Policy
              </Link>
              . If you have questions, please contact us via the{" "}
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
