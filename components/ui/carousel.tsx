'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  /** What the carousel shows; names the group and its controls for screen readers. */
  label: string
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  snapCount: number
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('useCarousel must be used within a <Carousel />')
  return context
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Carousel({
  label,
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [snapCount, setSnapCount] = React.useState(0)
  // stays empty until the slide changes, so nothing is announced on page load
  const [announcement, setAnnouncement] = React.useState('')

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
    setSnapCount(api.scrollSnapList().length)
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(prefersReducedMotion()), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(prefersReducedMotion()), [api])
  const scrollTo = React.useCallback((i: number) => api?.scrollTo(i, prefersReducedMotion()), [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (api && setApi) setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    const announce = (api: NonNullable<CarouselApi>) =>
      setAnnouncement(`${label}: slide ${api.selectedScrollSnap() + 1} of ${api.scrollSnapList().length}`)
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)
    api.on('select', announce)
    return () => {
      api.off('select', announce)
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api, label, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        label,
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        snapCount,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        data-slot="carousel"
        {...props}
      >
        {children}
        <p aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </p>
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()
  const count = React.Children.count(children)
  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      >
        {React.Children.map(children, (child, i) =>
          React.isValidElement<React.ComponentProps<'div'>>(child)
            ? React.cloneElement(child, { 'aria-label': `${i + 1} of ${count}` })
            : child,
        )}
      </div>
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

// aria-disabled rather than disabled: a disabled button drops keyboard focus on the last slide
const navButton =
  'flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80 aria-disabled:cursor-default aria-disabled:opacity-40'

function CarouselPrevious({ className, ...props }: React.ComponentProps<'button'>) {
  const { label, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      type="button"
      data-slot="carousel-previous"
      className={cn(navButton, className)}
      aria-disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only">Previous slide: {label}</span>
    </button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<'button'>) {
  const { label, scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      type="button"
      data-slot="carousel-next"
      className={cn(navButton, className)}
      aria-disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="size-4" />
      <span className="sr-only">Next slide: {label}</span>
    </button>
  )
}

/** Pill-style progress dots used throughout the Figma (active = long white bar). The button is the 24px hit area. */
function CarouselDots({ className }: { className?: string }) {
  const { label, selectedIndex, snapCount, scrollTo } = useCarousel()
  return (
    <div
      role="group"
      aria-label={`Choose a slide: ${label}`}
      className={cn('flex items-center', className)}
      data-slot="carousel-dots"
    >
      {Array.from({ length: snapCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1} of ${snapCount}`}
          aria-current={i === selectedIndex ? 'true' : undefined}
          onClick={() => scrollTo(i)}
          className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-full"
        >
          <span
            className={cn(
              'block h-[3px] rounded-full transition-[width,background-color] duration-300 forced-color-adjust-none forced-colors:bg-[ButtonText] motion-reduce:transition-none',
              i === selectedIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 group-hover/dot:bg-white/80',
            )}
          />
        </button>
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
}
