import type { ReactNode } from 'react'
import { Check, Search } from 'lucide-react'

import { cn } from '@/lib/utils'

export type VisualId = 'cms' | 'code' | 'lighthouse' | 'catalog'

/** Dark app-window frame shared by every visual. */
function Window({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-md border border-white/10 bg-[#111] font-mono text-[11px] text-foreground/80 md:text-xs',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-primary/80" />
        <span className="ml-2 truncate text-foreground/50">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function CmsVisual() {
  const collections = [
    ['Products', 'active'],
    ['Brands', ''],
    ['Categories', ''],
    ['Blog Posts', ''],
    ['FAQs', ''],
  ] as const
  const rows = [
    ['Brake Pad Set', 'Braking', 'Published'],
    ['Oil Filter', 'Filters', 'Published'],
    ['Spark Plug', 'Ignition', 'Draft'],
    ['Wiper Blade', 'Visibility', 'Published'],
    ['Air Filter', 'Filters', 'Published'],
    ['Timing Belt', 'Engine', 'Draft'],
  ]
  return (
    <Window title="Webflow · CMS Collections">
      <div className="grid grid-cols-[38%_1fr]">
        <ul className="border-r border-white/10 p-2">
          {collections.map(([name, state]) => (
            <li
              key={name}
              className={cn(
                'rounded px-2 py-1.5',
                state ? 'bg-primary/10 text-primary' : 'text-foreground/55',
              )}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="p-2">
          <div className="grid grid-cols-[1.4fr_1fr_auto] gap-2 px-2 pb-2 text-foreground/40">
            <span>Name</span>
            <span>Category</span>
            <span>Status</span>
          </div>
          {rows.map(([name, cat, status]) => (
            <div
              key={name}
              className="grid grid-cols-[1.4fr_1fr_auto] items-center gap-2 border-t border-white/5 px-2 py-2"
            >
              <span className="truncate text-foreground/90">{name}</span>
              <span className="truncate text-foreground/55">{cat}</span>
              <span
                className={cn(
                  'rounded-sm px-1.5 py-0.5 text-[10px]',
                  status === 'Published' ? 'bg-primary/15 text-primary' : 'bg-white/10 text-foreground/60',
                )}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* Syntax colours: keyword = mint, type = pale mint, string = warm, decorator = muted */
const K = ({ children }: { children: ReactNode }) => <span className="text-primary">{children}</span>
const T = ({ children }: { children: ReactNode }) => <span className="text-[#cfeeff]">{children}</span>
const S = ({ children }: { children: ReactNode }) => <span className="text-[#f2d58a]">{children}</span>
const D = ({ children }: { children: ReactNode }) => <span className="text-foreground/50">{children}</span>

function CodeVisual() {
  const lines: ReactNode[] = [
    <>
      <D>@Controller</D>(<S>&apos;courses&apos;</S>)
    </>,
    <>
      <D>@UseGuards</D>(<T>JwtAuthGuard</T>, <T>RolesGuard</T>)
    </>,
    <>
      <K>export class</K> <T>CoursesController</T> {'{'}
    </>,
    <>
      {'  '}
      <K>constructor</K>(<K>private readonly</K> courses: <T>CoursesService</T>) {'{}'}
    </>,
    <>&nbsp;</>,
    <>
      {'  '}
      <D>@Get</D>()
    </>,
    <>
      {'  '}
      <D>@Roles</D>(<T>Role</T>.Admin, <T>Role</T>.Instructor)
    </>,
    <>
      {'  '}findAll(<D>@Query</D>() q: <T>PaginationDto</T>): <T>Promise</T>&lt;<T>Page</T>&lt;<T>Course</T>&gt;&gt; {'{'}
    </>,
    <>
      {'    '}
      <K>return this</K>.courses.findAll(q)
    </>,
    <>{'  }'}</>,
    <>{'}'}</>,
  ]
  return (
    <Window title="courses.controller.ts">
      <ol className="overflow-hidden py-3 leading-[1.9]">
        {lines.map((line, i) => (
          <li key={i} className="flex whitespace-pre">
            <span className="w-9 shrink-0 pr-3 text-right text-foreground/25 select-none">{i + 1}</span>
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ol>
    </Window>
  )
}

function Ring({ label }: { label: string }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-16 md:size-[72px]">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-primary/15" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={c}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-sans text-lg text-primary tabular-nums">
          100
        </span>
      </div>
      <span className="text-[10px] leading-tight text-foreground/60 md:text-[11px]">{label}</span>
    </div>
  )
}

function LighthouseVisual() {
  return (
    <Window title="Lighthouse · landing page">
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="grid grid-cols-4 gap-2">
          {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map((l) => (
            <Ring key={l} label={l} />
          ))}
        </div>
        <ul className="space-y-2 border-t border-white/10 pt-4">
          {[
            ['Largest Contentful Paint', '0.9 s'],
            ['Total Blocking Time', '0 ms'],
            ['Cumulative Layout Shift', '0'],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 truncate">
                <Check className="size-3 shrink-0 text-primary" aria-hidden />
                {k}
              </span>
              <span className="text-foreground/90 tabular-nums">{v}</span>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-foreground/40">The target on every launch</p>
      </div>
    </Window>
  )
}

function CatalogVisual() {
  const filters = [
    ['Braking', true],
    ['Filters', true],
    ['Engine', false],
    ['Suspension', false],
  ] as const
  const items = ['Brake Disc', 'Oil Filter', 'Brake Pads', 'Air Filter', 'Fuel Filter', 'Brake Caliper']
  return (
    <Window title="catalog / products">
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center gap-2 rounded border border-white/10 px-2.5 py-2 text-foreground/45">
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">Search 100k+ products…</span>
        </div>
        <div className="grid grid-cols-[34%_1fr] gap-3">
          <div className="space-y-2">
            <p className="text-foreground/40">Category</p>
            {filters.map(([name, on]) => (
              <p key={name} className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex size-3 shrink-0 items-center justify-center rounded-[3px] border',
                    on ? 'border-primary bg-primary text-black' : 'border-white/25',
                  )}
                >
                  {on && <Check className="size-2.5" strokeWidth={3} aria-hidden />}
                </span>
                <span className="truncate">{name}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-foreground/40 tabular-nums">Showing 24 of 18,406</p>
            <div className="grid grid-cols-2 gap-2">
              {items.map((name) => (
                <div key={name} className="flex flex-col gap-1.5 rounded border border-white/10 p-2">
                  <div className="h-6 rounded-sm bg-white/[0.06] md:h-8" />
                  <span className="truncate text-foreground/85">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

const VISUALS: Record<VisualId, () => ReactNode> = {
  cms: CmsVisual,
  code: CodeVisual,
  lighthouse: LighthouseVisual,
  catalog: CatalogVisual,
}

/** Decorative, coded illustration for a service; hidden from assistive tech. */
export function ServiceVisual({ id, className }: { id: VisualId; className?: string }) {
  const Visual = VISUALS[id]
  return (
    <div aria-hidden className={cn('w-full select-none', className)}>
      <Visual />
    </div>
  )
}
