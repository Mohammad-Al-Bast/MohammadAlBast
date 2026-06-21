'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CodeHeading } from '@/components/code-heading'
import { ArrowPillButton, CircleArrowButton } from '@/components/primitives'
import { services } from './data'
import { cn } from '@/lib/utils'

export function Services() {
  const [active, setActive] = useState(0)
  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + services.length) % services.length)

  return (
    <section id="services" className="bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <CodeHeading className="text-3xl md:text-5xl">
            Services I Offer
          </CodeHeading>
          <p className="max-w-md font-mono text-sm leading-relaxed text-muted-foreground md:justify-self-end">
            From Webflow builds to custom React applications, I provide
            end-to-end front-end development solutions built for speed and
            maintainability.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {services.map((service, i) => (
              <div key={i} className="w-full shrink-0 pr-0 md:pr-6">
                <article className="grid overflow-hidden rounded-3xl bg-[oklch(0.95_0.01_120)] text-[oklch(0.2_0_0)] md:grid-cols-2">
                  {/* Text */}
                  <div className="flex flex-col p-7 md:p-10">
                    <div className="flex items-center justify-between font-mono text-xs text-[oklch(0.45_0_0)]">
                      <span>{service.number}</span>
                      <span>{service.tag}</span>
                    </div>

                    <h3 className="mt-8 font-sans text-2xl font-semibold leading-snug md:text-3xl">
                      {service.title
                        .split(service.highlight)
                        .map((part, idx, arr) => (
                          <span key={idx}>
                            {part}
                            {idx < arr.length - 1 && (
                              <span className="text-[oklch(0.6_0.17_150)]">
                                {service.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                    </h3>

                    <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-[oklch(0.35_0_0)]">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <ArrowPillButton>{service.cta}</ArrowPillButton>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative min-h-56 md:min-h-0">
                    <Image
                      src={service.image || '/placeholder.svg'}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {services.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to service ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  'h-1 rounded-full transition-all',
                  i === active ? 'w-7 bg-foreground' : 'w-4 bg-muted-foreground/40',
                )}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <CircleArrowButton direction="left" onClick={() => go(-1)} />
            <CircleArrowButton direction="right" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
