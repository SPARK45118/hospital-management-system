import DashboardLayout from "@/components/dashboard-layout"
import DashboardStats from "@/components/dashboard-stats"
import RecentPatients from "@/components/recent-patients"
import AppointmentsList from "@/components/appointments-list"
import QuickActions from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your hospital today.</p>
        </div>

        <DashboardStats />

        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPatients />
          <AppointmentsList />
        </div>
      </div>
    </DashboardLayout>
  )
}
