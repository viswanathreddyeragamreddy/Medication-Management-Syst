# Medication Management System (MedsBuddy)

## Screenshot
  ## Signup
  ![Image](https://github.com/user-attachments/assets/85237cf4-a0d8-4dec-9e5c-ac94b4c16a2c)

  ## Login
  ![Image](https://github.com/user-attachments/assets/ed2202e2-34ed-4527-b742-e2447bc20cf3)

A full-stack **Medication Management System** that enables **patients** and **caretakers** to effectively track, manage, and monitor medication intake. Built using **React (frontend)** and **Node.js with SQLite (backend)**, the application features role-based dashboards, secure authentication, and robust CRUD functionality for medication management.

---

## 🚀 Features

### ✅ Core Features

- 🔐 **User Authentication (Login & Signup)** using SQLite.
- 💊 **Medication Management:**
  - Add medications (name, dosage, frequency).
  - Mark medication as taken.
  - View medication history.
- 📊 **Adherence Tracker:** Basic percentage view of how well medications are being taken.
- 🧑‍⚕️ **Role-Based Dashboards:** Separate interfaces for Patients and Caretakers.
- 🗃️ **Persistent Data Storage** using SQLite via Node.js backend.
- ⚙️ **React Query** for efficient server-state handling.

---

## 🧱 Tech Stack

### Frontend

- **React**
- **JavaScript**
- **React Query**
- **CSS**

### Backend

- **Node.js**
- **SQLite**
- **Express.js** (assumed for routing)

---

## 1. Install Frontend Dependencies

cd frontend
npm install

## 2. Install Backend Dependencies

cd backend
npm install

## 3. Setup SQLite Database
Ensure meds.db is created or auto-generated.
Run migrations or create tables manually based on the schema.

## 4. Start Backend Server

cd backend
node index.js
Backend runs at: http://localhost:5000

## 5. Start Frontend App

cd frontend
npm start
Frontend runs at: http://localhost:3000
