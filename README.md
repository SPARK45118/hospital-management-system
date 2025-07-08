# 🏥 Hospital Management System

A comprehensive and user-friendly Hospital Management System (HMS) designed to streamline the operations of hospitals and clinics. This system helps manage patient records, appointments, staff, billing, and medical data efficiently.

## 📌 Features

- 👨‍⚕️ **Patient Management**  
  - Register new patients  
  - View and update patient records  
  - Track medical history and reports

- 📅 **Appointment Scheduling**  
  - Book appointments with doctors  
  - Calendar view for scheduling  
  - Notifications and reminders

- 🩺 **Doctor & Staff Management**  
  - Add, update, and remove doctor/staff profiles  
  - Assign duties and shifts  
  - Track availability and specialization

- 💊 **Inventory Management**  
  - Manage medicines and equipment  
  - Track stock levels and expiry dates

- 🧾 **Billing and Invoicing**  
  - Generate and print bills  
  - Record payments and receipts  
  - Insurance claim support

- 📈 **Reports and Analytics**  
  - Daily/weekly/monthly reports  
  - Visual dashboards for performance metrics

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript (or React/Angular/Vue)  
- **Backend:** Node.js / PHP / Python (Flask or Django) / Java (Spring Boot)  
- **Database:** MySQL / PostgreSQL / MongoDB  
- **Authentication:** JWT / Session-based  
- **Hosting (Optional):** Heroku / Netlify / Vercel / AWS

## 🏁 Getting Started

### Prerequisites

- Node.js / Python / Java installed
- MySQL or any supported database running

### Installation

git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system
npm install  # or pip install -r requirements.txt


# Hospital Management System

This project implements a robust *Hospital Management System* with distinct roles (Admin, Doctors, Nurses, Receptionist, Lab, Pharmacy, Cashier, Patients). It offers a full suite of features to efficiently manage patient care, appointments, medical records, billing, and resource allocation—built with a Java Spring Boot backend and React frontend.  

---

## 🛠 Features by Role

- *Admin*  
  - Manage hospital structure: departments, doctors, staff  
  - Oversee appointments, generate reports, monitor medicines inventory  

- *Patient*  
  - Register/login with secure authentication  
  - Book, view, and manage appointments  
  - Access prescriptions, lab reports, and payment history  

- *Receptionist*  
  - Register new patients or update existing profiles  
  - Schedule appointments and assign clinic numbers  

- *Doctor*  
  - View schedule and manage patient diagnosis  
  - Prescribe drugs and update patient status  

- *Nurse/Staff*  
  - View assigned patients, record vitals and assist in care  

- *Lab Assistant*  
  - Manage lab tests, enter specimen data and results  

- *Pharmacist*  
  - Fulfill prescriptions, manage drug stock and dosage instructions  

- *Cashier*  
  - Generate invoices and manage payments  

---

## ⚙ Technology Stack

- *Backend*: Java (Spring Boot), Spring Security (JWT), JPA/Hibernate  
- *Database*: MySQL / PostgreSQL  
- *Frontend*: React (React Router, Axios), styled with Material-UI or Bootstrap  
- *Deployment/Dev Tools*: Docker, Maven/Gradle, Postman, GitHub, AWS/Heroku  

---

## 🎯 Architecture & Modules

1. *Authentication & Roles*  
   Secure JWT‑based login with role-based access control.

2. *Modules*  
   - Users, Patients, Doctors, Staff, Departments  
   - Appointments, Prescriptions, Vitals, Lab Reports  
   - Inventory (Pharmacy Stock), Billing, Dashboard Reporting  

3. *API Endpoints (Samples)*  
   - POST /register – patient registration  
   - POST /login – obtain JWT  
   - GET /doctors?dept=... – list doctors  
   - POST /appointments – book appointment  
   - GET /appointments – view booked appointments  
   - POST /vitals – nurses update vitals  
   - POST /lab-results – lab assistant uploads results  
   - POST /prescriptions – doctor prescription writing  
   - GET /inventory – pharmacist checks stock  
   - POST /bills – cashier generates invoice  

---

## 💡 Setup & Installation

*Prerequisites*: Java 17+, Node 16+, Docker & Docker‑Compose, MySQL/PostgreSQL


# Clone repo
git clone https://github.com/SPARK45118/hospital-management-system.git
cd hospital-management-system

# Backend setup
cd backend
./mvnw clean package
java -jar target/*.jar

# Frontend setup
cd ../frontend
npm install
npm start

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```bash
