'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ArrowLink, GithubLink } from '@/components/primitives'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project } from './data'

/** Image slider card + info card, side by side (stacked on mobile). */
export function ProjectRow({
  project,
  priority = false,
  headingAs: Heading = 'h3',
}: {
  project: Project
  priority?: boolean
  /** h2 where the row sits directly under the page's h1 */
  headingAs?: 'h2' | 'h3'
}) {
  const href = `/projects/${project.slug}`
  return (
    <article className="grid gap-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Carousel label={`${project.name} screenshots`} opts={{ loop: true }} className="overflow-hidden rounded-lg bg-inset">
        <CarouselContent className="ml-0">
          {project.images.map((src, i) => (
            <CarouselItem key={src + i} className="pl-0">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[500px]">
                <Image
                  src={src}
                  alt={project.imageAlts?.[i] ?? `${project.name} screenshot ${i + 1}`}
                  fill
                  priority={priority && i === 0}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-x-6 bottom-4 flex items-center justify-between">
          <CarouselDots className="rounded-full bg-background px-1.5" />
          <div className="flex gap-2">
            <CarouselPrevious className="bg-background text-foreground hover:bg-card" />
            <CarouselNext className="bg-background text-foreground hover:bg-card" />
          </div>
        </div>
      </Carousel>

      <div className="flex min-h-[300px] flex-col rounded-lg bg-card p-6 md:p-8">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="my-auto py-10">
          <Heading className="text-[28px] leading-tight md:text-[32px]">
            <Link href={href} className="hover:text-primary">
              {project.name}
            </Link>
          </Heading>
          <p className="mt-3 font-mono text-sm text-foreground/80">{project.description}</p>
        </div>
        <div className="flex items-center justify-between">
          {project.codeUrl ? (
            <GithubLink href={project.codeUrl} label={`See Code: ${project.name}`}>
              See Code
            </GithubLink>
          ) : (
            <span />
          )}
          <ArrowLink href={href} label={`View Project: ${project.name}`}>
            View Project
          </ArrowLink>
        </div>
      </div>
    </article>
  )
}
