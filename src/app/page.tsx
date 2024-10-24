'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { SearchBox } from '@/components/search'
import { cn } from '@/lib/utils'
import { glyphs } from '@/utils/glyphs'

export default function Home() {
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (search === '') {
      setIsSearching(false)
    }
  }, [search])

  const sortedGlyphs = isSearching
    ? glyphs
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((glyph) =>
          glyph.name.toLowerCase().includes(search.toLowerCase()),
        )
    : glyphs.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="flex flex-col items-center justify-center px-10">
      <SearchBox
        setIsSearching={setIsSearching}
        isSearching={isSearching}
        setSearch={setSearch}
        search={search}
      />

      <ul
        className={cn('mt-[50px] gap-8', {
          'flex items-center justify-center':
            Math.floor(sortedGlyphs.length / 3) >= 1,
          'grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9':
            sortedGlyphs.length >= 9,
        })}
      >
        {sortedGlyphs.map((glyph) => (
          <li
            key={glyph.file}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Image
              src={glyph.file}
              width={128}
              height={128}
              alt=""
              className="border"
            />
            <span>{glyph.name}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
