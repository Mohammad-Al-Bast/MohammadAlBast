import { CodeHeading } from '@/components/code-heading'
import { ArrowButton } from '@/components/primitives'
import { getLatestProjects } from '@/lib/projects'
import { ProjectRow } from './project-row'

export async function LatestProjects() {
  const projects = await getLatestProjects(3)
  if (projects.length === 0) return null

  return (
    <section id="portfolio" className="section-y">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <CodeHeading>Latest Projects</CodeHeading>
          <ArrowButton href="/projects" variant="outline" className="w-full sm:w-[340px]">
            View All
          </ArrowButton>
        </div>

        <div className="mt-10 flex flex-col gap-8 md:mt-12">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
