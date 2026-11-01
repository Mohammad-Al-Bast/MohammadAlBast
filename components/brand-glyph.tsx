import { cn } from '@/lib/utils'

/**
 * Renders a downloaded brand SVG as a tintable glyph using CSS masking,
 * so it inherits the current text color (lucide-react dropped brand icons).
 * Omit `label` when visible text next to the glyph already says the same thing.
 */
export function BrandGlyph({
  src,
  label,
  className,
}: {
  src: string
  label?: string
  className?: string
}) {
  return (
    <span
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn(
        'inline-block size-5 bg-current forced-color-adjust-none forced-colors:bg-[CanvasText]',
        className,
      )}
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
