import { highlightCode } from '@/lib/highlight'
import type { CodeSnippet } from './data'

const MAX_HEIGHT_CLASS = 'max-h-[600px] md:max-h-[820px]'

/** Highlighted code inside an editor-style panel with the file name on top. */
export async function CodeShowcase({ snippet }: { snippet: CodeSnippet }) {
  const html = await highlightCode(snippet.code, snippet.language)
  const label = snippet.filename || 'Code snippet'

  return (
    <div className="overflow-hidden rounded-md bg-inset">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3 md:px-8">
        <span aria-hidden className="size-2 rounded-full bg-foreground/25" />
        <span className="font-mono text-xs text-foreground/70">{label}</span>
      </div>
      <div
        role="region"
        aria-label={`${label} source code`}
        // biome-ignore lint/suspicious/noDangerouslySetInnerHtml: shiki returns escaped HTML built from our own CMS text
        dangerouslySetInnerHTML={{ __html: html }}
        className={`${MAX_HEIGHT_CLASS} overflow-auto px-5 py-5 font-mono text-[13px] leading-relaxed md:px-8 md:py-6 md:text-sm [&_pre]:m-0 [&_pre]:bg-transparent! [&_code]:font-mono`}
        tabIndex={0}
      />
    </div>
  )
}
