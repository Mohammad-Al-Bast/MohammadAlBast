import { codeToHtml } from 'shiki'

import type { SnippetLanguage } from '@/components/portfolio/data'

const CODE_THEME = 'github-dark-default'

/** Server-only: returns escaped, highlighted HTML for a code block. */
export function highlightCode(code: string, language: SnippetLanguage): Promise<string> {
  return codeToHtml(code, { lang: language, theme: CODE_THEME })
}
