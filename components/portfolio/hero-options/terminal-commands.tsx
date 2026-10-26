import Link from 'next/link'
import type { ReactNode } from 'react'

import { hero } from '@/components/portfolio/data'

export type TerminalProject = { slug: string; name: string; category: string }

const LABEL_WIDTH = 14
const linkClass = 'text-primary underline underline-offset-4'

function localTime(): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: hero.status.timeZone }).format(
    new Date(),
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span className="text-primary">{label.padEnd(LABEL_WIDTH)}</span>
      {children}
      {'\n'}
    </>
  )
}

export function statusOutput(): ReactNode {
  return (
    <>
      <Row label="availability">{hero.status.availability}</Row>
      <Row label="local time">
        {localTime()} in {hero.status.place}
      </Row>
      <Row label="replies">{hero.status.replyTime}</Row>
    </>
  )
}

export function nowOutput(): ReactNode {
  return hero.now.map((line) => (
    <span key={line}>
      <span className="text-foreground/50">-</span> {line}
      {'\n'}
    </span>
  ))
}

export function logOutput(projects: TerminalProject[]): ReactNode {
  if (projects.length === 0) return <>No projects published yet.</>

  return projects.map((p) => (
    <span key={p.slug}>
      <span className="text-foreground/50">*</span>{' '}
      <Link href={`/projects/${p.slug}`} className={linkClass}>
        {p.name}
      </Link>{' '}
      <span className="text-foreground/50">{p.category}</span>
      {'\n'}
    </span>
  ))
}
