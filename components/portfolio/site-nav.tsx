'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { Logo } from '@/components/logo'
import { ContactButton } from './contact-trigger'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { navLinks } from './data'

/** Highlights the nav item whose section is in view (home) or the portfolio item on /projects. */
function useActiveHref() {
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (pathname.startsWith('/projects')) {
      setActive('/#portfolio')
      return
    }
    if (pathname !== '/') {
      setActive(null)
      return
    }
    const ids = navLinks.map((l) => l.href.split('#')[1])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(`/#${visible[0].target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  return active
}

export function SiteNav() {
  const active = useActiveHref()

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <nav className="container-page flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo className="h-8 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'font-mono text-sm transition-colors hover:text-primary',
                  active === link.href ? 'text-primary' : 'text-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ContactButton variant="outline-light" className="hidden md:inline-flex">
          Contact
        </ContactButton>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" />}
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-none border-border bg-background p-4">
            <SheetHeader className="p-0 pt-1">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo className="h-8 w-auto self-start" />
            </SheetHeader>
            <ul className="mt-8 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <SheetClose
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          'block py-5 font-mono text-lg',
                          active === link.href ? 'text-primary' : 'text-foreground',
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose
              render={<ContactButton variant="outline-light" size="lg" className="mt-6 w-full" />}
            >
              Contact
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
