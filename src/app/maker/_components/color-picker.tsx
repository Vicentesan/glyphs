'use client'

import { Paintbrush } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function PickerExample() {
  const [background, setBackground] = useState('#B4D455')

  return (
    <div
      className="preview flex h-full min-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  )
}

export function GradientPicker({
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

  const gradients = [
    'linear-gradient(to top left,#accbee,#e7f0fd)',
    'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to top left,#000000,#434343)',
    'linear-gradient(to top left,#09203f,#537895)',
    'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to top left,#f953c6,#b91d73)',
    'linear-gradient(to top left,#ee0979,#ff6a00)',
    'linear-gradient(to top left,#F00000,#DC281E)',
    'linear-gradient(to top left,#00c6ff,#0072ff)',
    'linear-gradient(to top left,#4facfe,#00f2fe)',
    'linear-gradient(to top left,#0ba360,#3cba92)',
    'linear-gradient(to top left,#FDFC47,#24FE41)',
    'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
  ]

  const defaultTab = useMemo(() => {
    if (background.includes('gradient')) return 'gradient'
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
              ></div>
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
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
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

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>

            <GradientButton background={background}>
              💡 Get more at{' '}
              <Link
                href="https://gradient.page/ui-gradients"
                className="font-bold hover:underline"
                target="_blank"
              >
                Gradient Page
              </Link>
            </GradientButton>
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

const GradientButton = ({
  background,
  children,
}: {
  background: string
  children: React.ReactNode
}) => {
  return (
    <div
      className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all"
      style={{ background }}
    >
      <div className="rounded-md bg-popover/80 p-1 text-center text-xs">
        {children}
      </div>
    </div>
  )
}
