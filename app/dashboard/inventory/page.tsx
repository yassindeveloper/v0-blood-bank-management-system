"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryTable } from "@/components/dashboard/inventory-table"
import { InventoryChart } from "@/components/dashboard/inventory-chart"
import { AddInventoryDialog } from "@/components/dashboard/add-inventory-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function InventoryPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.inventory}</h1>
        <Button onClick={() => setIsAddInventoryOpen(true)} className="bg-red-600 hover:bg-red-700">
          {t.addInventory}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.bloodInventory}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">{t.tableView}</TabsTrigger>
              <TabsTrigger value="chart">{t.chartView}</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <InventoryTable />
            </TabsContent>
            <TabsContent value="chart">
              <InventoryChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddInventoryDialog open={isAddInventoryOpen} onOpenChange={setIsAddInventoryOpen} />
    </div>
  )
}
