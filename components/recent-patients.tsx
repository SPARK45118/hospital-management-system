"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getPatients, type Patient } from "@/lib/data-store"

export default function RecentPatients() {
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])

  useEffect(() => {
    const updatePatients = () => {
      const patients = getPatients()
      // Sort by last visit date and take the 4 most recent
      const sorted = patients
        .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
        .slice(0, 4)
      setRecentPatients(sorted)
    }

    updatePatients()

    // Update every 30 seconds
    const interval = setInterval(updatePatients, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {patient.firstName[0]}
                  {patient.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{patient.name}</p>
                <p className="text-sm text-gray-500">
                  Age {patient.age} • {patient.condition} • Pending: {patient.pendingAmount}
                </p>
                <p className="text-xs text-gray-400">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
              </div>
              <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
