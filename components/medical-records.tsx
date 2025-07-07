"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Calendar, User, Stethoscope } from "lucide-react"

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("")

  const medicalRecords = [
    {
      id: "MR001",
      patientId: "P001",
      patientName: "Rajesh Kumar",
      doctorName: "Dr. Arjun Singh",
      date: "2024-01-15",
      diagnosis: "Hypertension",
      treatment: "ACE inhibitors prescribed",
      prescription: "Lisinopril 10mg daily",
      notes: "Blood pressure controlled, follow-up in 2 weeks",
      status: "Active",
      nextVisit: "2024-01-29",
    },
    {
      id: "MR002",
      patientId: "P002",
      patientName: "Priya Sharma",
      doctorName: "Dr. Meera Nair",
      date: "2024-01-14",
      diagnosis: "Type 2 Diabetes",
      treatment: "Insulin therapy adjustment",
      prescription: "Metformin 500mg twice daily",
      notes: "HbA1c levels improving, continue current medication",
      status: "Active",
      nextVisit: "2024-01-28",
    },
    {
      id: "MR003",
      patientId: "P003",
      patientName: "Amit Patel",
      doctorName: "Dr. Vikram Malhotra",
      date: "2024-01-13",
      diagnosis: "Coronary Artery Disease",
      treatment: "Cardiac catheterization performed",
      prescription: "Aspirin 75mg, Atorvastatin 20mg",
      notes: "Stent placement successful, strict diet and exercise regimen",
      status: "Critical",
      nextVisit: "2024-01-20",
    },
    {
      id: "MR004",
      patientId: "P004",
      patientName: "Sunita Gupta",
      doctorName: "Dr. Sneha Kapoor",
      date: "2024-01-12",
      diagnosis: "Prenatal Care - 28 weeks",
      treatment: "Routine prenatal checkup",
      prescription: "Folic acid, Iron supplements",
      notes: "Baby development normal, mother healthy",
      status: "Active",
      nextVisit: "2024-01-26",
    },
  ]

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Medical Records</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <FileText className="h-4 w-4 mr-2" />
                New Record
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">{record.patientName}</h3>
                        <p className="text-sm text-gray-600">Record ID: {record.id}</p>
                      </div>
                      <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{record.date}</span>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="diagnosis" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                      <TabsTrigger value="treatment">Treatment</TabsTrigger>
                      <TabsTrigger value="prescription">Prescription</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="diagnosis" className="mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4 text-red-600" />
                          <span className="font-medium">Diagnosis:</span>
                        </div>
                        <p className="text-gray-700 ml-6">{record.diagnosis}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Diagnosed by: {record.doctorName}</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="mt-4">
                      <div className="space-y-2">
                        <span className="font-medium">Treatment Plan:</span>
                        <p className="text-gray-700">{record.treatment}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="prescription" className="mt-4">
                      <div className="space-y-2">
                        <span className="font-medium">Prescribed Medication:</span>
                        <p className="text-gray-700">{record.prescription}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-4">
                      <div className="space-y-2">
                        <span className="font-medium">Doctor's Notes:</span>
                        <p className="text-gray-700">{record.notes}</p>
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm text-yellow-800">
                            <strong>Next Visit:</strong> {record.nextVisit}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
