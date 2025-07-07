"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Edit, Trash2, Eye, UserPlus, Phone, Mail, MapPin, Heart } from "lucide-react"
import { getPatients, deletePatient, type Patient } from "@/lib/data-store"
import DeleteConfirmationDialog from "./delete-confirmation-dialog"
import { useToast } from "@/hooks/use-toast"

export default function PatientsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    patient: Patient | null
    isLoading: boolean
  }>({
    isOpen: false,
    patient: null,
    isLoading: false,
  })

  const { toast } = useToast()

  useEffect(() => {
    const updatePatients = () => {
      const allPatients = getPatients()
      setPatients(allPatients)
    }

    updatePatients()

    // Update every 10 seconds to reflect real-time changes
    const interval = setInterval(updatePatients, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  const handleDeletePatient = async (patient: Patient) => {
    setDeleteDialog({
      isOpen: true,
      patient,
      isLoading: false,
    })
  }

  const confirmDelete = async () => {
    if (!deleteDialog.patient) return

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }))

    try {
      const success = deletePatient(deleteDialog.patient.id)

      if (success) {
        // Update local state immediately
        setPatients((prev) => prev.filter((p) => p.id !== deleteDialog.patient!.id))

        toast({
          title: "Patient Deleted",
          description: `${deleteDialog.patient.name} has been successfully deleted.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete patient. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting patient:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the patient.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialog({
        isOpen: false,
        patient: null,
        isLoading: false,
      })
    }
  }

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
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Patients ({patients.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => (window.location.href = "/dashboard/add-patient")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Patient
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.assignedDoctor}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{patient.age} years</p>
                        <p className="text-sm text-gray-500">{patient.gender}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-32">{patient.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{patient.condition}</p>
                        <p className="text-sm text-gray-500">Blood: {patient.bloodType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium text-orange-600">{patient.pendingAmount}</TableCell>
                    <TableCell>{patient.nextAppointment}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Patient Details - {patient.name}</DialogTitle>
                            </DialogHeader>
                            {selectedPatient && <PatientDetailsModal patient={selectedPatient} />}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeletePatient(patient)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, patient: null, isLoading: false })}
        onConfirm={confirmDelete}
        title="Delete Patient"
        description="Are you sure you want to delete this patient? This will also remove all their appointments and medical records."
        itemName={deleteDialog.patient?.name || ""}
        isLoading={deleteDialog.isLoading}
      />
    </>
  )
}

function PatientDetailsModal({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <strong>Full Name:</strong> <span>{patient.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <strong>Patient ID:</strong> <span>{patient.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <strong>Age:</strong> <span>{patient.age} years</span>
            </div>
            <div className="flex items-center space-x-2">
              <strong>Gender:</strong> <span>{patient.gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <strong>Date of Birth:</strong> <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <strong>Blood Type:</strong> <span>{patient.bloodType}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <strong>Phone:</strong> <span>{patient.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <strong>Email:</strong> <span>{patient.email}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 mt-1" />
              <div>
                <strong>Address:</strong>
                <p className="text-sm text-gray-600 mt-1">{patient.address}</p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p>
                <strong>Emergency Contact:</strong> {patient.emergencyContact}
              </p>
              <p>
                <strong>Emergency Phone:</strong> {patient.emergencyPhone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Current Condition:</strong>
              <p className="text-sm text-gray-600 mt-1">{patient.condition}</p>
            </div>
            <div>
              <strong>Assigned Doctor:</strong>
              <p className="text-sm text-gray-600 mt-1">{patient.assignedDoctor}</p>
            </div>
          </div>

          <div>
            <strong>Allergies:</strong>
            <p className="text-sm text-gray-600 mt-1">{patient.allergies || "None known"}</p>
          </div>

          <div>
            <strong>Medical History:</strong>
            <p className="text-sm text-gray-600 mt-1">{patient.medicalHistory}</p>
          </div>

          <div>
            <strong>Additional Notes:</strong>
            <p className="text-sm text-gray-600 mt-1">{patient.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Treatment & Financial Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Treatment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Status:</strong>
              <Badge className="ml-2 bg-green-100 text-green-800">{patient.status}</Badge>
            </div>
            <div>
              <strong>Admission Date:</strong>
              <span className="ml-2">{new Date(patient.admissionDate).toLocaleDateString()}</span>
            </div>
            <div>
              <strong>Last Visit:</strong>
              <span className="ml-2">{new Date(patient.lastVisit).toLocaleDateString()}</span>
            </div>
            <div>
              <strong>Next Appointment:</strong>
              <span className="ml-2">{patient.nextAppointment}</span>
            </div>
            <div>
              <strong>Total Visits:</strong>
              <span className="ml-2">{patient.totalVisits}</span>
            </div>
            {patient.roomNumber && (
              <div>
                <strong>Room Number:</strong>
                <span className="ml-2">{patient.roomNumber}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Insurance:</strong>
              <span className="ml-2">{patient.insurance}</span>
            </div>
            <div>
              <strong>Total Amount Paid:</strong>
              <span className="ml-2 text-green-600 font-medium">{patient.totalAmountPaid}</span>
            </div>
            <div>
              <strong>Pending Amount:</strong>
              <span className="ml-2 text-orange-600 font-medium">{patient.pendingAmount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
