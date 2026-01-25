"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import type { Area, Service } from "@/config/site.config";
import { Container } from "@/components/layout/Container";

type SocialKey = "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";

type SocialState = {
  enabled: boolean;
  label: string;
  url: string;
};

type NavigationItem = { href: string; label: string };

type GalleryItem = { label: string; image?: string };

type Accreditation = { name: string; logo: string };

const socialKeys: SocialKey[] = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "youtube",
];

const getSocialState = (key: SocialKey): SocialState => {
  const item = siteConfig.social[key];
  if (!item) {
    return { enabled: false, label: key, url: "" };
  }
  return { enabled: true, label: item.label, url: item.url };
};

const parseJson = <T,>(
  value: string,
  fallback: T,
): { value: T; error: string | null } => {
  try {
    return { value: JSON.parse(value) as T, error: null };
  } catch {
    return { value: fallback, error: "Invalid JSON format." };
  }
};

const isValidJson = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const parseCommaSeparatedList = (value: string) => {
  return value
    .split(/,|\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
};

const resolveFontFamilyForPreview = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "var(--font-inter)";
  }

  if (trimmed.startsWith("var(--font-")) {
    return trimmed;
  }

  const normalized = trimmed.toLowerCase();
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

  return fontMap[normalized] ?? trimmed;
};

const fontOptions = [
  "Inter",
  "Figtree",
  "Poppins",
  "Montserrat",
  "Raleway",
  "Nunito",
  "Work Sans",
  "Lora",
  "Merriweather",
  "Rubik",
  "Space Grotesk",
  "Outfit",
  "Source Sans 3",
  "Manrope",
  "Plus Jakarta Sans",
  "DM Sans",
  "Playfair Display",
];

const renderFontButtons = (
  currentValue: string,
  onSelect: (value: string) => void,
) => {
  const normalizedCurrent = currentValue.trim().toLowerCase();
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {fontOptions.map((font) => {
        const isActive = normalizedCurrent === font.toLowerCase();
        return (
          <button
            key={font}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(font)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              isActive
                ? "border-(--color-primary)/40 bg-(--color-primary)/10 text-(--color-foreground)"
                : "border-foreground/10 text-foreground/70 hover:border-foreground/30 hover:text-foreground"
            }`}
            style={{ fontFamily: resolveFontFamilyForPreview(font) }}
          >
            {font}
          </button>
        );
      })}
    </div>
  );
};

const requiredLabel = (text: string) => (
  <span className="flex items-center gap-1">
    <span>{text}</span>
    <span className="text-red-500">*</span>
  </span>
);

const pillButtonClassName =
  "rounded-full border border-foreground/10 bg-(--color-background) px-3 py-1 text-xs font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 disabled:cursor-not-allowed disabled:opacity-60";

const fileInputClassName =
  "w-full cursor-pointer rounded-lg border border-foreground/10 bg-white px-3 py-2 text-sm file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-(--color-primary) file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40";

type IconButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const IconButton = ({
  label,
  onClick,
  disabled,
  className,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`inline-flex items-center justify-center rounded-full border border-foreground/10 bg-(--color-background) p-2 text-foreground/70 transition hover:border-foreground/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M6 6l1 16h10l1-16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    </button>
  );
};

type CommaSeparatedEditorProps = {
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  rows?: number;
};

const CommaSeparatedEditor = ({
  items,
  onChange,
  placeholder,
  rows = 2,
}: CommaSeparatedEditorProps) => {
  return (
    <textarea
      rows={rows}
      value={items.join(", ")}
      onChange={(event) =>
        onChange(parseCommaSeparatedList(event.target.value))
      }
      placeholder={placeholder}
      className="w-full rounded-lg border border-foreground/10 bg-white px-3 py-2 text-sm"
    />
  );
};

type SectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

const Section = ({ title, isOpen, onToggle, children }: SectionProps) => {
  return (
    <div className="space-y-3 rounded-3xl border border-foreground/10 bg-foreground/3 p-5 shadow-sm ring-1 ring-foreground/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition ${
            isOpen ? "rotate-180 bg-foreground/5 text-foreground" : ""
          }`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div className={isOpen ? "space-y-4" : "hidden"}>{children}</div>
    </div>
  );
};

const replaceAt = <T,>(items: T[], index: number, value: T) => {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item));
};

const removeAt = <T,>(items: T[], index: number) => {
  return items.filter((_, itemIndex) => itemIndex !== index);
};

const requiredFieldKeys = [
  "companyTradingName",
  "companyTagline",
  "contactPhone",
  "contactPhoneFormatted",
  "contactEmail",
  "contactStreet",
  "contactCity",
  "contactCounty",
  "contactPostcode",
  "contactCountry",
  "openingWeekdays",
  "openingWeekends",
  "serviceRadius",
  "brandingPrimary",
  "brandingSecondary",
  "brandingAccent",
  "brandingBackground",
  "brandingForeground",
  "fontHeading",
  "fontBody",
  "proofInsurance",
  "proofGuarantee",
  "proofReviewCount",
  "proofAverageRating",
  "seoSiteUrl",
  "seoBaseTitle",
  "seoBaseDescription",
  "seoOfferCatalogName",
  "integrationsMapsProvider",
  "integrationsFormEndpoint",
  "integrationsMapsEmbedUrl",
  "integrationsEmailProvider",
  "integrationsResendFromEmail",
  "headerPrimaryCtaLabel",
  "footerQuickLinksLabel",
  "footerContactLabel",
  "footerSocialLabel",
  "footerPrivacyLabel",
  "footerTermsLabel",
  "footerCopyrightLabel",
  "homeHeroTitle",
  "homeHeroSubheading",
  "homeHeroPrimaryCtaLabel",
  "homeHeroSecondaryCtaLabel",
  "homeServicesEyebrow",
  "homeServicesTitle",
  "homeServicesDescription",
  "homeServicesCtaLabel",
  "homeServicesFeaturedCount",
  "homeProcessEyebrow",
  "homeProcessTitle",
  "homeProcessDescription",
  "homeGalleryEyebrow",
  "homeGalleryTitle",
  "homeGalleryDescription",
  "homeReviewsEyebrow",
  "homeReviewsTitle",
  "homeReviewsDescription",
  "homeAreasEyebrow",
  "homeAreasTitle",
  "homeAreasDescription",
  "homeCtaTitle",
  "homeCtaDescription",
  "homeCtaPrimaryCtaLabel",
  "homeCtaSecondaryCtaLabel",
] as const;

type RequiredFieldKey = (typeof requiredFieldKeys)[number];

const requiredFieldLabels: Record<RequiredFieldKey, string> = {
  companyTradingName: "Trading name",
  companyTagline: "Tagline",
  contactPhone: "Phone",
  contactPhoneFormatted: "Phone formatted",
  contactEmail: "Email",
  contactStreet: "Street",
  contactCity: "City",
  contactCounty: "County",
  contactPostcode: "Postcode",
  contactCountry: "Country",
  openingWeekdays: "Weekdays",
  openingWeekends: "Weekends",
  serviceRadius: "Service radius",
  brandingPrimary: "Primary color",
  brandingSecondary: "Secondary color",
  brandingAccent: "Accent color",
  brandingBackground: "Background color",
  brandingForeground: "Foreground color",
  fontHeading: "Heading font",
  fontBody: "Body font",
  proofInsurance: "Insurance",
  proofGuarantee: "Guarantee",
  proofReviewCount: "Review count",
  proofAverageRating: "Average rating",
  seoSiteUrl: "Site URL",
  seoBaseTitle: "Base title",
  seoBaseDescription: "Base description",
  seoOfferCatalogName: "Offer catalog name",
  integrationsMapsProvider: "Maps provider",
  integrationsFormEndpoint: "Form endpoint",
  integrationsMapsEmbedUrl: "Google Maps embed URL",
  integrationsEmailProvider: "Email provider",
  integrationsResendFromEmail: "Resend from email",
  headerPrimaryCtaLabel: "Header primary CTA label",
  footerQuickLinksLabel: "Quick links label",
  footerContactLabel: "Contact label",
  footerSocialLabel: "Social label",
  footerPrivacyLabel: "Privacy label",
  footerTermsLabel: "Terms label",
  footerCopyrightLabel: "Copyright label",
  homeHeroTitle: "Hero title",
  homeHeroSubheading: "Hero subheading",
  homeHeroPrimaryCtaLabel: "Hero primary CTA",
  homeHeroSecondaryCtaLabel: "Hero secondary CTA",
  homeServicesEyebrow: "Services eyebrow",
  homeServicesTitle: "Services title",
  homeServicesDescription: "Services description",
  homeServicesCtaLabel: "Services CTA label",
  homeServicesFeaturedCount: "Services featured count",
  homeProcessEyebrow: "Process eyebrow",
  homeProcessTitle: "Process title",
  homeProcessDescription: "Process description",
  homeGalleryEyebrow: "Gallery eyebrow",
  homeGalleryTitle: "Gallery title",
  homeGalleryDescription: "Gallery description",
  homeReviewsEyebrow: "Reviews eyebrow",
  homeReviewsTitle: "Reviews title",
  homeReviewsDescription: "Reviews description",
  homeAreasEyebrow: "Areas eyebrow",
  homeAreasTitle: "Areas title",
  homeAreasDescription: "Areas description",
  homeCtaTitle: "CTA title",
  homeCtaDescription: "CTA description",
  homeCtaPrimaryCtaLabel: "CTA primary label",
  homeCtaSecondaryCtaLabel: "CTA secondary label",
};

const numericRequiredFields = new Set<RequiredFieldKey>([
  "serviceRadius",
  "proofReviewCount",
  "proofAverageRating",
  "homeServicesFeaturedCount",
]);

const requiredFieldSet = new Set<RequiredFieldKey>(requiredFieldKeys);

type JsonFieldKey =
  | "serviceArea"
  | "services"
  | "areas"
  | "accreditations"
  | "navigation"
  | "keywords"
  | "processSteps"
  | "galleryItems"
  | "reviewItems";

const jsonFieldLabels: Record<JsonFieldKey, string> = {
  serviceArea: "Service area",
  services: "Services",
  areas: "Areas",
  accreditations: "Accreditations",
  navigation: "Navigation",
  keywords: "Keywords",
  processSteps: "Process steps",
  galleryItems: "Gallery items",
  reviewItems: "Review items",
};

type SectionKey =
  | "company"
  | "contact"
  | "branding"
  | "proof"
  | "social"
  | "seo"
  | "integrations"
  | "navigation"
  | "headerFooter"
  | "services"
  | "areas"
  | "homeHero"
  | "homeServices"
  | "homeProcess"
  | "homeGallery"
  | "homeReviews"
  | "homeAreas"
  | "homeCta";

export default function AdminPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [statusKind, setStatusKind] = useState<"error" | "success" | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [accreditationFiles, setAccreditationFiles] = useState<
    Record<number, File | null>
  >({});
  const [galleryFiles, setGalleryFiles] = useState<Record<number, File | null>>(
    {},
  );
  const [heroBackgroundImageFiles, setHeroBackgroundImageFiles] = useState<
    Record<number, File | null>
  >({});
  const [heroBackgroundVideoFile, setHeroBackgroundVideoFile] =
    useState<File | null>(null);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      company: true,
      contact: true,
      branding: true,
      proof: true,
      social: true,
      seo: true,
      integrations: true,
      navigation: true,
      headerFooter: true,
      services: true,
      areas: true,
      homeHero: true,
      homeServices: true,
      homeProcess: true,
      homeGallery: true,
      homeReviews: true,
      homeAreas: true,
      homeCta: true,
    },
  );
  const [showRawJson, setShowRawJson] = useState<Record<JsonFieldKey, boolean>>(
    {
      serviceArea: false,
      services: false,
      areas: false,
      accreditations: false,
      navigation: false,
      keywords: false,
      processSteps: false,
      galleryItems: false,
      reviewItems: false,
    },
  );
  const companyLogoPreview = useMemo(() => {
    if (!companyLogoFile) {
      return null;
    }
    return URL.createObjectURL(companyLogoFile);
  }, [companyLogoFile]);

  const accreditationPreviews = useMemo(() => {
    const next: Record<number, string> = {};
    Object.entries(accreditationFiles).forEach(([key, file]) => {
      if (file) {
        next[Number(key)] = URL.createObjectURL(file);
      }
    });
    return next;
  }, [accreditationFiles]);

  const galleryPreviews = useMemo(() => {
    const next: Record<number, string> = {};
    Object.entries(galleryFiles).forEach(([key, file]) => {
      if (file) {
        next[Number(key)] = URL.createObjectURL(file);
      }
    });
    return next;
  }, [galleryFiles]);

  const heroBackgroundImagePreviews = useMemo(() => {
    const next: Record<number, string> = {};
    Object.entries(heroBackgroundImageFiles).forEach(([key, file]) => {
      if (file) {
        next[Number(key)] = URL.createObjectURL(file);
      }
    });
    return next;
  }, [heroBackgroundImageFiles]);

  const heroBackgroundVideoPreview = useMemo(() => {
    if (!heroBackgroundVideoFile) {
      return null;
    }
    return URL.createObjectURL(heroBackgroundVideoFile);
  }, [heroBackgroundVideoFile]);

  const initialHeroBackgroundImages = (() => {
    if (siteConfig.home.hero.backgroundImages?.length) {
      return [...siteConfig.home.hero.backgroundImages];
    }
    if (siteConfig.home.hero.backgroundImage) {
      return [siteConfig.home.hero.backgroundImage];
    }
    return [];
  })();

  const initialGalleryImageSet = new Set(
    siteConfig.home.gallery.items
      .map((item) => item.image?.trim() ?? "")
      .filter(Boolean),
  );

  const [heroGallerySelection, setHeroGallerySelection] = useState<string[]>(
    () =>
      initialHeroBackgroundImages
        .map((image) => image.trim())
        .filter((image) => initialGalleryImageSet.has(image)),
  );

  const [heroOnlyImages, setHeroOnlyImages] = useState<string[]>(() =>
    initialHeroBackgroundImages
      .map((image) => image.trim())
      .filter((image) => image && !initialGalleryImageSet.has(image)),
  );

  const [form, setForm] = useState({
    companyTradingName: siteConfig.company.tradingName,
    companyLegalName: siteConfig.company.legalName ?? "",
    companyLogo: siteConfig.company.logo ?? "",
    companyTagline: siteConfig.company.tagline,
    companyFounded: siteConfig.company.founded?.toString() ?? "",
    companyRegisteredNumber: siteConfig.company.registeredNumber ?? "",
    companyVatNumber: siteConfig.company.vatNumber ?? "",
    contactPhone: siteConfig.contact.phone,
    contactPhoneFormatted: siteConfig.contact.phoneFormatted,
    contactWhatsapp: siteConfig.contact.whatsapp ?? "",
    contactEmail: siteConfig.contact.email,
    contactStreet: siteConfig.contact.address.street,
    contactCity: siteConfig.contact.address.city,
    contactCounty: siteConfig.contact.address.county,
    contactPostcode: siteConfig.contact.address.postcode,
    contactCountry: siteConfig.contact.address.country,
    openingWeekdays: siteConfig.contact.openingHours.weekdays,
    openingWeekends: siteConfig.contact.openingHours.weekends,
    serviceRadius: siteConfig.contact.serviceRadius.toString(),
    brandingPrimary: siteConfig.branding.colors.primary,
    brandingSecondary: siteConfig.branding.colors.secondary,
    brandingAccent: siteConfig.branding.colors.accent,
    brandingBackground: siteConfig.branding.colors.background,
    brandingForeground: siteConfig.branding.colors.foreground,
    fontHeading: siteConfig.branding.fonts.heading,
    fontBody: siteConfig.branding.fonts.body,
    proofInsurance: siteConfig.proof.insurance,
    proofGuarantee: siteConfig.proof.guarantee,
    proofReviewsEmbed: siteConfig.proof.reviewsEmbed ?? "",
    proofReviewCount: siteConfig.proof.reviewCount.toString(),
    proofAverageRating: siteConfig.proof.averageRating.toString(),
    seoSiteUrl: siteConfig.seo.siteUrl,
    seoBaseTitle: siteConfig.seo.baseTitle,
    seoBaseDescription: siteConfig.seo.baseDescription,
    seoGoogleBusinessProfile: siteConfig.seo.googleBusinessProfile ?? "",
    seoOfferCatalogName: siteConfig.seo.offerCatalogName,
    integrationsMapsProvider: siteConfig.integrations.mapsProvider,
    integrationsMapsEmbedUrl: siteConfig.integrations.googleMapsEmbedUrl,
    integrationsGoogleAnalyticsId:
      siteConfig.integrations.googleAnalyticsId ?? "",
    integrationsFacebookPixel: siteConfig.integrations.facebookPixel ?? "",
    integrationsFormEndpoint: siteConfig.integrations.formEndpoint,
    integrationsEmailProvider: siteConfig.integrations.emailProvider,
    integrationsResendFromEmail: siteConfig.integrations.resendFromEmail,
    headerPrimaryCtaLabel: siteConfig.header.primaryCtaLabel,
    footerQuickLinksLabel: siteConfig.footer.quickLinksLabel,
    footerContactLabel: siteConfig.footer.contactLabel,
    footerSocialLabel: siteConfig.footer.socialLabel,
    footerPrivacyLabel: siteConfig.footer.privacyLabel,
    footerTermsLabel: siteConfig.footer.termsLabel,
    footerCopyrightLabel: siteConfig.footer.copyrightLabel,
    homeHeroTitle: siteConfig.home.hero.title,
    homeHeroSubheading: siteConfig.home.hero.subheading,
    homeHeroPrimaryCtaLabel: siteConfig.home.hero.primaryCtaLabel,
    homeHeroSecondaryCtaLabel: siteConfig.home.hero.secondaryCtaLabel,
    homeHeroBackgroundImage: siteConfig.home.hero.backgroundImage ?? "",
    homeHeroBackgroundVideo: siteConfig.home.hero.backgroundVideo ?? "",
    homeHeroBackgroundImages: (
      siteConfig.home.hero.backgroundImages ??
      (siteConfig.home.hero.backgroundImage
        ? [siteConfig.home.hero.backgroundImage]
        : [])
    ).join(", "),
    homeServicesEyebrow: siteConfig.home.services.eyebrow,
    homeServicesTitle: siteConfig.home.services.title,
    homeServicesDescription: siteConfig.home.services.description,
    homeServicesCtaLabel: siteConfig.home.services.ctaLabel,
    homeServicesFeaturedCount:
      siteConfig.home.services.featuredCount.toString(),
    homeProcessEyebrow: siteConfig.home.process.eyebrow,
    homeProcessTitle: siteConfig.home.process.title,
    homeProcessDescription: siteConfig.home.process.description,
    homeGalleryEyebrow: siteConfig.home.gallery.eyebrow,
    homeGalleryTitle: siteConfig.home.gallery.title,
    homeGalleryDescription: siteConfig.home.gallery.description,
    homeReviewsEyebrow: siteConfig.home.reviews.eyebrow,
    homeReviewsTitle: siteConfig.home.reviews.title,
    homeReviewsDescription: siteConfig.home.reviews.description,
    homeAreasEyebrow: siteConfig.home.areas.eyebrow,
    homeAreasTitle: siteConfig.home.areas.title,
    homeAreasDescription: siteConfig.home.areas.description,
    homeCtaTitle: siteConfig.home.cta.title,
    homeCtaDescription: siteConfig.home.cta.description,
    homeCtaPrimaryCtaLabel: siteConfig.home.cta.primaryCtaLabel,
    homeCtaSecondaryCtaLabel: siteConfig.home.cta.secondaryCtaLabel,
  });

  const [social, setSocial] = useState<Record<SocialKey, SocialState>>(() => ({
    facebook: getSocialState("facebook"),
    instagram: getSocialState("instagram"),
    twitter: getSocialState("twitter"),
    linkedin: getSocialState("linkedin"),
    youtube: getSocialState("youtube"),
  }));

  const [jsonFields, setJsonFields] = useState<Record<JsonFieldKey, string>>({
    serviceArea: JSON.stringify(siteConfig.contact.serviceArea, null, 2),
    services: JSON.stringify(siteConfig.services, null, 2),
    areas: JSON.stringify(siteConfig.areas, null, 2),
    accreditations: JSON.stringify(siteConfig.proof.accreditations, null, 2),
    navigation: JSON.stringify(siteConfig.navigation, null, 2),
    keywords: JSON.stringify(siteConfig.seo.keywords, null, 2),
    processSteps: JSON.stringify(siteConfig.home.process.steps, null, 2),
    galleryItems: JSON.stringify(siteConfig.home.gallery.items, null, 2),
    reviewItems: JSON.stringify(siteConfig.home.reviews.items, null, 2),
  });

  const [invalidJsonFields, setInvalidJsonFields] = useState<JsonFieldKey[]>(
    [],
  );

  const [missingFields, setMissingFields] = useState<RequiredFieldKey[]>([]);

  const jsonFieldRefs = useRef<
    Record<JsonFieldKey, HTMLTextAreaElement | null>
  >({} as Record<JsonFieldKey, HTMLTextAreaElement | null>);

  useEffect(() => {
    if (!companyLogoPreview) {
      return;
    }
    return () => {
      URL.revokeObjectURL(companyLogoPreview);
    };
  }, [companyLogoPreview]);

  useEffect(() => {
    return () => {
      Object.values(accreditationPreviews).forEach((url) =>
        URL.revokeObjectURL(url),
      );
    };
  }, [accreditationPreviews]);

  useEffect(() => {
    return () => {
      Object.values(galleryPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviews]);

  useEffect(() => {
    return () => {
      Object.values(heroBackgroundImagePreviews).forEach((url) =>
        URL.revokeObjectURL(url),
      );
    };
  }, [heroBackgroundImagePreviews]);

  useEffect(() => {
    if (!heroBackgroundVideoPreview) {
      return;
    }
    return () => {
      URL.revokeObjectURL(heroBackgroundVideoPreview);
    };
  }, [heroBackgroundVideoPreview]);

  const syncHeroBackgroundFields = (
    nextGallerySelection: string[],
    nextHeroOnlyImages: string[],
  ) => {
    const combined = [...nextGallerySelection, ...nextHeroOnlyImages]
      .map((image) => image.trim())
      .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      homeHeroBackgroundImages: combined.join(", "),
      homeHeroBackgroundImage: combined[0] ?? "",
    }));
  };

  const updateHeroGallerySelection = (next: string[]) => {
    setHeroGallerySelection(next);
    syncHeroBackgroundFields(next, heroOnlyImages);
  };

  const updateHeroOnlyImages = (next: string[]) => {
    setHeroOnlyImages(next);
    syncHeroBackgroundFields(heroGallerySelection, next);
  };

  const parsedServiceArea = useMemo(() => {
    return parseJson<string[]>(
      jsonFields.serviceArea,
      siteConfig.contact.serviceArea,
    ).value;
  }, [jsonFields.serviceArea]);

  const parsedServicesList = useMemo(() => {
    return parseJson<Service[]>(jsonFields.services, siteConfig.services).value;
  }, [jsonFields.services]);

  const parsedAreasList = useMemo(() => {
    return parseJson<Area[]>(jsonFields.areas, siteConfig.areas).value;
  }, [jsonFields.areas]);

  const parsedAccreditations = useMemo(() => {
    return parseJson<Accreditation[]>(
      jsonFields.accreditations,
      siteConfig.proof.accreditations,
    ).value;
  }, [jsonFields.accreditations]);

  const parsedNavigation = useMemo(() => {
    return parseJson<NavigationItem[]>(
      jsonFields.navigation,
      siteConfig.navigation,
    ).value;
  }, [jsonFields.navigation]);

  const parsedKeywords = useMemo(() => {
    return parseJson<string[]>(jsonFields.keywords, siteConfig.seo.keywords)
      .value;
  }, [jsonFields.keywords]);

  const parsedGalleryItems = useMemo(() => {
    return parseJson<GalleryItem[]>(
      jsonFields.galleryItems,
      siteConfig.home.gallery.items,
    ).value;
  }, [jsonFields.galleryItems]);

  const isRequiredFieldInvalid = (key: RequiredFieldKey, value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return true;
    }
    if (numericRequiredFields.has(key)) {
      return Number.isNaN(Number(value));
    }
    return false;
  };

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (requiredFieldSet.has(key as RequiredFieldKey)) {
      const typedKey = key as RequiredFieldKey;
      const invalid = isRequiredFieldInvalid(typedKey, value);
      setMissingFields((prev) =>
        invalid
          ? prev.includes(typedKey)
            ? prev
            : [...prev, typedKey]
          : prev.filter((item) => item !== typedKey),
      );
    }
  };

  const updateJsonField = (key: JsonFieldKey, value: string) => {
    setJsonFields((prev) => ({ ...prev, [key]: value }));
    if (!isValidJson(value)) {
      setInvalidJsonFields((prev) =>
        prev.includes(key) ? prev : [...prev, key],
      );
      return;
    }
    setInvalidJsonFields((prev) => prev.filter((item) => item !== key));
  };

  const updateSocial = (key: SocialKey, value: Partial<SocialState>) => {
    setSocial((prev) => ({ ...prev, [key]: { ...prev[key], ...value } }));
  };

  const jsonFieldClassName = (key: JsonFieldKey) =>
    `w-full rounded-lg border bg-white px-3 py-2 font-mono text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 ${
      invalidJsonFields.includes(key)
        ? "border-red-500 ring-1 ring-red-500/30"
        : "border-foreground/10"
    }`;

  const requiredFieldClassName = (key: RequiredFieldKey, base: string) =>
    `${base} bg-white ${
      missingFields.includes(key) ? "border-red-500 ring-1 ring-red-500/30" : ""
    }`;

  const setJsonValue = <T,>(key: JsonFieldKey, value: T) => {
    updateJsonField(key, JSON.stringify(value, null, 2));
  };

  const isRawJsonVisible = (key: JsonFieldKey) =>
    showRawJson[key] || invalidJsonFields.includes(key);

  const toggleRawJson = (key: JsonFieldKey) => {
    setShowRawJson((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setStatus(null);
    setStatusKind(null);
    setIsSaving(true);

    const missingRequired = requiredFieldKeys.filter((key) =>
      isRequiredFieldInvalid(key, form[key]),
    );
    setMissingFields(missingRequired);

    if (missingRequired.length > 0) {
      const labels = missingRequired.map((key) => requiredFieldLabels[key]);
      setStatus(`Missing required fields: ${labels.join(", ")}.`);
      setStatusKind("error");
      setIsSaving(false);
      requestAnimationFrame(() => {
        const firstMissing = missingRequired[0];
        const target = document.querySelector(
          `[data-required-field="${firstMissing}"]`,
        );
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.focus();
        }
      });
      return;
    }

    const parsedServiceArea = parseJson<string[]>(
      jsonFields.serviceArea,
      siteConfig.contact.serviceArea,
    );
    const parsedServices = parseJson(jsonFields.services, siteConfig.services);
    const parsedAreas = parseJson(jsonFields.areas, siteConfig.areas);
    const parsedAccreditationsJson = parseJson(
      jsonFields.accreditations,
      siteConfig.proof.accreditations,
    );
    const parsedNavigation = parseJson(
      jsonFields.navigation,
      siteConfig.navigation,
    );
    const parsedKeywords = parseJson(
      jsonFields.keywords,
      siteConfig.seo.keywords,
    );
    const parsedProcessSteps = parseJson(
      jsonFields.processSteps,
      siteConfig.home.process.steps,
    );
    const parsedGalleryItemsJson = parseJson(
      jsonFields.galleryItems,
      siteConfig.home.gallery.items,
    );
    const parsedReviewItems = parseJson(
      jsonFields.reviewItems,
      siteConfig.home.reviews.items,
    );

    const invalidFields: JsonFieldKey[] = [];
    if (parsedServiceArea.error) invalidFields.push("serviceArea");
    if (parsedServices.error) invalidFields.push("services");
    if (parsedAreas.error) invalidFields.push("areas");
    if (parsedAccreditationsJson.error) invalidFields.push("accreditations");
    if (parsedNavigation.error) invalidFields.push("navigation");
    if (parsedKeywords.error) invalidFields.push("keywords");
    if (parsedProcessSteps.error) invalidFields.push("processSteps");
    if (parsedGalleryItemsJson.error) invalidFields.push("galleryItems");
    if (parsedReviewItems.error) invalidFields.push("reviewItems");

    const jsonError = invalidFields.length > 0;
    setInvalidJsonFields(invalidFields);

    if (jsonError) {
      const jsonLabels = invalidFields.map((key) => jsonFieldLabels[key]);
      setStatus(`Fix JSON fields: ${jsonLabels.join(", ")}.`);
      setStatusKind("error");
      setIsSaving(false);
      requestAnimationFrame(() => {
        const firstInvalid = invalidFields[0];
        const target = jsonFieldRefs.current[firstInvalid];
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.focus();
        }
      });
      return;
    }

    const normalizedHeroBackgroundItems = [
      ...heroGallerySelection.map((image) => ({
        image: image.trim(),
        file: null,
      })),
      ...heroOnlyImages.map((image, index) => ({
        image: image.trim(),
        file: heroBackgroundImageFiles[index] ?? null,
      })),
    ].filter((item) => item.image || item.file);
    const normalizedHeroBackgroundImages = normalizedHeroBackgroundItems.map(
      (item) => item.image,
    );

    const updatedConfig = {
      ...siteConfig,
      company: {
        tradingName: form.companyTradingName.trim(),
        legalName: form.companyLegalName.trim() || undefined,
        logo: form.companyLogo.trim() || null,
        tagline: form.companyTagline.trim(),
        founded: form.companyFounded ? Number(form.companyFounded) : undefined,
        registeredNumber: form.companyRegisteredNumber.trim() || undefined,
        vatNumber: form.companyVatNumber.trim() || undefined,
      },
      contact: {
        phone: form.contactPhone.trim(),
        phoneFormatted: form.contactPhoneFormatted.trim(),
        whatsapp: form.contactWhatsapp.trim() || null,
        email: form.contactEmail.trim(),
        address: {
          street: form.contactStreet.trim(),
          city: form.contactCity.trim(),
          county: form.contactCounty.trim(),
          postcode: form.contactPostcode.trim(),
          country: form.contactCountry.trim(),
        },
        openingHours: {
          weekdays: form.openingWeekdays.trim(),
          weekends: form.openingWeekends.trim(),
        },
        serviceRadius: Number(form.serviceRadius),
        serviceArea: parsedServiceArea.value,
      },
      branding: {
        colors: {
          primary: form.brandingPrimary.trim(),
          secondary: form.brandingSecondary.trim(),
          accent: form.brandingAccent.trim(),
          background: form.brandingBackground.trim(),
          foreground: form.brandingForeground.trim(),
        },
        fonts: {
          heading: form.fontHeading.trim(),
          body: form.fontBody.trim(),
        },
      },
      services: parsedServices.value,
      areas: parsedAreas.value,
      proof: {
        accreditations: parsedAccreditationsJson.value,
        insurance: form.proofInsurance.trim(),
        guarantee: form.proofGuarantee.trim(),
        reviewsEmbed: form.proofReviewsEmbed.trim() || null,
        reviewCount: Number(form.proofReviewCount),
        averageRating: Number(form.proofAverageRating),
      },
      social: {
        facebook: social.facebook.enabled
          ? {
              label: social.facebook.label.trim(),
              url: social.facebook.url.trim(),
            }
          : null,
        instagram: social.instagram.enabled
          ? {
              label: social.instagram.label.trim(),
              url: social.instagram.url.trim(),
            }
          : null,
        twitter: social.twitter.enabled
          ? {
              label: social.twitter.label.trim(),
              url: social.twitter.url.trim(),
            }
          : null,
        linkedin: social.linkedin.enabled
          ? {
              label: social.linkedin.label.trim(),
              url: social.linkedin.url.trim(),
            }
          : null,
        youtube: social.youtube.enabled
          ? {
              label: social.youtube.label.trim(),
              url: social.youtube.url.trim(),
            }
          : null,
      },
      seo: {
        siteUrl: form.seoSiteUrl.trim(),
        baseTitle: form.seoBaseTitle.trim(),
        baseDescription: form.seoBaseDescription.trim(),
        keywords: parsedKeywords.value,
        googleBusinessProfile: form.seoGoogleBusinessProfile.trim() || null,
        offerCatalogName: form.seoOfferCatalogName.trim(),
      },
      integrations: {
        mapsProvider: form.integrationsMapsProvider,
        googleMapsEmbedUrl: form.integrationsMapsEmbedUrl.trim(),
        googleAnalyticsId: form.integrationsGoogleAnalyticsId.trim() || null,
        facebookPixel: form.integrationsFacebookPixel.trim() || null,
        formEndpoint: form.integrationsFormEndpoint.trim(),
        emailProvider: form.integrationsEmailProvider,
        resendFromEmail: form.integrationsResendFromEmail.trim(),
      },
      navigation: parsedNavigation.value,
      header: {
        primaryCtaLabel: form.headerPrimaryCtaLabel.trim(),
      },
      footer: {
        quickLinksLabel: form.footerQuickLinksLabel.trim(),
        contactLabel: form.footerContactLabel.trim(),
        socialLabel: form.footerSocialLabel.trim(),
        privacyLabel: form.footerPrivacyLabel.trim(),
        termsLabel: form.footerTermsLabel.trim(),
        copyrightLabel: form.footerCopyrightLabel.trim(),
      },
      home: {
        hero: {
          title: form.homeHeroTitle.trim(),
          subheading: form.homeHeroSubheading.trim(),
          primaryCtaLabel: form.homeHeroPrimaryCtaLabel.trim(),
          secondaryCtaLabel: form.homeHeroSecondaryCtaLabel.trim(),
          backgroundImage:
            (normalizedHeroBackgroundImages[0] ??
              form.homeHeroBackgroundImage.trim()) ||
            null,
          backgroundImages: normalizedHeroBackgroundImages,
          backgroundVideo: form.homeHeroBackgroundVideo.trim() || null,
        },
        services: {
          eyebrow: form.homeServicesEyebrow.trim(),
          title: form.homeServicesTitle.trim(),
          description: form.homeServicesDescription.trim(),
          ctaLabel: form.homeServicesCtaLabel.trim(),
          featuredCount: Number(form.homeServicesFeaturedCount),
        },
        process: {
          eyebrow: form.homeProcessEyebrow.trim(),
          title: form.homeProcessTitle.trim(),
          description: form.homeProcessDescription.trim(),
          steps: parsedProcessSteps.value,
        },
        gallery: {
          eyebrow: form.homeGalleryEyebrow.trim(),
          title: form.homeGalleryTitle.trim(),
          description: form.homeGalleryDescription.trim(),
          items: parsedGalleryItemsJson.value,
        },
        reviews: {
          eyebrow: form.homeReviewsEyebrow.trim(),
          title: form.homeReviewsTitle.trim(),
          description: form.homeReviewsDescription.trim(),
          items: parsedReviewItems.value,
        },
        areas: {
          eyebrow: form.homeAreasEyebrow.trim(),
          title: form.homeAreasTitle.trim(),
          description: form.homeAreasDescription.trim(),
        },
        cta: {
          title: form.homeCtaTitle.trim(),
          description: form.homeCtaDescription.trim(),
          primaryCtaLabel: form.homeCtaPrimaryCtaLabel.trim(),
          secondaryCtaLabel: form.homeCtaSecondaryCtaLabel.trim(),
        },
      },
    };

    const payload = new FormData();
    payload.append("config", JSON.stringify(updatedConfig));

    if (companyLogoFile) {
      payload.append("companyLogo", companyLogoFile);
    }
    if (heroBackgroundVideoFile) {
      payload.append("heroBackgroundVideo", heroBackgroundVideoFile);
    }

    normalizedHeroBackgroundItems.forEach((item, index) => {
      if (item.file) {
        payload.append(`heroBackgroundImage-${index}`, item.file);
      }
    });

    Object.entries(accreditationFiles).forEach(([index, file]) => {
      if (file) {
        payload.append(`accreditationLogo-${index}`, file);
      }
    });

    Object.entries(galleryFiles).forEach(([index, file]) => {
      if (file) {
        payload.append(`galleryImage-${index}`, file);
      }
    });

    try {
      const response = await fetch("/admin/api", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json();
        setStatus(data?.error ?? "Failed to save config.");
        setStatusKind("error");
        setIsSaving(false);
        return;
      }

      setStatus("Config updated.");
      setStatusKind("success");
      setIsSaving(false);
      setMissingFields([]);
    } catch {
      setStatus("Failed to save config.");
      setStatusKind("error");
      setIsSaving(false);
    }
  };

  return (
    <main className="bg-(--color-background) py-10 text-(--color-foreground)">
      <Container className="space-y-8 [&_input]:bg-white [&_select]:bg-white [&_textarea]:bg-white">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Admin Config</h1>
          <p className="text-sm text-foreground/70">
            Edit all config fields. JSON fields must stay valid.
          </p>
        </div>

        <Section
          title="Company"
          isOpen={openSections.company}
          onToggle={() => toggleSection("company")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Trading name")}
              <input
                data-required-field="companyTradingName"
                value={form.companyTradingName}
                onChange={(event) =>
                  updateForm("companyTradingName", event.target.value)
                }
                className={requiredFieldClassName(
                  "companyTradingName",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Legal name</span>
              <input
                value={form.companyLegalName}
                onChange={(event) =>
                  updateForm("companyLegalName", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <div className="space-y-3 text-sm md:col-span-2">
              <span className="font-medium">Company logo</span>
              <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4 sm:flex-row sm:items-start">
                <div className="flex justify-end sm:order-last sm:ml-auto sm:self-start">
                  <IconButton
                    label="Remove logo"
                    disabled={!companyLogoPreview && !form.companyLogo}
                    onClick={() => {
                      setCompanyLogoFile(null);
                      updateForm("companyLogo", "");
                    }}
                    className="-m-1"
                  />
                </div>
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                  {companyLogoPreview || form.companyLogo ? (
                    <div
                      role="img"
                      aria-label="Company logo"
                      className="h-full w-full bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${companyLogoPreview ?? form.companyLogo})`,
                      }}
                    />
                  ) : (
                    <span className="text-xs text-foreground/50">No logo</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label className="space-y-1 text-sm">
                    <span>Upload new logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setCompanyLogoFile(event.target.files?.[0] ?? null)
                      }
                      className={fileInputClassName}
                    />
                  </label>
                </div>
              </div>
            </div>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Tagline")}
              <input
                data-required-field="companyTagline"
                value={form.companyTagline}
                onChange={(event) =>
                  updateForm("companyTagline", event.target.value)
                }
                className={requiredFieldClassName(
                  "companyTagline",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Founded</span>
              <input
                value={form.companyFounded}
                onChange={(event) =>
                  updateForm("companyFounded", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Registered number</span>
              <input
                value={form.companyRegisteredNumber}
                onChange={(event) =>
                  updateForm("companyRegisteredNumber", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>VAT number</span>
              <input
                value={form.companyVatNumber}
                onChange={(event) =>
                  updateForm("companyVatNumber", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
          </div>
        </Section>

        <Section
          title="Contact"
          isOpen={openSections.contact}
          onToggle={() => toggleSection("contact")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Phone")}
              <input
                data-required-field="contactPhone"
                value={form.contactPhone}
                onChange={(event) =>
                  updateForm("contactPhone", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactPhone",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Phone formatted")}
              <input
                data-required-field="contactPhoneFormatted"
                value={form.contactPhoneFormatted}
                onChange={(event) =>
                  updateForm("contactPhoneFormatted", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactPhoneFormatted",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>WhatsApp</span>
              <input
                value={form.contactWhatsapp}
                onChange={(event) =>
                  updateForm("contactWhatsapp", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Email")}
              <input
                data-required-field="contactEmail"
                value={form.contactEmail}
                onChange={(event) =>
                  updateForm("contactEmail", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactEmail",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Street")}
              <input
                data-required-field="contactStreet"
                value={form.contactStreet}
                onChange={(event) =>
                  updateForm("contactStreet", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactStreet",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("City")}
              <input
                data-required-field="contactCity"
                value={form.contactCity}
                onChange={(event) =>
                  updateForm("contactCity", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactCity",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("County")}
              <input
                data-required-field="contactCounty"
                value={form.contactCounty}
                onChange={(event) =>
                  updateForm("contactCounty", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactCounty",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Postcode")}
              <input
                data-required-field="contactPostcode"
                value={form.contactPostcode}
                onChange={(event) =>
                  updateForm("contactPostcode", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactPostcode",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Country")}
              <input
                data-required-field="contactCountry"
                value={form.contactCountry}
                onChange={(event) =>
                  updateForm("contactCountry", event.target.value)
                }
                className={requiredFieldClassName(
                  "contactCountry",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Weekdays")}
              <input
                data-required-field="openingWeekdays"
                value={form.openingWeekdays}
                onChange={(event) =>
                  updateForm("openingWeekdays", event.target.value)
                }
                className={requiredFieldClassName(
                  "openingWeekdays",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Weekends")}
              <input
                data-required-field="openingWeekends"
                value={form.openingWeekends}
                onChange={(event) =>
                  updateForm("openingWeekends", event.target.value)
                }
                className={requiredFieldClassName(
                  "openingWeekends",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Service radius")}
              <input
                data-required-field="serviceRadius"
                value={form.serviceRadius}
                onChange={(event) =>
                  updateForm("serviceRadius", event.target.value)
                }
                className={requiredFieldClassName(
                  "serviceRadius",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
                )}
              />
            </label>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Service area")}
              <button
                type="button"
                onClick={() => toggleRawJson("serviceArea")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("serviceArea")
                  ? "Hide raw JSON"
                  : "Show raw JSON"}
              </button>
            </div>
            <label className="space-y-1 text-sm">
              <span className="text-sm font-medium">
                Service area (comma separated)
              </span>
              <CommaSeparatedEditor
                items={parsedServiceArea}
                onChange={(next) => setJsonValue("serviceArea", next)}
                placeholder="Town or district, another town"
              />
            </label>
            {isRawJsonVisible("serviceArea") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.serviceArea = element;
                }}
                rows={4}
                value={jsonFields.serviceArea}
                onChange={(event) =>
                  updateJsonField("serviceArea", event.target.value)
                }
                className={jsonFieldClassName("serviceArea")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Branding"
          isOpen={openSections.branding}
          onToggle={() => toggleSection("branding")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Primary color")}
              <input
                type="color"
                data-required-field="brandingPrimary"
                value={form.brandingPrimary}
                onChange={(event) =>
                  updateForm("brandingPrimary", event.target.value)
                }
                className={requiredFieldClassName(
                  "brandingPrimary",
                  "h-10 w-full rounded-lg border border-foreground/10 bg-transparent px-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Secondary color")}
              <input
                type="color"
                data-required-field="brandingSecondary"
                value={form.brandingSecondary}
                onChange={(event) =>
                  updateForm("brandingSecondary", event.target.value)
                }
                className={requiredFieldClassName(
                  "brandingSecondary",
                  "h-10 w-full rounded-lg border border-foreground/10 bg-transparent px-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Accent color")}
              <input
                type="color"
                data-required-field="brandingAccent"
                value={form.brandingAccent}
                onChange={(event) =>
                  updateForm("brandingAccent", event.target.value)
                }
                className={requiredFieldClassName(
                  "brandingAccent",
                  "h-10 w-full rounded-lg border border-foreground/10 bg-transparent px-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Background color")}
              <input
                type="color"
                data-required-field="brandingBackground"
                value={form.brandingBackground}
                onChange={(event) =>
                  updateForm("brandingBackground", event.target.value)
                }
                className={requiredFieldClassName(
                  "brandingBackground",
                  "h-10 w-full rounded-lg border border-foreground/10 bg-transparent px-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Foreground color")}
              <input
                type="color"
                data-required-field="brandingForeground"
                value={form.brandingForeground}
                onChange={(event) =>
                  updateForm("brandingForeground", event.target.value)
                }
                className={requiredFieldClassName(
                  "brandingForeground",
                  "h-10 w-full rounded-lg border border-foreground/10 bg-transparent px-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Heading font")}
              <select
                data-required-field="fontHeading"
                value={form.fontHeading}
                onChange={(event) =>
                  updateForm("fontHeading", event.target.value)
                }
                className={requiredFieldClassName(
                  "fontHeading",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              {renderFontButtons(form.fontHeading, (value) =>
                updateForm("fontHeading", value),
              )}
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Body font")}
              <select
                data-required-field="fontBody"
                value={form.fontBody}
                onChange={(event) => updateForm("fontBody", event.target.value)}
                className={requiredFieldClassName(
                  "fontBody",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              {renderFontButtons(form.fontBody, (value) =>
                updateForm("fontBody", value),
              )}
            </label>
            <div className="space-y-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-4 text-sm md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                Preview
              </div>
              <div className="space-y-2">
                <div
                  className="text-2xl font-semibold text-foreground sm:text-3xl"
                  style={{
                    fontFamily: resolveFontFamilyForPreview(form.fontHeading),
                  }}
                >
                  Heading preview — The quick brown fox jumps over the lazy dog
                </div>
                <div
                  className="text-sm text-foreground/80 sm:text-base"
                  style={{
                    fontFamily: resolveFontFamilyForPreview(form.fontBody),
                  }}
                >
                  Body preview — Near you in {siteConfig.contact.address.city}.
                  Free quotes, professional installs, and a finish built to
                  last.
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Proof"
          isOpen={openSections.proof}
          onToggle={() => toggleSection("proof")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Insurance")}
              <input
                data-required-field="proofInsurance"
                value={form.proofInsurance}
                onChange={(event) =>
                  updateForm("proofInsurance", event.target.value)
                }
                className={requiredFieldClassName(
                  "proofInsurance",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Guarantee")}
              <input
                data-required-field="proofGuarantee"
                value={form.proofGuarantee}
                onChange={(event) =>
                  updateForm("proofGuarantee", event.target.value)
                }
                className={requiredFieldClassName(
                  "proofGuarantee",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              <span>Reviews embed</span>
              <input
                value={form.proofReviewsEmbed}
                onChange={(event) =>
                  updateForm("proofReviewsEmbed", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Review count")}
              <input
                data-required-field="proofReviewCount"
                value={form.proofReviewCount}
                onChange={(event) =>
                  updateForm("proofReviewCount", event.target.value)
                }
                className={requiredFieldClassName(
                  "proofReviewCount",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Average rating")}
              <input
                data-required-field="proofAverageRating"
                value={form.proofAverageRating}
                onChange={(event) =>
                  updateForm("proofAverageRating", event.target.value)
                }
                className={requiredFieldClassName(
                  "proofAverageRating",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Accreditations")}
              <button
                type="button"
                onClick={() => toggleRawJson("accreditations")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("accreditations")
                  ? "Hide raw JSON"
                  : "Show raw JSON"}
              </button>
            </div>
            <div className="space-y-4">
              {parsedAccreditations.map((item, index) => {
                const preview = accreditationPreviews[index] || item.logo || "";
                return (
                  <div
                    key={`${item.name}-${index}`}
                    className="space-y-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4"
                  >
                    <div className="flex justify-end">
                      <IconButton
                        label="Remove accreditation item"
                        onClick={() =>
                          setJsonValue(
                            "accreditations",
                            removeAt(parsedAccreditations, index),
                          )
                        }
                        className="-m-1"
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex flex-col items-center gap-2 self-start sm:self-auto">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                          {preview ? (
                            <div
                              role="img"
                              aria-label={item.name || "Accreditation logo"}
                              className="h-full w-full bg-contain bg-center bg-no-repeat"
                              style={{ backgroundImage: `url(${preview})` }}
                            />
                          ) : (
                            <span className="text-xs text-foreground/50">
                              No logo
                            </span>
                          )}
                        </div>
                        <IconButton
                          label="Remove logo image"
                          disabled={!preview}
                          onClick={() => {
                            const next = replaceAt(
                              parsedAccreditations,
                              index,
                              {
                                ...item,
                                logo: "",
                              },
                            );
                            setAccreditationFiles((prev) => ({
                              ...prev,
                              [index]: null,
                            }));
                            setJsonValue("accreditations", next);
                          }}
                          className="p-1.5"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="space-y-1 text-sm">
                          <span>Name</span>
                          <input
                            value={item.name}
                            onChange={(event) => {
                              const next = replaceAt(
                                parsedAccreditations,
                                index,
                                {
                                  ...item,
                                  name: event.target.value,
                                },
                              );
                              setJsonValue("accreditations", next);
                            }}
                            className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                          />
                        </label>
                        <label className="space-y-1 text-sm">
                          <span>Upload logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              setAccreditationFiles((prev) => ({
                                ...prev,
                                [index]: event.target.files?.[0] ?? null,
                              }))
                            }
                            className={fileInputClassName}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() =>
                  setJsonValue("accreditations", [
                    ...parsedAccreditations,
                    { name: "", logo: "" },
                  ])
                }
                className={pillButtonClassName}
              >
                Add accreditation
              </button>
            </div>
            {isRawJsonVisible("accreditations") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.accreditations = element;
                }}
                rows={4}
                value={jsonFields.accreditations}
                onChange={(event) =>
                  updateJsonField("accreditations", event.target.value)
                }
                className={jsonFieldClassName("accreditations")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Social"
          isOpen={openSections.social}
          onToggle={() => toggleSection("social")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {socialKeys.map((key) => (
              <div
                key={key}
                className="space-y-2 rounded-xl border border-foreground/10 p-4"
              >
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={social[key].enabled}
                    onChange={(event) =>
                      updateSocial(key, { enabled: event.target.checked })
                    }
                  />
                  <span className="capitalize">{key}</span>
                </label>
                <label className="space-y-1 text-sm">
                  <span>Label</span>
                  <input
                    value={social[key].label}
                    onChange={(event) =>
                      updateSocial(key, { label: event.target.value })
                    }
                    className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                  />
                </label>
                <label className="space-y-1 text-sm">
                  <span>URL</span>
                  <input
                    value={social[key].url}
                    onChange={(event) =>
                      updateSocial(key, { url: event.target.value })
                    }
                    className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                  />
                </label>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="SEO"
          isOpen={openSections.seo}
          onToggle={() => toggleSection("seo")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Site URL")}
              <input
                data-required-field="seoSiteUrl"
                value={form.seoSiteUrl}
                onChange={(event) =>
                  updateForm("seoSiteUrl", event.target.value)
                }
                className={requiredFieldClassName(
                  "seoSiteUrl",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Base title")}
              <input
                data-required-field="seoBaseTitle"
                value={form.seoBaseTitle}
                onChange={(event) =>
                  updateForm("seoBaseTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "seoBaseTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Base description")}
              <textarea
                data-required-field="seoBaseDescription"
                rows={3}
                value={form.seoBaseDescription}
                onChange={(event) =>
                  updateForm("seoBaseDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "seoBaseDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              <span>Google Business Profile</span>
              <input
                value={form.seoGoogleBusinessProfile}
                onChange={(event) =>
                  updateForm("seoGoogleBusinessProfile", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Offer catalog name")}
              <input
                data-required-field="seoOfferCatalogName"
                value={form.seoOfferCatalogName}
                onChange={(event) =>
                  updateForm("seoOfferCatalogName", event.target.value)
                }
                className={requiredFieldClassName(
                  "seoOfferCatalogName",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Keywords")}
              <button
                type="button"
                onClick={() => toggleRawJson("keywords")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("keywords")
                  ? "Hide raw JSON"
                  : "Show raw JSON"}
              </button>
            </div>
            <label className="space-y-1 text-sm">
              <span className="text-sm font-medium">
                Keywords (comma separated)
              </span>
              <CommaSeparatedEditor
                items={parsedKeywords}
                onChange={(next) => setJsonValue("keywords", next)}
                placeholder="keyword, another keyword"
              />
            </label>
            {isRawJsonVisible("keywords") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.keywords = element;
                }}
                rows={3}
                value={jsonFields.keywords}
                onChange={(event) =>
                  updateJsonField("keywords", event.target.value)
                }
                className={jsonFieldClassName("keywords")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Integrations"
          isOpen={openSections.integrations}
          onToggle={() => toggleSection("integrations")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Maps provider")}
              <select
                data-required-field="integrationsMapsProvider"
                value={form.integrationsMapsProvider}
                onChange={(event) =>
                  updateForm("integrationsMapsProvider", event.target.value)
                }
                className={requiredFieldClassName(
                  "integrationsMapsProvider",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              >
                <option value="googleEmbed">googleEmbed</option>
                <option value="leaflet">leaflet</option>
              </select>
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Form endpoint")}
              <input
                data-required-field="integrationsFormEndpoint"
                value={form.integrationsFormEndpoint}
                onChange={(event) =>
                  updateForm("integrationsFormEndpoint", event.target.value)
                }
                className={requiredFieldClassName(
                  "integrationsFormEndpoint",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Google Maps embed URL")}
              <input
                data-required-field="integrationsMapsEmbedUrl"
                value={form.integrationsMapsEmbedUrl}
                onChange={(event) =>
                  updateForm("integrationsMapsEmbedUrl", event.target.value)
                }
                className={requiredFieldClassName(
                  "integrationsMapsEmbedUrl",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Google Analytics ID</span>
              <input
                value={form.integrationsGoogleAnalyticsId}
                onChange={(event) =>
                  updateForm(
                    "integrationsGoogleAnalyticsId",
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Facebook Pixel</span>
              <input
                value={form.integrationsFacebookPixel}
                onChange={(event) =>
                  updateForm("integrationsFacebookPixel", event.target.value)
                }
                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Email provider")}
              <select
                data-required-field="integrationsEmailProvider"
                value={form.integrationsEmailProvider}
                onChange={(event) =>
                  updateForm("integrationsEmailProvider", event.target.value)
                }
                className={requiredFieldClassName(
                  "integrationsEmailProvider",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              >
                <option value="resend">resend</option>
              </select>
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Resend from email")}
              <input
                data-required-field="integrationsResendFromEmail"
                value={form.integrationsResendFromEmail}
                onChange={(event) =>
                  updateForm("integrationsResendFromEmail", event.target.value)
                }
                className={requiredFieldClassName(
                  "integrationsResendFromEmail",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
        </Section>

        <Section
          title="Navigation"
          isOpen={openSections.navigation}
          onToggle={() => toggleSection("navigation")}
        >
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Navigation items")}
              <button
                type="button"
                onClick={() => toggleRawJson("navigation")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("navigation")
                  ? "Hide raw JSON"
                  : "Show raw JSON"}
              </button>
            </div>
            <div className="space-y-3">
              {parsedNavigation.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="space-y-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4"
                >
                  <div className="flex justify-end">
                    <IconButton
                      label="Remove navigation item"
                      onClick={() =>
                        setJsonValue(
                          "navigation",
                          removeAt(parsedNavigation, index),
                        )
                      }
                      className="-m-1"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1 text-sm">
                      <span>Label</span>
                      <input
                        value={item.label}
                        onChange={(event) => {
                          const next = replaceAt(parsedNavigation, index, {
                            ...item,
                            label: event.target.value,
                          });
                          setJsonValue("navigation", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <label className="space-y-1 text-sm">
                      <span>URL</span>
                      <input
                        value={item.href}
                        onChange={(event) => {
                          const next = replaceAt(parsedNavigation, index, {
                            ...item,
                            href: event.target.value,
                          });
                          setJsonValue("navigation", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setJsonValue("navigation", [
                    ...parsedNavigation,
                    { href: "", label: "" },
                  ])
                }
                className={pillButtonClassName}
              >
                Add navigation item
              </button>
            </div>
            {isRawJsonVisible("navigation") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.navigation = element;
                }}
                rows={4}
                value={jsonFields.navigation}
                onChange={(event) =>
                  updateJsonField("navigation", event.target.value)
                }
                className={jsonFieldClassName("navigation")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Header & Footer"
          isOpen={openSections.headerFooter}
          onToggle={() => toggleSection("headerFooter")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Header primary CTA label")}
              <input
                data-required-field="headerPrimaryCtaLabel"
                value={form.headerPrimaryCtaLabel}
                onChange={(event) =>
                  updateForm("headerPrimaryCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "headerPrimaryCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Quick links label")}
              <input
                data-required-field="footerQuickLinksLabel"
                value={form.footerQuickLinksLabel}
                onChange={(event) =>
                  updateForm("footerQuickLinksLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerQuickLinksLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Contact label")}
              <input
                data-required-field="footerContactLabel"
                value={form.footerContactLabel}
                onChange={(event) =>
                  updateForm("footerContactLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerContactLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Social label")}
              <input
                data-required-field="footerSocialLabel"
                value={form.footerSocialLabel}
                onChange={(event) =>
                  updateForm("footerSocialLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerSocialLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Privacy label")}
              <input
                data-required-field="footerPrivacyLabel"
                value={form.footerPrivacyLabel}
                onChange={(event) =>
                  updateForm("footerPrivacyLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerPrivacyLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Terms label")}
              <input
                data-required-field="footerTermsLabel"
                value={form.footerTermsLabel}
                onChange={(event) =>
                  updateForm("footerTermsLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerTermsLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Copyright label")}
              <input
                data-required-field="footerCopyrightLabel"
                value={form.footerCopyrightLabel}
                onChange={(event) =>
                  updateForm("footerCopyrightLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "footerCopyrightLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
        </Section>

        <Section
          title="Services"
          isOpen={openSections.services}
          onToggle={() => toggleSection("services")}
        >
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Services")}
              <button
                type="button"
                onClick={() => toggleRawJson("services")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("services")
                  ? "Hide raw JSON"
                  : "Show raw JSON"}
              </button>
            </div>
            <div className="space-y-2">
              {parsedServicesList.map((service, index) => (
                <div
                  key={`${service.slug}-${index}`}
                  className="space-y-2 rounded-2xl border border-foreground/10 bg-foreground/5 p-3"
                >
                  <div className="flex justify-end">
                    <IconButton
                      label="Remove service"
                      onClick={() =>
                        setJsonValue(
                          "services",
                          removeAt(parsedServicesList, index),
                        )
                      }
                      className="-m-1"
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <label className="space-y-1 text-sm">
                      <span>Slug</span>
                      <input
                        value={service.slug}
                        onChange={(event) => {
                          const next = replaceAt(parsedServicesList, index, {
                            ...service,
                            slug: event.target.value,
                          });
                          setJsonValue("services", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <label className="space-y-1 text-sm">
                      <span>Name</span>
                      <input
                        value={service.name}
                        onChange={(event) => {
                          const next = replaceAt(parsedServicesList, index, {
                            ...service,
                            name: event.target.value,
                          });
                          setJsonValue("services", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <label className="space-y-1 text-sm md:col-span-2">
                      <span>Short description</span>
                      <textarea
                        rows={2}
                        value={service.shortDesc}
                        onChange={(event) => {
                          const next = replaceAt(parsedServicesList, index, {
                            ...service,
                            shortDesc: event.target.value,
                          });
                          setJsonValue("services", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <label className="space-y-1 text-sm md:col-span-2">
                      <span>Long description</span>
                      <textarea
                        rows={3}
                        value={service.longDesc}
                        onChange={(event) => {
                          const next = replaceAt(parsedServicesList, index, {
                            ...service,
                            longDesc: event.target.value,
                          });
                          setJsonValue("services", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="space-y-2">
                      <span className="text-sm font-medium">
                        Gallery images
                      </span>
                      <div className="rounded-2xl border border-foreground/10 bg-(--color-background) p-3">
                        {(() => {
                          const normalizedServiceSelection = service.gallery
                            .map((src) => src.trim())
                            .filter(Boolean);
                          const selectedSet = new Set(
                            normalizedServiceSelection,
                          );

                          const baseOptions = parsedGalleryItems
                            .map((item) => ({
                              src: item.image?.trim() ?? "",
                              label: item.label,
                            }))
                            .filter((option) => option.src);

                          const baseSrcSet = new Set(
                            baseOptions.map((option) => option.src),
                          );

                          const legacyOptions = normalizedServiceSelection
                            .filter((src) => !baseSrcSet.has(src))
                            .map((src) => ({ src, label: "Existing image" }));

                          const options = [...baseOptions, ...legacyOptions];
                          const selectedCount = options.filter((option) =>
                            selectedSet.has(option.src),
                          ).length;

                          const updateSelection = (
                            nextSelected: Set<string>,
                          ) => {
                            const ordered = options
                              .filter((option) => nextSelected.has(option.src))
                              .map((option) => option.src);
                            const next = replaceAt(parsedServicesList, index, {
                              ...service,
                              gallery: ordered,
                            });
                            setJsonValue("services", next);
                          };

                          if (options.length === 0) {
                            return (
                              <div className="text-xs text-foreground/60">
                                Upload images in the Gallery section first.
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="text-xs text-foreground/60">
                                  Selected: {selectedCount}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => updateSelection(new Set())}
                                  className={pillButtonClassName}
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="grid gap-2 sm:grid-cols-2">
                                {options.map((option) => {
                                  const checked = selectedSet.has(option.src);
                                  return (
                                    <label
                                      key={option.src}
                                      className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-(--color-background) p-2 text-left text-xs text-foreground/70 transition hover:border-foreground/30 hover:text-foreground"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(event) => {
                                          const nextSelected = new Set(
                                            selectedSet,
                                          );
                                          if (event.target.checked) {
                                            nextSelected.add(option.src);
                                          } else {
                                            nextSelected.delete(option.src);
                                          }
                                          updateSelection(nextSelected);
                                        }}
                                        className="h-4 w-4 rounded border-foreground/30 text-(--color-primary)"
                                      />
                                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                                        <div
                                          role="img"
                                          aria-label={option.label}
                                          className="h-full w-full bg-cover bg-center bg-no-repeat"
                                          style={{
                                            backgroundImage: `url(${option.src})`,
                                          }}
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="truncate font-medium">
                                          {option.label}
                                        </div>
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="space-y-1 text-sm">
                        <span>Price range</span>
                        <input
                          value={service.priceRange ?? ""}
                          onChange={(event) => {
                            const next = replaceAt(parsedServicesList, index, {
                              ...service,
                              priceRange: event.target.value || undefined,
                            });
                            setJsonValue("services", next);
                          }}
                          className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                        />
                      </label>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Features</span>
                        <CommaSeparatedEditor
                          items={service.features}
                          onChange={(nextFeatures) => {
                            const next = replaceAt(parsedServicesList, index, {
                              ...service,
                              features: nextFeatures,
                            });
                            setJsonValue("services", next);
                          }}
                          placeholder="Feature one, Feature two"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">FAQs</span>
                    <div className="space-y-3">
                      {service.faqs.map((faq, faqIndex) => (
                        <div
                          key={`${faq.q}-${faqIndex}`}
                          className="space-y-2 rounded-2xl border border-foreground/10 bg-(--color-background) p-3"
                        >
                          <div className="flex justify-end">
                            <IconButton
                              label="Remove FAQ"
                              onClick={() => {
                                const nextFaqs = removeAt(
                                  service.faqs,
                                  faqIndex,
                                );
                                const next = replaceAt(
                                  parsedServicesList,
                                  index,
                                  {
                                    ...service,
                                    faqs: nextFaqs,
                                  },
                                );
                                setJsonValue("services", next);
                              }}
                              className="-m-1"
                            />
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <label className="space-y-1 text-sm">
                              <span>Question</span>
                              <input
                                value={faq.q}
                                onChange={(event) => {
                                  const nextFaqs = replaceAt(
                                    service.faqs,
                                    faqIndex,
                                    {
                                      ...faq,
                                      q: event.target.value,
                                    },
                                  );
                                  const next = replaceAt(
                                    parsedServicesList,
                                    index,
                                    {
                                      ...service,
                                      faqs: nextFaqs,
                                    },
                                  );
                                  setJsonValue("services", next);
                                }}
                                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                              />
                            </label>
                            <label className="space-y-1 text-sm">
                              <span>Answer</span>
                              <input
                                value={faq.a}
                                onChange={(event) => {
                                  const nextFaqs = replaceAt(
                                    service.faqs,
                                    faqIndex,
                                    {
                                      ...faq,
                                      a: event.target.value,
                                    },
                                  );
                                  const next = replaceAt(
                                    parsedServicesList,
                                    index,
                                    {
                                      ...service,
                                      faqs: nextFaqs,
                                    },
                                  );
                                  setJsonValue("services", next);
                                }}
                                className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextFaqs = [...service.faqs, { q: "", a: "" }];
                        const next = replaceAt(parsedServicesList, index, {
                          ...service,
                          faqs: nextFaqs,
                        });
                        setJsonValue("services", next);
                      }}
                      className={pillButtonClassName}
                    >
                      Add FAQ
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setJsonValue("services", [
                    ...parsedServicesList,
                    {
                      slug: "",
                      name: "",
                      shortDesc: "",
                      longDesc: "",
                      features: [],
                      gallery: [],
                      faqs: [],
                    },
                  ])
                }
                className={pillButtonClassName}
              >
                Add service
              </button>
            </div>
            {isRawJsonVisible("services") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.services = element;
                }}
                rows={6}
                value={jsonFields.services}
                onChange={(event) =>
                  updateJsonField("services", event.target.value)
                }
                className={jsonFieldClassName("services")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Areas"
          isOpen={openSections.areas}
          onToggle={() => toggleSection("areas")}
        >
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {requiredLabel("Areas")}
              <button
                type="button"
                onClick={() => toggleRawJson("areas")}
                className={pillButtonClassName}
              >
                {isRawJsonVisible("areas") ? "Hide raw JSON" : "Show raw JSON"}
              </button>
            </div>
            <div className="space-y-3">
              {parsedAreasList.map((area, index) => (
                <div
                  key={`${area.slug}-${index}`}
                  className="space-y-2 rounded-2xl border border-foreground/10 bg-foreground/5 p-3"
                >
                  <div className="flex justify-end">
                    <IconButton
                      label="Remove area"
                      onClick={() =>
                        setJsonValue("areas", removeAt(parsedAreasList, index))
                      }
                      className="-m-1"
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <label className="space-y-1 text-sm">
                      <span>Slug</span>
                      <input
                        value={area.slug}
                        onChange={(event) => {
                          const next = replaceAt(parsedAreasList, index, {
                            ...area,
                            slug: event.target.value,
                          });
                          setJsonValue("areas", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <label className="space-y-1 text-sm">
                      <span>Name</span>
                      <input
                        value={area.name}
                        onChange={(event) => {
                          const next = replaceAt(parsedAreasList, index, {
                            ...area,
                            name: event.target.value,
                          });
                          setJsonValue("areas", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                  </div>
                  <label className="space-y-1 text-sm">
                    <span className="text-sm font-medium">
                      Postcodes (comma separated)
                    </span>
                    <input
                      value={area.postcodes.join(", ")}
                      onChange={(event) => {
                        const nextPostcodes = parseCommaSeparatedList(
                          event.target.value,
                        );
                        const next = replaceAt(parsedAreasList, index, {
                          ...area,
                          postcodes: nextPostcodes,
                        });
                        setJsonValue("areas", next);
                      }}
                      placeholder="e.g., RG1 1AA, RG2 2BB"
                      className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setJsonValue("areas", [
                    ...parsedAreasList,
                    { slug: "", name: "", postcodes: [] },
                  ])
                }
                className={pillButtonClassName}
              >
                Add area
              </button>
            </div>
            {isRawJsonVisible("areas") ? (
              <textarea
                ref={(element) => {
                  jsonFieldRefs.current.areas = element;
                }}
                rows={4}
                value={jsonFields.areas}
                onChange={(event) =>
                  updateJsonField("areas", event.target.value)
                }
                className={jsonFieldClassName("areas")}
              />
            ) : null}
          </div>
        </Section>

        <Section
          title="Home Hero"
          isOpen={openSections.homeHero}
          onToggle={() => toggleSection("homeHero")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Hero title")}
              <input
                data-required-field="homeHeroTitle"
                value={form.homeHeroTitle}
                onChange={(event) =>
                  updateForm("homeHeroTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeHeroTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Hero subheading")}
              <textarea
                data-required-field="homeHeroSubheading"
                rows={3}
                value={form.homeHeroSubheading}
                onChange={(event) =>
                  updateForm("homeHeroSubheading", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeHeroSubheading",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Hero primary CTA")}
              <input
                data-required-field="homeHeroPrimaryCtaLabel"
                value={form.homeHeroPrimaryCtaLabel}
                onChange={(event) =>
                  updateForm("homeHeroPrimaryCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeHeroPrimaryCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Hero secondary CTA")}
              <input
                data-required-field="homeHeroSecondaryCtaLabel"
                value={form.homeHeroSecondaryCtaLabel}
                onChange={(event) =>
                  updateForm("homeHeroSecondaryCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeHeroSecondaryCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <div className="space-y-3 text-sm md:col-span-2">
              <span className="font-medium">Hero background</span>
              <div className="space-y-4">
                <div className="space-y-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium">From gallery</span>
                      <button
                        type="button"
                        disabled={heroGallerySelection.length === 0}
                        onClick={() => updateHeroGallerySelection([])}
                        className={pillButtonClassName}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="rounded-2xl border border-foreground/10 bg-(--color-background) p-3">
                      {(() => {
                        const normalizedSelection = heroGallerySelection
                          .map((src) => src.trim())
                          .filter(Boolean);
                        const selectedSet = new Set(normalizedSelection);

                        const baseOptions = parsedGalleryItems
                          .map((item) => ({
                            src: item.image?.trim() ?? "",
                            label: item.label,
                          }))
                          .filter((option) => option.src);

                        const baseSrcSet = new Set(
                          baseOptions.map((option) => option.src),
                        );

                        const legacyOptions = normalizedSelection
                          .filter((src) => !baseSrcSet.has(src))
                          .map((src) => ({ src, label: "Existing image" }));

                        const options = [...baseOptions, ...legacyOptions];
                        const selectedCount = options.filter((option) =>
                          selectedSet.has(option.src),
                        ).length;

                        const updateSelection = (nextSelected: Set<string>) => {
                          const ordered = options
                            .filter((option) => nextSelected.has(option.src))
                            .map((option) => option.src);
                          updateHeroGallerySelection(ordered);
                        };

                        if (options.length === 0) {
                          return (
                            <div className="text-xs text-foreground/60">
                              Upload images in the Gallery section first.
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-3">
                            <div className="text-xs text-foreground/60">
                              Selected: {selectedCount}
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {options.map((option) => {
                                const checked = selectedSet.has(option.src);
                                return (
                                  <label
                                    key={option.src}
                                    className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-(--color-background) p-2 text-left text-xs text-foreground/70 transition hover:border-foreground/30 hover:text-foreground"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={(event) => {
                                        const nextSelected = new Set(
                                          selectedSet,
                                        );
                                        if (event.target.checked) {
                                          nextSelected.add(option.src);
                                        } else {
                                          nextSelected.delete(option.src);
                                        }
                                        updateSelection(nextSelected);
                                      }}
                                      className="h-4 w-4 rounded border-foreground/30 text-(--color-primary)"
                                    />
                                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                                      <div
                                        role="img"
                                        aria-label={option.label}
                                        className="h-full w-full bg-cover bg-center bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(${option.src})`,
                                        }}
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate font-medium">
                                        {option.label}
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium">
                        Hero-only uploads
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateHeroOnlyImages([...heroOnlyImages, ""])
                        }
                        className={pillButtonClassName}
                      >
                        Add image
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {heroOnlyImages.length > 0 ? (
                        heroOnlyImages.map((image, index) => (
                          <div
                            key={`hero-only-${index}`}
                            className="space-y-3 rounded-2xl border border-foreground/10 bg-(--color-background) p-4"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">
                                Image {index + 1}
                              </span>
                              <IconButton
                                label="Remove image"
                                onClick={() => {
                                  const nextImages = heroOnlyImages.filter(
                                    (_, itemIndex) => itemIndex !== index,
                                  );
                                  updateHeroOnlyImages(nextImages);
                                  setHeroBackgroundImageFiles((prev) => {
                                    const next: Record<number, File | null> =
                                      {};
                                    const remainingIndices = heroOnlyImages
                                      .map((_, itemIndex) => itemIndex)
                                      .filter(
                                        (itemIndex) => itemIndex !== index,
                                      );
                                    remainingIndices.forEach(
                                      (oldIndex, nextIndex) => {
                                        const file = prev[oldIndex];
                                        if (file) {
                                          next[nextIndex] = file;
                                        }
                                      },
                                    );
                                    return next;
                                  });
                                }}
                              />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)]">
                              <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                                {heroBackgroundImagePreviews[index] || image ? (
                                  <div
                                    role="img"
                                    aria-label={`Hero only ${index + 1}`}
                                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${heroBackgroundImagePreviews[index] ?? image})`,
                                    }}
                                  />
                                ) : (
                                  <span className="text-xs text-foreground/50">
                                    No image
                                  </span>
                                )}
                              </div>
                              <label className="space-y-1 text-sm">
                                <span>Upload image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) =>
                                    setHeroBackgroundImageFiles((prev) => ({
                                      ...prev,
                                      [index]: event.target.files?.[0] ?? null,
                                    }))
                                  }
                                  className={fileInputClassName}
                                />
                              </label>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-foreground/20 px-4 py-6 text-center text-xs text-foreground/60 md:col-span-2">
                          No hero-only images yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">
                      Background video
                    </span>
                    <IconButton
                      label="Remove video"
                      disabled={
                        !heroBackgroundVideoPreview &&
                        !form.homeHeroBackgroundVideo
                      }
                      onClick={() => {
                        setHeroBackgroundVideoFile(null);
                        updateForm("homeHeroBackgroundVideo", "");
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                      {heroBackgroundVideoPreview ||
                      form.homeHeroBackgroundVideo ? (
                        <video
                          src={
                            heroBackgroundVideoPreview ??
                            form.homeHeroBackgroundVideo
                          }
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <span className="text-xs text-foreground/50">
                          No video
                        </span>
                      )}
                    </div>
                    <label className="flex-1 space-y-1 text-sm">
                      <span>Upload video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(event) =>
                          setHeroBackgroundVideoFile(
                            event.target.files?.[0] ?? null,
                          )
                        }
                        className={fileInputClassName}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <label className="space-y-1 text-sm">
              {requiredLabel("Services eyebrow")}
              <input
                data-required-field="homeServicesEyebrow"
                value={form.homeServicesEyebrow}
                onChange={(event) =>
                  updateForm("homeServicesEyebrow", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeServicesEyebrow",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Services title")}
              <input
                data-required-field="homeServicesTitle"
                value={form.homeServicesTitle}
                onChange={(event) =>
                  updateForm("homeServicesTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeServicesTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Services description")}
              <textarea
                data-required-field="homeServicesDescription"
                rows={3}
                value={form.homeServicesDescription}
                onChange={(event) =>
                  updateForm("homeServicesDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeServicesDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Services CTA label")}
              <input
                data-required-field="homeServicesCtaLabel"
                value={form.homeServicesCtaLabel}
                onChange={(event) =>
                  updateForm("homeServicesCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeServicesCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Services featured count")}
              <input
                data-required-field="homeServicesFeaturedCount"
                value={form.homeServicesFeaturedCount}
                onChange={(event) =>
                  updateForm("homeServicesFeaturedCount", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeServicesFeaturedCount",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Process eyebrow")}
              <input
                data-required-field="homeProcessEyebrow"
                value={form.homeProcessEyebrow}
                onChange={(event) =>
                  updateForm("homeProcessEyebrow", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeProcessEyebrow",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Process title")}
              <input
                data-required-field="homeProcessTitle"
                value={form.homeProcessTitle}
                onChange={(event) =>
                  updateForm("homeProcessTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeProcessTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Process description")}
              <textarea
                data-required-field="homeProcessDescription"
                rows={3}
                value={form.homeProcessDescription}
                onChange={(event) =>
                  updateForm("homeProcessDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeProcessDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
          <label className="hidden">
            <textarea
              ref={(element) => {
                jsonFieldRefs.current.processSteps = element;
              }}
              value={jsonFields.processSteps}
              onChange={(event) =>
                updateJsonField("processSteps", event.target.value)
              }
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Gallery eyebrow")}
              <input
                data-required-field="homeGalleryEyebrow"
                value={form.homeGalleryEyebrow}
                onChange={(event) =>
                  updateForm("homeGalleryEyebrow", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeGalleryEyebrow",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Gallery title")}
              <input
                data-required-field="homeGalleryTitle"
                value={form.homeGalleryTitle}
                onChange={(event) =>
                  updateForm("homeGalleryTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeGalleryTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Gallery description")}
              <textarea
                data-required-field="homeGalleryDescription"
                rows={3}
                value={form.homeGalleryDescription}
                onChange={(event) =>
                  updateForm("homeGalleryDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeGalleryDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
          <label className="hidden">
            <textarea
              ref={(element) => {
                jsonFieldRefs.current.galleryItems = element;
              }}
              value={jsonFields.galleryItems}
              onChange={(event) =>
                updateJsonField("galleryItems", event.target.value)
              }
            />
          </label>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-medium">Gallery items</span>
              <button
                type="button"
                onClick={() => {
                  const nextIndex = parsedGalleryItems.length + 1;
                  setJsonValue("galleryItems", [
                    ...parsedGalleryItems,
                    { label: `Gallery ${nextIndex}` },
                  ]);
                  setGalleryFiles({});
                }}
                className={pillButtonClassName}
              >
                Add gallery item
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {parsedGalleryItems.map((item, index) => {
                const preview = galleryPreviews[index] ?? item.image;
                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="space-y-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4 text-sm"
                  >
                    <div className="flex justify-end">
                      <IconButton
                        label="Remove gallery item"
                        onClick={() => {
                          setJsonValue(
                            "galleryItems",
                            removeAt(parsedGalleryItems, index),
                          );
                          setGalleryFiles({});
                        }}
                        className="-m-1"
                      />
                    </div>
                    <label className="space-y-1 text-sm">
                      <span>Label</span>
                      <input
                        value={item.label}
                        onChange={(event) => {
                          const next = replaceAt(parsedGalleryItems, index, {
                            ...item,
                            label: event.target.value,
                          });
                          setJsonValue("galleryItems", next);
                        }}
                        className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2"
                      />
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-(--color-background)">
                        {preview ? (
                          <div
                            role="img"
                            aria-label={item.label}
                            className="h-full w-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${preview})` }}
                          />
                        ) : (
                          <span className="text-xs text-foreground/50">
                            No image
                          </span>
                        )}
                      </div>
                      <label className="flex-1 space-y-1 text-sm">
                        <span>Upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            setGalleryFiles((prev) => ({
                              ...prev,
                              [index]: event.target.files?.[0] ?? null,
                            }))
                          }
                          className={fileInputClassName}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Reviews eyebrow")}
              <input
                data-required-field="homeReviewsEyebrow"
                value={form.homeReviewsEyebrow}
                onChange={(event) =>
                  updateForm("homeReviewsEyebrow", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeReviewsEyebrow",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Reviews title")}
              <input
                data-required-field="homeReviewsTitle"
                value={form.homeReviewsTitle}
                onChange={(event) =>
                  updateForm("homeReviewsTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeReviewsTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Reviews description")}
              <textarea
                data-required-field="homeReviewsDescription"
                rows={2}
                value={form.homeReviewsDescription}
                onChange={(event) =>
                  updateForm("homeReviewsDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeReviewsDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
          <label className="hidden">
            <textarea
              ref={(element) => {
                jsonFieldRefs.current.reviewItems = element;
              }}
              value={jsonFields.reviewItems}
              onChange={(event) =>
                updateJsonField("reviewItems", event.target.value)
              }
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              {requiredLabel("Areas eyebrow")}
              <input
                data-required-field="homeAreasEyebrow"
                value={form.homeAreasEyebrow}
                onChange={(event) =>
                  updateForm("homeAreasEyebrow", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeAreasEyebrow",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("Areas title")}
              <input
                data-required-field="homeAreasTitle"
                value={form.homeAreasTitle}
                onChange={(event) =>
                  updateForm("homeAreasTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeAreasTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("Areas description")}
              <input
                data-required-field="homeAreasDescription"
                value={form.homeAreasDescription}
                onChange={(event) =>
                  updateForm("homeAreasDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeAreasDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("CTA title")}
              <input
                data-required-field="homeCtaTitle"
                value={form.homeCtaTitle}
                onChange={(event) =>
                  updateForm("homeCtaTitle", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeCtaTitle",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              {requiredLabel("CTA description")}
              <textarea
                data-required-field="homeCtaDescription"
                rows={3}
                value={form.homeCtaDescription}
                onChange={(event) =>
                  updateForm("homeCtaDescription", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeCtaDescription",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("CTA primary label")}
              <input
                data-required-field="homeCtaPrimaryCtaLabel"
                value={form.homeCtaPrimaryCtaLabel}
                onChange={(event) =>
                  updateForm("homeCtaPrimaryCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeCtaPrimaryCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
            <label className="space-y-1 text-sm">
              {requiredLabel("CTA secondary label")}
              <input
                data-required-field="homeCtaSecondaryCtaLabel"
                value={form.homeCtaSecondaryCtaLabel}
                onChange={(event) =>
                  updateForm("homeCtaSecondaryCtaLabel", event.target.value)
                }
                className={requiredFieldClassName(
                  "homeCtaSecondaryCtaLabel",
                  "w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2",
                )}
              />
            </label>
          </div>
        </Section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className={`text-sm ${
              statusKind === "error"
                ? "text-red-500"
                : statusKind === "success"
                  ? "text-emerald-500"
                  : "text-foreground/70"
            }`}
          >
            {status ? status : " "}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Config"}
          </button>
        </div>
      </Container>
    </main>
  );
}
