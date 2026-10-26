'use client'

import { createContext, type ReactNode, useCallback, useContext, useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ContactForm } from './contact-form'
import { contact } from './data'

type ContactContextValue = { openContact: (type?: string) => void }

const ContactContext = createContext<ContactContextValue | null>(null)

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used inside <ContactProvider>')
  return ctx
}

/** One contact dialog for the whole site; any button can open it, optionally with a project type preselected. */
export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string | undefined>()
  // a new key per opening resets the form after a successful send
  const [session, setSession] = useState(0)

  const openContact = useCallback((t?: string) => {
    setType(t)
    setSession((s) => s + 1)
    setOpen(true)
  }, [])

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{contact.title}</DialogTitle>
            <DialogDescription>{contact.intro}</DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <ContactForm key={session} defaultType={type} onDone={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  )
}
