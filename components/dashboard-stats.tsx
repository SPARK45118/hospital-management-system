"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Bed, Activity } from "lucide-react"
import { getPatients, getDoctors, getAppointments } from "@/lib/data-store"

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    availableBeds: 18,
    activeStaff: 0,
  })

  useEffect(() => {
    const updateStats = () => {
      const patients = getPatients()
      const doctors = getDoctors()
      const appointments = getAppointments()

      const today = new Date().toISOString().split("T")[0]
      const todayAppointments = appointments.filter(
        (apt) => apt.appointmentDate === today && apt.status !== "Cancelled",
      ).length

      const activePatients = patients.filter((p) => p.status === "Active").length
      const activeDoctors = doctors.filter((d) => d.status !== "On Leave").length

      setStats({
        totalPatients: patients.length,
        todayAppointments: todayAppointments,
        availableBeds: Math.max(0, 50 - Math.floor(activePatients * 0.3)), // Dynamic bed calculation
        activeStaff: activeDoctors + 45, // Doctors + other staff
      })
    }

    updateStats()

    // Update stats every 30 seconds
    const interval = setInterval(updateStats, 30000)

    return () => clearInterval(interval)
  }, [])

  const statsData = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toLocaleString(),
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments.toString(),
      change: "+8%",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Available Beds",
      value: stats.availableBeds.toString(),
      change: stats.availableBeds > 20 ? "+5%" : "-8%",
      changeType: stats.availableBeds > 20 ? "positive" : "negative",
      icon: Bed,
    },
    {
      title: "Active Staff",
      value: stats.activeStaff.toString(),
      change: "+2%",
      changeType: "positive",
      icon: Activity,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
