import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentDonations } from "@/components/dashboard/recent-donations"
import { BloodInventory } from "@/components/dashboard/blood-inventory"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة التحكم</h1>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر عمليات التبرع</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentDonations />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مخزون الدم</CardTitle>
          </CardHeader>
          <CardContent>
            <BloodInventory />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
