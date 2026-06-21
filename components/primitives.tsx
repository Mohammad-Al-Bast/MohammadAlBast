import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Bordered monospace tag pill, e.g. "React", "Webflow". */
export function Tag({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Solid green pill button with a circular arrow on the right. */
export function ArrowPillButton({
  children,
  className,
  variant = 'solid',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline'
}) {
  return (
    <button
      className={cn(
        'group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 font-mono text-sm font-medium transition-colors',
        variant === 'solid'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border border-primary/60 bg-transparent text-foreground hover:border-primary',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5',
          variant === 'solid'
            ? 'bg-primary-foreground text-primary'
            : 'bg-primary text-primary-foreground',
        )}
      >
        <ArrowRight className="size-4" />
      </span>
    </button>
  )
}

/** Outlined pill button (no arrow), e.g. "Contact Me". */
export function OutlineButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-primary/60 bg-transparent px-6 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/** Small text link with a green up-right arrow, e.g. "View Project". */
export function ArrowLink({
  children,
  href = '#',
  className,
}: {
  children: ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 font-mono text-sm text-primary transition-opacity hover:opacity-80',
        className,
      )}
    >
      <span>{children}</span>
      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ArrowUpRight className="size-3" />
      </span>
    </a>
  )
}

/** Circular carousel navigation button. */
export function CircleArrowButton({
  direction,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'left' | 'right'
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      className={cn(
        'flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary',
        className,
      )}
      {...props}
    >
      <Icon className="size-5" />
    </button>
  )
}
