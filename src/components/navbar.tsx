'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme/theme-toggle'

const items = [
  {
    name: 'Glyphs',
    href: '/',
  },
  {
    name: 'Maker',
    href: '/maker',
  },
  {
    name: 'Regex',
    href: '/regex',
  },
]

export function NavBar() {
  const pathname = usePathname()

  function isCurrentPath(path: string) {
    return pathname === path
  }

  return (
    <nav className="m-10 flex items-center justify-between text-lg font-semibold">
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="text-2xl font-black">
          Suburbano
        </Link>

        <span className="block h-1 w-1 rounded-full bg-muted" />

        {items.map((item, i) => (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              className={cn('font-light text-muted-foreground', {
                'font-bold text-primary': isCurrentPath(item.href),
              })}
            >
              {item.name}
            </Link>

            {i < items.length - 1 && (
              <span className="block h-6 w-px shrink-0 bg-border" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle />

        <span className="block h-1 w-1 rounded-full bg-muted" />

        <Link href="/about">About</Link>
      </div>
    </nav>
  )
}
