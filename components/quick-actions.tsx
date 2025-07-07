"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Calendar, FileText, Stethoscope, Users, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Add New Patient",
      description: "Register a new patient",
      icon: UserPlus,
      href: "/dashboard/add-patient",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Schedule Appointment",
      description: "Book new appointment",
      icon: Calendar,
      href: "/dashboard/add-appointment",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Add Doctor",
      description: "Register new doctor",
      icon: Stethoscope,
      href: "/dashboard/add-doctor",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "View All Patients",
      description: "Manage patient records",
      icon: Users,
      href: "/dashboard/patients",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Medical Records",
      description: "Access patient records",
      icon: FileText,
      href: "/dashboard/records",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "System Settings",
      description: "Configure hospital settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-gray-100 text-gray-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 bg-transparent"
              onClick={() => router.push(action.href)}
            >
              <div className={`p-2 rounded-full ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
