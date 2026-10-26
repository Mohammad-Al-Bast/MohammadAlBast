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
export function ProjectRow({ project, priority = false }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`
  return (
    <article className="grid gap-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Carousel opts={{ loop: true }} className="overflow-hidden rounded-lg bg-inset">
        <CarouselContent className="ml-0">
          {project.images.map((src, i) => (
            <CarouselItem key={src + i} className="pl-0">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[500px]">
                <Image
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  fill
                  priority={priority && i === 0}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-6 left-6" />
        <div className="absolute right-6 bottom-4 flex gap-2">
          <CarouselPrevious className="bg-white/20 hover:bg-white/30" />
          <CarouselNext className="bg-white/20 hover:bg-white/30" />
        </div>
      </Carousel>

      <div className="flex min-h-[300px] flex-col rounded-lg bg-card p-6 md:p-8">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="my-auto py-10">
          <h3 className="text-[28px] leading-tight md:text-[32px]">
            <Link href={href} className="hover:text-primary">
              {project.name}
            </Link>
          </h3>
          <p className="mt-3 font-mono text-sm text-foreground/80">{project.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <GithubLink href={project.codeUrl}>See Code</GithubLink>
          <ArrowLink href={href}>View Project</ArrowLink>
        </div>
      </div>
    </article>
  )
}
