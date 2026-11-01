'use client'

import type { ComponentProps } from 'react'
import { ArrowRight } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useContact } from './contact-dialog'

type Props = Omit<ComponentProps<'button'>, 'type'> & {
  /** preselects "What do you need?" in the form */
  projectType?: string
}

/** Pill button that opens the site-wide contact dialog. */
export function ContactButton({
  projectType,
  variant = 'outline',
  size = 'default',
  className,
  onClick,
  ...props
}: Props & VariantProps<typeof buttonVariants>) {
  const { openContact } = useContact()
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e)
        openContact(projectType)
      }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/** Same as ContactButton, styled like ArrowButton (label + circular arrow). */
export function ContactArrowButton({
  projectType,
  variant = 'default',
  className,
  children,
  ...props
}: Props & { variant?: 'default' | 'outline' | 'dark' }) {
  const { openContact } = useContact()
  return (
    <button
      type="button"
      onClick={() => openContact(projectType)}
      className={cn(buttonVariants({ variant, size: 'default' }), 'justify-between gap-4 pr-1 pl-5', className)}
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
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </button>
  )
}
