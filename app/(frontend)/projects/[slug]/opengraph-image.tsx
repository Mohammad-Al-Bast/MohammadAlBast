import { ImageResponse } from 'next/og'

import { site } from '@/components/portfolio/data'
import { getProject, getProjects } from '@/lib/projects'
import { absoluteUrl } from '@/lib/seo'
import { logoDataUrl, remoteImageAsDataUrl, shareColors as c, shareImageSize } from '@/lib/share-image'

/** Share image for one case study: project name, category and its first screenshot. */
export const alt = `Project case study by ${site.name}`
export const size = shareImageSize
export const contentType = 'image/png'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  const [logo, screenshot] = await Promise.all([
    logoDataUrl(),
    remoteImageAsDataUrl(project?.images[0] ? absoluteUrl(project.images[0]) : undefined),
  ])

  const name = project?.name ?? 'Project'
  const tags = (project?.tags ?? []).slice(0, 4)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: c.background,
          padding: 56,
          gap: 36,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={46} height={33} alt="" />
            <div style={{ fontSize: 26, color: c.heading, fontWeight: 600 }}>{site.name}</div>
          </div>
          <div style={{ fontSize: 22, color: c.primary, letterSpacing: 3 }}>CASE STUDY</div>
        </div>

        <div style={{ display: 'flex', flex: 1, gap: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: name.length > 28 ? 50 : 60, lineHeight: 1.1, fontWeight: 600, letterSpacing: -1 }}>
              <span style={{ color: c.primary }}>{'<'}</span>
              <span style={{ color: c.heading }}>{name}</span>
              <span style={{ color: c.primary }}>{' />'}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {tags.map((t) => (
                <div
                  key={t}
                  style={{
                    fontSize: 20,
                    color: c.heading,
                    background: c.raised,
                    border: `1px solid ${c.border}`,
                    borderRadius: 999,
                    padding: '8px 18px',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          {screenshot && (
            <div
              style={{
                display: 'flex',
                width: 560,
                borderRadius: 16,
                overflow: 'hidden',
                border: `2px solid ${c.border}`,
                background: c.raised,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot} width={560} height={420} style={{ objectFit: 'cover', objectPosition: 'top' }} alt="" />
            </div>
          )}
        </div>
      </div>
    ),
    size,
  )
}
