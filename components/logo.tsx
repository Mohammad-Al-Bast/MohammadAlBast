import { cn } from '@/lib/utils'

const LOGO_URLS = {
  compact: '/images/MB-nav_logo.svg',
  full: '/images/Mohammad Al Bast_footer-logo.svg',
}

export function Logo({
  variant = 'compact',
  className,
}: {
  variant?: 'compact' | 'full'
  className?: string
}) {
  return (
    <img
      src={LOGO_URLS[variant]}
      alt="MB Logo"
      className={cn('select-none', className)}
      style={{
        height: 'auto',
      }}
    />
  )
}
