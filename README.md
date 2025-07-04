Pariwar+ – Together in Care

A smart family health management web app to track medications, appointments, documents, expenses, and emergency info for every family member. Each user logs in with their own email and sees only their own data.

🔹 Features

User authentication (register, login, logout)

Role-based dashboard (Self, Parent, Child, etc.)

Medicine reminders with “mark as taken”

Appointment & vaccination tracker

Upload & organize medical documents

Medical history timeline (visual charts)

Emergency health card with QR code download

Expense tracker with monthly summaries

Per‑member email access and notifications

⚙️ Setup (Frontend & Backend)

Clone the repository

git clone https://github.com/mahekraigagla/smart-family-health.git
cd smart-family-health

Frontend

Install dependencies: npm install

Start dev server: npm run dev

Open http://localhost:5173 in your browser

Backend

Install XAMPP and start Apache & MySQL

Copy the backend/ folder into XAMPP’s htdocs (e.g., C:/xampp/htdocs/pariwar-plus-backend)

Open phpMyAdmin (http://localhost/phpmyadmin), create database pariwar_plus, and import backend/database.sql

Update backend/db.php with your MySQL credentials

Run & Test

Use Postman or your React frontend to test API endpoints at http://localhost/pariwar-plus-backend/

🚀 Deploy

Frontend: Build with npm run build and deploy the dist/ folder to any static host (Netlify, Vercel, GitHub Pages).

Backend: Upload the backend/ folder and database to a PHP + MySQL host (000Webhost, InfinityFree).

📄 License

MIT © Mahek Raigagla

