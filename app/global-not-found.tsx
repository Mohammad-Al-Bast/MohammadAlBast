import './(frontend)/globals.css'

import type { Metadata } from 'next'

import { ContactProvider } from '@/components/portfolio/contact-dialog'
import { CTA } from '@/components/portfolio/cta'
import { notFoundPage, site } from '@/components/portfolio/data'
import { NotFoundContent } from '@/components/portfolio/not-found-content'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { SiteNav } from '@/components/portfolio/site-nav'
import { fontVariables } from '@/lib/fonts'

/**
 * 404 for URLs that match no route at all. The site has two root layouts (the frontend and Payload's admin),
 * so Next renders this full document directly instead of composing it from a layout.
 */
export const metadata: Metadata = {
  title: `${notFoundPage.title} — ${site.name}`,
  // Next adds <meta name="robots" content="noindex"> to 404 responses itself.
  icons: { icon: { url: '/images/favicon.svg', type: 'image/svg+xml' } },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${fontVariables} bg-background`}>
      <body className="overflow-x-clip">
        <ContactProvider>
          <SiteNav />
          <main id="main" tabIndex={-1} className="outline-none">
            <NotFoundContent />
            <CTA />
          </main>
          <SiteFooter />
        </ContactProvider>
      </body>
    </html>
  )
}
