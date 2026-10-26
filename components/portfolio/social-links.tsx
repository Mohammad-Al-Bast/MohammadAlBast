import { BrandGlyph } from '@/components/brand-glyph'
import { cn } from '@/lib/utils'
import { socialLinks } from './data'

interface SocialLinksProps {
  className?: string
  linkClassName?: string
}

/** Icon links for every profile in `socialLinks`. Entries with an empty href are skipped. */
export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  const links = socialLinks.filter((l) => l.href)
  if (links.length === 0) return null

  return (
    <ul className={cn('flex items-center gap-6', className)}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={cn('text-primary hover:opacity-80', linkClassName)}
          >
            <BrandGlyph src={l.icon} label={l.label} />
          </a>
        </li>
      ))}
    </ul>
  )
}
