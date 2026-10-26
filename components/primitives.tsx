import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/components/ui/button'
import { BrandGlyph } from '@/components/brand-glyph'
import { cn } from '@/lib/utils'

type ButtonStyle = VariantProps<typeof buttonVariants>

/**
 * Pill link with the circular arrow on the right ("View My Work",
 * "Start a Webflow Project", "View All", "LET’S TALK").
 */
export function ArrowButton({
  href,
  children,
  variant = 'default',
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  variant?: 'default' | 'outline' | 'dark'
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size: 'default' }),
        'justify-between gap-4 pr-1 pl-5',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-full transition-transform group-hover/button:translate-x-0.5',
          variant === 'default' && 'bg-black text-primary',
          variant === 'outline' && 'bg-primary text-primary-foreground',
          variant === 'dark' && 'border border-primary text-primary',
        )}
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  )
}

/** Plain pill link styled as a shadcn Button. */
export function ButtonLink({
  href,
  variant = 'outline',
  size = 'default',
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string } & ButtonStyle) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

/** Mint text link with a small filled arrow badge ("View Project"). */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-sans text-sm text-primary transition-opacity hover:opacity-80',
        className,
      )}
    >
      {children}
      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px">
        <ArrowUpRight className="size-3" strokeWidth={2.5} />
      </span>
    </Link>
  )
}

/** Mint text link with the GitHub glyph ("See Code", "Follow Me on GitHub"). */
export function GithubLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-2 font-sans text-sm text-primary transition-opacity hover:opacity-80',
        className,
      )}
    >
      {children}
      <BrandGlyph src="/logos/github.svg" label="GitHub" className="size-4" />
    </a>
  )
}
