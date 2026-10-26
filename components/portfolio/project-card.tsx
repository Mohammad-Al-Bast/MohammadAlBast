import Image from 'next/image'
import Link from 'next/link'

import { ArrowLink, GithubLink } from '@/components/primitives'
import { Badge } from '@/components/ui/badge'
import type { Project } from './data'

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`
  const cover = project.images[0]

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-card">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[16/9] bg-inset">
        {cover && (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div>
          <h3 className="text-2xl leading-tight">
            <Link href={href} className="hover:text-primary">
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 font-mono text-sm text-foreground/80">{project.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          {project.codeUrl ? <GithubLink href={project.codeUrl}>See Code</GithubLink> : <span />}
          <ArrowLink href={href}>View Project</ArrowLink>
        </div>
      </div>
    </article>
  )
}
