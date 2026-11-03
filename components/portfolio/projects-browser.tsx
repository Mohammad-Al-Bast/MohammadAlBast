'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowDown } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { projectCategories, projectsPage, type Project } from './data'
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

/**
 * One tab's list, revealed `pageSize` at a time. The tab panel unmounts when hidden, so switching
 * tabs starts the new list at the first page again. No ?page= URLs: every project is in the sitemap.
 */
function ProjectList({ projects }: { projects: Project[] }) {
  const { pageSize, showMore } = projectsPage
  const [visible, setVisible] = useState(pageSize)
  // index of the first row revealed by the last click; focus moves there so keyboard users keep their place
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const focusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusIndex !== null) focusRef.current?.focus()
  }, [focusIndex])

  if (!projects.length) {
    return <p className="font-mono text-sm text-muted-foreground">No projects in this category yet.</p>
  }

  const shown = projects.slice(0, visible)
  const remaining = projects.length - shown.length

  return (
    <>
      {shown.map((p, i) => (
        <div
          key={p.slug}
          ref={i === focusIndex ? focusRef : undefined}
          tabIndex={i === focusIndex ? -1 : undefined}
          className="scroll-mt-24 outline-none"
        >
          <ProjectRow project={p} priority={i === 0} headingAs="h2" />
        </div>
      ))}

      {projects.length > pageSize && (
        <div className="mt-2 flex flex-col items-center gap-4">
          <p aria-live="polite" className="font-mono text-sm text-muted-foreground">
            Showing {shown.length} of {projects.length}
          </p>
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => {
                setFocusIndex(visible)
                setVisible((v) => v + pageSize)
              }}
              className={cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-4 pr-1 pl-5')}
            >
              <span>{showMore}</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover/button:translate-y-0.5">
                <ArrowDown className="size-4" aria-hidden />
              </span>
            </button>
          )}
        </div>
      )}
    </>
  )
}

function ProjectTabs({
  projects,
  value,
  onValueChange,
}: {
  projects: Project[]
  value: string
  onValueChange?: (value: string) => void
}) {
  const tabs = [{ value: ALL, label: 'All' }, ...projectCategories.map((c) => ({ value: c as string, label: c as string }))]

  return (
    <Tabs value={value} onValueChange={(v) => onValueChange?.(String(v))} className="mt-10 gap-8 md:mt-12">
      <TabsList aria-label="Project categories" className="rounded-xl bg-card p-1.5">
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
            <ProjectList projects={list} />
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [value, setValue] = useCategoryParam()
  return <ProjectTabs projects={projects} value={value} onValueChange={setValue} />
}

/**
 * Server-rendered "All" view, used as the Suspense fallback. Reading the URL makes Next skip the browser
 * during prerendering, so without this the static HTML (what crawlers and no-JS visitors get) had no projects.
 */
export function ProjectsBrowserFallback({ projects }: { projects: Project[] }) {
  return <ProjectTabs projects={projects} value={ALL} />
}
