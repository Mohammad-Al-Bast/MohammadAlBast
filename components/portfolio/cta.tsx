import { ContactArrowButton } from './contact-trigger'
import { CopyEmailButton } from './copy-email-button'
import { CalendarDays } from 'lucide-react'

import { contact, cta, site } from './data'

export function CTA() {
  return (
    <section id="contact" tabIndex={-1} className="bg-raised pt-10 pb-10 outline-none">
      <div className="container-page">
        <div className="focus-dark grid gap-8 rounded-lg bg-primary p-6 text-primary-foreground md:grid-cols-[1fr_minmax(0,500px)] md:items-center md:p-8 lg:min-h-[236px]">
          <h2 className="max-w-[560px] text-[40px] leading-[1.15] text-balance text-primary-foreground md:text-[64px]">
            {cta.title}
          </h2>
          <div>
            <p className="font-mono text-sm leading-snug">{cta.body}</p>
            <ContactArrowButton variant="dark" className="mt-6 w-full">
              {cta.button.label}
            </ContactArrowButton>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {site.booking && (
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm font-mono text-sm text-primary-foreground underline-offset-4 hover:underline"
                >
                  <CalendarDays className="size-4" aria-hidden />
                  {contact.bookingLabel}
                </a>
              )}
              <CopyEmailButton email={site.email.label} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
