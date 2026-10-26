import { About } from '@/components/portfolio/about'
import { Hero, LogoStrip } from '@/components/portfolio/hero'
import { LatestProjects } from '@/components/portfolio/latest-projects'
import { Services } from '@/components/portfolio/services'
import { Stack } from '@/components/portfolio/stack'
import { Testimonials } from '@/components/portfolio/testimonials'
import { WhatIBuild } from '@/components/portfolio/what-i-build'
import { testimonials } from '@/components/portfolio/data'

export default function Page() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Stack />
      <Services />
      <WhatIBuild />
      <LatestProjects />
      <About />
      {testimonials.enabled && <Testimonials />}
    </>
  )
}
