import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { SiteConfig } from "@/config/site.config";

export const runtime = "nodejs";

const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");

const ensureUploadsDir = async () => {
  await fs.mkdir(uploadsDir, { recursive: true });
};

const sanitizeFileName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "-").toLowerCase();
};

const saveFile = async (file: File, prefix: string) => {
  await ensureUploadsDir();
  const extension = path.extname(file.name) || ".png";
  const safeName = sanitizeFileName(file.name.replace(extension, ""));
  const fileName = `${prefix}-${Date.now()}-${safeName}${extension}`;
  const filePath = path.join(uploadsDir, fileName);
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  return `/images/uploads/${fileName}`;
};

const replaceConfigFile = async (nextConfig: SiteConfig) => {
  const configPath = path.join(process.cwd(), "config", "site.config.ts");
  const currentFile = await fs.readFile(configPath, "utf8");
  const startIndex = currentFile.indexOf("export const siteConfig: SiteConfig = ");
  const endIndex = currentFile.lastIndexOf("};");
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Config file structure not found.");
  }
  const header = currentFile.slice(0, startIndex);
  const footer = currentFile.slice(endIndex + 2);
  const serialized = JSON.stringify(nextConfig, null, 2);
  const nextFile = `${header}export const siteConfig: SiteConfig = ${serialized};${footer}`;
  await fs.writeFile(configPath, nextFile);
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const configRaw = formData.get("config");
    if (typeof configRaw !== "string") {
      return NextResponse.json({ error: "Missing config payload." }, { status: 400 });
    }

    const parsedConfig = JSON.parse(configRaw) as SiteConfig;

    const companyLogo = formData.get("companyLogo");
    if (companyLogo && companyLogo instanceof File && companyLogo.size > 0) {
      parsedConfig.company.logo = await saveFile(companyLogo, "logo");
    }
    const heroBackgroundImage = formData.get("heroBackgroundImage");
    if (
      heroBackgroundImage &&
      heroBackgroundImage instanceof File &&
      heroBackgroundImage.size > 0
    ) {
      parsedConfig.home.hero.backgroundImage = await saveFile(
        heroBackgroundImage,
        "hero-image",
      );
    }
    const heroBackgroundVideo = formData.get("heroBackgroundVideo");
    if (
      heroBackgroundVideo &&
      heroBackgroundVideo instanceof File &&
      heroBackgroundVideo.size > 0
    ) {
      parsedConfig.home.hero.backgroundVideo = await saveFile(
        heroBackgroundVideo,
        "hero-video",
      );
    }

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        continue;
      }
      if (!(value instanceof File) || value.size === 0) {
        continue;
      }
      if (key.startsWith("accreditationLogo-")) {
        const index = Number(key.replace("accreditationLogo-", ""));
        if (!Number.isNaN(index) && parsedConfig.proof.accreditations[index]) {
          parsedConfig.proof.accreditations[index].logo = await saveFile(
            value,
            `accreditation-${index}`,
          );
        }
      }
      if (key.startsWith("galleryImage-")) {
        const index = Number(key.replace("galleryImage-", ""));
        if (!Number.isNaN(index) && parsedConfig.home.gallery.items[index]) {
          parsedConfig.home.gallery.items[index].image = await saveFile(
            value,
            `gallery-${index}`,
          );
        }
      }
    }

    await replaceConfigFile(parsedConfig);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update config." }, { status: 500 });
  }
}
