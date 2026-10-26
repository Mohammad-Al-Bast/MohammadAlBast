'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { projectCategories, type Project } from './data'
import { ProjectRow } from './project-row'

const ALL = 'all'
const PARAM = 'category'

/** The selected category lives in the URL (?category=react) so filtered views can be shared. */
function useCategoryParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const raw = searchParams.get(PARAM)
  const match = projectCategories.find((c) => c.toLowerCase() === raw?.toLowerCase())
  const value: string = match ?? ALL

  const setValue = (next: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next === ALL) params.delete(PARAM)
    else params.set(PARAM, next.toLowerCase())
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return [value, setValue] as const
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [value, setValue] = useCategoryParam()
  const tabs = [...projectCategories.map((c) => ({ value: c as string, label: c as string })), { value: ALL, label: 'View All' }]

  return (
    <Tabs value={value} onValueChange={(v) => setValue(String(v))} className="mt-10 gap-8 md:mt-12">
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
