import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

export default function AppointmentsList() {
  const appointments = [
    {
      id: 1,
      patient: "Kavya Reddy",
      doctor: "Dr. Arjun Singh",
      time: "09:00 AM",
      type: "Consultation",
      status: "Confirmed",
      fee: "₹500",
    },
    {
      id: 2,
      patient: "Rohit Joshi",
      doctor: "Dr. Meera Nair",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
      fee: "₹300",
    },
    {
      id: 3,
      patient: "Deepika Agarwal",
      doctor: "Dr. Vikram Malhotra",
      time: "02:00 PM",
      type: "Surgery",
      status: "Confirmed",
      fee: "₹25,000",
    },
    {
      id: 4,
      patient: "Karan Verma",
      doctor: "Dr. Sneha Kapoor",
      time: "03:30 PM",
      type: "Check-up",
      status: "Cancelled",
      fee: "₹400",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{appointment.doctor}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{appointment.type}</span>
                <span className="text-sm font-medium text-green-600">{appointment.fee}</span>
                <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
