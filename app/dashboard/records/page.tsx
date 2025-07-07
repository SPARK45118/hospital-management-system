import DashboardLayout from "@/components/dashboard-layout"
import MedicalRecords from "@/components/medical-records"

export default function MedicalRecordsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600">Patient medical history and treatment records</p>
          </div>
        </div>

        <MedicalRecords />
      </div>
    </DashboardLayout>
  )
}
