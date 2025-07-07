import DashboardLayout from "@/components/dashboard-layout"
import DoctorsTable from "@/components/doctors-table"

export default function DoctorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
            <p className="text-gray-600">Manage doctor profiles and schedules</p>
          </div>
        </div>

        <DoctorsTable />
      </div>
    </DashboardLayout>
  )
}
