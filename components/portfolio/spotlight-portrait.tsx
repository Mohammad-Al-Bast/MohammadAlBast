'use client'

import Image from 'next/image'
import { type CSSProperties, type PointerEvent, useRef } from 'react'

import { cn } from '@/lib/utils'

const SPOTLIGHT_RADIUS = 130
const SPOTLIGHT_EDGE = 14

const IMAGE_SIZES = '(min-width: 1024px) 30vw, 100vw'
const IMAGE_CLASS = 'object-cover object-top'

const spotlightMask = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at var(--spot-x, -999px) var(--spot-y, -999px), #000 ${SPOTLIGHT_RADIUS - SPOTLIGHT_EDGE}px, transparent ${SPOTLIGHT_RADIUS}px)`

const colorLayerStyle: CSSProperties = { maskImage: spotlightMask, WebkitMaskImage: spotlightMask }

interface SpotlightPortraitProps {
  src: string
  alt: string
  className?: string
}

/** Grayscale portrait that shows its original colors inside a circle centered on the cursor. */
export function SpotlightPortrait({ src, alt, className }: SpotlightPortraitProps) {
  const colorLayer = useRef<HTMLDivElement>(null)

  const moveSpotlight = (e: PointerEvent<HTMLDivElement>) => {
    const layer = colorLayer.current
    if (!layer) return
    const rect = e.currentTarget.getBoundingClientRect()
    layer.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    layer.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    layer.style.opacity = '1'
  }

  const hideSpotlight = () => {
    if (colorLayer.current) colorLayer.current.style.opacity = '0'
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onPointerDown={moveSpotlight}
      onPointerMove={moveSpotlight}
      onPointerLeave={hideSpotlight}
      onPointerCancel={hideSpotlight}
    >
      <Image src={src} alt={alt} fill sizes={IMAGE_SIZES} className={cn(IMAGE_CLASS, 'grayscale')} />
      <div
        ref={colorLayer}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
        style={colorLayerStyle}
      >
        <Image src={src} alt="" fill sizes={IMAGE_SIZES} className={IMAGE_CLASS} />
      </div>
    </div>
  )
}
