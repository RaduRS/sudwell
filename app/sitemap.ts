import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;

  const staticRoutes = [
    "",
    "/llms.txt",
    "/services",
    "/areas",
    "/gallery",
    "/reviews",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const serviceRoutes = siteConfig.services.map(
    (service) => `/services/${service.slug}`,
  );
  const areaRoutes = siteConfig.areas.map((area) => `/areas/${area.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
