// import type React from "react"
// import "@mantine/core/styles.css"
// import { MantineProvider, ColorSchemeScript } from "@mantine/core"
// import "./globals.css"


// export const metadata = {
//   title: "University Technology Park",
//   description: "Innovation hub for technology companies and startups",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" data-mantine-color-scheme="light">
//       <head>
//         <ColorSchemeScript />
//       </head>
//       <body>
//         <MantineProvider>{children}</MantineProvider>
//       </body>
//     </html>
//   )
// }


// app/[locale]/layout.tsx
import type {ReactNode} from 'react'
import '@mantine/core/styles.css'
import './globals.css'
import {MantineProvider, ColorSchemeScript} from '@mantine/core'

import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import {setRequestLocale, getMessages} from 'next-intl/server'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export const metadata = {
  title: 'University Technology Park',
  description: 'Innovation hub for technology companies and startups',
  generator: 'v0.dev'
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params

  // Sadece 'en' ve 'tr' destekleniyor
  if (!hasLocale(['en', 'tr'], locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider>{children}</MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

