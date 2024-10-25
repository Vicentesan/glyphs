'use client'

import { ResetIcon } from '@radix-ui/react-icons'
import { DownloadCloudIcon, ListRestart } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { AnimatedBadge } from '@/components/animated-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ColorPicker } from './_components/color-picker'

export default function MakerPage() {
  const [lineColor, setLineColor] = useState('#E2E2E2')
  const [toBeUsedAsGlyphFillColor, setToBeUsedAsGlyphFillColor] = useState('')
  const [toBeUsedAsGlyphStrokeColor, setToBeUsedAsGlyphStrokeColor] =
    useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [glyphSize, setGlyphSize] = useState(420)
  const [lineWidth, setLineWidth] = useState(4)
  const [showLine, setShowLine] = useState(true)
  const [dotSize, setDotSize] = useState(16)

  const { theme } = useTheme()

  useEffect(() => {
    if (lineColor) {
      setToBeUsedAsGlyphFillColor(theme === 'dark' ? '#141414' : '#f9f9f9')
      setToBeUsedAsGlyphStrokeColor(theme === 'dark' ? '#f9f9f9' : '#141414')

      if (
        lineColor.toLocaleUpperCase() === '#E2E2E2' ||
        lineColor === '#141414'
      ) {
        setLineColor(theme === 'dark' ? '#E2E2E2' : '#141414')
      }
    }
  }, [
    lineColor,
    theme,
    glyphSize,
    lineWidth,
    showLine,
    toBeUsedAsGlyphFillColor,
    toBeUsedAsGlyphStrokeColor,
    dotSize,
  ])

  const drawConnectingLine = (
    ctx: CanvasRenderingContext2D,
    positions: { x: number; y: number }[],
  ) => {
    if (positions.length < 2) return

    ctx.beginPath()
    ctx.moveTo(positions[0].x, positions[0].y)

    // Liga cada ponto ao próximo
    for (let i = 1; i < positions.length; i++) {
      ctx.lineTo(positions[i].x, positions[i].y)
    }

    // Fecha a forma conectando o último ponto ao primeiro
    ctx.closePath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  const drawGlowingDot = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
  ) => {
    // Inner dot
    ctx.beginPath()
    ctx.fillStyle = theme === 'dark' ? '#f9f9f9' : '#141414'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    // Subtle glow
    const gradient = ctx.createRadialGradient(
      x,
      y,
      radius * 0.5,
      x,
      y,
      radius * 2,
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const calculateDotPositions = (
    centerX: number,
    centerY: number,
    hexRadius: number,
  ) => {
    // Calculate the positions for all dots
    const positions = [
      // Center dot
      { x: 0, y: 0 },

      // Diamond pattern dots (aligned with outer dots)
      { x: -0.325, y: -0.1875 }, // Top left (aligned with outer top-left)
      { x: 0.325, y: -0.1875 }, // Top right (aligned with outer top-right)
      { x: 0.325, y: 0.1875 }, // Bottom right (aligned with outer bottom-right)
      { x: -0.325, y: 0.1875 }, // Bottom left (aligned with outer bottom-left)

      // Outer ring dots (unchanged)
      { x: 0, y: -0.75 }, // Top
      { x: 0.65, y: -0.375 }, // Top right
      { x: 0.65, y: 0.375 }, // Bottom right
      { x: 0, y: 0.75 }, // Bottom
      { x: -0.65, y: 0.375 }, // Bottom left
      { x: -0.65, y: -0.375 }, // Top left
    ]

    return positions.map((pos) => ({
      x: centerX + pos.x * hexRadius,
      y: centerY + pos.y * hexRadius,
    }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = glyphSize * 2
    canvas.width = size
    canvas.height = size
    canvas.style.width = `${glyphSize}px`
    canvas.style.height = `${glyphSize}px`

    ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = toBeUsedAsGlyphFillColor
    ctx.fillRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const hexRadius = (size / 2) * 0.8

    if (showLine) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2
        const x = centerX + hexRadius * Math.cos(angle)
        const y = centerY + hexRadius * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = toBeUsedAsGlyphStrokeColor
      ctx.lineWidth = lineWidth * 2
      ctx.stroke()
    }

    const dotPositions = calculateDotPositions(centerX, centerY, hexRadius)
    dotPositions.forEach((pos) => {
      drawGlowingDot(ctx, pos.x, pos.y, dotSize)
    })

    // Chame a função para ligar os pontos
    drawConnectingLine(ctx, dotPositions)
  }, [
    lineColor,
    glyphSize,
    lineWidth,
    showLine,
    toBeUsedAsGlyphFillColor,
    toBeUsedAsGlyphStrokeColor,
    dotSize,
  ])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'glyph.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <main className="flex h-screen justify-start gap-4 px-10 text-input">
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
                <Input
                  placeholder="420"
                  name="glyph-size"
                  className="w-24"
                  type="number"
                  value={glyphSize}
                  onChange={(e) => setGlyphSize(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex w-fit flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_spoilers"
                    className="size-5 border-input"
                    checked={showLine}
                    onCheckedChange={() => setShowLine(!showLine)}
                  />
                  <Label
                    htmlFor="has_spoilers"
                    className="text-md text-muted-foreground hover:cursor-pointer"
                  >
                    Glyph Line
                  </Label>
                </div>

                <ColorPicker
                  background={lineColor}
                  setBackground={setLineColor}
                />
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
                    type="number"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label htmlFor="dot-size">Dot Size</Label>
                  <Input
                    placeholder="16"
                    name="dot-size"
                    className="w-full"
                    type="number"
                    value={dotSize}
                    onChange={(e) => setDotSize(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="secondary" className="w-1/2">
              <ListRestart />
              Reset
            </Button>
            <Button variant="secondary" className="w-1/2">
              <ResetIcon />
              Undo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit w-2/3">
        <CardHeader className="flex items-end">
          <AnimatedBadge>Output</AnimatedBadge>
        </CardHeader>

        <CardContent className="flex flex-col justify-between gap-4">
          <Card className="border-accent">
            <CardContent className="flex h-[640px] items-center justify-center rounded-xl bg-primary-foreground/70">
              <canvas ref={canvasRef} className="max-w-full" />
            </CardContent>
          </Card>

          <Button className="mt-1 w-full" onClick={handleDownload}>
            <DownloadCloudIcon />
            Download it now
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
