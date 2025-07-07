"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Clock, User, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AppointmentsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Kavya Reddy",
      doctor: "Dr. Arjun Singh",
      type: "Consultation",
      phone: "+91 98765 43215",
      status: "Confirmed",
      fee: "₹500",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Rohit Joshi",
      doctor: "Dr. Meera Nair",
      type: "Follow-up",
      phone: "+91 98765 43216",
      status: "Pending",
      fee: "₹300",
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Deepika Agarwal",
      doctor: "Dr. Vikram Malhotra",
      type: "Surgery",
      phone: "+91 98765 43217",
      status: "Confirmed",
      fee: "₹25,000",
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "Karan Verma",
      doctor: "Dr. Sneha Kapoor",
      type: "Check-up",
      phone: "+91 98765 43218",
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Appointments for {selectedDate?.toLocaleDateString()}</CardTitle>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/dashboard/add-appointment")}>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-red-600">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{appointment.type}</span>
                  <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
