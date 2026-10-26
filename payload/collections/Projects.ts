import type { CollectionConfig } from 'payload'

import { projectCategories } from '../../components/portfolio/data'
import { revalidateProjectPages } from '../hooks/revalidate'

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Portfolio projects. Drafts stay private; only published projects appear on the site.
 * Field names mirror the `Project` type the pages already use (lib/projects.ts maps between them).
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'category', 'featured', '_status', 'updatedAt'],
    preview: (doc) => (doc?.slug ? `/projects/${doc.slug}` : null),
  },
  defaultSort: 'order',
  versions: { drafts: true },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => revalidateProjectPages(doc?.slug, previousDoc?.slug)],
    afterDelete: [({ doc }) => revalidateProjectPages(doc?.slug)],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: { description: 'One line shown on project cards (max 160 characters).' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  options: projectCategories.map((c) => ({ label: c, value: c })),
                  admin: { width: '50%' },
                },
                {
                  name: 'tags',
                  type: 'text',
                  hasMany: true,
                  admin: { width: '50%', description: 'Short labels on the card, e.g. React, Webflow.' },
                },
              ],
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              required: true,
              minRows: 1,
              admin: { description: 'The first image is the cover. Add 3–4 screenshots.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'liveUrl', label: 'Live URL', type: 'text', admin: { width: '50%' } },
                { name: 'codeUrl', label: 'Code URL', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          fields: [
            { name: 'about', label: 'About the project / client', type: 'textarea', required: true },
            { name: 'challenges', type: 'textarea', required: true },
            { name: 'solutions', type: 'textarea', required: true },
            { name: 'technologies', type: 'text', hasMany: true },
          ],
        },
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'testimonial',
              type: 'group',
              admin: { description: 'Optional. Only real quotes, with permission.' },
              fields: [
                { name: 'quote', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', admin: { width: '50%' } },
                    { name: 'handle', type: 'text', admin: { width: '50%', description: 'Role or @handle' } },
                  ],
                },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'URL: /projects/<slug>. Filled from the name if left empty.' },
      hooks: {
        beforeValidate: [({ value, data }) => (value ? toSlug(String(value)) : data?.name ? toSlug(String(data.name)) : value)],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the home page (up to 3).' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
