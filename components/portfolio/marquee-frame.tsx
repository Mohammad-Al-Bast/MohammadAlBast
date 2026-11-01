'use client'

import { useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Wraps looping marquee content with a pause button (moving content needs one).
 * The button is hidden under reduced motion, where the marquee doesn't run at all.
 */
export function MarqueeFrame({
  label,
  className,
  buttonClassName,
  children,
}: {
  /** what's moving, read after "Pause" or "Play" */
  label: string
  className?: string
  buttonClassName?: string
  children: ReactNode
}) {
  const [paused, setPaused] = useState(false)
  const Icon = paused ? Play : Pause

  return (
    <div data-marquee-paused={paused ? '' : undefined} className={cn('relative', className)}>
      {children}
      <button
        type="button"
        aria-label={`${paused ? 'Play' : 'Pause'} ${label}`}
        onClick={() => setPaused((p) => !p)}
        className={cn(
          'absolute z-20 flex size-9 cursor-pointer items-center justify-center rounded-full border border-foreground/40 bg-background text-foreground transition-colors hover:border-primary hover:text-primary motion-reduce:hidden',
          buttonClassName,
        )}
      >
        <Icon className="size-4" aria-hidden />
      </button>
    </div>
  )
}
