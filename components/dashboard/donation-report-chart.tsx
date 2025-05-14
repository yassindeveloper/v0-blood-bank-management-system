"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function DonationReportChart() {
  const { language } = useLanguage()
  const t = translations[language]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // In a real app, this data would come from your API
  const monthlyDonations = [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 52 },
    { month: "Mar", count: 38 },
    { month: "Apr", count: 65 },
    { month: "May", count: 70 },
    { month: "Jun", count: 55 },
    { month: "Jul", count: 60 },
    { month: "Aug", count: 80 },
    { month: "Sep", count: 75 },
    { month: "Oct", count: 90 },
    { month: "Nov", count: 85 },
    { month: "Dec", count: 95 },
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
    const lineWidth = 3
    const maxValue = Math.max(...monthlyDonations.map((item) => item.count))
    const scale = chartHeight / maxValue
    const pointRadius = 5

    // Draw line chart
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = lineWidth
    ctx.beginPath()

    monthlyDonations.forEach((item, index) => {
      const x = 40 + index * (chartWidth / (monthlyDonations.length - 1))
      const y = canvas.height - 40 - item.count * scale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw points
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw month labels
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x, canvas.height - 20)

      // Draw value above points
      ctx.fillStyle = "#000000"
      ctx.textAlign = "center"
      ctx.fillText(item.count.toString(), x, y - 15)
    })

    ctx.stroke()

    // Draw axes
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
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
    ctx.fillText("Donations", 0, 0)
    ctx.restore()

    // Draw x-axis label
    ctx.textAlign = "center"
    ctx.fillText("Month", canvas.width / 2, canvas.height - 5)
  }, [monthlyDonations])

  return (
    <div className="w-full h-80">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
