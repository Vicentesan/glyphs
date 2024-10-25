import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { NavBar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme/theme-provider'
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-mono antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="@suburbano:theme-1.0.0"
        >
          <div className="min-h-screen">
            {/* do not remove this! THIS SHIT FIXES THE HYDRATION ERROR IN NEXTJS 13+ */}
            <NavBar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
