import { SiteNav } from '@/components/portfolio/site-nav'
import { Hero } from '@/components/portfolio/hero'
import { WhatIBuild } from '@/components/portfolio/what-i-build'
import { Services } from '@/components/portfolio/services'
import { LatestProjects } from '@/components/portfolio/latest-projects'
import { Stack } from '@/components/portfolio/stack'
import { About } from '@/components/portfolio/about'
import { Testimonials } from '@/components/portfolio/testimonials'
import { CTA } from '@/components/portfolio/cta'
import { SiteFooter } from '@/components/portfolio/site-footer'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <WhatIBuild />
        <Services />
        <LatestProjects />
        <Stack />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <SiteFooter />
    </>
  )
}
