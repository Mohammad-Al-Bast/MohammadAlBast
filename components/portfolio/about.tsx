import Image from 'next/image'
import { CodeHeading } from '@/components/code-heading'
import { BrandGlyph } from '@/components/brand-glyph'
import { OutlineButton } from '@/components/primitives'
import { aboutDetails } from './data'

export function About() {
  return (
    <section className="bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <CodeHeading className="mx-auto max-w-3xl text-center text-2xl leading-snug md:text-4xl">
          {' I Turn Ideas And Designs Into Fast, User-Friendly Interfaces. '}
        </CodeHeading>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr_1.2fr] lg:gap-12">
          {/* Bio */}
          <div>
            <h3 className="font-sans text-xl font-semibold text-foreground">
              Mohammad Al Bast:
            </h3>
            <p className="mt-5 font-mono text-sm leading-relaxed text-muted-foreground">
              {
                '"I turn Figma or Adobe XD designs into fast, user-friendly websites & Webflow builds."'
              }
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
              Everything is responsive, polished, and reliably connected to APIs
              or SQL databases, making it easy to manage.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary transition-opacity hover:opacity-80"
            >
              Follow me on Github <BrandGlyph src="/logos/github.svg" label="GitHub" className="size-4" />
            </a>
          </div>

          {/* Portrait */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/portrait.png"
              alt="Mohammad Al Bast"
              fill
              className="object-cover grayscale"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <dl className="space-y-4">
              {aboutDetails.map((d) => (
                <div key={d.label} className="font-mono text-sm leading-relaxed">
                  <dt className="inline font-semibold text-foreground">
                    {d.label}:{' '}
                  </dt>
                  <dd className="inline text-muted-foreground">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <OutlineButton className="w-full justify-center">
                Contact Me
              </OutlineButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
