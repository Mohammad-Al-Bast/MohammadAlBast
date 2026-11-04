import { CodeHeading } from '@/components/code-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ContactButton } from './contact-trigger'
import { faq } from './data'

export function Faq() {
  return (
    <section id="faq" tabIndex={-1} className="section-y outline-none">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <CodeHeading>{faq.title}</CodeHeading>
          <p className="max-w-[480px] font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            {faq.intro}
          </p>
          <ContactButton variant="outline" className="w-full sm:w-fit">
            {faq.askLabel}
          </ContactButton>
        </div>

        {/* hiddenUntilFound keeps closed answers in the HTML, so crawlers and find-in-page still see them */}
        <Accordion multiple hiddenUntilFound className="border-t border-border">
          {faq.items.map((item) => (
            <AccordionItem key={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
