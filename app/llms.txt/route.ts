import { siteConfig } from "@/config/site.config";

export async function GET() {
  const content = [
    `# ${siteConfig.company.tradingName}`,
    "",
    "## Summary",
    `${siteConfig.company.tradingName} provides driveway and paving services in the UK, serving ${siteConfig.contact.serviceArea.join(
      ", ",
    )} and nearby areas.`,
    "",
    "## Services",
    ...siteConfig.services.map((service) => `- ${service.name}: ${service.shortDesc}`),
    "",
    "## Areas Served",
    ...siteConfig.areas.map((area) => `- ${area.name}`),
    "",
    "## Contact",
    `Phone: ${siteConfig.contact.phone}`,
    `Email: ${siteConfig.contact.email}`,
    `Address: ${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.postcode}, ${siteConfig.contact.address.country}`,
    "",
    "## Website",
    siteConfig.seo.siteUrl,
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
