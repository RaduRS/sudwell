# sudwell

Marketing + product catalogue website built with Next.js (App Router), React, and Tailwind CSS.

## Requirements

- Node.js 20+
- npm

## Getting started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Site content

Most site content (company details, products, areas, branding, SEO, integrations) lives in:

- `config/site.config.ts`

Key pages:

- Product listing: `/services`
- Product detail: `/services/[slug]`
- Contact: `/contact`

## Admin config editor

There is a built-in config editor at:

- `/admin` (UI)
- `/admin/api` (saves config + uploads images)

Uploads are written to:

- `public/images/uploads`

## Quote form email delivery (optional)

The quote API endpoint (`/api/quote`) sends email via Resend when an API key is present:

- `RESEND_API_KEY` (environment variable)

If `RESEND_API_KEY` is not set, the endpoint returns a successful demo response instead of sending email.
