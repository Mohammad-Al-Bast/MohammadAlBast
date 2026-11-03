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

type Testimonial = (typeof testimonials.items)[number]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-lg bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-6 sm:flex-row md:gap-6 md:p-8">
      <Avatar className="size-16 shrink-0 md:size-24">
        {t.image ? <AvatarImage src={t.image} alt="" className="grayscale" /> : null}
        <AvatarFallback className="text-xl">{t.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <figcaption>
          <h3 className="text-xl text-heading md:text-2xl">{t.name}</h3>
          <p className="mt-1 font-mono text-sm leading-relaxed text-foreground/50">{t.role}</p>
        </figcaption>
        <blockquote className="mt-5 font-mono text-sm leading-relaxed text-foreground/90 md:text-base">
          <p>&ldquo;{t.quote}&rdquo;</p>
        </blockquote>
      </div>
    </figure>
  )
}

// Embla can only loop when there are slides left over beyond the view, so a short list is repeated
// (2 testimonials at 2 per screen would otherwise just sit still).
const MIN_LOOP_SLIDES = 6

export function Testimonials() {
  const items = testimonials.items
  if (items.length === 0) return null
  const copies = Math.max(1, Math.ceil(MIN_LOOP_SLIDES / items.length))
  const slides = Array.from({ length: copies }, (_, c) => items.map((t) => ({ t, copy: c }))).flat()

  return (
    <section className="section-y overflow-hidden bg-raised">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="text-[40px] leading-tight md:text-[56px]">{testimonials.title}</h2>
          <p className="max-w-[340px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {testimonials.intro}
          </p>
        </div>

        {items.length === 1 ? (
          // A single quote: one centred card, no slider controls.
          <div className="mx-auto mt-10 max-w-[880px] md:mt-12">
            <TestimonialCard t={items[0]} />
          </div>
        ) : (
          <Carousel
            label={testimonials.title}
            // infinite loop; one centred card with peeking neighbours on small screens, two full cards on desktop
            opts={{ align: 'center', loop: true, breakpoints: { '(min-width: 1024px)': { align: 'start' } } }}
            className="mt-10 md:mt-12"
          >
            {/* edge fade on small screens, where the neighbouring cards peek in; desktop shows two whole cards */}
            <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:[mask-image:none]">
              <CarouselContent className="-ml-2 lg:-ml-4">
                {slides.map(({ t, copy }) => (
                  // repeats exist only to make the loop work; hide them from screen readers
                  <CarouselItem
                    key={`${copy}-${t.name}`}
                    aria-hidden={copy > 0 || undefined}
                    className="basis-[88%] pl-2 sm:basis-[60%] lg:basis-1/2 lg:pl-4"
                  >
                    <TestimonialCard t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            <div className="mt-8 flex items-center justify-between md:mt-12">
              <CarouselDots count={items.length} />
              <div className="flex gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </Carousel>
        )}
      </div>
    </section>
  )
}
