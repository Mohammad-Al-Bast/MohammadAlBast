import config from '@payload-config'
import { getPayload, type Where } from 'payload'

import { projects as placeholderProjects, type ImageOrientation, type Project } from '@/components/portfolio/data'
import type { Media, Project as ProjectDoc } from '@/payload-types'

/** True once a database is configured; until then the site shows the placeholder projects from data.ts. */
const cmsEnabled = Boolean(process.env.DATABASE_URL)

function mediaUrl(m: number | Media | null | undefined, size: 'card' | 'full' = 'card'): string | null {
  if (!m || typeof m === 'number') return null
  return m.sizes?.[size]?.url ?? m.url ?? null
}

/**
 * Phone screenshots are about twice as tall as they are wide (375×812, 342×741). Desktop screenshots are
 * close to square or wider (800×896 stitched captures, 1920×1080), so only clearly tall images count as
 * phone shots; desktop ones are shown in a 16:9 frame cropped from the top.
 */
const PHONE_MIN_RATIO = 1.6

function orientation(m: Media): ImageOrientation {
  return m.width && m.height && m.height / m.width >= PHONE_MIN_RATIO ? 'portrait' : 'landscape'
}

function toProject(doc: ProjectDoc): Project {
  // Keep only images that resolve to a URL, so urls, alts and orientations stay index-aligned.
  const images = (doc.images ?? []).filter(
    (m): m is Media => typeof m === 'object' && m !== null && Boolean(mediaUrl(m, 'full')),
  )
  const t = doc.testimonial
  const s = doc.codeSnippet
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    category: doc.category,
    tags: doc.tags ?? [],
    images: images.map((m) => mediaUrl(m, 'full') as string),
    imageAlts: images.map((m) => m.alt),
    imageOrientations: images.map(orientation),
    snippet: s?.code && s?.language ? { filename: s.filename ?? '', language: s.language, code: s.code } : undefined,
    liveUrl: doc.liveUrl ?? '',
    codeUrl: doc.codeUrl ?? '',
    about: doc.about,
    challenges: doc.challenges,
    solutions: doc.solutions,
    technologies: doc.technologies ?? [],
    updatedAt: doc.updatedAt,
    testimonial:
      t?.quote && t?.name
        ? { quote: t.quote, name: t.name, handle: t.handle ?? '', image: mediaUrl(t.image) ?? '' }
        : undefined,
  }
}

async function find(where: Where, limit: number, sort = 'order') {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'projects',
    where: { and: [{ _status: { equals: 'published' } }, where] },
    sort: [sort, '-updatedAt'],
    limit,
    depth: 1,
  })
  return res.docs.map(toProject)
}

export async function getProjects(): Promise<Project[]> {
  if (!cmsEnabled) return placeholderProjects
  return find({}, 100)
}

/** Featured projects first, topped up with the most recent ones, for the home page. */
export async function getLatestProjects(count = 3): Promise<Project[]> {
  if (!cmsEnabled) return placeholderProjects.slice(0, count)
  const featured = await find({ featured: { equals: true } }, count)
  if (featured.length >= count) return featured
  const rest = await find({ slug: { not_in: featured.map((p) => p.slug) } }, count - featured.length)
  return [...featured, ...rest]
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!cmsEnabled) return placeholderProjects.find((p) => p.slug === slug) ?? null
  const [project] = await find({ slug: { equals: slug } }, 1)
  return project ?? null
}
