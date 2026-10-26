import config from '@payload-config'
import { getPayload } from 'payload'

import { seedProjects } from '../payload/seed/projects'

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

    // Drafts skip the required image check, so screenshots can be added in the admin before publishing.
    await payload.create({ collection: 'projects', data: project as never, draft: true })
    payload.logger.info(`Created draft: ${project.name}`)
  }

  process.exit(0)
}

await main()
