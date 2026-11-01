'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { about, contact, services, site, stack } from '@/components/portfolio/data'
import { useContact } from '@/components/portfolio/contact-dialog'
import { HeroPanel } from './panel'
import { logOutput, nowOutput, statusOutput, type TerminalProject } from './terminal-commands'

type Line = { id: number; kind: 'cmd' | 'out'; content: ReactNode; intro: boolean }

const PROMPT = 'guest@mb:~$'
const CHIPS = ['status', 'now', 'log', 'whoami', 'stack', 'services', ...(site.cv ? ['cv'] : []), 'contact', 'help']
// typed automatically on first load so the window is never empty
const INTRO = ['status', 'git log --oneline']
const TYPE_MS = 55

const linkClass = 'text-primary underline underline-offset-4'

function TerminalLine({ line }: { line: Line }) {
  return line.kind === 'cmd' ? (
    <p className="mt-3">
      <span className="text-primary">{PROMPT}</span> {line.content}
    </p>
  ) : (
    <p className="whitespace-pre-wrap text-foreground/85">{line.content}</p>
  )
}

function respond(cmd: string, openContact: () => void, projects: TerminalProject[]): ReactNode | 'clear' {
  switch (cmd) {
    case 'status':
      return statusOutput()
    case 'now':
      return nowOutput()
    case 'log':
    case 'git log':
    case 'git log --oneline':
      return logOutput(projects)
    case 'help':
      return (
        <>
          Available commands:{'\n'}
          {'  '}status{'    '}availability and reply time{'\n'}
          {'  '}now{'       '}what I am working on{'\n'}
          {'  '}log{'       '}latest projects{'\n'}
          {'  '}whoami{'    '}who I am{'\n'}
          {'  '}stack{'     '}what I build with{'\n'}
          {'  '}services{'  '}what I offer{'\n'}
          {'  '}projects{'  '}see my work{'\n'}
          {site.cv && (
            <>
              {'  '}cv{'        '}download my CV{'\n'}
            </>
          )}
          {site.booking && (
            <>
              {'  '}book{'      '}book a call{'\n'}
            </>
          )}
          {'  '}contact{'   '}open the contact form{'\n'}
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
      setTimeout(openContact, 400)
      return (
        <>
          Opening the contact form…{'\n'}
          email{'  '}
          <a href={site.email.href} className={linkClass}>
            {site.email.label}
          </a>
          {'\n'}
          phone{'  '}
          <a href={site.phone.href} className={linkClass}>
            {site.phone.label}
          </a>
        </>
      )
    case 'cv':
      return site.cv ? (
        <>
          <a href={site.cv} download className={linkClass}>
            {contact.cvLabel}
          </a>{' '}
          (PDF)
        </>
      ) : (
        <>CV coming soon. Type contact to ask for a copy.</>
      )
    case 'book':
      return site.booking ? (
        <a href={site.booking} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {contact.bookingLabel}
        </a>
      ) : (
        <>Booking opens soon. Type contact to reach me now.</>
      )
    case 'sudo hire-mohammad':
      setTimeout(openContact, 700)
      return <span className="text-primary">Permission granted. Opening the contact form…</span>
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

export function Terminal({ projects }: { projects: TerminalProject[] }) {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { openContact } = useContact()

  const run = (raw: string, intro = false) => {
    const cmd = raw.trim().toLowerCase()
    const out = respond(cmd, () => openContact(), projects)
    if (out === 'clear') {
      setLines([])
      return
    }
    setLines((prev) => [
      ...prev,
      { id: idRef.current++, kind: 'cmd', content: raw, intro },
      ...(out ? [{ id: idRef.current++, kind: 'out' as const, content: out, intro }] : []),
    ])
  }

  // Types the intro commands once. Any user input stops it; reduced motion skips straight to the output.
  // Every step is a timer so React Strict Mode's mount/unmount/mount in dev cancels the first run cleanly.
  const introCancelled = useRef(false)
  const stopIntro = () => {
    if (introCancelled.current) return
    introCancelled.current = true
    setInput('')
  }
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(() => !introCancelled.current && fn(), ms))
    const finish = () => {
      introCancelled.current = true
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      later(() => {
        INTRO.forEach((c) => run(c, true))
        finish()
      }, 0)
      return () => timers.forEach(clearTimeout)
    }
    let at = 500
    INTRO.forEach((cmd, n) => {
      for (let i = 1; i <= cmd.length; i++) {
        const partial = cmd.slice(0, i)
        later(() => setInput(partial), at)
        at += TYPE_MS
      }
      at += 350
      later(() => {
        setInput('')
        run(cmd, true)
        if (n === INTRO.length - 1) finish()
      }, at)
      at += 700
    })
    return () => timers.forEach(clearTimeout)
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
        onClick={() => {
          stopIntro()
          inputRef.current?.focus()
        }}
        className="min-h-0 flex-1 cursor-text overflow-y-auto p-5 font-mono text-sm leading-relaxed md:p-8 md:text-[15px]"
      >
        <p className="mb-4 text-foreground/50">
          Welcome to {site.name.split(' ')[0]}&apos;s terminal. Type <span className="text-primary">help</span> or tap a
          command below.
        </p>
        {/* the auto-typed intro stays out of the live region so nothing is announced on page load */}
        {lines
          .filter((l) => l.intro)
          .map((l) => (
            <TerminalLine key={l.id} line={l} />
          ))}
        <div aria-live="polite">
          {lines
            .filter((l) => !l.intro)
            .map((l) => (
              <TerminalLine key={l.id} line={l} />
            ))}
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            stopIntro()
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
            onChange={(e) => {
              stopIntro()
              setInput(e.target.value)
            }}
            onFocus={stopIntro}
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
            onClick={() => {
              stopIntro()
              run(c)
            }}
            className="cursor-pointer rounded-md border border-white/10 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
          >
            {c}
          </button>
        ))}
      </div>
    </HeroPanel>
  )
}
