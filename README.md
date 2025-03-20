# Placement Cell Management System - Backend

## 📌 Project Overview

A **Node.js + Express** backend for a **Placement Cell Management System**, allowing employees to manage students interviews, results, and placements efficiently.

## 🛠️ Tech Stack

- **Runtime:** `Node.js`
- **Framework:** `Express.js`
- **Database:** `MongoDB`

## 📦 Dependencies

### 🔹 Core Libraries:

- `express` → Web framework for Node.js
- `mongoose` → ODM for MongoDB
- `jsonwebtoken` (JWT) → Handles authentication
- `validator` → For data validation on both DB level and API level
- `bcrypt` → Hashes passwords securely
- `cors` → Handles cross-origin requests
- `dotenv` → Manages environment variables
- `cookie-parser` → Parses cookies

### 🔹 Development Dependencies:

- `nodemon` → Auto-restarting server for development

## API Structures:

### Auth Router

- `POST /auth/signup` → Employee signup
- `POST /auth/login` → Employee login

### Students Router

- `GET /students` → Get all students
- `POST /students` → Add new student

### Interview Router

- `GET /interviews` → Get all interviews
- `POST /interviews` → Add new interview
- `PATCH /interviews/:interviewID/assign/:studentID` → Assign student to interview
- `GET /interviews/:interviewID/students` → View all students assigned to an interview

### Results Router

- `GET /results` → Get all results (CSV)
- `POST /results` → Update student result for an interview
- `GET /results/download-csv` → Download results in CSV format
