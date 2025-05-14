"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useTranslations } from "@/hooks/use-translations"
import { FileText, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface ReportPdfGeneratorProps {
  reportTypes?: Array<{
    value: string
    label: string
  }>
}

export default function ReportPdfGenerator({ reportTypes }: ReportPdfGeneratorProps) {
  const t = useTranslations()

  const defaultReportTypes = [
    { value: "donations", label: t.donationsReport },
    { value: "inventory", label: t.inventoryReport },
    { value: "patients", label: t.patientsReport },
  ]

  const reportTypeOptions = reportTypes || defaultReportTypes

  const [loading, setLoading] = useState(false)
  const [reportType, setReportType] = useState<string>(reportTypeOptions[0].value)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const generateReport = async () => {
    if (!reportType || !startDate || !endDate) return

    setLoading(true)

    try {
      // تحويل التواريخ إلى سلاسل ISO
      const startDateStr = format(startDate, "yyyy-MM-dd")
      const endDateStr = format(endDate, "yyyy-MM-dd")

      // استدعاء API لإنشاء PDF
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportType,
          startDate: startDateStr,
          endDate: endDateStr,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في إنشاء التقرير")
      }

      // تنزيل ملف PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportType}-report.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating report:", error)
      // هنا يمكنك إضافة إشعار خطأ
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.generateReports}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectReportType} />
              </SelectTrigger>
              <SelectContent>
                {reportTypeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <DatePicker date={startDate} setDate={setStartDate} placeholder={t.startDate} />
          </div>
          <div>
            <DatePicker date={endDate} setDate={setEndDate} placeholder={t.endDate} />
          </div>
          <div>
            <Button
              onClick={generateReport}
              className="w-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  {t.generateReport}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
