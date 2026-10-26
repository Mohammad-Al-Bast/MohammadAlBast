import { z } from 'zod'

import { contact } from '@/components/portfolio/data'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.string().trim().email('Please enter a valid email, like name@company.com.'),
  type: z.enum(contact.projectTypes as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Please choose what you need.' }),
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Please add a little more detail (at least 20 characters).')
    .max(4000, 'Please keep it under 4,000 characters.'),
})

export type ContactField = keyof z.infer<typeof contactSchema>

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<ContactField, string>>
      values?: Partial<Record<ContactField, string>>
    }
