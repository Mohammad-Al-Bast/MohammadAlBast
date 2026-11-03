import { CodeHeading } from '@/components/code-heading'
import { ArrowButton, ButtonLink } from '@/components/primitives'
import { notFoundPage } from './data'

/** Body of the 404 page; shared by the route-level not-found and the global one for unknown URLs. */
export function NotFoundContent() {
  return (
    <section className="section-y">
      <div className="container-page flex min-h-[50vh] flex-col items-start justify-center gap-6">
        <p className="font-mono text-sm text-primary uppercase">Error 404</p>
        <CodeHeading as="h1">{notFoundPage.title}</CodeHeading>
        <p className="max-w-[560px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
          {notFoundPage.body}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <ArrowButton href={notFoundPage.primary.href}>{notFoundPage.primary.label}</ArrowButton>
          <ButtonLink href={notFoundPage.secondary.href} className="min-w-[180px]">
            {notFoundPage.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
