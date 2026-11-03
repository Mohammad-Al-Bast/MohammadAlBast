import type { Metadata } from 'next'

import { notFoundPage } from '@/components/portfolio/data'
import { NotFoundContent } from '@/components/portfolio/not-found-content'

/** 404 for notFound() inside the site (e.g. a mistyped project slug); renders within the normal layout. Next adds noindex itself. */
export const metadata: Metadata = { title: notFoundPage.title }

export default function NotFound() {
  return <NotFoundContent />
}
