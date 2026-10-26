'use client'


import { CodeHeading } from '@/components/code-heading'
import { ArrowButton } from '@/components/primitives'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { services } from './data'
import { ServiceVisual } from './service-visuals'

export function Services() {
  return (
    <section id="services" className="section-y overflow-hidden bg-raised">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <CodeHeading>{services.title}</CodeHeading>
          <p className="max-w-[560px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {services.intro}
          </p>
        </div>

        <Carousel opts={{ align: 'start' }} className="mt-10 md:mt-12">
          <CarouselContent className="-ml-4 overflow-visible">
            {services.items.map((s) => (
              <CarouselItem key={s.number} className="basis-[92%] pl-4 md:basis-[66.5%]">
                <article className="grid h-full gap-6 rounded-lg bg-paper p-6 text-paper-foreground md:min-h-[500px] md:grid-cols-[1fr_1fr] md:gap-8 md:p-8">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between font-mono text-sm text-paper-foreground/70 md:contents">
                      <span>{s.number}</span>
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
                      <ArrowButton href="#contact" className="mt-8">
                        {s.cta}
                      </ArrowButton>
                    </div>
                  </div>
                  <div className="flex flex-col">
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
