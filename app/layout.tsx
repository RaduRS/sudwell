import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { cookies } from "next/headers";
import {
  DM_Sans,
  Geist,
  Geist_Mono,
  Figtree,
  Inter,
  Lora,
  Manrope,
  Merriweather,
  Montserrat,
  Nunito,
  Outfit,
  Poppins,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Raleway,
  Rubik,
  Source_Sans_3,
  Space_Grotesk,
  Work_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { TrackingScripts } from "@/components/shared/TrackingScripts";
import { getSiteConfig } from "@/config/site-config.server";
import { siteConfig } from "@/config/site.config";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const resolveFontFamily = (value: string) => {
  const normalized = value.trim().toLowerCase();
  const fontMap: Record<string, string> = {
    inter: "var(--font-inter)",
    figtree: "var(--font-figtree)",
    poppins: "var(--font-poppins)",
    montserrat: "var(--font-montserrat)",
    raleway: "var(--font-raleway)",
    nunito: "var(--font-nunito)",
    "work sans": "var(--font-work-sans)",
    "work-sans": "var(--font-work-sans)",
    work_sans: "var(--font-work-sans)",
    lora: "var(--font-lora)",
    merriweather: "var(--font-merriweather)",
    rubik: "var(--font-rubik)",
    "space grotesk": "var(--font-space-grotesk)",
    "space-grotesk": "var(--font-space-grotesk)",
    space_grotesk: "var(--font-space-grotesk)",
    outfit: "var(--font-outfit)",
    "source sans 3": "var(--font-source-sans-3)",
    "source sans": "var(--font-source-sans-3)",
    "source-sans-3": "var(--font-source-sans-3)",
    source_sans_3: "var(--font-source-sans-3)",
    manrope: "var(--font-manrope)",
    "plus jakarta sans": "var(--font-plus-jakarta-sans)",
    "plus-jakarta-sans": "var(--font-plus-jakarta-sans)",
    plus_jakarta_sans: "var(--font-plus-jakarta-sans)",
    "dm sans": "var(--font-dm-sans)",
    "dm-sans": "var(--font-dm-sans)",
    dm_sans: "var(--font-dm-sans)",
    "playfair display": "var(--font-playfair-display)",
    "playfair-display": "var(--font-playfair-display)",
    playfair_display: "var(--font-playfair-display)",
  };

  return fontMap[normalized] ?? value;
};//

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.baseTitle,
  description: siteConfig.seo.baseDescription,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
  openGraph: {
    title: siteConfig.seo.baseTitle,
    description: siteConfig.seo.baseDescription,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.company.tradingName,
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.baseTitle,
    description: siteConfig.seo.baseDescription,
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const cookieStore = await cookies();
  const demoPreviewDismissed =
    cookieStore.get("demoPreviewDismissed")?.value === "1";
  const themeStyles = {
    "--color-primary": siteConfig.branding.colors.primary,
    "--color-secondary": siteConfig.branding.colors.secondary,
    "--color-accent": siteConfig.branding.colors.accent,
    "--font-body": resolveFontFamily(siteConfig.branding.fonts.body),
    "--font-heading": resolveFontFamily(siteConfig.branding.fonts.heading),
    "--background": siteConfig.branding.colors.background,
    "--foreground": siteConfig.branding.colors.foreground,
    "--footer-background": siteConfig.branding.colors.footerBackground,
    "--footer-foreground": siteConfig.branding.colors.footerForeground,
    "--color-footer-background": siteConfig.branding.colors.footerBackground,
    "--color-footer-foreground": siteConfig.branding.colors.footerForeground,
  } as CSSProperties;

  return (
    <html lang="en">
      <body
        style={themeStyles}
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${figtree.variable} ${poppins.variable} ${montserrat.variable} ${raleway.variable} ${nunito.variable} ${workSans.variable} ${lora.variable} ${merriweather.variable} ${rubik.variable} ${spaceGrotesk.variable} ${outfit.variable} ${sourceSans3.variable} ${manrope.variable} ${plusJakartaSans.variable} ${dmSans.variable} ${playfairDisplay.variable} bg-(--color-background) text-(--color-foreground) antialiased`}
      >
        <Header
          siteConfig={siteConfig}
          showDemoBanner={!demoPreviewDismissed}
        />
        <div className="overflow-x-hidden">
          {children}
          <Footer siteConfig={siteConfig} />
        </div>
        <CookieBanner
          enabled={siteConfig.cookies.enabled}
          googleAnalyticsId={siteConfig.integrations.googleAnalyticsId ?? null}
          facebookPixelId={siteConfig.integrations.facebookPixel ?? null}
        />
        <TrackingScripts
          enabled={siteConfig.cookies.enabled}
          googleAnalyticsId={siteConfig.integrations.googleAnalyticsId ?? null}
          facebookPixelId={siteConfig.integrations.facebookPixel ?? null}
        />
      </body>
    </html>
  );
}
