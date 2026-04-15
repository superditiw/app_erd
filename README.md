# 📦 APP_ERD 

## 📌 Overview

**APP_ERD** is a web-based Inventory Management System built using **React (Vite)** for the frontend and **Node.js (Express)** for the backend.

This application provides:

* User authentication & role-based access
* Item management (CRUD)
* Reporting dashboard
* Export report to Excel

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Login using username & password
* Role-based access control:

| Role  | Access                                     |
| ----- | ------------------------------------------ |
| ADMIN | Full access (Create, Read, Update, Delete) |
| USER  | Read-only (view items & reports)           |

---

### 📦 Items Module

* View item list
* Add item (ADMIN only)
* Edit item (ADMIN only)
* Delete item (ADMIN only)

---

### 📊 Reporting Module

* Display item summary
* Total number of items
* Total inventory value
* Export report to Excel (.xlsx)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd app_erd
```

---

### 2. Setup Database

1. Open MySQL Workbench
2. Import the provided SQL file:

```text
app_erd.sql
```

> This file already contains table structure and sample data.

---

### 3. Run Backend

```bash
cd backend
npm install
npm run dev
```

---

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Default Account

Use the following account to login:

```text
Username : admin
Password : 123
Role     : ADMIN
```
```text
Username : user
Password : 123
Role     : USER
```

---

## 🧠 Role Behavior

* **ADMIN**

  * Can create, update, and delete items
  * Full access to all features

* **USER**

  * Can only view items and reports
  * Restricted from modifying data

---

## 📁 Project Structure

```text
app_erd/
├── frontend/
├── backend/
├── app_erd.sql
└── README.md
```

---

## 📌 Notes

* Role validation is implemented in both frontend and backend
* Unauthorized actions are blocked at API level
* Data is stored using MySQL database
* Excel export is available in reporting module

---

## 👨‍💻 Author

**Dimas Triananda**
