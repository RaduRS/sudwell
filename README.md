# Driveway & Paving Contractor Website Template

## Project Overview
A config-driven, master template for UK driveway and paving contractors. Each client gets a separate deployment with their own branding, content, and settings controlled via a single configuration file. This is a static-first marketing website focused on SEO, performance, and mobile conversions. No database, no authentication, and no user accounts.

**Target Users:** Small UK driveway/paving businesses without websites
**Deployment Model:** Generate-and-deploy per client (separate repo/deployment per contractor)
**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod validation, Framer Motion
**Data Model:** Static config + assets, no database
**Auth:** None (not required for a marketing site)
**PWA:** Included by default for offline caching and installability
**Email:** Resend only for form delivery
**Region:** UK only (GBP, UK legal requirements)

---

## Core Design Principles

1. **Config-Driven Everything:** All company-specific data (name, phone, services, areas, branding, social links) comes from a single config file
2. **DRY by Design:** Reusable page templates, shared UI primitives, single source of truth for content and SEO
3. **Separation of Concerns:** Content in config, UI in components, behavior in hooks/utilities, routing in app
4. **Conditional Rendering:** Missing config fields hide entire sections (no broken social icons, no empty galleries)
5. **Local SEO First:** Service + Area pages auto-generate, schema.org markup, NAP consistency
6. **UK Legal Compliance:** Privacy policy, cookie notice, business details footer (Companies House requirements)
7. **Mobile-First & Conversion-Focused:** Click-to-call, WhatsApp buttons, sticky quote CTA, fast load times
8. **Premium Feel, Minimal Weight:** Motion used sparingly, fast paint and low JS budget

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx                 # Root layout (font, metadata, analytics)
│   ├── page.tsx                   # Home page
│   ├── services/
│   │   ├── page.tsx              # Services index
│   │   └── [slug]/
│   │       └── page.tsx          # Individual service detail (dynamic)
│   ├── areas/
│   │   ├── page.tsx              # Areas served index
│   │   └── [slug]/
│   │       └── page.tsx          # Area detail (dynamic)
│   ├── gallery/
│   │   └── page.tsx
│   ├── reviews/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   └── api/
│       └── quote/
│           └── route.ts          # Contact form handler (POST, no DB)
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Logo, nav, phone CTA
│   │   ├── Footer.tsx            # Legal, NAP, social, sitemap
│   │   └── MobileNav.tsx
│   ├── home/
│   │   ├── Hero.tsx              # H1, 2 CTAs, trust badges
│   │   ├── ServicesGrid.tsx
│   │   ├── AreasServed.tsx
│   │   ├── Gallery.tsx
│   │   ├── Reviews.tsx
│   │   ├── ProcessSteps.tsx      # "How we work"
│   │   └── CTASection.tsx
│   ├── shared/
│   │   ├── QuoteForm.tsx         # Reusable form (Zod validated)
│   │   ├── Map.tsx               # Google Embed or Leaflet
│   │   ├── ImageGallery.tsx      # Lightbox, before/after
│   │   ├── ReviewCard.tsx
│   │   ├── TrustBadges.tsx       # Insurance, guarantee, accreditations
│   │   ├── SocialLinks.tsx       # Conditional render from config
│   │   └── SchemaMarkup.tsx      # JSON-LD LocalBusiness
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ...                   # shadcn/ui or custom primitives
├── config/
│   ├── site.config.ts            # ⭐ MAIN CONFIG FILE (client-specific)
│   ├── legal.config.ts           # Privacy/Terms text templates
│   └── seo.config.ts             # Metadata defaults
├── lib/
│   ├── validation.ts             # Zod schemas for forms
│   ├── utils.ts                  # cn(), formatPhone(), etc.
│   └── seo.ts                    # generateMetadata helpers
├── public/
│   ├── images/
│   │   ├── logo.svg              # Client logo (replace per deploy)
│   │   ├── gallery/              # Project photos
│   │   └── og-image.jpg          # Open Graph image
│   └── favicon.ico
├── styles/
│   └── globals.css               # Tailwind + custom CSS vars
├── .env.local                    # API keys (maps, analytics, form endpoint)
├── .env.example
├── next.config.js
├── tailwind.config.ts            # Colors from config
├── tsconfig.json
└── README.md
```

---

## Configuration Schema

### `config/site.config.ts` (TypeScript)

```typescript
export const siteConfig = {
  company: {
    tradingName: "ABC Driveways",
    legalName: "ABC Driveways Ltd",                    // For Companies House footer
    tagline: "Professional Driveway & Paving Specialists",
    founded: 2010,
    registeredNumber: "12345678",                      // Optional: Companies House number
    vatNumber: "GB123456789",                          // Optional
  },

  contact: {
    phone: "01234 567890",
    phoneFormatted: "+441234567890",                   // For tel: links
    whatsapp: "+441234567890",                         // Optional
    email: "info@abcdriveways.co.uk",
    address: {
      street: "123 High Street",
      city: "Reading",
      county: "Berkshire",
      postcode: "RG1 1AA",
      country: "United Kingdom",
    },
    openingHours: {
      weekdays: "Mon-Fri: 8am-6pm",
      weekends: "Sat: 9am-4pm, Sun: Closed",
    },
    serviceRadius: 30,                                 // Miles
    serviceArea: ["Reading", "Wokingham", "Bracknell", "Maidenhead"], // For area pages
  },

  branding: {
    colors: {
      primary: "#1E40AF",                              // Tailwind blue-800
      secondary: "#F59E0B",                            // Tailwind amber-500
      accent: "#10B981",                               // Tailwind emerald-500
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },

  services: [
    {
      slug: "block-paving",
      name: "Block Paving",
      shortDesc: "Beautiful, durable block paving driveways in a range of colours and patterns.",
      longDesc: "Our block paving service includes full excavation, sub-base preparation, edge restraints, and a 10-year guarantee...",
      features: ["10-year guarantee", "Choice of colours", "Drainage included"],
      priceRange: "£70-£100 per sqm",                  // Optional
      gallery: ["/images/gallery/block-1.jpg", "/images/gallery/block-2.jpg"],
      faqs: [
        { q: "How long does block paving last?", a: "With proper maintenance, 20+ years." },
      ],
    },
    {
      slug: "resin-bound",
      name: "Resin Bound Driveways",
      shortDesc: "Smooth, permeable, low-maintenance resin surfaces.",
      longDesc: "...",
      features: ["SuDS compliant", "No planning permission needed", "Quick install"],
      priceRange: "£50-£80 per sqm",
      gallery: [],
      faqs: [],
    },
    // ... more services: tarmac, patios, drainage, repairs
  ],

  areas: [
    { slug: "reading", name: "Reading", postcodes: ["RG1", "RG2", "RG4"] },
    { slug: "wokingham", name: "Wokingham", postcodes: ["RG40", "RG41"] },
    // Auto-generate area pages from this list
  ],

  proof: {
    accreditations: [
      { name: "Which? Trusted Traders", logo: "/images/accreditations/which.svg" },
      { name: "Marshalls Registered Installer", logo: "/images/accreditations/marshalls.svg" },
    ],
    insurance: "£5 million public liability insurance",
    guarantee: "10-year workmanship guarantee on all installations",
    reviewsEmbed: null,                                // Optional: Trustpilot/Google widget
    reviewCount: 150,
    averageRating: 4.9,
  },

  social: {
    facebook: "https://facebook.com/abcdriveways",     // Optional (null = hide icon)
    instagram: "https://instagram.com/abcdriveways",
    twitter: null,
    linkedin: null,
    youtube: null,
  },

  seo: {
    baseTitle: "ABC Driveways | Professional Driveway & Paving in Reading, Berkshire",
    baseDescription: "Expert driveway installation and paving services in Reading. Block paving, resin, tarmac. 10-year guarantee. Free quotes. Call 01234 567890.",
    keywords: ["driveways Reading", "block paving Berkshire", "resin driveways"],
    googleBusinessProfile: "https://g.page/abc-driveways-reading",  // Optional
  },

  integrations: {
    mapsProvider: "googleEmbed",                       // "googleEmbed" | "leaflet"
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    googleAnalyticsId: null,                           // Optional: GA4 ID
    facebookPixel: null,
    formEndpoint: "/api/quote",                        // Where quote form POSTs
    emailProvider: "resend",
    resendFromEmail: "quotes@abcdriveways.co.uk",
  },
};

export type SiteConfig = typeof siteConfig;
```

---

## Page Requirements

### 1. Home (`app/page.tsx`)
- **Hero Section:**
  - H1: `{tradingName} - {tagline}`
  - Subheading: Service area mention
  - 2 CTAs: "Call {phone}" (tel: link) + "Get Free Quote" (scroll to form or modal)
  - Trust badges row: accreditations, insurance, guarantee
- **Services Grid:** 3-4 top services (card with image, name, short desc, CTA)
- **Process Steps:** "How We Work" (1. Free site visit → 2. Detailed quote → 3. Professional install → 4. Aftercare)
- **Featured Gallery:** 6-8 before/after images, link to full gallery
- **Reviews Section:** 3-4 review cards + average rating + "See all reviews" link
- **Areas Served:** List/map of service towns
- **CTA Section:** Final "Ready to transform your driveway?" + form or phone CTA
- **Schema Markup:** LocalBusiness JSON-LD (name, address, phone, url, geo, openingHours, rating)

### 2. Services Index (`app/services/page.tsx`)
- H1: "Our Driveway & Paving Services"
- Grid/list of all services from config (card with image, name, shortDesc, "Learn More")

### 3. Service Detail (`app/services/[slug]/page.tsx`)
- Dynamic route: pulls service by slug from config
- H1: `{service.name} in {city}`
- Long description, features list, price range (if present)
- Gallery (if present), FAQs (if present), quote form
- Breadcrumbs: Home > Services > {name}
- Schema: Service + AggregateOffer (if priceRange set)

### 4. Areas Served Index (`app/areas/page.tsx`)
- H1: "Areas We Serve"
- Map (interactive or static) + list of towns/postcodes
- "We cover {serviceRadius} miles around {city}"

### 5. Area Detail (`app/areas/[slug]/page.tsx`)
- Dynamic route: pulls area by slug
- H1: "Driveways & Paving in {area.name}"
- Content template: "We've been installing driveways in {name} for X years. Our team covers {postcodes}. [Services list]. Call today for a free quote."
- Embed map centred on area
- Local schema (mention area in LocalBusiness areaServed)

### 6. Gallery (`app/gallery/page.tsx`)
- H1: "Our Work"
- Filterable/category grid (block paving, resin, patios, etc.)
- Lightbox on click (next/prev, close)
- Pull images from `public/images/gallery/` and config service galleries

### 7. Reviews (`app/reviews/page.tsx`)
- H1: "Customer Reviews"
- List of review cards (name, date, rating, text)
- Embed Trustpilot/Google Reviews widget if `reviewsEmbed` set
- Schema: AggregateRating + individual Review markup

### 8. About (`app/about/page.tsx`)
- H1: "About {tradingName}"
- Story, team photo, values, accreditations, insurance, guarantee
- "Established {founded}"

### 9. Contact (`app/contact/page.tsx`)
- H1: "Contact Us"
- Quote form (name, email, phone, postcode, service, message, consent checkbox)
- NAP block (phone, email, address)
- Embedded map (config.integrations.mapsProvider)
- Opening hours

### 10. Privacy Policy (`app/privacy-policy/page.tsx`)
- H1: "Privacy Policy"
- Template text (GDPR-compliant, form data, cookies, analytics)
- Pull company name, address, email from config
- Link from footer + cookie banner

### 11. Terms (`app/terms/page.tsx`)
- H1: "Terms & Conditions" (optional)
- Deposits, cancellations, guarantee terms
- Link from footer

---

## Component Specifications

### Header (`components/layout/Header.tsx`)
- Logo (link to home)
- Nav links: Services, Areas, Gallery, Reviews, About, Contact
- Phone CTA button (sticky on mobile)
- Mobile hamburger menu

### Footer (`components/layout/Footer.tsx`)
- **Column 1:** Logo, tagline
- **Column 2:** Quick links (Services, Areas, Gallery, Reviews, About, Contact)
- **Column 3:** NAP (Name, Address, Phone, Email)
- **Column 4:** Social icons (conditional render if not null)
- **Bottom row:** Copyright, Privacy Policy, Terms, Companies House details (if `legalName` and `registeredNumber` present)

### QuoteForm (`components/shared/QuoteForm.tsx`)
- Fields: Full Name, Email, Phone, Postcode, Service (dropdown), Message (optional), Consent checkbox
- Zod validation: email format, UK phone, postcode format
- POST to `config.integrations.formEndpoint` (handle in `app/api/quote/route.ts`)
- Success: "Thanks, we'll call you within 24 hours"
- Error: "Please try calling us"

### Map (`components/shared/Map.tsx`)
- If `mapsProvider === "googleEmbed"`: Render iframe with `googleMapsEmbedUrl`
- If `mapsProvider === "leaflet"`: Render Leaflet map (OpenStreetMap tiles) centred on address
- Props: `center?: {lat, lng}`, `zoom?: number`

### SchemaMarkup (`components/shared/SchemaMarkup.tsx`)
- Generate JSON-LD for LocalBusiness:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "{tradingName}",
    "image": "{logo}",
    "address": {...},
    "telephone": "{phoneFormatted}",
    "url": "{siteUrl}",
    "openingHours": [...],
    "priceRange": "££",
    "areaServed": [{name: area} for area in areas],
    "aggregateRating": {...},
    "hasOfferCatalog": {...services}
  }
  ```
- Render in `<script type="application/ld+json">`

---

## UK Legal Requirements

### Companies Act 2006 (if Limited Company)
If `legalName` contains "Ltd" or `registeredNumber` is set, footer must display:
- Registered company name
- Registered number
- Registered office address
- Place of registration (e.g., "Registered in England and Wales")

**Implementation:** Conditional block in Footer.tsx:
```tsx
{config.company.registeredNumber && (
  <div className="text-xs text-gray-500 mt-4">
    {config.company.legalName} | Registered in England and Wales | Company No. {config.company.registeredNumber}
  </div>
)}
```

### GDPR & Privacy
- Privacy Policy page (mandatory if collecting form data or using cookies)
- Cookie consent banner (if using analytics/marketing cookies)
- Form consent checkbox: "I agree to be contacted about my quote" (pre-checked is not allowed)

### Consumer Rights & Misleading Information
- Guarantee/warranty claims must be accurate (e.g., "10-year guarantee on workmanship" must be honoured)
- Price ranges should include "from" or "typical" to avoid misleading
- Accreditations/logos: only display if valid (check expiry, membership status)

---

## Maps Integration Options

### Option 1: Google Maps Embed API (Recommended for simplicity)
- **Free tier:** Unlimited iframe embeds (no API key needed for basic embed)
- **How:** Generate embed URL from Google Maps > Share > Embed a map
- **Pros:** Zero config, works immediately, familiar UI
- **Cons:** Less customizable, Google branding

**Implementation:**
```tsx
<iframe
  src={config.integrations.googleMapsEmbedUrl}
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

### Option 2: Leaflet + OpenStreetMap (Free, no API key)
- **Libraries:** `react-leaflet`, `leaflet`
- **Pros:** Fully customizable, no Google dependency, free
- **Cons:** Need to geocode address (use Nominatim API or hardcode lat/lng)

**Implementation:**
```tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

<MapContainer center={[51.4543, -0.9781]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[51.4543, -0.9781]}>
    <Popup>{config.company.tradingName}</Popup>
  </Marker>
</MapContainer>
```

**Geocoding:** Hardcode lat/lng in config or use Nominatim (free, rate-limited):
```
https://nominatim.openstreetmap.org/search?q={address}&format=json
```

---

## SEO Requirements

### On-Page SEO
- **Title tags:** `{service.name} in {area.name} | {tradingName}` (max 60 chars)
- **Meta descriptions:** Unique per page (max 160 chars), include phone, CTA
- **H1:** One per page, keyword-rich (e.g., "Block Paving Driveways in Reading")
- **Headings hierarchy:** H1 → H2 → H3 (no skipping)
- **Alt text:** All images (descriptive, include location if relevant)
- **Internal linking:** Service cards link to service pages, area mentions link to area pages
- **Mobile-friendly:** Responsive, touch-friendly buttons (min 44px), fast load (<3s LCP)
- **No auth gates:** All content is crawlable without login or sessions

### Technical SEO
- **Sitemap.xml:** Auto-generate from routes (Next.js app router can use `sitemap.ts`)
- **Robots.txt:** Allow all, link to sitemap
- **Structured data:** LocalBusiness, Service, Review schemas (test with Google Rich Results Test)
- **Open Graph:** Title, description, image (og-image.jpg) for social sharing
- **Canonical URLs:** Self-referencing canonical on all pages
- **HTTPS:** Enforce (redirect HTTP → HTTPS in next.config.js or Vercel settings)

### Local SEO
- **NAP Consistency:** Exact same Name, Address, Phone across site, footer, contact page, schema
- **Google Business Profile:** Link to GBP in header/footer (config.seo.googleBusinessProfile)
- **Citations:** Keep consistent listings across local directories and industry sites
- **Reviews:** Encourage and respond to reviews with service + location context
- **Local keywords:** "{service} in {city}", "{city} {service} specialists"
- **Area pages:** One per major town/postcode (config.areas)
- **Embed map:** Shows location, helps local relevance

---

## PWA Requirements

- **Manifest:** App name, icons, theme color, start URL
- **Offline:** Cache core pages and assets, include an offline fallback
- **Installability:** Pass Lighthouse PWA checks on mobile

---

## Styling & Branding

### Tailwind Config (`tailwind.config.ts`)
Inject colors from config:
```typescript
import { siteConfig } from './config/site.config';

export default {
  theme: {
    extend: {
      colors: {
        primary: siteConfig.branding.colors.primary,
        secondary: siteConfig.branding.colors.secondary,
        accent: siteConfig.branding.colors.accent,
      },
      fontFamily: {
        heading: [siteConfig.branding.fonts.heading, 'sans-serif'],
        body: [siteConfig.branding.fonts.body, 'sans-serif'],
      },
    },
  },
};
```

### Design System
- **Buttons:** Primary (bg-primary), Secondary (border), Ghost (text)
- **Cards:** Shadow, rounded-lg, hover lift effect
- **Forms:** Focus rings, error states (red border + message), success states (green checkmark)
- **Images:** Lazy load, aspect-ratio-video for before/after, blur placeholder
- **Typography:** Heading font for H1-H3, body font for paragraphs/lists

### Motion & Micro-interactions
- **Default:** Framer Motion for section reveals, CTA emphasis, and hero transitions
- **Lightweight option:** Motion One for simple in-view fades and micro-interactions
- **Performance:** Short durations, avoid large layout shifts, keep animation budget low
- **Accessibility:** Respect prefers-reduced-motion

---

## Deployment Workflow (Per Client)

### 1. Clone/Copy Master Template
```bash
git clone <master-repo> client-abc-driveways
cd client-abc-driveways
```

### 2. Update Config
- Edit `config/site.config.ts`: Replace all placeholders with client data
- Replace logo: `public/images/logo.svg`
- Add gallery images: `public/images/gallery/`
- Add OG image: `public/og-image.jpg`

### 3. Environment Variables (`.env.local`)
```env
# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=quotes@abc-driveways.co.uk
SITE_URL=https://abc-driveways.co.uk
```

### 4. Install & Build
```bash
npm install
npm run build
npm run start  # Test locally on http://localhost:3000
```

### 5. Deploy
- **Vercel (Recommended):** Connect repo, auto-deploy on push, free SSL, edge functions
- **Netlify:** Similar to Vercel
- **Custom VPS:** Docker + Nginx + Let's Encrypt
- **Cloudflare Pages:** Free tier, fast CDN

### 6. Post-Deploy Checklist
- [ ] Custom domain connected (abc-driveways.co.uk)
- [ ] SSL certificate active (HTTPS)
- [ ] Google Analytics / Facebook Pixel tracking (if used)
- [ ] Submit sitemap to Google Search Console
- [ ] Create/claim Google Business Profile, link to website
- [ ] Test contact form (check email delivery)
- [ ] Test on mobile (Chrome, Safari)
- [ ] Check PageSpeed Insights (aim for 90+ mobile score)
- [ ] Verify schema markup (Google Rich Results Test)

---

## API Routes

### `app/api/quote/route.ts`
Handles quote form submissions without storing data in a database:

```typescript
import { NextResponse } from 'next/server';
import { z } from 'zod';

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9\s\+\(\)]+$/),
  postcode: z.string().min(5),
  service: z.string(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    // Send email via Resend
    // await sendEmail({ to: config.contact.email, subject: 'New Quote Request', data });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

---

## Development Workflow

### Initial Setup
```bash
npx create-next-app@latest driveway-template --typescript --tailwind --app
cd driveway-template
npm install zod react-hook-form @hookform/resolvers
npm install framer-motion resend
npm install leaflet react-leaflet  # If using Leaflet
npm install sharp  # For Next.js image optimization
```

### File Generation Priority
1. **Config schema** (`config/site.config.ts`) - Foundation for everything
2. **Layout components** (Header, Footer) - Site shell
3. **Home page** (`app/page.tsx`) - Most complex, sets pattern for others
4. **Shared components** (QuoteForm, Map, SchemaMarkup) - Reusable across pages
5. **Dynamic routes** (services/[slug], areas/[slug]) - Data-driven pages
6. **Static pages** (Gallery, Reviews, About, Contact) - Simpler templates
7. **Legal pages** (Privacy, Terms) - Text-heavy, low priority for MVP
8. **API route** (`api/quote`) - Form handling

### Testing Checklist
- [ ] Config validation: Try missing required fields (should show error)
- [ ] Conditional rendering: Set `social.facebook = null` (icon should hide)
- [ ] Dynamic routes: Visit `/services/invalid-slug` (should 404)
- [ ] Form validation: Submit empty form (show errors), submit valid (success message)
- [ ] Responsive: Test on mobile (320px), tablet (768px), desktop (1920px)
- [ ] Schema: Validate JSON-LD with Google's tool
- [ ] Performance: Lighthouse score (target: 90+ Performance, 100 Accessibility, 100 SEO)

---

## Optional Enhancements (Phase 2)

- **CMS Integration:** Sanity/ContentLayer for gallery/blog management (easier for non-technical clients)
- **Quote Calculator:** Interactive form with dropdowns (area size, material) → instant estimate
- **Live Chat:** Tawk.to, Tidio (free tier with branding)
- **Booking System:** Calendly embed for site visit scheduling
- **Blog:** `/blog` route for SEO content (guides, case studies)
- **Video Backgrounds:** Hero section with drone footage (lazy load, muted autoplay)

---

## Key Success Metrics

Track these for each deployed site:
- **Organic Traffic:** Google Search Console impressions/clicks
- **Conversion Rate:** Quote form submissions / total visitors
- **Local Rankings:** Track "{service} in {city}" on Google (aim for top 3)
- **Page Speed:** Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)
- **Engagement:** Bounce rate (<60%), time on site (>1 min), pages per session (>2)

---

## Support & Maintenance Plan

**For Each Client:**
- Monthly rank tracking report (Google My Business insights + Search Console)
- Quarterly content updates (add new gallery images, update FAQs)
- Annual reviews (renew accreditations, update guarantees, refresh design)
- Form monitoring (check submissions aren't going to spam)

**Pricing Model Ideas:**
- One-time build fee: £800-£1500 (depending on content volume, photography)
- Monthly hosting + support: £50-£100 (includes SSL, analytics, form handling, updates)
- SEO retainer: £200-£500/month (content, backlinks, GBP optimization)

---

## Next Steps for AI Implementation

### Phase 1: Core Template (Priority)
1. Set up Next.js project with TypeScript + Tailwind
2. Create `config/site.config.ts` with full schema
3. Build Header + Footer components with conditional rendering
4. Implement Home page with all sections (Hero, Services, Process, Gallery, Reviews, CTA)
5. Add QuoteForm with Zod validation + API route
6. Create SchemaMarkup component (LocalBusiness JSON-LD)

### Phase 2: Dynamic Routes
7. Build `/services` and `/services/[slug]` pages (pull from config)
8. Build `/areas` and `/areas/[slug]` pages (pull from config)
9. Add Gallery page with lightbox
10. Add Reviews page

### Phase 3: Legal & Integrations
11. Add Privacy Policy + Terms pages
12. Integrate Google Maps Embed or Leaflet
13. Add Google Analytics (conditional on config)
14. Generate sitemap.xml + robots.txt

### Phase 4: Testing & Optimization
15. Run Lighthouse audit (fix issues)
16. Test form submission (check email delivery)
17. Validate schema markup
18. Test responsive design (mobile/tablet/desktop)
19. Check NAP consistency across all pages

---

## Questions for Client Onboarding

When setting up a new client site, ask:
1. What is your company's registered legal name? (For Companies House footer)
2. What's your preferred brand colour? (Primary CTA buttons)
3. Which services do you offer? (We can start with 4-6 main ones)
4. Which towns/areas do you cover? (For area pages)
5. Do you have a logo? (Vector SVG preferred, or high-res PNG)
6. Do you have before/after photos? (Minimum 10-15 for gallery)
7. Do you have any accreditations? (Which? Trusted Traders, Checkatrade, etc.)
8. What's your insurance level? (Public liability amount)
9. What guarantee do you offer? (Years, what's covered)
10. Do you have existing reviews? (Google, Trustpilot - can we embed?)
11. Social media accounts? (Facebook, Instagram - for footer icons)
12. Preferred domain name? (e.g., abc-driveways.co.uk - help register if needed)

---

## Common Pitfalls to Avoid

❌ **Hardcoding client data** in components (always read from config)  
❌ **Broken image links** (ensure all gallery paths exist in public/)  
❌ **Missing alt text** (bad for SEO + accessibility)  
❌ **Inconsistent NAP** (phone/address differs between pages = bad local SEO)  
❌ **Non-mobile-friendly forms** (small inputs, poor validation UX)  
❌ **Slow images** (use next/image with proper sizes, not raw <img>)  
❌ **No schema markup** (miss out on rich results in Google)  
❌ **Generic title tags** ("Home | ABC Driveways" instead of keyword-rich)  
❌ **No SSL** (Chrome warns users, bad trust signal)  
❌ **Form submissions go nowhere** (test email delivery before launch!)

---

## License & Usage

This master template is proprietary. Each deployed instance is for a single client. Do not redistribute the template itself to clients (only the deployed site).

---

**END OF README**
