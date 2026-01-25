import { promises as fs } from "fs";
import path from "path";
import type { SiteConfig } from "@/config/site.config";

export async function getSiteConfig(): Promise<SiteConfig> {
  const configPath = path.join(process.cwd(), "config", "site.config.ts");
  const currentFile = await fs.readFile(configPath, "utf8");
  const marker = "export const siteConfig: SiteConfig = ";
  const startIndex = currentFile.indexOf(marker);
  const endIndex = currentFile.lastIndexOf("};");
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Config file structure not found.");
  }

  const jsonStart = startIndex + marker.length;
  const jsonText = currentFile.slice(jsonStart, endIndex + 1).trim();
  return JSON.parse(jsonText) as SiteConfig;
}
