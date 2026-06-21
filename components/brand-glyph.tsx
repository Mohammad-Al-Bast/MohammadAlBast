import { cn } from '@/lib/utils'

/**
 * Renders a downloaded brand SVG as a tintable glyph using CSS masking,
 * so it inherits the current text color (lucide-react dropped brand icons).
 */
export function BrandGlyph({
  src,
  label,
  className,
}: {
  src: string
  label: string
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn('inline-block size-5 bg-current', className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}
