"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, User, Stethoscope } from "lucide-react"
import { format } from "date-fns"

export default function AddAppointmentForm() {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    appointmentDate: undefined as Date | undefined,
    appointmentTime: "",
    appointmentType: "",
    reason: "",
    notes: "",
    priority: "normal",
    duration: "30",
  })

  const router = useRouter()

  // Sample data - in real app, this would come from your database
  const patients = [
    { id: "P001", name: "Rajesh Kumar", phone: "+91 98765 43210" },
    { id: "P002", name: "Priya Sharma", phone: "+91 98765 43211" },
    { id: "P003", name: "Amit Patel", phone: "+91 98765 43212" },
    { id: "P004", name: "Sunita Gupta", phone: "+91 98765 43213" },
    { id: "P005", name: "Vikash Singh", phone: "+91 98765 43214" },
  ]

  const doctors = [
    { id: "D001", name: "Dr. Arjun Singh", specialization: "Cardiology", fee: "₹800" },
    { id: "D002", name: "Dr. Meera Nair", specialization: "Pediatrics", fee: "₹600" },
    { id: "D003", name: "Dr. Vikram Malhotra", specialization: "Surgery", fee: "₹1200" },
    { id: "D004", name: "Dr. Sneha Kapoor", specialization: "Gynecology", fee: "₹700" },
    { id: "D005", name: "Dr. Ravi Agarwal", specialization: "Orthopedics", fee: "₹900" },
  ]

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ]

  const appointmentTypes = ["Consultation", "Follow-up", "Check-up", "Surgery", "Emergency", "Vaccination", "Lab Test"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
      alert("Please fill in all required fields")
      return
    }

    // Here you would typically send the data to your backend API
    console.log("Appointment data:", formData)

    // Simulate successful submission
    alert("Appointment scheduled successfully!")
    router.push("/dashboard/appointments")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    setFormData((prev) => ({
      ...prev,
      patientId,
      patientName: patient?.name || "",
    }))
  }

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId)
    setFormData((prev) => ({
      ...prev,
      doctorId,
      doctorName: doctor?.name || "",
    }))
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-6 w-6 text-red-600" />
          <span>Appointment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Select Patient *</Label>
              <Select value={formData.patientId} onValueChange={handlePatientSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>
                          {patient.name} ({patient.id})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor *</Label>
              <Select value={formData.doctorId} onValueChange={handleDoctorSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="h-4 w-4" />
                        <span>
                          {doctor.name} - {doctor.specialization} ({doctor.fee})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Appointment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.appointmentDate ? format(formData.appointmentDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, appointmentDate: date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Appointment Time *</Label>
              <Select
                value={formData.appointmentTime}
                onValueChange={(value) => handleInputChange("appointmentTime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type *</Label>
              <Select
                value={formData.appointmentType}
                onValueChange={(value) => handleInputChange("appointmentType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit *</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              placeholder="Brief description of the reason for appointment"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional information or special requirements..."
              rows={4}
            />
          </div>

          {/* Summary Card */}
          {formData.patientName && formData.doctorName && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-red-800 mb-2">Appointment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Patient:</strong> {formData.patientName}
                    </p>
                    <p>
                      <strong>Doctor:</strong> {formData.doctorName}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Date:</strong>{" "}
                      {formData.appointmentDate ? format(formData.appointmentDate, "PPP") : "Not selected"}
                    </p>
                    <p>
                      <strong>Time:</strong> {formData.appointmentTime || "Not selected"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
