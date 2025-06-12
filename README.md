# 🧠 Jabb – Job Management & Recruitment API

Jabb is a full-featured job board backend API designed for both job seekers and employers. It includes role-based access control (RBAC), job posting and application management, admin tools, and powerful filtering/sorting mechanisms.

This is a portfolio project built with **TypeScript**, **Express.js**, and **MongoDB**, and designed to be connected with a React frontend.

---

## 🔍 Features

### 👤 Authentication & Authorization
- User roles: `Admin`, `Recruiter`, `Applicant`
- Signup, login, logout (JWT-based)
- Protected routes with role-based access

### 💼 Job Management
- Create, update, delete jobs (Recruiters)
- Apply to jobs (Applicants)
- Filter jobs by tags, title, type, location
- Pagination, sorting, and keyword search

### 📄 Applications
- Users can apply with resume uploads
- Recruiters can view applicants
- Admins can monitor all activity

### 👑 Admin Panel
- Manage users and roles
- View all jobs and applications
- Delete users or jobs if needed

### 🧪 Testing
- Full integration tests using Jest & Supertest
- Coverage for Auth, Jobs, Applications, and Admin routes

### 📘 API Documentation
- Swagger (OpenAPI 3.0) docs available at `/api/docs`

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, bcrypt
- **Validation**: express-validator, custom middleware
- **File Uploads**: multer
- **Testing**: Jest, Supertest
- **Docs**: Swagger UI
- **Dev Tools**: ts-node-dev, dotenv, nodemon

---

## 🚀 Live Demo

- **API Base URL**: [https://localhost:5001]
- **Swagger Docs**: [https://localhost:5001/api/docs]


_Optional demo account details:_
```bash
Recruiter: recruiter@jabb.com / recruiter123  
Applicant: applicant@jabb.com / applicant123  
Admin: admin@jabb.com / admin123
```
--

## 🛠️ Local Setup

# Clone the repo
git clone https://github.com/CODonnie/Jabb.git
cd Jabb/server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run in dev mode
npm run dev

# Run tests
npm test

# Build for production
npm run build


--

## 📂 Folder Structure (Server)

Jabb/server/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── __tests__/
│   ├── app.ts
│   └── server.ts
├── uploads/  ← for resume files
├── .env.example
└── tsconfig.json

--

## 📌 Roadmap
 Auth & RBAC

 Job CRUD & search

 File uploads for resumes

 Admin controls

 Full integration testing

 Swagger documentation

 Frontend (React) integration

 Dockerized deployment

 CI/CD workflow

## 📣 About the Developer
Ordu Donald – Software Engineer & Graphic Designer

--

## 📝 License
This project is open-source and free to use under the MIT License.