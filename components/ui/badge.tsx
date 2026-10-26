import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap border font-mono transition-colors [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-foreground/40 text-foreground/80',
        ghost: 'border-transparent text-muted-foreground',
      },
      size: {
        default: 'h-6 rounded-[4px] px-2 text-xs',
        lg: 'h-7 rounded-[4px] px-2.5 text-[13px]',
      },
    },
    defaultVariants: { variant: 'outline', size: 'default' },
  },
)

function Badge({
  className,
  variant,
  size,
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      { className: cn(badgeVariants({ variant, size }), className) },
      props,
    ),
    render,
    state: { slot: 'badge', variant },
  })
}

export { Badge, badgeVariants }
