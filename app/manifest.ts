import type { MetadataRoute } from 'next'

import { seo, site } from '@/components/portfolio/data'

/** /manifest.webmanifest — name, colours and icons used when the site is saved to a home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Al Bast',
    description: seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#151515',
    theme_color: '#151515',
    icons: [
      { src: '/images/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/images/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/images/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  }
}
