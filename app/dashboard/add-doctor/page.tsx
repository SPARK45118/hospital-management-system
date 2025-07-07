import DashboardLayout from "@/components/dashboard-layout"
import AddDoctorForm from "@/components/add-doctor-form"

export default function AddDoctorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
          <p className="text-gray-600">Register a new doctor to the hospital system</p>
        </div>

        <AddDoctorForm />
      </div>
    </DashboardLayout>
  )
}
