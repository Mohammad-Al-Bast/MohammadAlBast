import { JsonLd } from '@/components/json-ld'
import { About } from '@/components/portfolio/about'
import { Faq } from '@/components/portfolio/faq'
import { Hero, LogoStrip } from '@/components/portfolio/hero'
import { LatestProjects } from '@/components/portfolio/latest-projects'
import { Services } from '@/components/portfolio/services'
import { Stack } from '@/components/portfolio/stack'
import { Testimonials } from '@/components/portfolio/testimonials'
import { seo, testimonials } from '@/components/portfolio/data'
import { pageMetadata } from '@/lib/seo'
import { homeStructuredData } from '@/lib/structured-data'

export const metadata = pageMetadata({ description: seo.description, path: '/' })

export default function Page() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <Hero />
      <LogoStrip />
      <Stack />
      <Services />
      <LatestProjects />
      <About />
      {testimonials.enabled && <Testimonials />}
      <Faq />
    </>
  )
}
