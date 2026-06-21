import { BrandGlyph } from '@/components/brand-glyph'
import { Logo } from '@/components/logo'
import { navLinks } from './data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        {/* Top: nav + contact + socials */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-4 md:flex md:gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-5">
              <a
                href="#"
                aria-label="GitHub"
                className="text-foreground transition-colors hover:text-primary"
              >
                <BrandGlyph src="/logos/github.svg" label="GitHub" className="size-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-primary transition-opacity hover:opacity-80"
              >
                <BrandGlyph src="/logos/linkedin.svg" label="LinkedIn" className="size-5" />
              </a>
            </div>
            <a
              href="tel:0096103279355"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              00961-(0)-3279355
            </a>
            <a
              href="mailto:Mohammadbast4@Gmail.com"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Mohammadbast4@Gmail.com
            </a>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="mt-12">
          <Logo
            variant="full"
            className="text-[clamp(3.5rem,16vw,12rem)] leading-none"
          />
        </div>

        {/* Bottom legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; 2026 Mohammad Al Bast. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {['Privacy Policy', 'Terms Of Service', 'Cookies Settings'].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </footer>
  )
}
