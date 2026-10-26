import { cn } from '@/lib/utils'

const LOGOS = {
  compact: { src: '/images/MB-nav_logo.svg', width: 127, height: 33 },
  full: { src: '/images/Mohammad Al Bast_footer-logo.svg', width: 1376, height: 248 },
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
      src={LOGOS[variant].src}
      width={LOGOS[variant].width}
      height={LOGOS[variant].height}
      alt="MB Logo"
      className={cn('select-none', className)}
      style={{
        height: 'auto',
      }}
    />
  )
}
