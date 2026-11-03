import { Suspense } from 'react'

import { CodeHeading } from '@/components/code-heading'
import { JsonLd } from '@/components/json-ld'
import { ProjectsBrowser, ProjectsBrowserFallback } from '@/components/portfolio/projects-browser'
import { projectsPage, seo } from '@/components/portfolio/data'
import { getProjects } from '@/lib/projects'
import { pageMetadata } from '@/lib/seo'
import { projectsStructuredData } from '@/lib/structured-data'

// The canonical URL drops ?category=, so filtered views don't compete with the full list in search.
export const metadata = pageMetadata({ title: seo.projectsTitle, description: seo.projectsDescription, path: '/projects' })

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="section-y pt-10 md:pt-16">
      <JsonLd data={projectsStructuredData(projects)} />
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <CodeHeading as="h1" close=">">
            {projectsPage.title}
          </CodeHeading>
          <p className="max-w-[420px] font-mono text-base leading-relaxed text-foreground/80">
            {projectsPage.intro}
          </p>
        </div>
        <Suspense fallback={<ProjectsBrowserFallback projects={projects} />}>
          <ProjectsBrowser projects={projects} />
        </Suspense>
      </div>
    </section>
  )
}
