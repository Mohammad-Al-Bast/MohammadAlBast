import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** Shared pieces for the generated 1200×630 share images (`opengraph-image.tsx` files). Colours mirror globals.css. */
export const shareImageSize = { width: 1200, height: 630 }

export const shareColors = {
  background: '#151515',
  raised: '#2a2a2a',
  border: '#393939',
  primary: '#85fd9c',
  heading: '#f3fff0',
  muted: '#a3a3a3',
}

async function publicFileAsDataUrl(file: string, type: string) {
  const data = await readFile(path.join(process.cwd(), 'public', file))
  return `data:${type};base64,${data.toString('base64')}`
}

export const logoDataUrl = () => publicFileAsDataUrl('images/favicon.svg', 'image/svg+xml')
export const portraitDataUrl = () => publicFileAsDataUrl('images/MB.JPEG', 'image/jpeg')

/** Downloads a remote image and inlines it; returns null if it can't be fetched so the card still renders. */
export async function remoteImageAsDataUrl(url: string | undefined): Promise<string | null> {
  if (!url || !/^https?:\/\//.test(url)) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const type = res.headers.get('content-type') ?? 'image/png'
    if (!/^image\/(png|jpe?g|gif|webp)/.test(type)) return null
    return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`
  } catch {
    return null
  }
}
