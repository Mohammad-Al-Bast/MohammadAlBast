import Image from 'next/image'

import { BrandGlyph } from '@/components/brand-glyph'
import { ArrowButton, ButtonLink } from '@/components/primitives'
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { hero, heroSlides, site, techLogos } from './data'

export function Hero() {
  return (
    <section className="container-page pt-4 pb-4 md:pt-10 md:pb-8">
      <div className="grid gap-2 lg:grid-cols-2">
        {/* Intro card */}
        <div className="flex min-h-[560px] flex-col items-center justify-between gap-12 rounded-lg bg-card px-6 py-14 text-center md:px-12 lg:h-[770px] lg:py-24">
          <h1 className="max-w-[560px] text-[44px] leading-[1.15] md:text-[72px]">
            {hero.titleStart}
            <span className="text-[#d6ffcc]">{hero.titleHighlight}</span>
            {hero.titleEnd}
          </h1>

          <div className="flex flex-col items-center">
            <Image
              src={site.portrait}
              alt={site.name}
              width={64}
              height={64}
              className="size-16 rounded-full object-cover grayscale"
            />
            <p className="mt-4 font-sans text-base uppercase md:text-lg">{hero.greeting}</p>
            <p className="mt-4 max-w-[480px] font-mono text-sm leading-relaxed text-foreground/85 md:text-base">
              {hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ArrowButton href={hero.primaryCta.href}>{hero.primaryCta.label}</ArrowButton>
              <ButtonLink href={hero.secondaryCta.href} variant="outline" className="min-w-[180px]">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Project slider */}
        <Carousel opts={{ loop: true }} className="overflow-hidden rounded-lg bg-inset">
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, i) => (
              <CarouselItem key={slide.image} className="pl-0">
                <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-[770px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-28 px-6 text-center md:bottom-32">
                    <p className="font-sans text-base text-white">{slide.title}</p>
                    <p className="mt-1 font-mono text-sm text-white/75 md:text-base">{slide.subtitle}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="absolute bottom-10 left-6 md:left-8" />
          <div className="absolute right-6 bottom-6 flex gap-2 md:right-8">
            <CarouselPrevious className="size-12 md:size-16" />
            <CarouselNext className="size-12 md:size-16" />
          </div>
        </Carousel>
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
      <div className="flex w-max animate-marquee">
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
