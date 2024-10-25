'use client'

import { Paintbrush } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function ColorPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const defaultTab = useMemo(() => {
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex w-32 items-center justify-center',
            !background && 'text-muted-foreground',
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="size-4 rounded !bg-cover !bg-center transition-all"
                style={{ background }}
              />
            ) : (
              <Paintbrush className="size-4" />
            )}
            <div className="flex-1 truncate">{background || 'Color'}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-16 w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
