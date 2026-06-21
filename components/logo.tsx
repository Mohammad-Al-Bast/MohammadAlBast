import { cn } from '@/lib/utils'

/** Green code-slash glyph used inside the logo brackets. */
function SlashMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('text-primary', className)}
    >
      <path
        d="M9.5 4 6 20"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M14 5.5 20 12l-6 6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Logo lockup: [ <mark> MB ] style.
 * `variant="full"` renders the large [MHMD/B] footer wordmark.
 */
export function Logo({
  variant = 'compact',
  className,
}: {
  variant?: 'compact' | 'full'
  className?: string
}) {
  if (variant === 'full') {
    return (
      <div
        className={cn(
          'flex select-none items-center font-sans font-bold leading-none tracking-tight text-foreground',
          className,
        )}
        aria-label="MHMD B"
      >
        <span className="text-muted-foreground">[</span>
        <span>MHMD</span>
        <SlashMark className="mx-1 h-[0.8em] w-[0.8em]" />
        <span>B</span>
        <span className="text-muted-foreground">]</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex select-none items-center text-xl font-bold leading-none tracking-tight text-foreground',
        className,
      )}
      aria-label="MB"
    >
      <span className="text-muted-foreground">[</span>
      <SlashMark className="mr-0.5 size-4" />
      <span>MB</span>
      <span className="text-muted-foreground">]</span>
    </div>
  )
}
