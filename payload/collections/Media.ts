import type { CollectionConfig } from 'payload'

/** Screenshots and photos. Public to read so the site can show them; only admins can upload. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers, e.g. "EDUadmin grade-change approval screen".' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 1200 },
      { name: 'full', width: 2000 },
    ],
    adminThumbnail: 'thumbnail',
  },
}
