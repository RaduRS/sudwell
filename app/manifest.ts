import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.company.tradingName,
    short_name: siteConfig.company.tradingName,
    description: siteConfig.seo.baseDescription,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.branding.colors.background,
    theme_color: siteConfig.branding.colors.primary,
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
