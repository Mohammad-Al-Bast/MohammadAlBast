import type { Metadata } from 'next'

import { seo, site } from '@/components/portfolio/data'

/**
 * The site's public origin, used for canonical URLs, the sitemap, robots.txt and share images.
 * NEXT_PUBLIC_SITE_URL wins when set; on Vercel it falls back to the production domain
 * (the vercel.app address today, the custom domain once one is connected), so no code change is needed.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/+$/, '')

/** Turns a site path ("/projects") or an already absolute URL into an absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return `${siteUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

/**
 * Metadata for one page: canonical URL plus matching Open Graph and Twitter fields.
 * Next.js replaces (not merges) `openGraph` between layouts and pages, so every page builds the full set here.
 * Share images come from the `opengraph-image.tsx` files, not from this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
}: {
  /** Page title without the " — Mohammad Al Bast" suffix. Omit on the home page. */
  title?: string
  description: string
  path: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : seo.title
  return {
    ...(title ? { title } : { title: { absolute: seo.title } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: 'en_US',
      title: fullTitle,
      description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
