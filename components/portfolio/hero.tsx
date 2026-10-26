import Image from 'next/image'

import { BrandGlyph } from '@/components/brand-glyph'
import { Terminal } from './hero-options/terminal'
import { ArrowButton } from '@/components/primitives'
import { ContactButton } from './contact-trigger'
import { hero, site, techLogos } from './data'

export function HeroIntro() {
  return (
    <div className="flex flex-col items-center justify-between gap-10 rounded-lg bg-card px-5 py-10 text-center md:min-h-[560px] md:gap-12 md:px-12 md:py-14 lg:h-[770px] lg:py-24">
      <h1 className="max-w-[560px] text-[44px] leading-[1.15] text-balance md:text-[72px]">
        {hero.titleStart}
        <span className="text-[#d6ffcc]">{hero.titleHighlight}</span>
        {hero.titleEnd}
      </h1>

      <div className="flex flex-col items-center">
        <span className="block size-16 overflow-hidden rounded-full">
          <Image
            src={site.portrait}
            alt={site.name}
            width={192}
            height={192}
            className="size-full scale-125 object-cover object-[50%_4%] grayscale"
          />
        </span>
        <p className="mt-4 font-sans text-base uppercase md:text-lg">{hero.greeting}</p>
        <p className="mt-4 max-w-[480px] font-mono text-sm leading-relaxed text-foreground/85 md:text-base">
          {hero.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ArrowButton href={hero.primaryCta.href}>{hero.primaryCta.label}</ArrowButton>
          <ContactButton variant="outline" className="min-w-[180px]">
            {hero.secondaryCta.label}
          </ContactButton>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="container-page pt-4 pb-4 md:pt-10 md:pb-8">
      <div className="grid gap-2 lg:grid-cols-2">
        <HeroIntro />

        <Terminal />
      </div>
    </section>
  )
}

export function LogoStrip() {
  const row = [...techLogos, ...techLogos, ...techLogos]
  return (
    <div className="relative overflow-hidden py-10" aria-label="Technologies">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-24 pr-24">
            {row.map((logo, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground/45">
                <BrandGlyph src={logo.src} label={logo.name} className="size-7" />
                <span className="font-sans text-xl">{logo.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
