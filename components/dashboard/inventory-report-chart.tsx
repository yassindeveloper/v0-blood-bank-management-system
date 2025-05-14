"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function InventoryReportChart() {
  const { language } = useLanguage()
  const t = translations[language]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // In a real app, this data would come from your API
  const bloodTypeDistribution = [
    { type: "A+", percentage: 35 },
    { type: "A-", percentage: 6 },
    { type: "B+", percentage: 8 },
    { type: "B-", percentage: 2 },
    { type: "AB+", percentage: 3 },
    { type: "AB-", percentage: 1 },
    { type: "O+", percentage: 38 },
    { type: "O-", percentage: 7 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set chart dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"]

    // Draw pie chart
    bloodTypeDistribution.forEach((item, index) => {
      const sliceAngle = (item.percentage / 100) * 2 * Math.PI
      const endAngle = startAngle + sliceAngle

      ctx.fillStyle = colors[index % colors.length]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()

      // Draw labels
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(item.type, labelX, labelY)

      // Draw percentage
      const percentageRadius = radius * 1.1
      const percentageX = centerX + Math.cos(midAngle) * percentageRadius
      const percentageY = centerY + Math.sin(midAngle) * percentageRadius

      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText(`${item.percentage}%`, percentageX, percentageY)

      startAngle = endAngle
    })

    // Draw title
    ctx.fillStyle = "#000000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Blood Type Distribution", centerX, 20)
  }, [bloodTypeDistribution])

  return (
    <div className="w-full h-80">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
