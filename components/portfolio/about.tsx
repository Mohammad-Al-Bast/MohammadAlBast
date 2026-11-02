import { CodeHeading } from '@/components/code-heading'
import { GithubLink } from '@/components/primitives'
import { ContactButton } from './contact-trigger'
import { Separator } from '@/components/ui/separator'
import { Download } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { about, contact, site } from './data'
import { SpotlightPortrait } from './spotlight-portrait'

export function About() {
  return (
    <section id="about" tabIndex={-1} className="section-y outline-none">
      <div className="container-page">
        <CodeHeading className="mx-auto max-w-[900px] text-center text-heading" close="/>">
          {about.title}
        </CodeHeading>

        <div className="mt-10 grid border-t border-border md:mt-14 lg:grid-cols-3">
          {/* Name + quote */}
          <div className="flex flex-col gap-6 py-8 lg:pr-8">
            <h3 className="text-[28px] leading-tight md:text-[32px]">{about.name}</h3>
            <div className="space-y-6 font-mono text-sm leading-relaxed text-foreground/90 md:text-base">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
              {about.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end gap-2 bg-background p-4">
                  <dt className="font-mono text-xs leading-snug text-foreground/60">{s.label}</dt>
                  <dd className="font-sans text-[32px] leading-none text-primary tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-col gap-4 pt-4">
              <p className="flex items-start gap-2.5 font-mono text-sm text-foreground/90">
                <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                {about.availability}
              </p>
              <GithubLink href={site.github}>Follow Me on GitHub</GithubLink>
            </div>
          </div>

          {/* Photo */}
          {/* stretches to the tallest column so all three end on the same line */}
          <div className="flex flex-col border-border py-8 lg:border-x lg:px-6">
            <SpotlightPortrait
              src={site.portrait}
              alt={site.name}
              className="aspect-square w-full lg:aspect-auto lg:min-h-[475px] lg:flex-1"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col py-8 lg:pl-8">
            <dl>
              {about.details.map((d, i) => (
                <div key={d.label} className={cn('py-3 font-mono text-sm leading-relaxed', i > 0 && 'border-t border-border')}>
                  <dt className="inline font-sans font-semibold text-foreground">{d.label}: </dt>
                  <dd className="inline text-foreground/85">{d.value}</dd>
                </div>
              ))}
            </dl>
            <Separator />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ContactButton variant="outline" className="w-full sm:w-[180px]">
                Contact Me
              </ContactButton>
              {site.cv && (
                <a href={site.cv} download className={cn(buttonVariants({ variant: 'outline-light' }), 'w-full sm:w-auto')}>
                  <Download aria-hidden /> {contact.cvLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
