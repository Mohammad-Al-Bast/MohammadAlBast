import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { ImageOrientation } from './data'
import { MarqueeFrame } from './marquee-frame'

type Direction = 'up' | 'down'
type Shot = { src: string; orientation?: ImageOrientation }

const COLUMN_MIN_ITEMS = 4
const COPY_KEYS = ['first', 'second'] as const

const DIRECTION_CLASS: Record<Direction, string> = {
  up: 'animate-marquee-up',
  down: 'animate-marquee-down',
}

/** Each column loops two identical copies, so every copy has to be tall enough to fill the frame. */
function columnImages(shots: Shot[], column: number): Shot[] {
  const own = shots.filter((_, i) => i % 2 === column)
  const source = own.length > 0 ? own : shots
  return Array.from({ length: Math.max(COLUMN_MIN_ITEMS, source.length) }, (_, i) => source[i % source.length])
}

/**
 * Phone screenshots keep a phone shape (narrower and centred, so one does not fill the whole frame),
 * desktop screenshots stay wide. Images without a known size keep the old alternating collage.
 */
function frameClass(orientation: ImageOrientation | undefined, i: number, column: number): string {
  if (orientation === 'portrait') return 'mx-auto w-3/5 aspect-[9/19.5]'
  if (orientation === 'landscape') return 'aspect-[16/9]'
  return (i + column) % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]'
}

function MarqueeColumn({ shots, column, direction }: { shots: Shot[]; column: number; direction: Direction }) {
  const items = columnImages(shots, column)

  return (
    <div className={cn('flex flex-col will-change-transform group-hover:[animation-play-state:paused]', DIRECTION_CLASS[direction])}>
      {COPY_KEYS.map((copy) => (
        <div key={copy} className="flex flex-col gap-3 pb-3 md:gap-4 md:pb-4">
          {items.map(({ src, orientation }, i) => (
            <div
              key={`${copy}-${src}-${i}`}
              className={cn('relative overflow-hidden rounded-lg', frameClass(orientation, i, column))}
            >
              {/* Only the first copy is on screen at load; the looping copy can wait. Columns are half the frame width. */}
              <Image
                src={src}
                alt=""
                fill
                loading={copy === 'first' ? 'eager' : 'lazy'}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-top grayscale"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Decorative screenshot collage: the left column scrolls up and the right column scrolls down. */
export function ProjectHeroMarquee({
  images,
  orientations,
}: {
  images: string[]
  orientations?: ImageOrientation[]
}) {
  if (images.length === 0) return null
  const shots = images.map((src, i) => ({ src, orientation: orientations?.[i] }))

  return (
    <MarqueeFrame
      label="project screenshots"
      className="group h-[420px] overflow-hidden md:h-[560px] lg:h-[700px]"
      buttonClassName="right-3 bottom-3"
    >
      <div aria-hidden className="grid grid-cols-2 items-start gap-3 md:gap-4">
        <MarqueeColumn shots={shots} column={0} direction="up" />
        <MarqueeColumn shots={shots} column={1} direction="down" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </MarqueeFrame>
  )
}
