import { cn } from '@/lib/utils'
import type { ElementType, ReactNode } from 'react'

/** Display heading wrapped in mint code brackets: <Title/> */
export function CodeHeading({
  children,
  as: Tag = 'h2',
  className,
  close = '/>',
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  /** closing bracket — the Figma uses "/>" almost everywhere, ">" on a few */
  close?: string
}) {
  return (
    <Tag
      className={cn(
        'font-sans text-[40px] leading-[1.15] font-normal text-balance text-heading md:text-[56px]',
        className,
      )}
    >
      <span aria-hidden className="text-primary">
        {'<'}
      </span>
      {children}
      <span aria-hidden className="text-primary">
        {close}
      </span>
    </Tag>
  )
}
