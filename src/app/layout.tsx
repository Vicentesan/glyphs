import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { NavBar } from '@/components/navbar'
import { cn } from '@/lib/utils'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Glyphs',
  description: 'Glyphs for ingress',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark font-mono antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <NavBar />
        {children}
      </body>
    </html>
  )
}
