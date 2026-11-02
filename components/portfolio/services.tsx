'use client'


import { CodeHeading } from '@/components/code-heading'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { services } from './data'
import { ContactArrowButton } from './contact-trigger'
import { ServiceVisual } from './service-visuals'

export function Services() {
  return (
    <section id="services" tabIndex={-1} className="section-y overflow-hidden bg-raised outline-none">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <CodeHeading>{services.title}</CodeHeading>
          <p className="max-w-[560px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {services.intro}
          </p>
        </div>

        <Carousel label={services.title} opts={{ align: 'start' }} className="mt-10 md:mt-12">
          <CarouselContent className="-ml-4 overflow-visible">
            {services.items.map((s) => (
              <CarouselItem key={s.number} className="basis-[92%] pl-4 md:basis-[66.5%]">
                <article className="focus-dark grid h-full grid-cols-[minmax(0,1fr)] gap-6 rounded-lg bg-paper p-6 text-paper-foreground md:min-h-[500px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:p-8">
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-center justify-between font-mono text-sm text-paper-foreground/70 md:contents">
                      <span className="flex items-center gap-2">
                        {s.number}
                        {s.bilingual && (
                          <span className="rounded-sm border border-paper-accent/40 px-1.5 py-0.5 text-[11px] text-paper-accent">
                            {services.bilingualLabel}
                          </span>
                        )}
                      </span>
                      <span className="md:hidden">{s.tag}</span>
                    </div>
                    <div className="my-auto pt-8 md:pt-0">
                      <h3 className="font-sans text-2xl leading-snug font-semibold text-paper-foreground">
                        {s.titleBefore}
                        <span className="text-paper-accent">{s.highlight}</span>
                        {s.titleAfter}
                      </h3>
                      <p className="mt-4 max-w-[420px] font-mono text-sm leading-relaxed md:text-base">
                        {s.description}
                      </p>
                      <ul className="mt-5 flex max-w-[420px] flex-col gap-1.5 font-mono text-xs text-paper-foreground/75 md:text-sm">
                        {s.builds.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span aria-hidden className="text-paper-accent">
                              +
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <ContactArrowButton projectType={s.contactType} className="mt-8">
                        {s.cta}
                      </ContactArrowButton>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="hidden self-end font-sans text-sm md:block">{s.tag}</span>
                    <div className="mt-auto flex items-center rounded-md bg-[#1a1a1a] p-3 md:mt-4 md:min-h-[360px] md:flex-1 md:p-4">
                      <ServiceVisual id={s.visual} />
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-between md:mt-12">
            <CarouselDots />
            <div className="flex gap-2">
              <CarouselPrevious className="size-12 bg-background md:size-16" />
              <CarouselNext className="size-12 bg-background md:size-16" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
