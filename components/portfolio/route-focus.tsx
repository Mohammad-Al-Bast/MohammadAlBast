'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const focusTarget = (id: string) => document.getElementById(id)?.focus({ preventScroll: true })

/**
 * The nav and footer persist across client-side navigations and Next only scrolls to a hash, so focus would stay
 * on the clicked link. Moves it to the section a hash link points at, or to <main> on a new page.
 */
export function RouteFocus() {
  const pathname = usePathname()
  const previous = useRef(pathname)

  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    focusTarget(window.location.hash.slice(1) || 'main')
  }, [pathname])

  // a hash link on the current page doesn't change the pathname
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[href*="#"]')
      if (link?.hash && link.pathname === window.location.pathname) focusTarget(link.hash.slice(1))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
