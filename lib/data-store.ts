// Data store utilities for managing hospital data
export interface Patient {
  id: string
  firstName: string
  lastName: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  dateOfBirth: string
  bloodType: string
  allergies: string
  medicalHistory: string
  emergencyContact: string
  emergencyPhone: string
  insurance: string
  condition: string
  status: string
  lastVisit: string
  pendingAmount: string
  nextAppointment: string
  admissionDate: string
  roomNumber?: string
  assignedDoctor: string
  totalVisits: number
  totalAmountPaid: string
  notes: string
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  phone: string
  dateOfBirth?: string
  gender: string
  specialization: string
  qualification: string
  experience: string
  licenseNumber: string
  consultationFee: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  department: string
  workingHours: string
  availability: string
  bio: string
  status: string
  patientsToday: number
  nextAppointment: string
  totalPatients: number
  joinDate: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  appointmentDate: string
  appointmentTime: string
  appointmentType: string
  reason: string
  notes: string
  priority: string
  duration: string
  status: string
  fee: string
  createdAt: string
}

// Initialize default data
const defaultPatients: Patient[] = [
  {
    id: "P001",
    firstName: "Rajesh",
    lastName: "Kumar",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Mumbai, Maharashtra 400001",
    dateOfBirth: "1979-03-15",
    bloodType: "B+",
    allergies: "Penicillin, Dust",
    medicalHistory: "Hypertension since 2018, Family history of diabetes",
    emergencyContact: "Sunita Kumar (Wife)",
    emergencyPhone: "+91 98765 43220",
    insurance: "Star Health Insurance",
    condition: "Hypertension",
    status: "Active",
    lastVisit: "2024-01-15",
    pendingAmount: "₹2,500",
    nextAppointment: "2024-01-20",
    admissionDate: "2023-05-10",
    roomNumber: "A-101",
    assignedDoctor: "Dr. Arjun Singh",
    totalVisits: 12,
    totalAmountPaid: "₹45,000",
    notes: "Regular follow-up required for blood pressure monitoring",
  },
  {
    id: "P002",
    firstName: "Priya",
    lastName: "Sharma",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    phone: "+91 98765 43211",
    email: "priya.sharma@email.com",
    address: "456 Park Street, Delhi, Delhi 110001",
    dateOfBirth: "1992-07-22",
    bloodType: "A+",
    allergies: "None known",
    medicalHistory: "Type 2 Diabetes diagnosed in 2020",
    emergencyContact: "Amit Sharma (Husband)",
    emergencyPhone: "+91 98765 43221",
    insurance: "HDFC ERGO Health",
    condition: "Diabetes",
    status: "Active",
    lastVisit: "2024-01-14",
    pendingAmount: "₹1,800",
    nextAppointment: "2024-01-18",
    admissionDate: "2023-08-15",
    assignedDoctor: "Dr. Meera Nair",
    totalVisits: 8,
    totalAmountPaid: "₹32,000",
    notes: "Insulin dosage adjusted, diet plan provided",
  },
  {
    id: "P003",
    firstName: "Amit",
    lastName: "Patel",
    name: "Amit Patel",
    age: 58,
    gender: "Male",
    phone: "+91 98765 43212",
    email: "amit.patel@email.com",
    address: "789 Gandhi Nagar, Ahmedabad, Gujarat 380001",
    dateOfBirth: "1966-11-08",
    bloodType: "O+",
    allergies: "Aspirin, Shellfish",
    medicalHistory: "Coronary artery disease, Previous MI in 2022",
    emergencyContact: "Kavita Patel (Wife)",
    emergencyPhone: "+91 98765 43222",
    insurance: "Bajaj Allianz Health",
    condition: "Heart Disease",
    status: "Critical",
    lastVisit: "2024-01-13",
    pendingAmount: "₹15,000",
    nextAppointment: "2024-01-16",
    admissionDate: "2024-01-10",
    roomNumber: "ICU-3",
    assignedDoctor: "Dr. Vikram Malhotra",
    totalVisits: 25,
    totalAmountPaid: "₹2,50,000",
    notes: "Post-surgery recovery, requires intensive monitoring",
  },
]

const defaultDoctors: Doctor[] = [
  {
    id: "D001",
    firstName: "Arjun",
    lastName: "Singh",
    name: "Dr. Arjun Singh",
    email: "arjun.singh@arogyahospital.com",
    phone: "+91 98765 11111",
    dateOfBirth: "1975-04-12",
    gender: "Male",
    specialization: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "15",
    licenseNumber: "MCI-12345",
    consultationFee: "800",
    address: "Plot 123, Bandra West, Mumbai, Maharashtra 400050",
    emergencyContact: "Meera Singh (Wife)",
    emergencyPhone: "+91 98765 11112",
    department: "Cardiology",
    workingHours: "9:00 AM - 5:00 PM",
    availability: "Monday to Friday",
    bio: "Experienced cardiologist with expertise in interventional cardiology and heart disease management.",
    status: "Available",
    patientsToday: 12,
    nextAppointment: "10:30 AM",
    totalPatients: 450,
    joinDate: "2015-06-01",
  },
  {
    id: "D002",
    firstName: "Meera",
    lastName: "Nair",
    name: "Dr. Meera Nair",
    email: "meera.nair@arogyahospital.com",
    phone: "+91 98765 22222",
    dateOfBirth: "1980-09-25",
    gender: "Female",
    specialization: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "12",
    licenseNumber: "MCI-23456",
    consultationFee: "600",
    address: "Flat 456, Koramangala, Bangalore, Karnataka 560034",
    emergencyContact: "Rajesh Nair (Husband)",
    emergencyPhone: "+91 98765 22223",
    department: "Pediatrics",
    workingHours: "8:00 AM - 4:00 PM",
    availability: "Monday to Saturday",
    bio: "Pediatric specialist with focus on child development and preventive healthcare.",
    status: "Busy",
    patientsToday: 18,
    nextAppointment: "11:00 AM",
    totalPatients: 320,
    joinDate: "2018-03-15",
  },
]

const defaultAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Rajesh Kumar",
    doctorId: "D001",
    doctorName: "Dr. Arjun Singh",
    appointmentDate: "2024-01-20",
    appointmentTime: "10:30 AM",
    appointmentType: "Follow-up",
    reason: "Blood pressure check",
    notes: "Regular monitoring appointment",
    priority: "normal",
    duration: "30",
    status: "Confirmed",
    fee: "₹800",
    createdAt: "2024-01-15",
  },
]

// Utility functions
export const getPatients = (): Patient[] => {
  if (typeof window === "undefined") return defaultPatients
  const stored = localStorage.getItem("hospital_patients")
  return stored ? JSON.parse(stored) : defaultPatients
}

export const setPatients = (patients: Patient[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("hospital_patients", JSON.stringify(patients))
  }
}

export const addPatient = (patient: Omit<Patient, "id">): Patient => {
  const patients = getPatients()
  const newId = `P${String(patients.length + 1).padStart(3, "0")}`
  const newPatient: Patient = { ...patient, id: newId }
  const updatedPatients = [...patients, newPatient]
  setPatients(updatedPatients)
  return newPatient
}

export const deletePatient = (patientId: string): boolean => {
  try {
    const patients = getPatients()
    const updatedPatients = patients.filter((patient) => patient.id !== patientId)
    setPatients(updatedPatients)

    // Also remove related appointments
    const appointments = getAppointments()
    const updatedAppointments = appointments.filter((apt) => apt.patientId !== patientId)
    setAppointments(updatedAppointments)

    return true
  } catch (error) {
    console.error("Error deleting patient:", error)
    return false
  }
}

export const getDoctors = (): Doctor[] => {
  if (typeof window === "undefined") return defaultDoctors
  const stored = localStorage.getItem("hospital_doctors")
  return stored ? JSON.parse(stored) : defaultDoctors
}

export const setDoctors = (doctors: Doctor[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("hospital_doctors", JSON.stringify(doctors))
  }
}

export const addDoctor = (doctor: Omit<Doctor, "id">): Doctor => {
  const doctors = getDoctors()
  const newId = `D${String(doctors.length + 1).padStart(3, "0")}`
  const newDoctor: Doctor = { ...doctor, id: newId }
  const updatedDoctors = [...doctors, newDoctor]
  setDoctors(updatedDoctors)
  return newDoctor
}

export const deleteDoctor = (doctorId: string): boolean => {
  try {
    const doctors = getDoctors()
    const doctorToDelete = doctors.find((doctor) => doctor.id === doctorId)

    if (!doctorToDelete) {
      return false
    }

    // Remove doctor from doctors list
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId)
    setDoctors(updatedDoctors)

    // Update patients assigned to this doctor
    const patients = getPatients()
    const updatedPatients = patients.map((patient) => {
      if (patient.assignedDoctor === doctorToDelete.name) {
        return { ...patient, assignedDoctor: "Unassigned" }
      }
      return patient
    })
    setPatients(updatedPatients)

    // Remove related appointments
    const appointments = getAppointments()
    const updatedAppointments = appointments.filter((apt) => apt.doctorId !== doctorId)
    setAppointments(updatedAppointments)

    return true
  } catch (error) {
    console.error("Error deleting doctor:", error)
    return false
  }
}

export const getAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return defaultAppointments
  const stored = localStorage.getItem("hospital_appointments")
  return stored ? JSON.parse(stored) : defaultAppointments
}

export const setAppointments = (appointments: Appointment[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("hospital_appointments", JSON.stringify(appointments))
  }
}

export const addAppointment = (appointment: Omit<Appointment, "id">): Appointment => {
  const appointments = getAppointments()
  const newId = `A${String(appointments.length + 1).padStart(3, "0")}`
  const newAppointment: Appointment = { ...appointment, id: newId }
  const updatedAppointments = [...appointments, newAppointment]
  setAppointments(updatedAppointments)
  return newAppointment
}

// Initialize data on first load
export const initializeData = (): void => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("hospital_patients")) {
      setPatients(defaultPatients)
    }
    if (!localStorage.getItem("hospital_doctors")) {
      setDoctors(defaultDoctors)
    }
    if (!localStorage.getItem("hospital_appointments")) {
      setAppointments(defaultAppointments)
    }
  }
}
