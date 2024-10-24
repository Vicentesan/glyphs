'use client'

import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  setIsSearching: (value: boolean) => void
  isSearching: boolean

  setSearch: (value: string) => void
  search: string
}

export function SearchBox({
  setIsSearching,
  isSearching,
  setSearch,
  search,
}: SearchBoxProps) {
  return (
    <div className="relative w-52 text-muted-foreground transition-all duration-300 xs:w-80 md:w-[500px]">
      <SearchIcon
        className={cn('absolute left-2 top-[0.5rem] size-5', {
          hidden: isSearching,
        })}
      />
      <Input
        onChange={(e) => {
          setIsSearching(true)
          setSearch(e.target.value)
        }}
        value={search}
        placeholder="Search"
        className={cn('w-full pl-8', {
          'pl-2': isSearching,
        })}
      />
    </div>
  )
}
