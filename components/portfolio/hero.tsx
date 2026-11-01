import Image from 'next/image'

import { BrandGlyph } from '@/components/brand-glyph'
import { Terminal } from './hero-options/terminal'
import { ArrowButton } from '@/components/primitives'
import { getLatestProjects } from '@/lib/projects'
import { ContactButton } from './contact-trigger'
import { about, hero, site, techLogos } from './data'
import { SocialLinks } from './social-links'

const SOCIAL_LINK_CLASS =
  'flex size-11 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:border-primary hover:text-primary hover:opacity-100'

export function HeroIntro() {
  return (
    <div className="flex flex-col justify-between gap-12 rounded-lg bg-card px-5 py-10 md:min-h-[560px] md:px-12 md:py-14 lg:h-[770px] lg:py-16">
      <div className="flex flex-col items-start gap-6">
        <h1 className="max-w-[640px] text-[40px] leading-[1.1] text-balance md:text-[56px] lg:text-[60px]">
          {hero.titleStart}
          <span className="text-[#d6ffcc]">{hero.titleHighlight}</span>
          <span className="block">{hero.titleEnd.trim()}</span>
        </h1>
        <p className="max-w-[520px] font-mono text-sm leading-relaxed text-foreground/85 md:text-base">{hero.intro}</p>
        <div className="flex flex-wrap items-center gap-3">
          <ArrowButton href={hero.primaryCta.href}>{hero.primaryCta.label}</ArrowButton>
          <ContactButton variant="outline" className="min-w-[180px]">
            {hero.secondaryCta.label}
          </ContactButton>
        </div>
        <p className="-mt-2 max-w-[520px] font-mono text-xs text-foreground/60">{about.availability}</p>
        <SocialLinks className="gap-3" linkClassName={SOCIAL_LINK_CLASS} />
      </div>

      <div className="flex items-center gap-4">
        <span className="block size-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={site.portrait}
            alt={site.name}
            width={192}
            height={192}
            className="size-full scale-125 object-cover object-[50%_4%]"
          />
        </span>
        <div>
          <p className="font-sans text-base md:text-lg">{site.name}</p>
          <p className="font-mono text-xs text-foreground/70 md:text-sm">{site.location}</p>
        </div>
      </div>
    </div>
  )
}

export async function Hero() {
  const latest = await getLatestProjects(3)
  const terminalProjects = latest.map(({ slug, name, category }) => ({ slug, name, category }))

  return (
    <section className="container-page pt-4 pb-4 md:pt-10 md:pb-8">
      <div className="grid gap-2 lg:grid-cols-2">
        <HeroIntro />

        <Terminal projects={terminalProjects} />
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
