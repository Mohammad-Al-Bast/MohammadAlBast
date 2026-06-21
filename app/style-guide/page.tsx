import { CodeHeading } from '@/components/code-heading'
import { Logo } from '@/components/logo'
import {
  ArrowLink,
  ArrowPillButton,
  CircleArrowButton,
  OutlineButton,
  Tag,
} from '@/components/primitives'

const colorTokens = [
  { name: 'Background', token: '--background', className: 'bg-background' },
  { name: 'Card', token: '--card', className: 'bg-card' },
  { name: 'Surface', token: '--surface', className: 'bg-surface' },
  { name: 'Muted', token: '--muted', className: 'bg-muted' },
  { name: 'Primary / Green', token: '--primary', className: 'bg-primary' },
  { name: 'Foreground', token: '--foreground', className: 'bg-foreground' },
]

function Section({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border py-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <h2 className="mb-8 font-sans text-2xl font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:px-10">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <a
            href="/"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View site &rarr;
          </a>
        </div>
        <CodeHeading as="h1" className="text-4xl md:text-5xl">
          Style Guide
        </CodeHeading>
        <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
          The design system powering the portfolio: a dark canvas, vivid mint
          accent, monospace body copy, and clean sans display type.
        </p>
      </header>

      {/* Colors */}
      <Section label="Foundations" title="Color">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colorTokens.map((c) => (
            <div key={c.token}>
              <div
                className={`mb-3 aspect-square w-full rounded-xl border border-border ${c.className}`}
              />
              <p className="font-sans text-sm font-medium text-foreground">
                {c.name}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {c.token}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section label="Foundations" title="Typography">
        <div className="space-y-8">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Display — Space Grotesk
            </p>
            <p className="font-sans text-5xl font-semibold tracking-tight text-foreground">
              Build Something That Matters
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Code heading
            </p>
            <CodeHeading className="text-3xl">Technologies</CodeHeading>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Body — JetBrains Mono
            </p>
            <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              I turn Figma or Adobe XD designs into fast, user-friendly websites
              &amp; Webflow builds. Everything is responsive, polished, and
              reliably connected to APIs or SQL databases, making it easy to
              manage.
            </p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section label="Components" title="Buttons & Links">
        <div className="flex flex-wrap items-center gap-5">
          <ArrowPillButton>View My Work</ArrowPillButton>
          <ArrowPillButton variant="outline">Start a Project</ArrowPillButton>
          <OutlineButton>Contact Me</OutlineButton>
          <ArrowLink>View Project</ArrowLink>
          <div className="flex gap-3">
            <CircleArrowButton direction="left" />
            <CircleArrowButton direction="right" />
          </div>
        </div>
      </Section>

      {/* Tags & cards */}
      <Section label="Components" title="Tags & Cards">
        <div className="mb-8 flex flex-wrap gap-2">
          <Tag>React</Tag>
          <Tag>Webflow</Tag>
          <Tag>Custom animation</Tag>
          <Tag>HTML, CSS3, modern JavaScript (ES6+)</Tag>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-2 font-sans text-lg font-semibold text-foreground">
              Card surface
            </h3>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Rounded dark-gray panels hold most content blocks, with subtle
              hairline borders.
            </p>
          </article>
          <article className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <h3 className="mb-2 font-sans text-lg font-semibold">
              Accent surface
            </h3>
            <p className="font-mono text-sm leading-relaxed opacity-80">
              The mint green is reserved for CTAs, highlights, and the closing
              call-to-action banner.
            </p>
          </article>
        </div>
      </Section>

      {/* Logo */}
      <Section label="Brand" title="Logo">
        <div className="flex flex-col gap-8">
          <Logo />
          <Logo variant="full" className="text-5xl md:text-7xl" />
        </div>
      </Section>
    </main>
  )
}
