import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

import { ContactProvider } from '@/components/portfolio/contact-dialog'
import { CTA } from '@/components/portfolio/cta'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { SiteNav } from '@/components/portfolio/site-nav'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})
const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Mohammad Al Bast — Full-Stack Web Developer & Webflow Expert',
    template: '%s — Mohammad Al Bast',
  },
  description:
    'Mohammad Al Bast is a full-stack web developer and Webflow expert in Lebanon, building Webflow sites and TypeScript web applications with React, Next.js, NestJS and Laravel for clients worldwide.',
  icons: { icon: { url: '/images/favicon.svg', type: 'image/svg+xml' } },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#151515',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${ibmPlexSans.variable} ${ibmPlexMono.variable} bg-background`}>
      <body className="overflow-x-clip">
        <a
          href="#main"
          className="sr-only rounded-md bg-primary font-sans text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ContactProvider>
          <SiteNav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
            <CTA />
          </main>
          <SiteFooter />
        </ContactProvider>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
