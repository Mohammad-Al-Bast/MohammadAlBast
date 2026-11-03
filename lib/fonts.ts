import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

/** Site fonts, shared by the root layout and the global 404 page (which renders its own <html>). */
export const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const fontVariables = `${ibmPlexSans.variable} ${ibmPlexMono.variable}`
