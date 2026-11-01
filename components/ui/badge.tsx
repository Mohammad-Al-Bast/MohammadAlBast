import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit max-w-full items-center justify-center gap-1 border py-0.5 text-center font-mono transition-colors [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-foreground/40 text-foreground/80',
        ghost: 'border-transparent text-muted-foreground',
      },
      size: {
        default: 'min-h-6 rounded-[4px] px-2 text-xs',
        lg: 'min-h-7 rounded-[4px] px-2.5 text-[13px]',
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
