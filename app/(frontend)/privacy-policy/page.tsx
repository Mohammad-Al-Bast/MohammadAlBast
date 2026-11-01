import type { Metadata } from 'next'

import { CodeHeading } from '@/components/code-heading'
import { privacyPolicy } from '@/components/portfolio/data'

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: 'How the portfolio website of Mohammad Al Bast handles visitor data, analytics and contact details.',
}

const effectiveDate = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
}).format(new Date(privacyPolicy.effectiveDate))

const bodyText = 'font-mono text-base leading-relaxed text-foreground/80'

export default function PrivacyPolicyPage() {
  return (
    <section className="section-y pt-10 md:pt-16">
      <div className="container-page">
        <div className="max-w-3xl">
          <CodeHeading as="h1">{privacyPolicy.title}</CodeHeading>
          <p className="mt-6 font-mono text-sm text-foreground/80">
            Effective <time dateTime={privacyPolicy.effectiveDate}>{effectiveDate}</time>
          </p>
          <p className={`mt-6 ${bodyText}`}>{privacyPolicy.intro}</p>

          <div className="mt-12 space-y-10">
            {privacyPolicy.sections.map((section) => {
              const external = section.link?.href.startsWith('http')
              return (
                <section key={section.title} className="border-t border-border pt-8">
                  <h2 className="font-sans text-2xl text-pretty text-heading">{section.title}</h2>
                  <div className={`mt-4 space-y-4 ${bodyText}`}>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.link && (
                      <p>
                        <a
                          href={section.link.href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="break-words text-primary underline underline-offset-4 hover:opacity-80"
                        >
                          {section.link.label}
                        </a>
                      </p>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
