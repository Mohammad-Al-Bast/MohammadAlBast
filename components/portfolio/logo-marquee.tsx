const logos = [
  { src: '/logos/react.svg', name: 'React' },
  { src: '/logos/laravel.svg', name: 'Laravel' },
  { src: '/logos/html5.svg', name: 'HTML5' },
  { src: '/logos/webflow.svg', name: 'Webflow' },
]

export function LogoMarquee() {
  const row = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="relative flex overflow-hidden border-y border-border py-7">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
        {row.map((logo, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src || '/placeholder.svg'}
              alt={logo.name}
              className="h-6 w-6 opacity-50 [filter:invert(1)]"
            />
            <span className="font-mono text-base text-muted-foreground">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
