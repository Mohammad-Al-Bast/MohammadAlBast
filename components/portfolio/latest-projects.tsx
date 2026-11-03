import { CodeHeading } from '@/components/code-heading'
import { ArrowButton } from '@/components/primitives'
import { getLatestProjects } from '@/lib/projects'
import { latestProjects } from './data'
import { ProjectCard } from './project-card'
import { ProjectRow } from './project-row'

export async function LatestProjects() {
  const projects = await getLatestProjects(3)
  if (projects.length === 0) return null
  const [lead, ...rest] = projects

  return (
    <section id="portfolio" tabIndex={-1} className="section-y outline-none">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <CodeHeading>{latestProjects.title}</CodeHeading>
          <ArrowButton href="/projects" variant="outline" className="w-full sm:w-[340px]">
            {latestProjects.cta}
          </ArrowButton>
        </div>

        <div className="mt-10 flex flex-col gap-8 md:mt-12">
          <ProjectRow project={lead} priority />
          {rest.length > 0 && (
            <div className="grid gap-2 lg:grid-cols-2">
              {rest.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
