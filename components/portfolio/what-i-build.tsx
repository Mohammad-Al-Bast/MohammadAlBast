'use client'

import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { CodeHeading } from '@/components/code-heading'
import { ArrowLink } from '@/components/primitives'
import { buildItems } from './data'
import { cn } from '@/lib/utils'

export function WhatIBuild() {
  const [active, setActive] = useState(1)
  const current = buildItems[active]

  return (
    <section id="expertise" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <CodeHeading className="mb-10 text-3xl md:text-4xl">
        What I Build
      </CodeHeading>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Accordion list */}
        <ul>
          {buildItems.map((item, i) => {
            const isActive = i === active
            return (
              <li key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex w-full items-center gap-5 py-5 text-left"
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-colors',
                      isActive
                        ? 'border-foreground text-foreground'
                        : 'border-border text-muted-foreground',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      'font-sans text-base font-medium transition-colors md:text-lg',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {item.title}
                  </span>
                </button>

                {/* Inline detail on mobile */}
                {isActive && (
                  <div className="pb-6 pl-13 lg:hidden">
                    <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <ArrowLink>View Project</ArrowLink>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Detail panel on desktop */}
        <aside className="hidden lg:block">
          <div className="flex size-12 items-center justify-center rounded-lg border border-border text-primary">
            <ImageIcon className="size-6" />
          </div>
          <p className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground">
            {current.description}
          </p>
          <div className="mt-6">
            <ArrowLink>View Project</ArrowLink>
          </div>
        </aside>
      </div>
    </section>
  )
}
