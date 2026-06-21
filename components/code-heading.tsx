import { cn } from '@/lib/utils'
import type { ElementType, ReactNode } from 'react'

export function CodeHeading({
  children,
  as: Tag = 'h2',
  className,
  bracketClassName,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  bracketClassName?: string
}) {
  return (
    <Tag
      className={cn(
        'font-sans font-medium tracking-tight text-foreground',
        className,
      )}
    >
      <span className={cn('text-primary', bracketClassName)}>{'<'}</span>
      {children}
      <span className={cn('text-primary', bracketClassName)}>{'/>'}</span>
    </Tag>
  )
}
