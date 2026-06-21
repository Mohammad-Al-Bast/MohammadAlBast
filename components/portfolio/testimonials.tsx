'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CircleArrowButton } from '@/components/primitives'
import { testimonials } from './data'
import { cn } from '@/lib/utils'

function Avatar({ image, name }: { image: string; name: string }) {
  if (image) {
    return (
      <Image
        src={image || '/placeholder.svg'}
        alt={name}
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-full object-cover grayscale"
      />
    )
  }
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm text-muted-foreground">
      {name.charAt(0)}
    </div>
  )
}

function Card({
  data,
  highlighted,
}: {
  data: (typeof testimonials)[number]
  highlighted: boolean
}) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border p-6 transition-opacity',
        highlighted
          ? 'border-border bg-card opacity-100'
          : 'border-border/60 bg-card/30 opacity-40',
      )}
    >
      <p className="grow font-mono text-sm leading-relaxed text-muted-foreground">
        {`"${data.quote}"`}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar image={data.image} name={data.name} />
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            {data.name}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {data.handle}
          </p>
        </div>
      </div>
    </article>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(1)
  const len = testimonials.length
  const go = (dir: 1 | -1) => setActive((i) => (i + dir + len) % len)

  const prev = (active - 1 + len) % len
  const next = (active + 1) % len

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Testimonials
        </h2>
        <p className="max-w-xs font-mono text-sm leading-relaxed text-muted-foreground md:text-right">
          What clients and colleagues say about working together.
        </p>
      </div>

      {/* Mobile: single card */}
      <div className="mt-12 md:hidden">
        <Card data={testimonials[active]} highlighted />
      </div>

      {/* Desktop: 3-up spotlight */}
      <div className="mt-12 hidden grid-cols-3 gap-5 md:grid">
        <Card data={testimonials[prev]} highlighted={false} />
        <Card data={testimonials[active]} highlighted />
        <Card data={testimonials[next]} highlighted={false} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="h-px w-16 bg-muted-foreground/40" />
        <div className="flex gap-3">
          <CircleArrowButton direction="left" onClick={() => go(-1)} />
          <CircleArrowButton direction="right" onClick={() => go(1)} />
        </div>
      </div>
    </section>
  )
}
