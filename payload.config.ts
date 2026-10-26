import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Media } from './payload/collections/Media'
import { Projects } from './payload/collections/Projects'
import { Users } from './payload/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const r2PublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, '')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · MB Admin' },
    theme: 'dark',
  },
  collections: [Projects, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'payload/migrations'),
  }),
  sharp,
  plugins: [
    // Cloudflare R2 (S3-compatible). Without R2 env vars, uploads fall back to the local ./media folder (dev only).
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: r2PublicUrl
          ? {
              prefix: 'media',
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) => `${r2PublicUrl}/${prefix ? `${prefix}/` : ''}${filename}`,
            }
          : { prefix: 'media' },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
