import DashboardLayout from "@/components/dashboard-layout"
import AppointmentsCalendar from "@/components/appointments-calendar"

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage and schedule patient appointments</p>
          </div>
        </div>

        <AppointmentsCalendar />
      </div>
    </DashboardLayout>
  )
}
