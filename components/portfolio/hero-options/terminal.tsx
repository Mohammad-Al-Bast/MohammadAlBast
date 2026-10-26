'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { about, services, site, stack } from '@/components/portfolio/data'
import { HeroPanel } from './panel'

type Line = { id: number; kind: 'cmd' | 'out'; content: ReactNode }

const PROMPT = 'guest@mb:~$'
const CHIPS = ['whoami', 'stack', 'services', 'projects', 'contact', 'help'] as const

function respond(cmd: string): ReactNode | 'clear' {
  switch (cmd) {
    case 'help':
      return (
        <>
          Available commands:{'\n'}
          {'  '}whoami{'    '}who I am{'\n'}
          {'  '}stack{'     '}what I build with{'\n'}
          {'  '}services{'  '}what I offer{'\n'}
          {'  '}projects{'  '}see my work{'\n'}
          {'  '}contact{'   '}get in touch{'\n'}
          {'  '}clear{'     '}clear the screen
        </>
      )
    case 'whoami':
      return (
        <>
          <span className="text-primary">{site.name}</span> · {site.role}
          {'\n'}
          {site.location} · {about.stats[0].value} {about.stats[0].label.toLowerCase()}
        </>
      )
    case 'stack':
      return stack.columns.map((c) => (
        <span key={c.title}>
          <span className="text-primary">{c.title.padEnd(26)}</span>
          {c.tags.slice(0, 4).join(', ')}
          {'\n'}
        </span>
      ))
    case 'services':
      return services.items.map((s) => (
        <span key={s.number}>
          <span className="text-foreground/50">{s.number}</span> {s.titleBefore}
          {s.highlight}
          {s.titleAfter}
          {'\n'}
        </span>
      ))
    case 'projects':
      return (
        <>
          Opening the project list…{' '}
          <Link href="/projects" className="text-primary underline underline-offset-4">
            /projects
          </Link>
        </>
      )
    case 'contact':
      return (
        <>
          email{'  '}
          <a href={site.email.href} className="text-primary underline underline-offset-4">
            {site.email.label}
          </a>
          {'\n'}
          phone{'  '}
          <a href={site.phone.href} className="text-primary underline underline-offset-4">
            {site.phone.label}
          </a>
        </>
      )
    case 'sudo hire-mohammad':
      return <span className="text-primary">Permission granted. Sending you to the contact form…</span>
    case 'clear':
      return 'clear'
    case '':
      return null
    default:
      return (
        <>
          command not found: {cmd}. Type <span className="text-primary">help</span>.
        </>
      )
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const out = respond(cmd)
    if (out === 'clear') {
      setLines([])
      return
    }
    setLines((prev) => [
      ...prev,
      { id: idRef.current++, kind: 'cmd', content: raw },
      ...(out ? [{ id: idRef.current++, kind: 'out' as const, content: out }] : []),
    ])
    if (cmd === 'sudo hire-mohammad') setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 900)
  }

  // greet once; the ref guard stops React Strict Mode from printing it twice in dev
  const greeted = useRef(false)
  useEffect(() => {
    if (greeted.current) return
    greeted.current = true
    run('whoami')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  return (
    <HeroPanel grid={false} className="bg-[#0b0b0b]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 font-mono text-xs text-foreground/50">mb — zsh</span>
      </div>

      {/* clicking anywhere focuses the prompt, like a real terminal */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 cursor-text overflow-y-auto p-5 font-mono text-sm leading-relaxed md:p-8 md:text-[15px]"
      >
        <p className="mb-4 text-foreground/50">
          Welcome to {site.name.split(' ')[0]}&apos;s terminal. Type <span className="text-primary">help</span> or tap a
          command below.
        </p>
        <div aria-live="polite">
          {lines.map((l) =>
            l.kind === 'cmd' ? (
              <p key={l.id} className="mt-3">
                <span className="text-primary">{PROMPT}</span> {l.content}
              </p>
            ) : (
              <p key={l.id} className="whitespace-pre-wrap text-foreground/85">
                {l.content}
              </p>
            ),
          )}
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            run(input)
            setInput('')
          }}
        >
          <label htmlFor="terminal-input" className="shrink-0 text-primary">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none"
          />
        </form>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2 border-t border-white/10 p-4 md:px-8">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="cursor-pointer rounded-md border border-white/10 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
          >
            {c}
          </button>
        ))}
      </div>
    </HeroPanel>
  )
}
