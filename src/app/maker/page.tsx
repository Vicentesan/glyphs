'use client'

import { CheckCircle2Icon, DownloadCloudIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { AnimatedBadge } from '@/components/animated-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { GradientPicker } from './_components/color-picker'

export default function MakerPage() {
  const [color, setColor] = useState('#B4D455')
  const [toBeUsedAsGlyphFillColor, setToBeUsedAsGlyphFillColor] = useState('')
  const [toBeUsedAsGlyphStrokeColor, setToBeUsedAsGlyphStrokeColor] =
    useState('')

  const { theme } = useTheme()

  useEffect(() => {
    if (color) {
      setToBeUsedAsGlyphFillColor(theme === 'dark' ? '#141414' : '#f9f9f9')
      setToBeUsedAsGlyphStrokeColor(theme === 'dark' ? '#f9f9f9' : '#141414')
    }
  }, [color, theme])

  return (
    <main className="flex justify-start gap-4 px-10 text-input">
      <Card className="h-fit w-1/3">
        <CardHeader className="flex items-start">
          <AnimatedBadge>Settings</AnimatedBadge>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="flex gap-5">
              <div className="space-y-2">
                <Label htmlFor="glyph-name">Glyph</Label>
                <Input
                  placeholder="Glyph name"
                  name="glyph-name"
                  className="w-52"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="glyph-size">Glyph Size</Label>
                <Input placeholder="128" name="glyph-size" className="w-24" />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex w-fit flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="has_spoilers" className="size-5 border-input" />
                  <Label
                    htmlFor="has_spoilers"
                    className="text-md text-muted-foreground hover:cursor-pointer"
                  >
                    Glyph Line
                  </Label>
                </div>

                <GradientPicker background={color} setBackground={setColor} />
              </div>

              <div className="mt-2 flex gap-5">
                <div className="w-24 space-y-2">
                  <Label htmlFor="glyph-line-width" className="w-full">
                    Line width
                  </Label>
                  <Input
                    placeholder="4"
                    name="glyph-line-width"
                    className="w-full"
                  />
                </div>
                <div className="w-16 space-y-2">
                  <Label htmlFor="glyph-size">Diameter</Label>
                  <Input
                    placeholder="0,4"
                    name="glyph-size"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <CheckCircle2Icon />
            Done
          </Button>
        </CardContent>
      </Card>

      <Card className="h-[calc(100vh-120px)] w-2/3">
        <CardHeader className="flex items-end">
          <AnimatedBadge>Output</AnimatedBadge>
        </CardHeader>

        <CardContent className="flex flex-col justify-between gap-4">
          <Card className="border-accent">
            <CardContent className="flex h-[729px] items-center justify-center rounded-xl bg-primary-foreground/70">
              <svg
                width="335"
                height="381"
                viewBox="0 0 335 381"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M152.5 3.00999L301.881 89.255V261.745L152.5 347.99L3.11928 261.745V89.255L152.5 3.00999Z"
                  fill={toBeUsedAsGlyphFillColor}
                  stroke={toBeUsedAsGlyphStrokeColor}
                  strokeWidth="3"
                />
              </svg>
            </CardContent>
          </Card>

          <Button className="w-full">
            <DownloadCloudIcon />
            Download it now
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
