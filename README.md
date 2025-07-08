# Arogya Hospital Management System

A comprehensive, full-stack hospital management system built with *Next.js 14, **TypeScript, **Supabase PostgreSQL, and **Tailwind CSS*. This enterprise-grade application provides complete patient care management with real-time database operations and modern UI/UX design.

## Live Demo

- *🌐 Production*: [https://hospital-management-system-spark45118.vercel.app](https://hospital-management-system-spark45118.vercel.app)
- *📱 GitHub Repository*: [https://github.com/SPARK45118/hospital-management-system](https://github.com/SPARK45118/hospital-management-system)
- *👨‍💻 Developer*: [SPARK45118](https://github.com/SPARK45118)


## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Demo Credentials](#-demo-credentials)
- [Screenshots](#-screenshots)
- [Database Operations](#-database-operations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)


## Features

### *Core Hospital Management*

- *Dashboard Overview* - Real-time statistics and quick actions
- *Patient Management* - Complete CRUD operations with detailed profiles
- *Doctor Management* - Professional profiles with specializations
- *Appointment Scheduling* - Calendar-based booking system
- *Medical Records* - Comprehensive patient history tracking


### *Authentication & Security*

- *Role-based Access Control* - Admin, Doctor, Nurse, Receptionist roles
- *Secure Login System* - Multi-role authentication
- *Data Protection* - Secure API endpoints with validation


### *Database Features*

- *PostgreSQL Database* - Robust relational database with Supabase
- *Real-time Updates* - Live data synchronization
- *CRUD Operations* - Complete Create, Read, Update, Delete functionality
- *Data Relationships* - Foreign keys and cascading operations
- *Auto-generated IDs* - Systematic patient/doctor ID generation


### *User Experience*

- *Responsive Design* - Mobile-first approach with Tailwind CSS
- *Modern UI Components* - shadcn/ui component library
- *Interactive Tables* - Search, filter, and pagination
- *Confirmation Dialogs* - Safe delete operations
- *Toast Notifications* - User feedback system
- *Loading States* - Smooth user interactions


### *Advanced Features*

- *Search & Filter* - Advanced patient/doctor search
- *Data Export* - Export capabilities for records
- *Error Handling* - Comprehensive error management
- *Form Validation* - Client and server-side validation
- *Accessibility* - WCAG compliant design


## ️ Tech Stack

### *Frontend*

- *Framework*: Next.js 14 (App Router)
- *Language*: TypeScript
- *Styling*: Tailwind CSS
- *UI Components*: shadcn/ui
- *Icons*: Lucide React
- *Date Handling*: date-fns
- *State Management*: React Hooks


### *Backend*

- *Database*: PostgreSQL (Supabase)
- *API*: Next.js API Routes
- *Authentication*: Supabase Auth (Ready for implementation)
- *Validation*: Zod
- *ORM*: Supabase Client


### *Deployment & DevOps*

- *Hosting*: Vercel
- *Database Hosting*: Supabase
- *Version Control*: Git & GitHub
- *CI/CD*: Vercel GitHub Integration


## ️ Database Schema

### *Tables Structure*

sql
📊 patients
├── id (UUID, Primary Key)
├── patient_id (VARCHAR, Unique)
├── personal_info (name, age, gender, contact)
├── medical_info (condition, allergies, history)
├── financial_info (insurance, payments)
└── timestamps (created_at, updated_at)

👨‍⚕️ doctors
├── id (UUID, Primary Key)
├── doctor_id (VARCHAR, Unique)
├── professional_info (specialization, qualification)
├── schedule_info (working_hours, availability)
├── contact_info (phone, email, address)
└── timestamps (created_at, updated_at)

📅 appointments
├── id (UUID, Primary Key)
├── appointment_id (VARCHAR, Unique)
├── patient_id (Foreign Key → patients)
├── doctor_id (Foreign Key → doctors)
├── schedule_info (date, time, duration)
├── appointment_details (type, reason, status)
└── timestamps (created_at, updated_at)

📋 medical_records
├── id (UUID, Primary Key)
├── record_id (VARCHAR, Unique)
├── patient_id (Foreign Key → patients)
├── doctor_id (Foreign Key → doctors)
├── medical_data (diagnosis, treatment, prescription)
└── timestamps (created_at, updated_at)


### *Key Relationships*

- *Patients ↔ Appointments* (One-to-Many)
- *Doctors ↔ Appointments* (One-to-Many)
- *Patients ↔ Medical Records* (One-to-Many)
- *Doctors ↔ Medical Records* (One-to-Many)
- *Cascading Deletes* for data integrity


## Getting Started

### *Prerequisites*

- Node.js 18+
- npm or yarn
- Git
- Supabase account


### *Installation*

1. *Clone the repository*


shellscript
git clone https://github.com/SPARK45118/hospital-management-system.git
cd hospital-management-system


2. *Install dependencies*


shellscript
npm install
# or
yarn install


3. *Set up environment variables*


shellscript
cp .env.example .env.local


4. *Configure your .env.local*


plaintext
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Arogya Hospital Management System
NEXT_PUBLIC_DEVELOPER=SPARK45118
NEXT_PUBLIC_CONTACT_EMAIL=xboxing098@gmail.com


5. *Set up the database*

1. Create a new Supabase project
2. Run the SQL scripts in /scripts folder:

1. 01-create-tables.sql
2. 02-insert-sample-data.sql
3. 03-create-functions.sql






6. *Run the development server*


shellscript
npm run dev
# or
yarn dev


7. *Open your browser*


plaintext
http://localhost:3000


## Environment Variables

Create a .env.local file in the root directory:

plaintext
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Settings
NEXT_PUBLIC_APP_NAME=Arogya Hospital Management System
NEXT_PUBLIC_DEVELOPER=SPARK45118
NEXT_PUBLIC_CONTACT_EMAIL=xboxing098@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+91 98765 43210
NEXT_PUBLIC_GITHUB_REPO=https://github.com/SPARK45118/hospital-management-system


## API Routes

### *Patients API*

typescript
GET    /api/patients          # Get all patients
POST   /api/patients          # Create new patient
GET    /api/patients/[id]     # Get patient by ID
PUT    /api/patients/[id]     # Update patient
DELETE /api/patients/[id]     # Delete patient


### *Doctors API*

typescript
GET    /api/doctors           # Get all doctors
POST   /api/doctors           # Create new doctor
GET    /api/doctors/[id]      # Get doctor by ID
PUT    /api/doctors/[id]      # Update doctor
DELETE /api/doctors/[id]      # Delete doctor


### *Appointments API*

typescript
GET    /api/appointments      # Get all appointments
POST   /api/appointments      # Create new appointment
GET    /api/appointments/[id] # Get appointment by ID
PUT    /api/appointments/[id] # Update appointment
DELETE /api/appointments/[id] # Delete appointment


## Demo Credentials

Use these credentials to explore different user roles:

| Role | Email | Password
|-----|-----|-----
| *Administrator* | [admin@arogyahospital.com](mailto:admin@arogyahospital.com) | admin123
| *Doctor* | [doctor@arogyahospital.com](mailto:doctor@arogyahospital.com) | doctor123
| *Nurse* | [nurse@arogyahospital.com](mailto:nurse@arogyahospital.com) | nurse123
| *Receptionist* | [reception@arogyahospital.com](mailto:reception@arogyahospital.com) | reception123


## Screenshots

### Dashboard Overview





### Patient Management





### Doctor Profiles





### Appointment Scheduling





## Database Operations

### *CRUD Operations*

*Create Operations:*

- ✅ Add new patients with complete medical history
- ✅ Register doctors with professional credentials
- ✅ Schedule appointments with conflict detection
- ✅ Create medical records with diagnosis


*Read Operations:*

- ✅ View all patients with advanced search/filter
- ✅ Browse doctor profiles with specializations
- ✅ Check appointment schedules and availability
- ✅ Access comprehensive medical records


*Update Operations:*

- ✅ Edit patient information and medical data
- ✅ Update doctor profiles and schedules
- ✅ Modify appointment details and status
- ✅ Update medical records and prescriptions


*Delete Operations:*

- ✅ Remove patients with confirmation dialogs
- ✅ Delete doctors with patient reassignment
- ✅ Cancel appointments with notifications
- ✅ Archive medical records safely


### *Advanced Features*

- *Real-time Sync*: Live updates across all users
- *Data Integrity*: Foreign key constraints and cascading
- *Auto-generation*: Systematic ID generation for all entities
- *Search & Filter*: Advanced querying capabilities
- *Backup & Recovery*: Automated database backups


## Deployment

### *Deploy to Vercel*

1. *Fork this repository*
2. *Connect to Vercel*

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables



3. *Set up Supabase*

1. Create a Supabase project
2. Run the database scripts
3. Add environment variables to Vercel



4. *Deploy*

1. Push to main branch
2. Automatic deployment via Vercel





### *Manual Deployment*

shellscript
# Build the project
npm run build

# Deploy to Vercel
vercel --prod


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### *Development Workflow*

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request


### *Code Standards*

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly


## License

This project is licensed under the *MIT License* - see the [LICENSE](LICENSE) file for details.

plaintext
MIT License

Copyright (c) 2024 SPARK45118

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


## Contact

### *Developer Information*

- *Name*: SPARK45118
- *Email*: [xboxing098@gmail.com](mailto:xboxing098@gmail.com)
- *GitHub*: [@SPARK45118](https://github.com/SPARK45118)
- *LinkedIn*: [Connect with me](https://linkedin.com/in/spark45118)


### *Project Links*

- *Live Demo*: [https://hospital-management-system-spark45118.vercel.app](https://hospital-management-system-spark45118.vercel.app)
- *Repository*: [https://github.com/SPARK45118/hospital-management-system](https://github.com/SPARK45118/hospital-management-system)
- *Issues*: [Report a bug](https://github.com/SPARK45118/hospital-management-system/issues)
- *Discussions*: [Join the discussion](https://github.com/SPARK45118/hospital-management-system/discussions)
