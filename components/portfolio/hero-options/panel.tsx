import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Same footprint as the hero slider so every option can be swapped in place.
 * On desktop `contain: size` makes it match the intro card's height without its own content stretching the row.
 */
export function HeroPanel({ children, className, grid = true }: { children: ReactNode; className?: string; grid?: boolean }) {
  return (
    <div
      className={cn(
        'relative flex min-h-[560px] flex-col overflow-hidden rounded-lg bg-inset lg:min-h-[770px] lg:[contain:size]',
        grid &&
          'bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:40px_40px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Small mono eyebrow used at the top of each option. */
export function PanelLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs text-primary uppercase">{children}</p>
}
