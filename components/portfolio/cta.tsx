import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
      <div className="grid items-stretch overflow-hidden rounded-3xl md:grid-cols-[1.1fr_1fr]">
        {/* Green panel */}
        <div className="bg-primary p-8 text-primary-foreground md:p-12">
          <h2 className="font-sans text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
            Ready To Build Something Real?
          </h2>
        </div>

        {/* Dark panel */}
        <div className="flex flex-col justify-between gap-8 bg-card p-8 md:p-12">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
            If you&apos;re looking for a reliable Webflow specialist or a
            versatile React front-end developer to build a new high-performance
            site, execute a design-to-code project, or improve an existing
            application&apos;s structure and speed, let&apos;s connect today.
          </p>

          <button
            type="button"
            className="group inline-flex items-center justify-between gap-4 rounded-full bg-background py-2 pl-6 pr-2 font-mono text-sm font-medium text-foreground transition-colors hover:bg-background/80"
          >
            <span>LET&apos;S TALK</span>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
