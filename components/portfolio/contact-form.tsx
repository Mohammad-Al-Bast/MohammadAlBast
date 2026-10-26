'use client'

import { useActionState, useEffect, useRef } from 'react'
import { CalendarDays, CheckCircle2, Loader2 } from 'lucide-react'

import { sendContact } from '@/app/actions/contact'
import type { ContactField, ContactState } from '@/lib/contact-schema'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CopyEmailButton } from './copy-email-button'
import { contact, site } from './data'

const field =
  'w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-foreground/35 transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none aria-invalid:border-destructive'
const label = 'font-sans text-sm text-foreground'
const errorText = 'font-mono text-xs text-destructive'

function Field({
  name,
  text,
  error,
  children,
}: {
  name: ContactField
  text: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`contact-${name}`} className={label}>
        {text}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className={errorText}>
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm({ defaultType, onDone }: { defaultType?: string; onDone?: () => void }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}

  // move focus to the first invalid field after a failed submit
  useEffect(() => {
    if (state.status !== 'error' || !state.fieldErrors) return
    const first = Object.keys(state.fieldErrors)[0]
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-4" role="status">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <p className="font-mono text-sm leading-relaxed text-foreground/90">{contact.success}</p>
        {onDone && (
          <Button variant="outline" onClick={onDone}>
            Close
          </Button>
        )}
      </div>
    )
  }

  const describedBy = (n: ContactField) => (errors[n] ? `contact-${n}-error` : undefined)

  return (
    <form ref={formRef} action={action} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" text="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            placeholder="Jane Smith…"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            className={field}
          />
        </Field>
        <Field name="email" text="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            defaultValue={values.email}
            placeholder="jane@company.com…"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={field}
          />
        </Field>
      </div>

      <Field name="type" text="What do you need?" error={errors.type}>
        <select
          id="contact-type"
          name="type"
          defaultValue={values.type ?? defaultType ?? ''}
          aria-invalid={!!errors.type}
          aria-describedby={describedBy('type')}
          className={cn(field, 'cursor-pointer bg-background text-foreground')}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {contact.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field name="message" text="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          autoComplete="off"
          defaultValue={values.message}
          placeholder="What are you building, and when do you need it?…"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message')}
          className={cn(field, 'resize-y')}
        />
      </Field>

      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p aria-live="polite" className={cn(errorText, 'min-h-4')}>
        {state.status === 'error' && !state.fieldErrors ? state.message : ''}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending} className="sm:min-w-[180px]">
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            'Send Message'
          )}
        </Button>
        {site.booking ? (
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:underline"
          >
            <CalendarDays className="size-4" aria-hidden /> {contact.bookingLabel}
          </a>
        ) : (
          <CopyEmailButton email={site.email.label} className="text-foreground/70 hover:text-foreground" />
        )}
      </div>
    </form>
  )
}
