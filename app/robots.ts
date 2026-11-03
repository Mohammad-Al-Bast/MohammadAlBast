import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/seo'

/** /robots.txt — only the production deployment may be indexed; previews and local builds ask crawlers to stay out. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'

  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/style-guide'] }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
