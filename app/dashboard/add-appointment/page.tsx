import DashboardLayout from "@/components/dashboard-layout"
import AddAppointmentForm from "@/components/add-appointment-form"

export default function AddAppointmentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule New Appointment</h1>
          <p className="text-gray-600">Book a new appointment for a patient</p>
        </div>

        <AddAppointmentForm />
      </div>
    </DashboardLayout>
  )
}
