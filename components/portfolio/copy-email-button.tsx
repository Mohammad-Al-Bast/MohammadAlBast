'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Fallback for visitors without a mail app: copies the address instead of opening mailto. */
export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy my email:', email)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2 rounded-sm font-mono text-sm text-primary-foreground/80 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline',
          className,
        )}
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        <span>{copied ? 'Copied to clipboard' : `Or copy ${email}`}</span>
      </button>
      {/* announces the copy once; the label changing back stays silent */}
      <span role="status" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </>
  )
}
