import Image from 'next/image'

import { cn } from '@/lib/utils'

type Direction = 'up' | 'down'

const COLUMN_MIN_ITEMS = 4
const COPY_KEYS = ['first', 'second'] as const

const DIRECTION_CLASS: Record<Direction, string> = {
  up: 'animate-marquee-up',
  down: 'animate-marquee-down',
}

/** Each column loops two identical copies, so every copy has to be tall enough to fill the frame. */
function columnImages(images: string[], column: number): string[] {
  const own = images.filter((_, i) => i % 2 === column)
  const source = own.length > 0 ? own : images
  return Array.from({ length: Math.max(COLUMN_MIN_ITEMS, source.length) }, (_, i) => source[i % source.length])
}

function MarqueeColumn({ images, column, direction }: { images: string[]; column: number; direction: Direction }) {
  const items = columnImages(images, column)

  return (
    <div className={cn('flex flex-col will-change-transform group-hover:[animation-play-state:paused]', DIRECTION_CLASS[direction])}>
      {COPY_KEYS.map((copy) => (
        <div key={copy} className="flex flex-col gap-3 pb-3 md:gap-4 md:pb-4">
          {items.map((src, i) => (
            <div
              key={`${copy}-${src}-${i}`}
              className={cn('relative overflow-hidden rounded-lg', (i + column) % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]')}
            >
              <Image src={src} alt="" fill loading="eager" sizes="25vw" className="object-cover grayscale" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Decorative screenshot collage: the left column scrolls up and the right column scrolls down. */
export function ProjectHeroMarquee({ images }: { images: string[] }) {
  if (images.length === 0) return null

  return (
    <div aria-hidden className="group relative h-[420px] overflow-hidden md:h-[560px] lg:h-[700px]">
      <div className="grid grid-cols-2 items-start gap-3 md:gap-4">
        <MarqueeColumn images={images} column={0} direction="up" />
        <MarqueeColumn images={images} column={1} direction="down" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
