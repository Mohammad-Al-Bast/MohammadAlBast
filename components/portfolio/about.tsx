import Image from 'next/image'

import { CodeHeading } from '@/components/code-heading'
import { ButtonLink, GithubLink } from '@/components/primitives'
import { Separator } from '@/components/ui/separator'
import { about, site } from './data'

export function About() {
  return (
    <section id="about" className="section-y">
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
            <GithubLink href={site.github} className="mt-auto pt-4">
              Follow me on Github
            </GithubLink>
          </div>

          {/* Photo */}
          <div className="border-border py-8 lg:border-x lg:px-6">
            <div className="relative aspect-square w-full overflow-hidden lg:aspect-[410/475]">
              <Image src={site.portrait} alt={site.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover grayscale" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col py-8 lg:pl-8">
            <dl>
              {about.details.map((d, i) => (
                <div key={d.label}>
                  {i > 0 && <Separator />}
                  <div className="py-3 font-mono text-sm leading-relaxed">
                    <dt className="inline font-sans font-semibold text-foreground">{d.label}: </dt>
                    <dd className="inline text-foreground/85">{d.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Separator />
            <ButtonLink href="#contact" variant="outline" className="mt-6 w-full sm:w-[180px]">
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
