import Link from 'next/link'

import { legalLinks, navLinks, site } from './data'
import { SocialLinks } from './social-links'

export function SiteFooter() {
  return (
    <footer className="bg-raised pt-12 pb-10 md:pt-20">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-mono text-base text-primary hover:opacity-80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 font-sans text-base text-foreground/75 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <a href={site.phone.href} className="hover:text-foreground">
              {site.phone.label}
            </a>
            <a href={site.email.href} className="break-all hover:text-foreground">
              {site.email.label}
            </a>
            <SocialLinks />
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer-logo-dark.svg"
          width={1376}
          height={248}
          loading="lazy"
          alt="[MHMD/B] — Mohammad Al Bast"
          className="mt-8 h-auto w-full select-none"
        />

        <div className="mt-8 flex flex-col-reverse gap-4 font-sans text-sm text-foreground/75 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Mohammad Al Bast. All Rights Reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="underline underline-offset-4 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
