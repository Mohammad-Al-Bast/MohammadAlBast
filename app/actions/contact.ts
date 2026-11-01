'use server'

import { contactSchema, type ContactField, type ContactState } from '@/lib/contact-schema'
import { site } from '@/components/portfolio/data'

const RESEND_URL = 'https://api.resend.com/emails'

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Bots fill every field; people never see this one.
  if (String(formData.get('company') ?? '').length > 0) return { status: 'success' }

  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    type: String(formData.get('type') ?? ''),
    message: String(formData.get('message') ?? ''),
  }

  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField
      fieldErrors[key] ??= issue.message
    }
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set; message not sent.')
    return {
      status: 'error',
      message: `The form isn't connected yet. Please email me directly at ${site.email.label}.`,
      values,
    }
  }

  const { name, email, type, message } = parsed.data
  const to = process.env.CONTACT_TO_EMAIL || site.email.label
  // onboarding@resend.dev works without a verified domain, but only delivers to the Resend account owner
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry: ${type} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Type:</strong> ${escapeHtml(type)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    })
    if (!res.ok) {
      console.error('[contact] Resend error', res.status, await res.text())
      throw new Error(`Resend responded ${res.status}`)
    }
  } catch (err) {
    console.error('[contact] send failed', err)
    return {
      status: 'error',
      message: `Something went wrong sending your message. Please try again, or email me at ${site.email.label}.`,
      values,
    }
  }

  return { status: 'success' }
}
