import DashboardLayout from "@/components/dashboard-layout"
import PatientsTable from "@/components/patients-table"

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600">Manage all patient records and information</p>
          </div>
        </div>

        <PatientsTable />
      </div>
    </DashboardLayout>
  )
}
