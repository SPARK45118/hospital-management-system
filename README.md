# 🏥 Hospital Management System

This project is a comprehensive web-based **Hospital Management System** designed to streamline hospital operations across multiple departments. It supports various user roles such as Admin, Doctor, Nurse, Receptionist, Lab Technician, Pharmacist, Cashier, and Patient. Built using **Java Spring Boot** for the backend and **React** for the frontend, the system facilitates effective management of patient care, appointments, medical records, billing, and more.

---

## 🧩 Role-Based Features

- **Admin**
  - Manage departments, doctors, and staff
  - Monitor appointments and inventory
  - Generate reports and analytics

- **Patient**
  - Secure registration and login
  - Book, view, and manage appointments
  - Access prescriptions, reports, and billing history

- **Receptionist**
  - Register new patients and manage profiles
  - Schedule appointments and assign clinic slots

- **Doctor**
  - View appointments and patient records
  - Update diagnoses and prescribe medications

- **Nurse**
  - View assigned patients and record vitals

- **Lab Technician**
  - Manage and record lab tests and results

- **Pharmacist**
  - Fulfill prescriptions and manage medicine stock

- **Cashier**
  - Generate and process patient bills

---

## ⚙️ Tech Stack

- **Backend**: Java (Spring Boot), Spring Security (JWT), Hibernate (JPA)
- **Frontend**: React, Axios, React Router, Bootstrap / Material UI
- **Database**: MySQL / PostgreSQL
- **DevOps & Tools**: Docker, Maven/Gradle, Postman, GitHub, AWS/Heroku

---

## 🧱 System Architecture & Modules

1. **Authentication & Authorization**
   - JWT-based login system with role-based access control

2. **Core Modules**
   - User Management: Admin, Doctors, Nurses, Patients, etc.
   - Appointments: Scheduling, managing, and tracking
   - Prescriptions and Vitals Tracking
   - Lab Management: Test scheduling and reporting
   - Inventory Management: Pharmacy and medicines
   - Billing System: Payment tracking and invoice generation

3. **Example API Endpoints**
   - `POST /register` – Register a patient
   - `POST /login` – Login and receive JWT token
   - `GET /doctors?dept=xyz` – List doctors by department
   - `POST /appointments` – Book an appointment
   - `POST /vitals` – Update patient vitals
   - `POST /lab-results` – Upload lab results
   - `POST /prescriptions` – Create a prescription
   - `GET /inventory` – Check medicine stock
   - `POST /bills` – Generate a patient bill

---

## 🛠️ Setup & Installation

### Prerequisites

- Java 17 or higher
- Node.js 16+
- MySQL or PostgreSQL
- Docker & Docker Compose (optional)

### Step-by-Step Installation

```bash
# Clone the repository
git clone https://github.com/SPARK45118/hospital-management-system.git
cd hospital-management-system

