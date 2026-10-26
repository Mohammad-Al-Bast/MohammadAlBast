import { existsSync } from 'node:fs'
import path from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedImages, seedProjects } from '../payload/seed/projects'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>

const IMAGE_ROOT = path.resolve(process.cwd(), 'project-screenshots')

async function uploadImages(payload: PayloadClient, projectName: string) {
  const ids: number[] = []

  for (const image of seedImages[projectName] ?? []) {
    const filePath = path.join(IMAGE_ROOT, image.file)

    if (!existsSync(filePath)) {
      payload.logger.warn(`Missing image, skipped: ${image.file}`)
      continue
    }

    const media = await payload.create({ collection: 'media', data: { alt: image.alt }, filePath })
    ids.push(media.id)
  }

  return ids
}

async function main() {
  const payload = await getPayload({ config })

  for (const project of seedProjects) {
    const existing = await payload.find({
      collection: 'projects',
      where: { name: { equals: project.name } },
      draft: true,
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      payload.logger.info(`Skipped ${project.name}: already exists`)
      continue
    }

    const images = await uploadImages(payload, project.name)

    // Drafts skip required-field checks, so a project with no images still saves.
    await payload.create({ collection: 'projects', data: { ...project, images } as never, draft: true })
    payload.logger.info(`Created draft: ${project.name} (${images.length} images)`)
  }

  process.exit(0)
}

await main()
