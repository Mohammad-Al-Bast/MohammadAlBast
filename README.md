# Mohammad Al Bast · Portfolio

Personal portfolio of Mohammad Al Bast, full-stack web developer and Webflow expert.
Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4 and shadcn/ui (Base UI).

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

The contact form sends email through [Resend](https://resend.com). Set these in `.env.local`
locally and in the Vercel project settings for production.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key with sending access |
| `CONTACT_TO_EMAIL` | no | Inbox for enquiries; defaults to the email in `data.ts` |
| `CONTACT_FROM_EMAIL` | no | Sender; defaults to Resend's test sender until a domain is verified |

Without `RESEND_API_KEY` the form still renders and asks visitors to email directly.

## Where things live

| What | Where |
|---|---|
| All copy, links, stats, services, projects | `components/portfolio/data.ts` |
| Page sections | `components/portfolio/` |
| Hero terminal | `components/portfolio/hero-options/terminal.tsx` |
| Contact form, dialog, server action | `components/portfolio/contact-*.tsx`, `app/actions/contact.ts`, `lib/contact-schema.ts` |
| shadcn components (re-skinned) | `components/ui/` |
| Design tokens | `app/globals.css` |
| CV download | `public/cv/Mohammad-Al-Bast-CV.pdf` |
| Style guide (dev only) | `/style-guide`, returns 404 in production |

Booking link and CV path are set in `site` inside `data.ts`; leaving either empty hides its buttons.

## Deployment

Deployed on Vercel. Merging into `main` deploys to production, so only merge once the
placeholder content (projects, testimonials, portrait) has been replaced.
