import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

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
    default: 'Mohammad Al Bast — Front-End & Webflow Developer',
    template: '%s — Mohammad Al Bast',
  },
  description:
    'Portfolio of Mohammad Al Bast, a Front-End & Webflow web developer specializing in React, Laravel Blade, Webflow & JavaScript. I turn ideas and designs into fast, user-friendly interfaces.',
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
        <SiteNav />
        <main>{children}</main>
        <CTA />
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
