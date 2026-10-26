# Mohammad Al Bast · Portfolio

Personal portfolio of Mohammad Al Bast, full-stack web developer and Webflow expert.
Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4 and shadcn/ui (Base UI).
Projects are managed in [Payload CMS](https://payloadcms.com) at `/admin` (Postgres on Neon, images on Cloudflare R2).

## Getting started

This project uses **pnpm** only.

```bash
pnpm install
cp .env.example .env.local   # then fill in the values (see below)
pnpm dev                     # http://localhost:3000
```

Other scripts:

```bash
pnpm build   # production build; type errors fail the build
pnpm start   # serve the production build
```

## Environment variables

Set these in `.env.local` locally and in the Vercel project settings for production.
`.env.example` explains where to find each value.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Contact form email (Resend) |
| `CONTACT_TO_EMAIL` | no | Inbox for enquiries; defaults to the email in `data.ts` |
| `CONTACT_FROM_EMAIL` | no | Sender; defaults to Resend's test sender until a domain is verified |
| `DATABASE_URL` | yes for the CMS | Neon Postgres connection string (pooled) |
| `PAYLOAD_SECRET` | yes for the CMS | Long random string used to sign admin sessions |
| `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | production | Cloudflare R2 storage for uploaded images |
| `R2_PUBLIC_URL` | recommended | Public bucket URL so images load straight from R2 |

Without `DATABASE_URL` the site shows the placeholder projects from `data.ts`.
Without the R2 variables, uploads are stored in `./media` (local development only).

## Projects CMS (Payload)

- Admin: `http://localhost:3000/admin`. The first visit asks you to create the admin account.
- Projects have drafts: only **published** projects appear on the site. Tick **Featured** to show one on the home page (up to 3).
- Editing a project rebuilds the affected pages automatically.
- Schema lives in `payload/collections/`. After changing it:
  ```bash
  pnpm generate:types               # refresh payload-types.ts
  pnpm migrate:create <name>        # write a migration for production
  ```
  Locally, Payload syncs the schema to your dev database automatically.
- On Vercel, `pnpm vercel-build` runs `payload migrate` before `next build`, so production
  tables are created/updated on every deploy.

## Where things live

| What | Where |
|---|---|
| All copy, links, stats, services | `components/portfolio/data.ts` |
| Projects (CMS) | Payload at `/admin`; config `payload.config.ts`, collections `payload/collections/`, queries `lib/projects.ts` |
| Page sections | `components/portfolio/` |
| Hero terminal | `components/portfolio/hero-options/terminal.tsx` |
| Contact form, dialog, server action | `components/portfolio/contact-*.tsx`, `app/actions/contact.ts`, `lib/contact-schema.ts` |
| shadcn components (re-skinned) | `components/ui/` |
| Design tokens | `app/globals.css` |
| CV download | `public/cv/Mohammad-Al-Bast-CV.pdf` |
| Style guide (dev only) | `/style-guide`, returns 404 in production |
| Site pages vs admin | `app/(frontend)/` for the site, `app/(payload)/` for Payload (generated, don't edit) |

Booking link and CV path are set in `site` inside `data.ts`; leaving either empty hides its buttons.

## Deployment

Deployed on Vercel. Merging into `main` deploys to production, so only merge once the
placeholder content (projects, testimonials, portrait) has been replaced.
