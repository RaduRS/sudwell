import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Leaf,
  Phone,
  Star,
  Timer,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GalleryGrid } from "@/app/(pages)/gallery/GalleryGrid";
import { siteConfig } from "@/config/site.config";

type SearchParams = Record<string, string | string[] | undefined>;

type ServicePageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams>;
};

const getProduct = (slug: string) =>
  siteConfig.services.find((product) => product.slug === slug);

const kitVariants = [
  {
    id: "autumn-quartz",
    name: "SUDwell™ Autumn Quartz Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "golden-pea",
    name: "SUDwell™ Golden Pea Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "golden-quartz",
    name: "SUDwell™ Golden Quartz Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "green",
    name: "SUDwell™ Green Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "pearl-quartz",
    name: "SUDwell™ Pearl Quartz Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "red",
    name: "SUDwell™ Red Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
  {
    id: "silver",
    name: "SUDwell™ Silver Kit | Premium Grade U.V Resin-Driveway Kit",
    price: 29.46,
    image: "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp",
  },
] as const;

const getKitVariant = (variantId: string | undefined) =>
  kitVariants.find((variant) => variant.id === variantId);

const parsePositiveNumber = (value: string | undefined) => {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

export const generateStaticParams = async () => {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
};

export const generateMetadata = async ({
  params,
  searchParams,
}: ServicePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return {
      title: `Product not found | ${siteConfig.company.tradingName}`,
      description: siteConfig.seo.baseDescription,
      alternates: {
        canonical: `${siteConfig.seo.siteUrl}/services`,
      },
    };
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const variantId =
    typeof resolvedSearchParams.variant === "string"
      ? resolvedSearchParams.variant
      : undefined;
  const selectedVariant =
    slug === "block-paving" ? getKitVariant(variantId) : undefined;
  const titleName = selectedVariant?.name ?? product.name;

  const title = `${titleName} | ${siteConfig.company.tradingName}`;
  const description = `${product.shortDesc} Contact ${siteConfig.company.tradingName} for pricing and product advice.`;
  const url = `${siteConfig.seo.siteUrl}/services/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.company.tradingName,
      type: "website",
      images: [{ url: "/images/og-image.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
};

export default async function ServiceDetailPage({
  params,
  searchParams,
}: ServicePageProps) {
  const { slug } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const variantId =
    typeof resolvedSearchParams.variant === "string"
      ? resolvedSearchParams.variant
      : undefined;
  const selectedVariant =
    slug === "block-paving" ? getKitVariant(variantId) : undefined;

  const calculatorArea = parsePositiveNumber(
    typeof resolvedSearchParams.area === "string"
      ? resolvedSearchParams.area
      : undefined,
  );
  const calculatorSurface =
    typeof resolvedSearchParams.surface === "string"
      ? resolvedSearchParams.surface
      : "paths";
  const calculatorCoverage = calculatorSurface === "driveway" ? 0.8 : 1;
  const calculatorKits = calculatorArea
    ? Math.ceil(calculatorArea / calculatorCoverage)
    : null;

  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  const pageTitle = selectedVariant?.name ?? product.name;
  const mainImage = selectedVariant?.image ?? product.gallery[0] ?? "";
  const gallerySources = selectedVariant?.image
    ? [selectedVariant.image]
    : product.gallery;
  const gallerySlides = gallerySources
    .map((src, index) => ({
      src: src.trim(),
      alt: `${pageTitle} image ${index + 1}`,
    }))
    .filter((slide) => slide.src);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pageTitle,
    description: product.longDesc || product.shortDesc,
    brand: {
      "@type": "Brand",
      name: siteConfig.company.tradingName,
    },
    offers: selectedVariant
      ? {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: selectedVariant.price,
          availability: "https://schema.org/InStock",
          url: `${siteConfig.seo.siteUrl}/services/${product.slug}?variant=${selectedVariant.id}`,
        }
      : product.priceRange
        ? {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "GBP",
              description: product.priceRange,
            },
          }
        : undefined,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteConfig.seo.siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: `${siteConfig.seo.siteUrl}/services/${product.slug}`,
      },
    ],
  };
  const faqSchema = product.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;
  const schema = [
    productSchema,
    breadcrumbSchema,
    ...(faqSchema ? [faqSchema] : []),
  ];
  const stats = [
    {
      label: "Average rating",
      value: siteConfig.proof.averageRating.toFixed(1),
    },
    {
      label: "Reviews",
      value: `${siteConfig.proof.reviewCount}+`,
    },
    {
      label: "Coverage",
      value: "1m²",
    },
  ];
  const priceLabel = selectedVariant
    ? `£${selectedVariant.price.toFixed(2)}`
    : product.priceRange?.trim()
      ? product.priceRange
      : "Request pricing";
  const isKit = `${product.name} ${product.slug}`.toLowerCase().includes("kit");
  const isTradePack = `${product.name} ${product.slug}`
    .toLowerCase()
    .includes("starter");
  const keyFeatures = product.features.length
    ? product.features
    : [
        "SuDS compliant permeable finish",
        "Designed for durability",
        "Support available for DIY and trade",
      ];

  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-10 py-14 sm:py-16">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
          <Link href="/" className="hover:text-(--color-foreground)">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-(--color-foreground)">
            Products
          </Link>
          <span>/</span>
          <span className="text-(--color-foreground)">{pageTitle}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="relative">
                {mainImage ? (
                  <>
                    <div
                      role="img"
                      aria-label={`${product.name} preview`}
                      style={{ backgroundImage: `url(${mainImage})` }}
                      className="absolute inset-0 bg-cover bg-center"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </>
                ) : (
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="bg-(--color-secondary)/15" />
                    <div className="bg-(--color-accent)/10" />
                  </div>
                )}
                <div className="relative z-10 space-y-6 px-6 py-10 text-white sm:px-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                      <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                      Product
                    </div>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                      <Leaf aria-hidden="true" className="h-3.5 w-3.5" />
                      Permeable
                    </div>
                  </div>

                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {pageTitle}
                  </h1>
                  <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
                    {product.longDesc || product.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white"
                      >
                        {item.label === "Average rating" ? (
                          <Star
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-amber-300"
                            fill="currentColor"
                          />
                        ) : null}
                        {item.value} {item.label.toLowerCase()}
                      </div>
                    ))}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white">
                      <Timer aria-hidden="true" className="h-3.5 w-3.5" />
                      Longer working time options
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-(--color-foreground)">
                Product images
              </h2>
              <GalleryGrid slides={gallerySlides} />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-(--color-foreground)">
                What’s included
              </h2>
              <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
                <ul className="grid gap-3 text-sm text-(--color-foreground)/70 sm:grid-cols-2">
                  {keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-(--color-foreground)">
                Coverage guide
              </h2>
              <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
                <p className="text-sm leading-relaxed text-(--color-foreground)/70">
                  Each SUDwell™ Resin Bound Kit is supplied with enough stone
                  and resin to cover 1m² at upto 15mm deep.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
                  Please refer to this table or use our Calculator to work out
                  how many kits you require.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                      Paths & patios
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-(--color-foreground)">
                      1m²
                    </div>
                    <div className="mt-1 text-sm text-(--color-foreground)/70">
                      Up to 15mm depth
                    </div>
                  </div>
                  <div className="rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                      Driveways
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-(--color-foreground)">
                      0.8m²
                    </div>
                    <div className="mt-1 text-sm text-(--color-foreground)/70">
                      Up to 18mm depth
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                    Simple calculator
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                    We recommend that Paths and Patios are installed at a depth
                    of 15mm and that Driveways are installed to a depth of 18mm.
                    Each SUDwell™ Resin Bound Kit is supplied with enough stone
                    and resin to cover 1m² at upto 15mm deep or 0.8m² at upto
                    18mm.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
                    Divide your area in m² by the expected coverage in the table
                    above to calculate the quantity of kits you require.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-(--color-foreground)/70">
                    For Example a 30m² Driveway (30/0.8=37.5) 38 kits.
                  </p>
                  <form method="GET" className="mt-5 grid gap-4 sm:grid-cols-2">
                    <input
                      type="hidden"
                      name="variant"
                      value={variantId ?? ""}
                    />
                    <label className="grid gap-2 text-sm text-(--color-foreground)">
                      <span className="font-semibold">Area (m²)</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        name="area"
                        min={0}
                        step={0.1}
                        defaultValue={calculatorArea ?? undefined}
                        className="h-11 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-4 text-sm text-(--color-foreground) shadow-sm ring-1 ring-(--color-foreground)/5 focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40"
                      />
                    </label>
                    <fieldset className="grid gap-2">
                      <legend className="text-sm font-semibold text-(--color-foreground)">
                        Surface
                      </legend>
                      <label className="flex items-center gap-2 text-sm text-(--color-foreground)/80">
                        <input
                          type="radio"
                          name="surface"
                          value="paths"
                          defaultChecked={calculatorSurface !== "driveway"}
                          className="h-4 w-4 accent-(--color-primary)"
                        />
                        Paths & patios (1m² per kit)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-(--color-foreground)/80">
                        <input
                          type="radio"
                          name="surface"
                          value="driveway"
                          defaultChecked={calculatorSurface === "driveway"}
                          className="h-4 w-4 accent-(--color-primary)"
                        />
                        Driveways (0.8m² per kit)
                      </label>
                    </fieldset>
                    <button
                      type="submit"
                      className="sm:col-span-2 inline-flex h-11 items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                    >
                      Calculate
                    </button>
                  </form>
                  {calculatorKits ? (
                    <div className="mt-4 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/10 p-4 text-sm text-(--color-foreground)/80">
                      You need approximately{" "}
                      <span className="font-semibold text-(--color-foreground)">
                        {calculatorKits} kits
                      </span>{" "}
                      for {calculatorArea}m² (
                      {calculatorSurface === "driveway"
                        ? "driveway"
                        : "paths/patios"}
                      ).
                    </div>
                  ) : null}
                  <p className="mt-5 text-xs leading-relaxed text-(--color-foreground)/70">
                    Note: It is recommended that you divide up and mark out your
                    area into 1m² (0.8m² for driveways) to ensure you get the
                    correct coverage out of each kit. It is also recommended
                    that you order spare kits (Especially on larger projects) in
                    case of unforeseen circumstances. Depths stated for coverage
                    can vary between stone batches and sub-base condition and
                    construction and are guidelines only. Packaging and
                    labelling may vary from illustration. Products should be
                    kept dry and out of the sun until use.
                  </p>
                </div>
              </div>
            </section>

            {product.faqs.length ? (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-(--color-foreground)">
                  FAQs
                </h2>
                <div className="space-y-3">
                  {product.faqs.map((faq, index) => (
                    <div
                      key={`${faq.q}-${index}`}
                      className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-5 shadow-sm ring-1 ring-(--color-foreground)/5"
                    >
                      <div className="text-sm font-semibold text-(--color-foreground)">
                        {faq.q}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-background) p-5 shadow-sm ring-1 ring-(--color-foreground)/5 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Price
              </div>
              {selectedVariant ? (
                <>
                  <div className="mt-2 text-xl font-semibold leading-tight tracking-tight text-(--color-foreground)">
                    Only: {priceLabel}
                  </div>
                  <div className="mt-1 text-sm text-(--color-foreground)/70">
                    Ex Tax: {priceLabel}
                  </div>
                  <div className="mt-4 border-t border-(--color-foreground)/10 pt-4">
                    <div className="text-base font-semibold text-(--color-foreground)">
                      Available options
                    </div>
                    <form
                      action="/contact"
                      method="GET"
                      className="mt-3 flex max-h-[calc(100vh-300px)] flex-col"
                    >
                      <input type="hidden" name="product" value={pageTitle} />
                      <input type="hidden" name="slug" value={slug} />
                      <input
                        type="hidden"
                        name="variant"
                        value={selectedVariant.id}
                      />
                      <input
                        type="hidden"
                        name="basePrice"
                        value={selectedVariant.price.toFixed(2)}
                      />

                      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                        <fieldset className="space-y-2">
                          <legend className="text-sm font-semibold text-(--color-foreground)">
                            <span className="text-red-600">*</span> Resin Type:
                          </legend>
                          <p className="text-xs leading-relaxed text-(--color-foreground)/70">
                            Our All-Weather Resin is UV Resistant, Moisture
                            Tollerant and has a longer working time. Standard
                            resin is not recommended for light coloured
                            aggregates such as white, silver, and pearl quartz.
                          </p>
                          <label className="flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-3 py-2 text-[13px] text-(--color-foreground)/80">
                            <input
                              type="radio"
                              name="resinType"
                              value="standard-non-uv"
                              required
                              className="mt-0.5 h-4 w-4 accent-(--color-primary)"
                            />
                            <span>
                              Standard Resin (Non-UV) (Best For Darker Colours)
                            </span>
                          </label>
                          <label className="flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-3 py-2 text-[13px] text-(--color-foreground)/80">
                            <input
                              type="radio"
                              name="resinType"
                              value="all-weather-uv"
                              defaultChecked
                              className="mt-0.5 h-4 w-4 accent-(--color-primary)"
                            />
                            <span>
                              SUDwell™ All-Weather Resin (UV Resistant) (+£7.45)
                            </span>
                          </label>
                        </fieldset>

                        <fieldset className="space-y-2">
                          <legend className="text-sm font-semibold text-(--color-foreground)">
                            Crushed Glass:
                          </legend>
                          <p className="text-xs leading-relaxed text-(--color-foreground)/70">
                            Add crushed glass to your mix for additional
                            friction and extra anti-slip.
                          </p>
                          <label className="flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-3 py-2 text-[13px] text-(--color-foreground)/80">
                            <input
                              type="checkbox"
                              name="crushedGlass"
                              value="yes"
                              className="mt-0.5 h-4 w-4 accent-(--color-primary)"
                            />
                            <span>Crushed Glass (+£1.50)</span>
                          </label>
                        </fieldset>

                        <fieldset className="space-y-2">
                          <legend className="text-sm font-semibold text-(--color-foreground)">
                            <span className="text-red-600">*</span> Packaging:
                          </legend>
                          <label className="flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-3 py-2 text-[13px] text-(--color-foreground)/80">
                            <input
                              type="radio"
                              name="packaging"
                              value="individual-kits"
                              required
                              defaultChecked
                              className="mt-0.5 h-4 w-4 accent-(--color-primary)"
                            />
                            <span>
                              Individual Kits (Pre-Measured Supplied in Tubs)
                              (+£11.95)
                            </span>
                          </label>
                          <label className="flex items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 px-3 py-2 text-[13px] text-(--color-foreground)/80">
                            <input
                              type="radio"
                              name="packaging"
                              value="bulk-buy"
                              className="mt-0.5 h-4 w-4 accent-(--color-primary)"
                            />
                            <span>
                              Bulk Buy (minimum order 5 kits, supplied in bags)
                            </span>
                          </label>
                        </fieldset>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4 border-t border-(--color-foreground)/10 pt-4">
                        <label className="flex items-center gap-3 text-sm font-semibold text-(--color-foreground)">
                          Qty:
                          <input
                            type="number"
                            name="qty"
                            min={1}
                            defaultValue={1}
                            className="h-10 w-20 rounded-2xl border border-(--color-foreground)/10 bg-(--color-background) px-3 text-sm text-(--color-foreground) shadow-sm ring-1 ring-(--color-foreground)/5 focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40"
                          />
                        </label>
                        <button
                          type="submit"
                          className="inline-flex h-10 items-center justify-center rounded-full bg-(--color-foreground) px-5 text-sm font-semibold text-(--color-background) shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-3 text-2xl font-semibold text-(--color-foreground)">
                    {priceLabel}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-foreground)/70">
                    Prices vary by aggregate, resin type, and order size.
                    Contact us for a tailored quote.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                    >
                      Request pricing
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.phoneFormatted}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-secondary)/35 bg-(--color-secondary)/12 px-6 py-3 text-sm font-semibold text-(--color-foreground) shadow-sm transition hover:bg-(--color-secondary)/18 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4" />
                      Call {siteConfig.contact.phone}
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
                Installation tips
              </div>
              <div className="mt-4 space-y-3">
                {siteConfig.home.process.steps
                  .slice(0, 3)
                  .map((step, index) => (
                    <div key={step.title} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/30 bg-(--color-accent)/10 text-xs font-semibold text-(--color-accent)">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-(--color-foreground)">
                          {step.title}
                        </div>
                        <div className="text-xs text-(--color-foreground)/70">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {isKit || isTradePack ? (
              <div className="rounded-3xl border border-(--color-foreground)/10 bg-(--color-primary) p-6 text-white shadow-xl shadow-black/10 ring-1 ring-white/15">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                    <Timer aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      All-weather resin options
                    </div>
                    <div className="text-xs text-white/80">
                      Extended working time for easier installs.
                    </div>
                  </div>
                </div>
                {isTradePack ? (
                  <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Offer code
                    </div>
                    <div className="mt-2 text-lg font-semibold">PRIMER25</div>
                    <div className="mt-1 text-sm text-white/80">
                      25% discount on primer with a Trade Resin Bound Starter
                      Pack.
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
