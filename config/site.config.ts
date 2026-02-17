export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  priceRange?: string;
  gallery: string[];
  faqs: { q: string; a: string }[];
};

export type Area = {
  slug: string;
  name: string;
  postcodes: string[];
};

export type SiteConfig = {
  company: {
    tradingName: string;
    legalName?: string;
    logo?: string | null;
    tagline: string;
    founded?: number;
    registeredNumber?: string;
    vatNumber?: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp?: string | null;
    email: string;
    address: {
      street: string;
      city: string;
      county: string;
      postcode: string;
      country: string;
    };
    openingHours: {
      weekdays: string;
      weekends: string;
    };
    serviceRadius: number;
    serviceArea: string[];
  };
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
      footerBackground: string;
      footerForeground: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  services: Service[];
  areas: Area[];
  proof: {
    accreditations: { name: string; logo: string }[];
    insurance: string;
    insuranceLogo?: string | null;
    guarantee: string;
    guaranteeLogo?: string | null;
    reviewsEmbed?: string | null;
    reviewCount: number;
    averageRating: number;
  };
  social: {
    facebook?: { label: string; url: string } | null;
    instagram?: { label: string; url: string } | null;
    twitter?: { label: string; url: string } | null;
    linkedin?: { label: string; url: string } | null;
    youtube?: { label: string; url: string } | null;
  };
  seo: {
    siteUrl: string;
    baseTitle: string;
    baseDescription: string;
    keywords: string[];
    googleBusinessProfile?: string | null;
    offerCatalogName: string;
  };
  integrations: {
    mapsProvider: "googleEmbed" | "leaflet";
    googleMapsEmbedUrl: string;
    googleAnalyticsId?: string | null;
    facebookPixel?: string | null;
    formEndpoint: string;
    emailProvider: "resend";
    resendFromEmail: string;
  };
  cookies: {
    enabled: boolean;
  };
  navigation: { href: string; label: string }[];
  header: {
    primaryCtaLabel: string;
  };
  footer: {
    quickLinksLabel: string;
    contactLabel: string;
    socialLabel: string;
    privacyLabel: string;
    termsLabel: string;
    cookiesLabel: string;
    copyrightLabel: string;
  };
  about: {
    heroDescription: string;
    standForEyebrow: string;
    standForTitle: string;
    standForDescription: string;
    values: { title: string; description: string; bullets: string[] }[];
    howWeWorkTitle: string;
    howWeWorkSteps: { title: string; description: string }[];
    quoteTitle: string;
    quoteDescription: string;
  };
  home: {
    hero: {
      title: string;
      subheading: string;
      primaryCtaLabel: string;
      secondaryCtaLabel: string;
      backgroundImage?: string | null;
      backgroundImages?: string[];
      backgroundVideo?: string | null;
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
      ctaLabel: string;
      featuredCount: number;
    };
    process: {
      eyebrow: string;
      title: string;
      description: string;
      steps: { title: string; desc: string }[];
    };
    gallery: {
      eyebrow: string;
      title: string;
      description: string;
      items: { label: string; image?: string }[];
    };
    reviews: {
      eyebrow: string;
      title: string;
      description: string;
      items: { name: string; date: string; rating: number; text: string }[];
    };
    areas: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      primaryCtaLabel: string;
      secondaryCtaLabel: string;
    };
  };
};

export const siteConfig: SiteConfig = {
  "company": {
    "tradingName": "SUDwell",
    "legalName": "SUDwell",
    "logo": "/images/uploads/logo-1771328716969-screenshot-2026-02-17-at-11.44.54.jpg",
    "tagline": "The Resin Bonded Slab Company",
    "founded": 2010,
    "registeredNumber": "0683117",
    "vatNumber": "GB123456789"
  },
  "contact": {
    "phone": "01424 830 494",
    "phoneFormatted": "01424830494",
    "whatsapp": "01424 830 494",
    "email": "info@theresinbondedslabcompany.co.uk",
    "address": {
      "street": "39 High Street",
      "city": "Battle",
      "county": "East Sussex",
      "postcode": "TN33 0EE",
      "country": "United Kingdom"
    },
    "openingHours": {
      "weekdays": "Mon-Fri: 8am-6pm",
      "weekends": "Sat: 9am-4pm, Sun: Closed"
    },
    "serviceRadius": 30,
    "serviceArea": [
      "Battle",
      "Hastings",
      "Bexhill-on-Sea",
      "Eastbourne",
      "Lewes",
      "Rye"
    ]
  },
  "branding": {
    "colors": {
      "primary": "#ff6a02",
      "secondary": "#000000",
      "accent": "#88c9f4",
      "background": "#ffffff",
      "foreground": "#171717",
      "footerBackground": "#252222",
      "footerForeground": "#ffffff"
    },
    "fonts": {
      "heading": "Outfit",
      "body": "Manrope"
    }
  },
  "services": [
    {
      "slug": "block-paving",
      "name": "Resin Bound Gravel Kits",
      "shortDesc": "DIY-friendly resin bound kits for driveways, paths, and patios.",
      "longDesc": "Resin bound surfaces are created by mixing resin and decorative aggregates, then trowelling the mix onto a suitable base to achieve a smooth, seamless and porous finish. Our kits are designed for DIYers and professionals, with UV-stable resin, carefully selected aggregates, and guidance to help you achieve a durable, low-maintenance, SuDS compliant surface when installed correctly.",
      "features": [
        "UV-stable resin + decorative aggregates",
        "Smooth, seamless, permeable finish",
        "Detailed installation guide"
      ],
      "priceRange": "£70-£100 per sqm",
      "gallery": [
        "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp"
      ],
      "faqs": [
        {
          "q": "What is a resin bound driveway?",
          "a": "A resin bound driveway is made by mixing clear resin with decorative aggregates and trowelling it onto a base to create a smooth, porous finish."
        },
        {
          "q": "What’s the difference between resin bound and resin bonded?",
          "a": "Resin bound mixes resin and aggregate before application for a smooth, durable, permeable finish. Resin bonded applies resin first and then scatters aggregate on top, leaving a textured, non-permeable surface."
        },
        {
          "q": "How much area does one DIY resin kit cover?",
          "a": "Coverage depends on depth: up to 15mm depth is approx. 1m²; up to 18mm depth is approx. 0.8m²."
        },
        {
          "q": "How long does resin take to cure?",
          "a": "Curing time depends on weather and thickness. It typically cures within 24–48 hours. Light foot traffic is often possible after 12–16 hours, and vehicle traffic is typically 48–72 hours."
        },
        {
          "q": "Can I install a resin bound driveway myself?",
          "a": "Yes. With the right tools and preparation, competent DIYers can achieve professional results using a resin bound kit and step-by-step guidance."
        },
        {
          "q": "How long does a resin bound surface last?",
          "a": "When properly installed and maintained, a resin bound surface can last 15 to 25 years or longer, depending on usage and environmental conditions."
        },
        {
          "q": "What weather is best for installing resin bound driveways?",
          "a": "Install in dry, mild weather. Ideal temperature is 10°C to 25°C and avoid installing during rain or extreme cold."
        }
      ]
    },
    {
      "slug": "resin-bound",
      "name": "Permeable Resin Paving Slabs",
      "shortDesc": "Permeable resin paving slabs for gardens and walkways.",
      "longDesc": "Fully permeable resin bound paving slabs made in a range of colours using natural aggregates. A great alternative to non-porous concrete slabs for hard-landscaping projects such as patios and pathways, plus rooftop gardens, landscaped podiums and terraces.",
      "features": [
        "Fully permeable, SuDS compliant",
        "Eco-friendly alternative to concrete",
        "Natural aggregate finishes"
      ],
      "priceRange": "£50-£80 per sqm",
      "gallery": [
        "/images/uploads/gallery-3-1771329866368-patio3sq.webp"
      ],
      "faqs": [
        {
          "q": "Where can resin bound paving slabs be used?",
          "a": "They can be used for garden paths and patios, plus rooftop gardens, landscaped podiums, and terraces."
        },
        {
          "q": "Are resin bound paving slabs permeable?",
          "a": "Yes. Their permeable surface allows water to flow through, helping prevent surface water build-up and supporting SuDS compliance."
        },
        {
          "q": "What are the slab dimensions?",
          "a": "Typical paving slab dimensions are 460 x 460 x 40mm."
        }
      ]
    },
    {
      "slug": "rubber",
      "name": "Rubber Safety Slabs",
      "shortDesc": "Rubber safety slabs for playgrounds, parks, and high-use areas.",
      "longDesc": "A durable, practical surface option designed for impact absorption and everyday use. Rubber safety slabs are popular for playgrounds and public spaces where safety, resilience, and easy maintenance matter.",
      "features": [
        "Ideal for playgrounds and parks",
        "Durable and practical finish",
        "Designed for high-use areas"
      ],
      "priceRange": "£45-£70 per sqm",
      "gallery": [
        "/images/uploads/gallery-0-1771329675790-play1sq.webp"
      ],
      "faqs": []
    },
    {
      "slug": "patios",
      "name": "Trade, DIY & Installation Support",
      "shortDesc": "Support for DIY, trade, and larger commercial resin surfacing projects.",
      "longDesc": "We work with landscapers, contractors, and architects to provide premium resin solutions. Whether you're a first-time DIYer or an experienced installer, our team can help you choose the right approach, prep correctly, and achieve a flawless finish.",
      "features": [
        "Support from resin specialists",
        "Options for DIY, trade, and commercial",
        "Guides and installation tips"
      ],
      "gallery": [
        "/images/uploads/gallery-3-1771329866368-patio3sq.webp"
      ],
      "faqs": [],
      "priceRange": "£45-£70 per sqm"
    }
  ],
  "areas": [
    {
      "slug": "battle",
      "name": "Battle",
      "postcodes": [
        "TN33"
      ]
    },
    {
      "slug": "hastings",
      "name": "Hastings",
      "postcodes": [
        "TN34",
        "TN35"
      ]
    },
    {
      "slug": "bexhill-on-sea",
      "name": "Bexhill-on-Sea",
      "postcodes": [
        "TN39",
        "TN40"
      ]
    },
    {
      "slug": "eastbourne",
      "name": "Eastbourne",
      "postcodes": [
        "BN20",
        "BN21",
        "BN22",
        "BN23"
      ]
    },
    {
      "slug": "lewes",
      "name": "Lewes",
      "postcodes": [
        "BN7"
      ]
    },
    {
      "slug": "rye",
      "name": "Rye",
      "postcodes": [
        "TN31"
      ]
    }
  ],
  "proof": {
    "accreditations": [
      {
        "name": "Which? Trusted Traders",
        "logo": "/images/uploads/accreditation-0-1769198840459-which.svg"
      },
      {
        "name": "Marshalls Registered Installer",
        "logo": "/images/uploads/accreditation-1-1769199403604-marshalls-registered.png"
      }
    ],
    "insurance": "£5 million public liability insurance",
    "insuranceLogo": "/images/uploads/insurance-1769365120789-5million-liability.png",
    "guarantee": "10-year workmanship guarantee on all installations",
    "guaranteeLogo": "/images/uploads/guarantee-1769366329746-10-years.png",
    "reviewsEmbed": null,
    "reviewCount": 150,
    "averageRating": 4.9
  },
  "social": {
    "facebook": {
      "label": "Facebook",
      "url": "https://facebook.com/abcdriveways"
    },
    "instagram": {
      "label": "Instagram",
      "url": "https://instagram.com/abcdriveways"
    },
    "twitter": null,
    "linkedin": null,
    "youtube": null
  },
  "seo": {
    "siteUrl": "https://abc-driveways.co.uk",
    "baseTitle": "Resin Driveway | Resin Bound Paving & DIY Kits | Suppliers | SUDwell",
    "baseDescription": "Premium resin bound driveway kits and permeable paving solutions for driveways, paths, patios, gardens, and walkways. Durable, eco-friendly, and low maintenance resin bound gravel surfaces with a smooth, seamless finish for DIY and trade.",
    "keywords": [
      "resin bound driveway kits",
      "resin bound gravel",
      "resin driveway kit",
      "SuDS compliant surfacing",
      "permeable paving solutions",
      "permeable resin slabs",
      "rubber safety slabs",
      "resin bound patios",
      "resin bound paths",
      "SUDwell"
    ],
    "googleBusinessProfile": null,
    "offerCatalogName": "Resin Bound Products"
  },
  "integrations": {
    "mapsProvider": "googleEmbed",
    "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=",
    "googleAnalyticsId": null,
    "facebookPixel": null,
    "formEndpoint": "/api/quote",
    "emailProvider": "resend",
    "resendFromEmail": "quotes@abcdriveways.co.uk"
  },
  "cookies": {
    "enabled": false
  },
  "navigation": [
    {
      "href": "/",
      "label": "Home"
    },
    {
      "href": "/services",
      "label": "Products"
    },
    {
      "href": "/gallery",
      "label": "Gallery"
    },
    {
      "href": "/about",
      "label": "Guides"
    },
    {
      "href": "/reviews",
      "label": "Reviews"
    },
    {
      "href": "/areas",
      "label": "Areas"
    },
    {
      "href": "/contact",
      "label": "Contact us"
    }
  ],
  "header": {
    "primaryCtaLabel": "Call {phone}"
  },
  "footer": {
    "quickLinksLabel": "Quick Links",
    "contactLabel": "Contact",
    "socialLabel": "Social",
    "privacyLabel": "Privacy Policy",
    "termsLabel": "Terms",
    "cookiesLabel": "Cookies",
    "copyrightLabel": "© {year} {tradingName}. All rights reserved."
  },
  "about": {
    "heroDescription": "At The Resin Bonded Slab Company, we offer high-quality resin bound driveway kits that bring beauty, durability, and eco-friendly benefits to your outdoor spaces. Whether you're a DIY enthusiast or a professional landscaper, our easy-to-use kits and permeable paving solutions provide everything you need for an ideal finish.",
    "standForEyebrow": "Why choose resin bound",
    "standForTitle": "Durable, eco-friendly, and low maintenance",
    "standForDescription": "A smooth, seamless finish with permeable drainage designed to look great and perform for years when installed correctly.",
    "values": [
      {
        "title": "Eco-friendly",
        "description": "Permeable resin bound gravel that helps reduce surface water runoff.",
        "bullets": [
          "Permeable surfacing designed to let water drain naturally.",
          "Supports Sustainable Urban Drainage Systems (SuDS)."
        ]
      },
      {
        "title": "Durable",
        "description": "Designed to withstand heavy traffic and stay in great condition for years.",
        "bullets": [
          "A smooth, hard-wearing finish for driveways, paths, and patios.",
          "A long-lasting surface when installed and maintained properly."
        ]
      },
      {
        "title": "Low maintenance",
        "description": "A seamless finish that’s easier to keep looking sharp.",
        "bullets": [
          "Regular sweeping keeps debris under control.",
          "Occasional pressure washing helps freshen up the surface."
        ]
      }
    ],
    "howWeWorkTitle": "How to install a resin bound surface",
    "howWeWorkSteps": [
      {
        "title": "Prepare the base",
        "description": "Make sure the base is strong enough, dry, and free from dust and weeds. Sweeping is essential. Priming is recommended for new or old concrete."
      },
      {
        "title": "Mix resin + aggregate",
        "description": "Mix resin parts until uniform, then mix thoroughly with the aggregate until all stone is coated and wet-looking. Use a powerful drill and paddle designed for mortar mixes."
      },
      {
        "title": "Lay and float",
        "description": "Tip, level, and float the mixture until you are happy with the finish. Work quickly, as resin starts to cure soon after mixing."
      }
    ],
    "quoteTitle": "Work with us",
    "quoteDescription": "We work with landscapers, contractors, and architects to provide premium resin solutions. If you’d like help choosing the right product or approach, contact our team for professional support."
  },
  "home": {
    "hero": {
      "title": "{tradingName} - {tagline}",
      "subheading": "Durable, Eco-friendly, and Beautiful Resin Bound Gravel Kits and Surfaces. With over 15 years experience and 100,000 m² sold, we are the UKs leading supplier.",
      "primaryCtaLabel": "Call us now",
      "secondaryCtaLabel": "Get Free Quote",
      "backgroundImage": "/images/uploads/gallery-0-1771329675790-play1sq.webp",
      "backgroundImages": [
        "/images/uploads/gallery-0-1771329675790-play1sq.webp",
        "/images/uploads/gallery-1-1771329866365-gym2sq.webp",
        "/images/uploads/gallery-2-1771329866367-gymsq.webp",
        "/images/uploads/gallery-3-1771329866368-patio3sq.webp"
      ],
      "backgroundVideo": null
    },
    "services": {
      "eyebrow": "Products",
      "title": "Explore our resin bound kits",
      "description": "Resin bound gravel kits for driveways, paths, and patios, plus permeable paving slabs and rubber safety slabs for specialist projects.",
      "ctaLabel": "Learn more",
      "featuredCount": 4
    },
    "process": {
      "eyebrow": "Guides",
      "title": "How to install resin bound surfacing",
      "description": "A simple, practical process to help you achieve a flawless resin bound finish.",
      "steps": [
        {
          "title": "Prepare the base",
          "desc": "Ensure the area is dry, clean, and structurally sound before you start."
        },
        {
          "title": "Mix resin + aggregate",
          "desc": "Mix resin thoroughly, then combine with aggregate until fully coated."
        },
        {
          "title": "Lay and finish",
          "desc": "Level and float the material for a smooth, seamless finish."
        },
        {
          "title": "Cure and maintain",
          "desc": "Allow the surface to cure fully, then keep it tidy with simple maintenance."
        }
      ]
    },
    "gallery": {
      "eyebrow": "Gallery",
      "title": "Recent resin bound projects and products",
      "description": "A selection of finishes, kits, and surfaces designed for durability and curb appeal.",
      "items": [
        {
          "label": "Playground Rubber Tiles",
          "image": "/images/uploads/gallery-0-1771329675790-play1sq.webp"
        },
        {
          "label": "Rubber Gym Tiles",
          "image": "/images/uploads/gallery-1-1771329866365-gym2sq.webp"
        },
        {
          "label": "Rubber Gym Flooring",
          "image": "/images/uploads/gallery-2-1771329866367-gymsq.webp"
        },
        {
          "label": "Resin Bound Paving Slabs",
          "image": "/images/uploads/gallery-3-1771329866368-patio3sq.webp"
        },
        {
          "label": "Resin Bound DIY Kits",
          "image": "/images/uploads/gallery-5-1771329866370-kitsvsq2.webp"
        },
        {
          "label": "Resin Bound Driveway Materials",
          "image": "/images/uploads/gallery-5-1771332626537-bulksq.webp"
        },
        {
          "label": "Resin Bound",
          "image": "/images/uploads/gallery-6-1771332681828-slider2-4.webp"
        },
        {
          "label": "Resin Bound",
          "image": "/images/uploads/gallery-7-1771332681830-slider2-5.webp"
        },
        {
          "label": "Resin Bound",
          "image": "/images/uploads/gallery-8-1771332681832-slider2-6.webp"
        },
        {
          "label": "Resin Bound",
          "image": "/images/uploads/gallery-9-1771332681833-slider2-7.webp"
        }
      ]
    },
    "reviews": {
      "eyebrow": "Reviews",
      "title": "Customers rate us highly",
      "description": "{rating} average rating from {count}+ reviews.",
      "items": [
        {
          "name": "Harry Perkins",
          "date": "Jan 2026",
          "rating": 5,
          "text": "I have seen one of these properties advertised here and it is really outstanding, i know the owner and regularly visit the house, the driveway still looks spectacular and doesn't seem to have changed at all being it was laid some years ago."
        },
        {
          "name": "Emma Reeves",
          "date": "Dec 2025",
          "rating": 4.9,
          "text": "We are absolutely delighted with our new driveway. Roy and his team worked very hard for 4 days and gave us the driveway we have wanted for years. We can without doubt recommend the resin bonded slab company as a very good company, tidy, polite and very kind. Our new driveway is even better than we had possibly hoped for. We are 100% satisfied and cant recommend them enough."
        },
        {
          "name": "David Edwards",
          "date": "Nov 2025",
          "rating": 4.5,
          "text": "The service provided by SUDwell™ couldn't have been more professional, we are very happy with their high quality finish."
        },
        {
          "name": "Michael Smith",
          "date": "Oct 2025",
          "rating": 5,
          "text": "I would highly recommend SUDwell™, they built me a whole new driveway and everyone that has come to visit has complimented us on it. Very happy."
        }
      ]
    },
    "areas": {
      "eyebrow": "Areas",
      "title": "Areas we serve",
      "description": "We cover {radius} miles around {city}."
    },
    "cta": {
      "title": "Ready to transform your outdoors?",
      "description": "Contact our team for help choosing the right resin bound solution for your project.",
      "primaryCtaLabel": "Call us now",
      "secondaryCtaLabel": "Quote now"
    }
  }
};
