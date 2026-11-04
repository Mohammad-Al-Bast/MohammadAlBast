# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:3000
pnpm build      # Production build (type errors fail the build)
```

This project uses **pnpm** exclusively (see `pnpm-lock.yaml`). Do not run `npm install`.

## Architecture

Portfolio for Mohammad Al Bast built with **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (base-nova style, on Base UI)**.
The design source is the Figma file "Hamada's portfolio (Copy)", Page 1.

- `app/(frontend)/layout.tsx` — site root layout; fonts (IBM Plex Sans + IBM Plex Mono), dark-only, skip link, and the shared shell inside `ContactProvider`: `SiteNav` → page → `CTA` → `SiteFooter`
- `app/(frontend)/page.tsx` — home
- `app/(frontend)/projects/page.tsx` — project listing with category tabs (URL-synced `?category=`)
- `app/(frontend)/projects/[slug]/page.tsx` — project detail template (static params from Payload)
- `app/(payload)/` — Payload admin (`/admin`) and REST/GraphQL API (`/api`); generated boilerplate, do not edit by hand
- `payload.config.ts`, `payload/collections/` (Projects, Media, Users), `payload/migrations/` — CMS schema. After schema changes run `pnpm generate:types` and `pnpm migrate:create <name>`
- `lib/projects.ts` — the only place pages read projects from; falls back to `data.ts` placeholders when `DATABASE_URL` is unset
- `app/(frontend)/globals.css` — Tailwind v4 theme; all design tokens are CSS custom properties defined here
- `app/(frontend)/style-guide/page.tsx` — living style guide at `/style-guide` (dev only: noindex, 404 in production); update this when adding new primitives
- SEO — `lib/seo.ts` (`siteUrl` from `NEXT_PUBLIC_SITE_URL` or Vercel's production URL; `pageMetadata()` gives every page its canonical, Open Graph and Twitter tags, so new pages must use it), `lib/structured-data.ts` + `components/json-ld.tsx` (schema.org JSON-LD), `app/robots.ts` (crawling allowed only when `VERCEL_ENV=production`), `app/sitemap.ts` (pages + Payload projects), `app/manifest.ts`, and generated share images in `opengraph-image.tsx` files (nested routes don't inherit them, so each top-level page segment re-exports the root one). SEO copy lives in `seo` in `data.ts`
- 404 — `app/global-not-found.tsx` (unknown URLs; a full `<html>` document because the site and Payload are separate root layouts, enabled by `experimental.globalNotFound`) and `app/(frontend)/not-found.tsx` (`notFound()` inside the site) share `components/portfolio/not-found-content.tsx`; fonts live in `lib/fonts.ts` so both documents use them
- Security headers — set for every route in `next.config.ts` (`headers()`); no full CSP yet because Payload admin and Vercel Analytics use inline scripts
- `app/actions/contact.ts` + `lib/contact-schema.ts` — contact form server action (zod validation, honeypot) sending through the Resend REST API; env vars in `.env.example`

### Component layers

| Layer | Path | Role |
|---|---|---|
| shadcn/ui | `components/ui/` | `accordion`, `button`, `badge`, `card`, `carousel` (Embla), `dialog`, `separator`, `sheet`, `tabs`, `avatar`. Re-skinned to the Figma — edit variants here, not per-use |
| Primitives | `components/primitives.tsx` | Composites on top of shadcn: `ArrowButton`, `ButtonLink`, `ArrowLink`, `GithubLink` |
| Headings | `components/code-heading.tsx` | `<Title/>` display heading with mint brackets |
| Brand | `components/brand-glyph.tsx` | CSS-mask trick for tintable SVG brand icons |
| Sections | `components/portfolio/` | One file per section; `project-row.tsx`, `projects-browser.tsx`, `project-gallery.tsx` are shared by the project pages |
| Contact | `components/portfolio/contact-*.tsx` | One site-wide dialog (`ContactProvider`); open it with `ContactButton` / `ContactArrowButton`, optionally passing `projectType` to preselect |
| Hero | `components/portfolio/hero.tsx`, `hero-options/terminal.tsx` | Intro card + interactive terminal (typed intro, commands read from `data.ts`) |
| Visuals | `components/portfolio/service-visuals.tsx` | Coded service illustrations (no stock images) |
| Data | `components/portfolio/data.ts` | Single source of truth for site copy, links, services, testimonials (projects come from Payload). Entries marked `PLACEHOLDER` are dummy content |

The shadcn registry is not reachable from every environment; if `shadcn add` fails, write the component by hand against `@base-ui/react` (see existing files for the pattern).

### Design system

- **Dark-only** — `html` always has class `dark`
- **Colors** — page `#151515` (`bg-background`), raised sections/cards `#2A2A2A` (`bg-card` / `bg-raised`), near-black inset cards (`bg-inset`), accent mint `#85FD9C` (`primary`), pale display headings (`text-heading`), light service cards (`bg-paper`, `text-paper-accent`)
- **Radius** — 12px cards (`rounded-lg`); every button is a pill
- **Fonts** — `font-sans` → IBM Plex Sans (headings, buttons), `font-mono` → IBM Plex Mono (body, labels, nav)
- **Layout** — `container-page` = 1440 max width with 32px gutters (16px mobile); `section-y` = 80px / 64px vertical padding

### Styling conventions

- Use Tailwind utility classes; avoid inline styles except where CSS masking requires it (`BrandGlyph`)
- Never put `background-clip:text` / transparent fill on headings globally — it kills colored spans inside headings
- New brand SVG icons go in `public/logos/` and are rendered via `BrandGlyph`
- Nav links are `/#id`; section ids (`expertise`, `services`, `portfolio`, `about`, `contact`) must match `navLinks` in `data.ts`
- All page content (copy, images, links) lives in `components/portfolio/data.ts` — edit there, not in JSX; projects live in Payload
- Do not name past employers or clients in site copy
- Every contact CTA opens the contact dialog; don't add raw `mailto:` buttons
- `main` auto-deploys to production on Vercel; work on a branch and merge only when ready to ship
