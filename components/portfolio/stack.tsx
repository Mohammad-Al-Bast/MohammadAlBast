import { CodeHeading } from '@/components/code-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { stack } from './data'

export function Stack() {
  return (
    <section id="expertise" tabIndex={-1} className="section-y relative isolate overflow-hidden outline-none">
      {/* soft radial lift behind the heading, as in the Figma */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,#262626_0%,transparent_100%)]" />

      <div className="container-page lg:px-20">
        <div className="mx-auto max-w-[768px] text-center">
          <p className="font-mono text-sm text-primary uppercase">{stack.eyebrow}</p>
          <CodeHeading className="mt-4">{stack.title}</CodeHeading>
          <p className="mx-auto mt-6 max-w-[560px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {stack.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {stack.columns.map((col) => (
            <Card
              key={col.title}
              className="bg-gradient-to-b from-[#1c1c1c] to-[#050505] text-center"
            >
              <CardHeader className="items-center gap-6 px-6 pt-8 md:px-10">
                <CardTitle className="text-2xl text-heading">{col.title}</CardTitle>
                <CardDescription className="text-base text-foreground/80">{col.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap justify-center gap-2 px-6 pt-10 pb-8">
                {col.tags.map((tag) => (
                  <Badge key={tag} size="lg">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
