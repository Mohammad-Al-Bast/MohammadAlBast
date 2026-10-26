'use client'

import { useState } from 'react'
import {
  AppWindow,
  Blocks,
  LayoutDashboard,
  type LucideIcon,
  MousePointerClick,
  PanelsTopLeft,
  Store,
} from 'lucide-react'

import { CodeHeading } from '@/components/code-heading'
import { ArrowLink } from '@/components/primitives'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { buildItems } from './data'

const icons: Record<(typeof buildItems)[number]['icon'], LucideIcon> = {
  webflow: Blocks,
  site: PanelsTopLeft,
  landing: MousePointerClick,
  frontend: AppWindow,
  dashboard: LayoutDashboard,
  store: Store,
}

function Detail({ index }: { index: number }) {
  const item = buildItems[index]
  const Icon = icons[item.icon]
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <Icon className="size-12 text-primary" strokeWidth={1.25} />
      <p className="max-w-[400px] font-mono text-sm leading-relaxed text-foreground/90 md:text-base">
        {item.description}
      </p>
      <ArrowLink href="/projects">View Project</ArrowLink>
    </div>
  )
}

export function WhatIBuild() {
  const [value, setValue] = useState(1)

  return (
    <section id="expertise" className="section-y">
      <div className="container-page">
        <CodeHeading>What I Build</CodeHeading>

        <Tabs
          value={value}
          onValueChange={(v) => setValue(Number(v))}
          orientation="vertical"
          className="mt-8 gap-0 md:mt-10 md:grid md:grid-cols-[1fr_auto_minmax(0,420px)] md:gap-0 lg:grid-cols-[minmax(0,880px)_auto_1fr]"
        >
          <TabsList className="flex h-auto w-full flex-col items-stretch gap-0 overflow-visible rounded-none bg-transparent p-0 md:pr-0 md:pl-8">
            {buildItems.map((item, i) => (
              <div key={item.title}>
                {i > 0 && <Separator />}
                <TabsTrigger
                  value={i}
                  className="group h-auto w-full justify-start gap-5 rounded-none px-0 py-5 text-left font-sans text-lg whitespace-normal text-foreground/45 hover:text-foreground/75 data-[active]:bg-transparent data-[active]:text-foreground md:gap-6 md:py-[26px] md:text-2xl"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-current font-sans text-base md:size-12 md:text-xl">
                    {i + 1}
                  </span>
                  {item.title}
                </TabsTrigger>
                {/* mobile: the detail opens inline under the active row */}
                <div className={cn('pb-6 pl-[60px] md:hidden', value !== i && 'hidden')}>
                  <Detail index={i} />
                </div>
              </div>
            ))}
          </TabsList>

          <Separator orientation="vertical" className="hidden md:block" />

          {buildItems.map((item, i) => (
            <TabsContent key={item.title} value={i} className="hidden md:block md:pl-8 md:[&[hidden]]:hidden">
              <Detail index={i} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
