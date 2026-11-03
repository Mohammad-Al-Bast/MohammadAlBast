import type { MetadataRoute } from 'next'

import { privacyPolicy } from '@/components/portfolio/data'
import { getProjects } from '@/lib/projects'
import { absoluteUrl } from '@/lib/seo'

/** /sitemap.xml — the public pages plus every published project, rebuilt hourly so new projects appear without a redeploy. */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const latestProjectEdit = projects
    .map((p) => p.updatedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1)

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    {
      url: absoluteUrl('/projects'),
      ...(latestProjectEdit ? { lastModified: latestProjectEdit } : {}),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      ...(p.updatedAt ? { lastModified: p.updatedAt } : {}),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: privacyPolicy.effectiveDate,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
