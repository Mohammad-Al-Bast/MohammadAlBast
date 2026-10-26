'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { projectCategories, projects } from './data'
import { ProjectRow } from './project-row'

const ALL = 'all'

export function ProjectsBrowser() {
  const tabs = [...projectCategories.map((c) => ({ value: c, label: c })), { value: ALL, label: 'View All' }]

  return (
    <Tabs defaultValue={ALL} className="mt-10 gap-8 md:mt-12">
      <TabsList className="rounded-xl bg-card p-1.5">
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value} className="h-9 rounded-lg px-4 data-[active]:bg-[#1f1f1f]">
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((t) => {
        const list = t.value === ALL ? projects : projects.filter((p) => p.category === t.value)
        return (
          <TabsContent key={t.value} value={t.value} className="flex flex-col gap-8">
            {list.length ? (
              list.map((p, i) => <ProjectRow key={p.slug} project={p} priority={i === 0} />)
            ) : (
              <p className="font-mono text-sm text-muted-foreground">No projects in this category yet.</p>
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
