'use client'

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-border', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 cursor-pointer items-start justify-between gap-6 py-5 text-left font-sans text-lg leading-snug text-foreground transition-colors outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:text-xl',
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="mt-1 size-5 shrink-0 text-primary transition-transform duration-200 group-data-[panel-open]:rotate-45 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn('pb-6 font-mono text-sm leading-relaxed text-foreground/80 md:text-base', className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
