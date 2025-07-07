import DashboardLayout from "@/components/dashboard-layout"
import AddPatientForm from "@/components/add-patient-form"

export default function AddPatientPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Patient</h1>
          <p className="text-gray-600">Enter patient information to create a new record</p>
        </div>

        <AddPatientForm />
      </div>
    </DashboardLayout>
  )
}
