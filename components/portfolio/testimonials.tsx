'use client'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { testimonials } from './data'

export function Testimonials() {
  return (
    <section className="section-y overflow-hidden bg-raised">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="text-[40px] leading-tight md:text-[56px]">{testimonials.title}</h2>
          <p className="max-w-[340px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {testimonials.intro}
          </p>
        </div>

        <Carousel opts={{ align: 'center', loop: true, startIndex: 1 }} className="mt-10 md:mt-12">
          {/* edge fade like the Figma: outer cards dissolve into the section */}
          <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <CarouselContent className="-ml-2">
              {testimonials.items.map((t) => (
                <CarouselItem key={t.name} className="basis-[88%] pl-2 sm:basis-[60%] lg:basis-[38%]">
                  <article className="flex h-full flex-col gap-4 rounded-lg sm:flex-row bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-6 md:gap-6 md:p-8">
                    <Avatar className="size-16 md:size-24">
                      {t.image ? <AvatarImage src={t.image} alt={t.name} className="grayscale" /> : null}
                      <AvatarFallback className="text-xl">{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="text-xl text-heading md:text-2xl">{t.name}</h3>
                      <p className="mt-1 font-mono text-sm text-foreground/50">{t.handle}</p>
                      <p className="mt-5 font-mono text-sm leading-relaxed text-foreground/90 md:text-base">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

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
