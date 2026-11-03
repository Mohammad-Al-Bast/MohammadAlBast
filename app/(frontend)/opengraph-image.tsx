import { ImageResponse } from 'next/og'

import { seo, site } from '@/components/portfolio/data'
import { logoDataUrl, portraitDataUrl, shareColors as c, shareImageSize } from '@/lib/share-image'

/** Default share image for every page that doesn't have its own (home, /projects, privacy policy). */
export const alt = `${site.name} — ${site.role}`
export const size = shareImageSize
export const contentType = 'image/png'

export default async function Image() {
  const [logo, portrait] = await Promise.all([logoDataUrl(), portraitDataUrl()])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: c.background,
          padding: 64,
          gap: 56,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={56} height={40} alt="" />
            <div style={{ fontSize: 30, color: c.heading, fontWeight: 600 }}>{site.name}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 22, color: c.primary, letterSpacing: 3 }}>{seo.shareImage.eyebrow}</div>
            <div style={{ fontSize: 58, lineHeight: 1.1, color: c.heading, fontWeight: 600, letterSpacing: -1 }}>
              {seo.shareImage.headline}
            </div>
          </div>
          <div style={{ fontSize: 22, color: c.muted }}>{seo.shareImage.footer}</div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 360,
            borderRadius: 24,
            overflow: 'hidden',
            border: `2px solid ${c.border}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} width={360} height={502} style={{ objectFit: 'cover' }} alt="" />
        </div>
      </div>
    ),
    size,
  )
}
