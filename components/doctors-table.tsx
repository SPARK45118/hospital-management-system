"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Edit, Trash2, Eye, Phone, Mail, UserPlus, Stethoscope, Calendar, Users } from "lucide-react"
import { getDoctors, deleteDoctor, type Doctor } from "@/lib/data-store"
import DeleteConfirmationDialog from "./delete-confirmation-dialog"
import { useToast } from "@/hooks/use-toast"

export default function DoctorsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    doctor: Doctor | null
    isLoading: boolean
  }>({
    isOpen: false,
    doctor: null,
    isLoading: false,
  })

  const { toast } = useToast()

  useEffect(() => {
    const updateDoctors = () => {
      const allDoctors = getDoctors()
      setDoctors(allDoctors)
    }

    updateDoctors()

    // Update every 10 seconds to reflect real-time changes
    const interval = setInterval(updateDoctors, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteDoctor = async (doctor: Doctor) => {
    setDeleteDialog({
      isOpen: true,
      doctor,
      isLoading: false,
    })
  }

  const confirmDelete = async () => {
    if (!deleteDialog.doctor) return

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }))

    try {
      const success = deleteDoctor(deleteDialog.doctor.id)

      if (success) {
        // Update local state immediately
        setDoctors((prev) => prev.filter((d) => d.id !== deleteDialog.doctor!.id))

        toast({
          title: "Doctor Deleted",
          description: `${deleteDialog.doctor.name} has been successfully deleted. Patients assigned to this doctor have been marked as unassigned.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete doctor. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting doctor:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the doctor.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialog({
        isOpen: false,
        doctor: null,
        isLoading: false,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Busy":
        return "bg-yellow-100 text-yellow-800"
      case "In Surgery":
        return "bg-red-100 text-red-800"
      case "On Leave":
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
            <CardTitle>All Doctors ({doctors.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => (window.location.href = "/dashboard/add-doctor")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Doctor
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search doctors..."
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
                  <TableHead>Doctor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Patients Today</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">{doctor.qualification}</p>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.experience} years</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-32">{doctor.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{doctor.patientsToday}</TableCell>
                    <TableCell>{doctor.nextAppointment}</TableCell>
                    <TableCell className="font-medium text-green-600">₹{doctor.consultationFee}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedDoctor(doctor)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Doctor Details - {doctor.name}</DialogTitle>
                            </DialogHeader>
                            {selectedDoctor && <DoctorDetailsModal doctor={selectedDoctor} />}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteDoctor(doctor)}
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
        onClose={() => setDeleteDialog({ isOpen: false, doctor: null, isLoading: false })}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description="Are you sure you want to delete this doctor? This will also remove all their appointments and reassign their patients as 'Unassigned'."
        itemName={deleteDialog.doctor?.name || ""}
        isLoading={deleteDialog.isLoading}
      />
    </>
  )
}

function DoctorDetailsModal({ doctor }: { doctor: Doctor }) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Stethoscope className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Full Name:</strong> <span>{doctor.name}</span>
            </div>
            <div>
              <strong>Doctor ID:</strong> <span>{doctor.id}</span>
            </div>
            <div>
              <strong>Gender:</strong> <span>{doctor.gender}</span>
            </div>
            {doctor.dateOfBirth && (
              <div>
                <strong>Date of Birth:</strong> <span>{new Date(doctor.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
            <div>
              <strong>Join Date:</strong> <span>{new Date(doctor.joinDate).toLocaleDateString()}</span>
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
              <strong>Phone:</strong> <span>{doctor.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <strong>Email:</strong> <span>{doctor.email}</span>
            </div>
            <div>
              <strong>Address:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.address}</p>
            </div>
            <div className="border-t pt-3">
              <p>
                <strong>Emergency Contact:</strong> {doctor.emergencyContact}
              </p>
              <p>
                <strong>Emergency Phone:</strong> {doctor.emergencyPhone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <strong>Specialization:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
            </div>
            <div>
              <strong>Department:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.department}</p>
            </div>
            <div>
              <strong>Experience:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.experience} years</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Qualification:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.qualification}</p>
            </div>
            <div>
              <strong>License Number:</strong>
              <p className="text-sm text-gray-600 mt-1">{doctor.licenseNumber}</p>
            </div>
          </div>

          <div>
            <strong>Biography:</strong>
            <p className="text-sm text-gray-600 mt-1">{doctor.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Schedule & Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Schedule Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Working Hours:</strong>
              <span className="ml-2">{doctor.workingHours}</span>
            </div>
            <div>
              <strong>Availability:</strong>
              <span className="ml-2">{doctor.availability}</span>
            </div>
            <div>
              <strong>Current Status:</strong>
              <Badge className="ml-2 bg-green-100 text-green-800">{doctor.status}</Badge>
            </div>
            <div>
              <strong>Next Appointment:</strong>
              <span className="ml-2">{doctor.nextAppointment}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Consultation Fee:</strong>
              <span className="ml-2 text-green-600 font-medium">₹{doctor.consultationFee}</span>
            </div>
            <div>
              <strong>Patients Today:</strong>
              <span className="ml-2">{doctor.patientsToday}</span>
            </div>
            <div>
              <strong>Total Patients:</strong>
              <span className="ml-2">{doctor.totalPatients}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
