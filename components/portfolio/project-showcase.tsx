import Image from 'next/image'

import { CodeShowcase } from './code-showcase'
import type { Project } from './data'

/** Large showcase card: real code when the project has a snippet, otherwise the cover screenshot. */
export function ProjectShowcase({ project }: { project: Project }) {
  const cover = project.images[0]

  return (
    <section className="container-page">
      <div className="rounded-lg bg-card p-4 md:p-6">
        {project.snippet ? (
          <CodeShowcase snippet={project.snippet} />
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-inset">
            {cover ? (
              <Image src={cover} alt={project.imageAlts?.[0] ?? `${project.name} showcase`} fill sizes="90vw" className="object-cover object-top" />
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
