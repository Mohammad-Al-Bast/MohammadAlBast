import Image from 'next/image'
import { BrandGlyph } from '@/components/brand-glyph'
import { CodeHeading } from '@/components/code-heading'
import { ArrowLink, ArrowPillButton, Tag } from '@/components/primitives'
import { projects } from './data'

export function LatestProjects() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-10 flex items-center justify-between gap-4">
        <CodeHeading className="text-3xl md:text-4xl">
          Latest Projects
        </CodeHeading>
        <ArrowPillButton variant="outline" className="hidden sm:inline-flex">
          View all
        </ArrowPillButton>
      </div>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <article
            key={i}
            className="grid items-stretch gap-6 rounded-3xl border border-border bg-card/40 p-4 md:grid-cols-[1.4fr_1fr] md:p-5"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <h3 className="mt-6 font-sans text-2xl font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="mt-2 font-mono text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary"
                >
                  See code <BrandGlyph src="/logos/github.svg" label="GitHub" className="size-4" />
                </a>
                <ArrowLink>View Project</ArrowLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <ArrowPillButton variant="outline" className="w-full justify-center">
          View all
        </ArrowPillButton>
      </div>
    </section>
  )
}
