import { ArrowButton } from '@/components/primitives'
import { cta } from './data'

export function CTA() {
  return (
    <section id="contact" className="bg-raised pt-10 pb-10">
      <div className="container-page">
        <div className="grid gap-8 rounded-lg bg-primary p-6 text-primary-foreground md:grid-cols-[1fr_minmax(0,500px)] md:items-center md:p-8 lg:min-h-[236px]">
          <h2 className="max-w-[560px] text-[40px] leading-[1.15] text-primary-foreground md:text-[64px]">
            {cta.title}
          </h2>
          <div>
            <p className="font-mono text-sm leading-snug">{cta.body}</p>
            <ArrowButton href={cta.button.href} variant="dark" className="mt-6 w-full">
              {cta.button.label}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
