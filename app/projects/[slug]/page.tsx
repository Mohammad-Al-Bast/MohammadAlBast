import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { CodeHeading } from '@/components/code-heading'
import { ArrowLink, GithubLink } from '@/components/primitives'
import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { projects, testimonials } from '@/components/portfolio/data'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  return project ? { title: project.name, description: project.description } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  // falls back to the featured site testimonial until projects have their own
  const quote = project.testimonial ?? testimonials.items[1]
  const masonry = [...project.images, ...project.images].slice(0, 6)

  const rows = [
    { label: 'About Project/ About Client', body: project.about },
    { label: 'Challenges', body: project.challenges },
    { label: 'Solutions', body: project.solutions },
  ]

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col py-4 lg:min-h-[640px] lg:py-6">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <CodeHeading as="h1" className="mt-6 text-[48px] md:text-[64px]">
              {project.name}
            </CodeHeading>
            <p className="mt-4 max-w-[480px] font-mono text-base text-foreground/80">{project.description}</p>
            <div className="mt-10 flex items-center justify-between gap-6 lg:mt-auto">
              <ArrowLink href={project.liveUrl}>View Project</ArrowLink>
              <GithubLink href={project.codeUrl}>See code</GithubLink>
            </div>
          </div>

          <div className="relative h-[420px] overflow-hidden md:h-[560px] lg:h-[700px]">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[0, 1].map((col) => (
                <div key={col} className={col === 1 ? '-mt-10 flex flex-col gap-3 md:gap-4' : 'flex flex-col gap-3 md:gap-4'}>
                  {masonry
                    .filter((_, i) => i % 2 === col)
                    .map((src, i) => (
                      <div
                        key={src + i}
                        className={`relative overflow-hidden rounded-lg ${(i + col) % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]'}`}
                      >
                        <Image src={src} alt="" fill sizes="25vw" className="object-cover grayscale" />
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* Case study rows */}
      <section className="section-y">
        <div className="container-page">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8 md:py-10">
                <h2 className="text-2xl leading-tight text-heading">{r.label}</h2>
                <p className="max-w-[760px] font-mono text-sm leading-relaxed text-foreground/85 md:text-base">{r.body}</p>
              </div>
              <Separator />
            </div>
          ))}
          <div className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8 md:py-10">
            <h2 className="text-2xl leading-tight text-heading">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} size="lg">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase card */}
      <section className="container-page">
        <div className="rounded-lg bg-card p-4 md:p-6">
          <div className="grid items-center gap-2 pb-4 md:grid-cols-3 md:pb-6">
            <CodeHeading as="h2" className="text-[32px] md:text-[40px]">
              Text
            </CodeHeading>
            <p className="font-mono text-sm text-foreground/70 md:text-center">Description</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-inset">
            <Image src={project.images[0]} alt={`${project.name} showcase`} fill sizes="90vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto grid max-w-[1000px] items-center gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
            <p aria-hidden className="font-sans text-[96px] leading-none text-primary md:col-span-2 md:text-center">
              &ldquo;
            </p>
            <div className="relative aspect-square w-full max-w-[320px] overflow-hidden bg-card">
              {quote.image ? <Image src={quote.image} alt={quote.name} fill sizes="320px" className="object-cover grayscale" /> : null}
            </div>
            <figure>
              <blockquote className="font-mono text-lg leading-relaxed text-foreground md:text-2xl">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-2 font-mono text-sm">
                <span className="font-sans font-semibold">{quote.name}</span>
                <span className="text-foreground/50">{quote.handle}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ProjectGallery images={project.images} name={project.name} />
    </>
  )
}
