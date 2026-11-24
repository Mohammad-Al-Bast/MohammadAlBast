'use client'

import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import type { ImageOrientation } from './data'

/*
 * Every slide is the same height. Desktop shots are 16:9 at 88% / 60% of the row;
 * phone shots are 9:19.5, so the same height needs 88% × (9/16) × (9/19.5) ≈ 22.8%
 * and 60% × (9/16) × (9/19.5) ≈ 15.6% of the row.
 */
const SLIDE: Record<ImageOrientation, { item: string; frame: string; sizes: string }> = {
  landscape: { item: 'basis-[88%] md:basis-[60%]', frame: 'aspect-[16/9]', sizes: '(min-width: 768px) 60vw, 88vw' },
  portrait: { item: 'basis-[22.8%] md:basis-[15.6%]', frame: 'aspect-[9/19.5]', sizes: '(min-width: 768px) 16vw, 23vw' },
}

export function ProjectGallery({
  images,
  name,
  alts,
  orientations,
}: {
  images: string[]
  name: string
  alts?: string[]
  orientations?: ImageOrientation[]
}) {
  return (
    <section className="pb-16 md:pb-20">
      <div className="container-page">
        <Carousel label={`${name} gallery`} opts={{ align: 'start' }}>
          <CarouselContent className="-ml-2">
            {images.map((src, i) => {
              const slide = SLIDE[orientations?.[i] ?? 'landscape']
              return (
                <CarouselItem key={src + i} className={cn('pl-2', slide.item)}>
                  <div className={cn('relative overflow-hidden rounded-lg bg-card', slide.frame)}>
                    <Image
                      src={src}
                      alt={alts?.[i] || `${name} gallery image ${i + 1}`}
                      fill
                      sizes={slide.sizes}
                      className="object-cover object-top"
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-between">
            <CarouselDots />
            <div className="flex gap-2">
              <CarouselPrevious className="bg-black" />
              <CarouselNext className="bg-black" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
