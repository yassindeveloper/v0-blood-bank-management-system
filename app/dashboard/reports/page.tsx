"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { DonationReportChart } from "@/components/dashboard/donation-report-chart"
import { InventoryReportChart } from "@/components/dashboard/inventory-report-chart"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function ReportsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [reportType, setReportType] = useState("donations")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const generateReport = () => {
    console.log("Generating report:", { reportType, startDate, endDate })
    // In a real app, this would generate and possibly download a report
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.reports}</h1>

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
                  <SelectItem value="donations">{t.donationsReport}</SelectItem>
                  <SelectItem value="inventory">{t.inventoryReport}</SelectItem>
                  <SelectItem value="patients">{t.patientsReport}</SelectItem>
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
              <Button onClick={generateReport} className="w-full bg-red-600 hover:bg-red-700">
                {t.generateReport}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="donations">
            <TabsList className="mb-4">
              <TabsTrigger value="donations">{t.donationsReport}</TabsTrigger>
              <TabsTrigger value="inventory">{t.inventoryReport}</TabsTrigger>
            </TabsList>
            <TabsContent value="donations">
              <DonationReportChart />
            </TabsContent>
            <TabsContent value="inventory">
              <InventoryReportChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
