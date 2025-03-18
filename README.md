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

- `POST /api/auth/signup` → Employee signup
- `POST /api/auth/login` → Employee login

### Students Router

- `GET /api/students` → Get all students
- `POST /api/students` → Add new student

### Interview Router

- `GET /api/interviews` → Get all interviews
- `POST /api/interviews` → Add new interview
- `PUT /api/interviews/:interviewID/assign/:studentID` → Assign student to interview
- `GET /api/interviews/:interviewID/students` → View all students assigned to an interview

### Results Router

- `GET /api/results` → Get all results (CSV)
- `PUT /api/results/:resultID` → Update student result for an interview
