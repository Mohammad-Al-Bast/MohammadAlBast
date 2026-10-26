import type { Metadata } from 'next'

import { CodeHeading } from '@/components/code-heading'
import { ProjectsBrowser } from '@/components/portfolio/projects-browser'
import { projectsPage } from '@/components/portfolio/data'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
  return (
    <section className="section-y pt-10 md:pt-16">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <CodeHeading as="h1" close=">">
            {projectsPage.title}
          </CodeHeading>
          <p className="max-w-[420px] font-mono text-base leading-relaxed text-foreground/80">
            {projectsPage.intro}
          </p>
        </div>
        <ProjectsBrowser />
      </div>
    </section>
  )
}
