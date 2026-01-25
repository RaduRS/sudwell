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
    copyrightLabel: string;
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
    "tradingName": "ABC Driveways",
    "legalName": "ABC Driveways Ltd",
    "logo": "/images/uploads/logo-1769175098817-logo.jpg",
    "tagline": "Professional Driveway & Paving Specialists",
    "founded": 2010,
    "registeredNumber": "12345678",
    "vatNumber": "GB123456789"
  },
  "contact": {
    "phone": "01234 567890",
    "phoneFormatted": "+441234567890",
    "whatsapp": "+441234567890",
    "email": "info@abcdriveways.co.uk",
    "address": {
      "street": "377 Oxford Rd",
      "city": "Reading",
      "county": "Berkshire",
      "postcode": "RG30 1HA",
      "country": "United Kingdom"
    },
    "openingHours": {
      "weekdays": "Mon-Fri: 8am-6pm",
      "weekends": "Sat: 9am-4pm, Sun: Closed"
    },
    "serviceRadius": 30,
    "serviceArea": [
      "Reading",
      "Wokingham",
      "Bracknell",
      "Maidenhead"
    ]
  },
  "branding": {
    "colors": {
      "primary": "#267b0f",
      "secondary": "#787878",
      "accent": "#4a8fc4",
      "background": "#ffffff",
      "foreground": "#171717",
      "footerBackground": "#252222",
      "footerForeground": "#ffffff"
    },
    "fonts": {
      "heading": "Source Sans 3",
      "body": "Poppins"
    }
  },
  "services": [
    {
      "slug": "block-paving",
      "name": "Block Paving",
      "shortDesc": "Beautiful, durable block paving driveways in a range of colours and patterns.",
      "longDesc": "Our block paving service includes full excavation, sub-base preparation, edge restraints, and a long-lasting finish tailored to your property.",
      "features": [
        "10-year guarantee",
        "Choice of colours",
        "Drainage included"
      ],
      "priceRange": "£70-£100 per sqm",
      "gallery": [
        "/images/uploads/gallery-0-1769345834670-flux-1024x1024--2-.png"
      ],
      "faqs": [
        {
          "q": "How long does block paving last?",
          "a": "With proper care, 20+ years."
        }
      ]
    },
    {
      "slug": "resin-bound",
      "name": "Resin Bound Driveways",
      "shortDesc": "Smooth, permeable resin surfaces with a premium finish.",
      "longDesc": "Resin bound driveways are SuDS-compliant, low maintenance, and available in a wide range of colours to match your home.",
      "features": [
        "SuDS compliant",
        "No planning permission needed",
        "Quick install"
      ],
      "priceRange": "£50-£80 per sqm",
      "gallery": [
        "/images/uploads/gallery-1-1769345834678-flux-1024x1024--4-.png",
        "/images/uploads/gallery-4-1769359593717-flux-2048x1024.png"
      ],
      "faqs": []
    },
    {
      "slug": "tarmac",
      "name": "Tarmac Driveways",
      "shortDesc": "Durable, cost-effective tarmac for busy driveways.",
      "longDesc": "Our tarmac installations use a strong sub-base and smooth finish for long-term durability and kerb appeal.",
      "features": [
        "Fast installation",
        "Durable surface",
        "Clean edges"
      ],
      "priceRange": "£45-£70 per sqm",
      "gallery": [
        "/images/uploads/gallery-2-1769345834681-flux-1024x1024--3-.png"
      ],
      "faqs": []
    },
    {
      "slug": "patios",
      "name": "Patios & Paving",
      "shortDesc": "Stylish patios designed for entertaining and relaxation.",
      "longDesc": "We create patios with high-quality paving, neat joints, and excellent drainage for year-round use.",
      "features": [
        "Design options",
        "Quality materials",
        "Low maintenance"
      ],
      "gallery": [
        "/images/uploads/gallery-3-1769345834682-flux-1024x1024.png"
      ],
      "faqs": [],
      "priceRange": "£45-£70 per sqm"
    }
  ],
  "areas": [
    {
      "slug": "reading",
      "name": "Reading",
      "postcodes": [
        "RG1",
        "RG2",
        "RG4"
      ]
    },
    {
      "slug": "wokingham",
      "name": "Wokingham",
      "postcodes": [
        "RG40",
        "RG41"
      ]
    },
    {
      "slug": "bracknell",
      "name": "Bracknell",
      "postcodes": [
        "RG12"
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
    "baseTitle": "ABC Driveways | Professional Driveway & Paving in Reading, Berkshire",
    "baseDescription": "Expert driveway installation and paving services in Reading. Block paving, resin, tarmac. 10-year guarantee. Free quotes. Call 01234 567890.",
    "keywords": [
      "driveways Reading",
      "block paving Berkshire",
      "resin bound driveways",
      "tarmac driveways Reading",
      "patio installers Berkshire"
    ],
    "googleBusinessProfile": null,
    "offerCatalogName": "Driveway & Paving Services"
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
  "navigation": [
    {
      "href": "/services",
      "label": "Services"
    },
    {
      "href": "/areas",
      "label": "Areas"
    },
    {
      "href": "/gallery",
      "label": "Gallery"
    },
    {
      "href": "/reviews",
      "label": "Reviews"
    },
    {
      "href": "/about",
      "label": "About"
    },
    {
      "href": "/contact",
      "label": "Contact"
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
    "copyrightLabel": "© {year} {tradingName}. All rights reserved."
  },
  "home": {
    "hero": {
      "title": "{tradingName} - {tagline}",
      "subheading": "Serving {serviceArea} and nearby towns. Free quotes, professional installs, and a finish built to last years to come.",
      "primaryCtaLabel": "Call us now",
      "secondaryCtaLabel": "Get Free Quote",
      "backgroundImage": "/images/uploads/gallery-0-1769345834670-flux-1024x1024--2-.png",
      "backgroundImages": [
        "/images/uploads/gallery-0-1769345834670-flux-1024x1024--2-.png",
        "/images/uploads/gallery-1-1769345834678-flux-1024x1024--4-.png",
        "/images/uploads/gallery-2-1769345834681-flux-1024x1024--3-.png",
        "/images/uploads/gallery-3-1769345834682-flux-1024x1024.png",
        "/images/uploads/gallery-4-1769359593717-flux-2048x1024.png"
      ],
      "backgroundVideo": null
    },
    "services": {
      "eyebrow": "Services",
      "title": "Driveway & Paving services built to last",
      "description": "Choose from premium driveway installations, resurfacing, and patio builds tailored to your property.",
      "ctaLabel": "Learn more",
      "featuredCount": 4
    },
    "process": {
      "eyebrow": "Process",
      "title": "How we work",
      "description": "A simple, reliable process that keeps your project on track.",
      "steps": [
        {
          "title": "Free site visit",
          "desc": "We assess your space and discuss materials."
        },
        {
          "title": "Detailed quote",
          "desc": "Transparent pricing with clear timelines."
        },
        {
          "title": "Professional install",
          "desc": "Skilled team delivers a clean finish."
        },
        {
          "title": "Aftercare",
          "desc": "Guidance to keep your driveway looking new."
        }
      ]
    },
    "gallery": {
      "eyebrow": "Gallery",
      "title": "Recent driveway transformations",
      "description": "Showcase of premium finishes, clean edges, and durable installations.",
      "items": [
        {
          "label": "Block paving driveway",
          "image": "/images/uploads/gallery-0-1769345834670-flux-1024x1024--2-.png"
        },
        {
          "label": "Resin bound finish",
          "image": "/images/uploads/gallery-1-1769345834678-flux-1024x1024--4-.png"
        },
        {
          "label": "Tarmac driveway",
          "image": "/images/uploads/gallery-2-1769345834681-flux-1024x1024--3-.png"
        },
        {
          "label": "Patio paving",
          "image": "/images/uploads/gallery-3-1769345834682-flux-1024x1024.png"
        },
        {
          "label": "Resin bound finish  2",
          "image": "/images/uploads/gallery-4-1769359593717-flux-2048x1024.png"
        }
      ]
    },
    "reviews": {
      "eyebrow": "Reviews",
      "title": "Customers rate us highly",
      "description": "{rating} average rating from {count}+ reviews.",
      "items": [
        {
          "name": "Sarah M.",
          "date": "Jan 2026",
          "rating": 5,
          "text": "The team were punctual, tidy, and the driveway looks fantastic. Highly recommended."
        },
        {
          "name": "David P.",
          "date": "Dec 2025",
          "rating": 4.9,
          "text": "Clear quote, great finish, and the new patio has transformed our garden."
        },
        {
          "name": "Amira K.",
          "date": "Nov 2025",
          "rating": 5,
          "text": "Fast installation and very professional. The resin surface looks premium."
        }
      ]
    },
    "areas": {
      "eyebrow": "Areas",
      "title": "Areas we serve",
      "description": "We cover {radius} miles around {city}."
    },
    "cta": {
      "title": "Ready to transform your driveway?",
      "description": "Request a free quote or call us today to discuss your project.",
      "primaryCtaLabel": "Call us now",
      "secondaryCtaLabel": "Quote now"
    }
  }
};
