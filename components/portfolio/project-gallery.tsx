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

export function ProjectGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <section className="pb-16 md:pb-20">
      <div className="container-page">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className="-ml-2">
            {images.map((src, i) => (
              <CarouselItem key={src + i} className="basis-[88%] pl-2 md:basis-[60%]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-card">
                  <Image src={src} alt={`${name} gallery image ${i + 1}`} fill sizes="60vw" className="object-cover" />
                </div>
              </CarouselItem>
            ))}
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
