'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowPillButton, CircleArrowButton, OutlineButton } from '@/components/primitives'
import { heroSlides } from './data'
import { cn } from '@/lib/utils'

export function Hero() {
  const [active, setActive] = useState(0)
  const slide = heroSlides[active]

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + heroSlides.length) % heroSlides.length)

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left intro card */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-card px-6 py-12 text-center md:px-12 md:py-16">
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Build Something That Matters
          </h1>

          <div className="mt-10 flex flex-col items-center">
            <Image
              src="/images/portrait.png"
              alt="Mohammad Al Bast"
              width={56}
              height={56}
              className="size-14 rounded-full object-cover grayscale"
            />
            <p className="mt-4 font-mono text-xs tracking-wide text-foreground">
              {'<HI, I\u2019M MOHAMMAD AL BAST/>'}
            </p>
            <p className="mt-3 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
              Front-End &amp; Webflow Web Developer, specializing in React,
              Laravel Blade, Webflow &amp; JavaScript.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ArrowPillButton>View My Work</ArrowPillButton>
            <OutlineButton>Contact Me</OutlineButton>
          </div>
        </div>

        {/* Right project carousel */}
        <div className="relative overflow-hidden rounded-3xl bg-surface">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-center">
              <p className="font-mono text-sm font-medium text-white">
                {slide.title}
              </p>
              <p className="font-mono text-xs text-white/70">
                {slide.subtitle}
              </p>
            </div>

            {/* dots */}
            <div className="absolute bottom-6 left-6 flex items-center gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    'h-1 rounded-full transition-all',
                    i === active ? 'w-6 bg-white' : 'w-3 bg-white/40',
                  )}
                />
              ))}
            </div>

            {/* arrows */}
            <div className="absolute bottom-5 right-5 flex gap-2">
              <CircleArrowButton
                direction="left"
                onClick={() => go(-1)}
                className="bg-black/40 backdrop-blur"
              />
              <CircleArrowButton
                direction="right"
                onClick={() => go(1)}
                className="bg-black/40 backdrop-blur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
