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

- `app/layout.tsx` — root layout; fonts (IBM Plex Sans + IBM Plex Mono), dark-only, and the shared shell: `SiteNav` → page → `CTA` → `SiteFooter`
- `app/page.tsx` — home
- `app/projects/page.tsx` — project listing with category tabs
- `app/projects/[slug]/page.tsx` — project detail template (static params from `data.ts`)
- `app/globals.css` — Tailwind v4 theme; all design tokens are CSS custom properties defined here
- `app/style-guide/page.tsx` — living style guide at `/style-guide`; update this when adding new primitives

### Component layers

| Layer | Path | Role |
|---|---|---|
| shadcn/ui | `components/ui/` | `button`, `badge`, `card`, `carousel` (Embla), `separator`, `sheet`, `tabs`, `avatar`. Re-skinned to the Figma — edit variants here, not per-use |
| Primitives | `components/primitives.tsx` | Composites on top of shadcn: `ArrowButton`, `ButtonLink`, `ArrowLink`, `GithubLink` |
| Headings | `components/code-heading.tsx` | `<Title/>` display heading with mint brackets |
| Brand | `components/brand-glyph.tsx` | CSS-mask trick for tintable SVG brand icons |
| Sections | `components/portfolio/` | One file per section; `project-row.tsx`, `projects-browser.tsx`, `project-gallery.tsx` are shared by the project pages |
| Data | `components/portfolio/data.ts` | Single source of truth for all copy, links, projects, testimonials. Entries marked `PLACEHOLDER` are dummy content |

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
- All page content (copy, images, links) lives in `components/portfolio/data.ts` — edit there, not in JSX
