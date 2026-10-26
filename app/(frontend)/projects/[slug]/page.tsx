import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { CodeHeading } from '@/components/code-heading'
import { ArrowLink, GithubLink } from '@/components/primitives'
import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { ProjectHeroMarquee } from '@/components/portfolio/project-hero-marquee'
import { ProjectShowcase } from '@/components/portfolio/project-showcase'
import { getProject, getProjects } from '@/lib/projects'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  return project ? { title: project.name, description: project.description } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const quote = project.testimonial

  const rows = [
    { label: 'About', body: project.about },
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
              {project.liveUrl ? <ArrowLink href={project.liveUrl}>View Project</ArrowLink> : null}
              {project.codeUrl ? <GithubLink href={project.codeUrl}>See Code</GithubLink> : null}
            </div>
          </div>

          <ProjectHeroMarquee images={project.images} />
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

      <ProjectShowcase project={project} />

      {/* Testimonial */}
      {quote && (
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
      )}

      <ProjectGallery images={project.images} name={project.name} />
    </>
  )
}
