import { revalidatePath } from 'next/cache'

/**
 * Rebuilds the pages that show projects after an edit in the admin.
 * Outside a Next.js request (CLI scripts, migrations) revalidatePath throws; that is safe to ignore.
 */
export function revalidateProjectPages(slug?: string | null, previousSlug?: string | null) {
  const paths = ['/', '/projects', slug && `/projects/${slug}`, previousSlug && previousSlug !== slug && `/projects/${previousSlug}`]
  for (const path of paths) {
    if (!path) continue
    try {
      revalidatePath(path)
    } catch {
      // not running inside Next.js
    }
  }
}
