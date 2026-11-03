import path from 'path'
import { fileURLToPath } from 'url'
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Uploaded media is served from the public R2 bucket URL; allow the optimizer to fetch from it.
const r2Host = (() => {
  try {
    return process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : null
  } catch {
    return null
  }
})()

const nextConfig: NextConfig = {
  // Next resizes images to the size each screen needs and serves AVIF/WebP instead of the original PNG/JPEG.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: r2Host ? [{ protocol: 'https', hostname: r2Host }] : [],
    // Uploads keep their file name for life (Payload adds a suffix on clashes), so optimized copies can be cached long.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Unknown URLs get app/global-not-found.tsx (needed because the site and Payload admin are separate root layouts).
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    // Baseline hardening on every response. No full Content-Security-Policy yet: Payload admin and Vercel
    // Analytics need inline scripts, so a CSP would need nonces and its own testing pass.
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      // Only this site may embed its pages in a frame (blocks clickjacking; Payload's same-origin previews still work).
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
    ]
    // Keep the CMS admin and API out of search results (robots.txt only stops crawling, not indexing of linked URLs).
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    return [
      { source: '/:path*', headers: security },
      { source: '/admin/:path*', headers: noindex },
      { source: '/api/:path*', headers: noindex },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
