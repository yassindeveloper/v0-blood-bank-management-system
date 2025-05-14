"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function InventoryChart() {
  const { language } = useLanguage()
  const t = translations[language]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // In a real app, this data would come from your API
  const inventory = [
    { type: "A+", units: 45 },
    { type: "A-", units: 12 },
    { type: "B+", units: 30 },
    { type: "B-", units: 8 },
    { type: "AB+", units: 15 },
    { type: "AB-", units: 5 },
    { type: "O+", units: 50 },
    { type: "O-", units: 10 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / inventory.length - 10
    const maxValue = Math.max(...inventory.map((item) => item.units))
    const scale = chartHeight / maxValue

    // Draw bars
    inventory.forEach((item, index) => {
      const x = 40 + index * (barWidth + 10)
      const barHeight = item.units * scale
      const y = canvas.height - 40 - barHeight

      // Draw bar
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw blood type label
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.type, x + barWidth / 2, canvas.height - 20)

      // Draw value on top of bar
      ctx.fillStyle = "#000000"
      ctx.textAlign = "center"
      ctx.fillText(item.units.toString(), x + barWidth / 2, y - 5)
    })

    // Draw axes
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.moveTo(30, 20)
    ctx.lineTo(30, canvas.height - 30)
    ctx.lineTo(canvas.width - 20, canvas.height - 30)
    ctx.stroke()

    // Draw y-axis label
    ctx.save()
    ctx.translate(15, canvas.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText(t.quantity, 0, 0)
    ctx.restore()

    // Draw x-axis label
    ctx.textAlign = "center"
    ctx.fillText(t.bloodGroup, canvas.width / 2, canvas.height - 5)
  }, [inventory, t])

  return (
    <div className="w-full h-80">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
