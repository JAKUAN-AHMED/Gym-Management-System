# 🏋️‍♂️ Gym Management System — [Class Scheduling & Membership]

🚀 **Live Link**: [Visit App](https://management-system-xi-eight.vercel.app/)  
📬 **Postman API Collection**: [View Collection](https://documenter.getpostman.com/view/40097709/2sB2cYbKi8)

📁 ER Diagram
📄 [Download ER Diagram (PDF)](https://drive.google.com/file/d/1k84kJfpRJ6fiD20vjnocyGmAgufRDtBL/view?usp=sharing)

A powerful RESTful API for managing gym classes, schedules, and user bookings with role-based access. Built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

---

## 🔑 Roles & Access

| Role     | Access Control |
|----------|----------------|
| Admin    | Full control: users, classes, schedules |
| Trainer  | View assigned schedules only            |
| Trainee  | Book/cancel available class slots       |

---

## ✨ Key Features

- ✅ Secure JWT-based Authentication & Role-based Authorization
- 📅 Class Scheduling (max 5/day)
- 👥 Bookings with capacity limits (max 10/class)
- 👤 Admin panel to manage users and classes
- 🔄 Realtime class availability & booking
- 🔒 Protected routes and middleware

---

## 📋 Business Rules

### 🗓️ Class Scheduling
- Max **5 class schedules** per day  
- Each class lasts **2 hours**  
- Max **10 trainees per class schedule**  
- Admins schedule classes and assign trainers  

### 📅 Booking System
- Trainees can **book if slots are available**  
- ❌ Cannot book **multiple classes at same time**  
- ✔️ Can **cancel bookings** anytime

---

## 🛠️ Tech Stack

| Category       | Tools                              |
|----------------|-------------------------------------|
| Backend        | Node.js, Express.js, TypeScript     |
| Database       | MongoDB, Mongoose                   |
| Authentication | JWT                                 |
| Deployment     | Vercel     |
| API Testing    | Postman                             |

---

## 🧩 Data Models Overview

### 📘 Class Model
| Field       | Type   | Description                   |
|-------------|--------|-------------------------------|
| `name`      | String | Gym class name (e.g., Yoga)   |
| `description`| String| Description of the class      |

### 📅 Schedule Model
| Field           | Type     | Description                             |
|-----------------|----------|-----------------------------------------|
| `className`     | String   | Name of the scheduled class             |
| `schedule.date` | Date     | Date of class                           |
| `schedule.startTime`     | String   | Start time                              |
| `schedule.endTime`       | String   | End time                                |
| `schedule.trainees`      | [IDs]    | List of booked trainee IDs (max 10)     |

### 👤 User Model
| Field     | Type     | Description                     |
|-----------|----------|---------------------------------|
| `name`    | String   | Full name                       |
| `email`   | String   | Unique email                    |
| `role`    | Enum     | Admin / Trainer / Trainee       |
| `phone`   | String   | Contact number                  |
| `address` | String   | Address                         |

---
## 🔐API Documentation 

## 🔐🔗 API Base URL
```http
https://management-system-xi-eight.vercel.app/api
```

## 🔐 Authentication Endpoints

```http
POST   /auth/register       // Register new trainee
POST   /auth/login          // Login with email & password
PATCH  /auth/change-pass    // Change password
POST   /auth/logout         // Logout
```

👨‍💼 Admin Routes
```http
POST   /admin/create-class             // Create new class
DELETE /admin/:classId                // Delete class
GET    /admin/allclass           // View all classes
POST /admin/schedule/:classId        //schedule a class
PATCH /admin/manage-user/:id       //manage user like changing role
DELETE /admin/delete-user/:userId // delete a user by id
```
🧑‍🏫 Trainer Routes
```http
GET    /trainer/trainerclasses   // Get trainer-assigned classes
```
🧑‍🎓 Trainee Routes
```http
GET    /admin/allclass                // View all available classes
PATCH  /trainee/booking-class/:schedule_classId    // Book class
PATCH  /trainee/cancel-booking/:schedule_classId        // Cancel booking
```
🧪 Test Credentials
🔐 Admin
```makefile
Email: jakuanultimate777@gmail.com  
Password: admin123
```
👨‍🏫 Trainer
```makefile
Email: ruman@gmail.com  
Password: ruman123
```
🧑‍🎓 Trainee
```graphql
Email: nahin@gmail.com  
Password: nahiyan123
```
```bash
🧰 Local Development Setup
1️⃣ Clone the Repo
git clone https://github.com/JAKUAN-AHMED/Gym-Management-System.git
cd Gym-Management-System
```

```bash
2️⃣ Install Dependencies
npm install
```

```bash
3️⃣ Setup Environment
Create a .env file in the root:
PORT=5000
DB_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_ACCESS_TOKEN=access_token
JWT_REFRESH_TOKEN=refresh_token
JWT_TOKEN_EXPIRES=times
JWT_REFRESH_TOKEN_EXPIRES=times
```

4️⃣ Run Server
```bash
npm run start:dev
🔗 API Base URL
http://localhost:5000/api
Use Postman, Thunder Client, or Insomnia for testing.
```



```bash

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue to discuss.

Steps:
Fork the repo

Create a new branch
Make your changes

```
