# 🛍️ E-Commerce Backend API

### Built with NestJS • MongoDB • TypeScript

A production-ready, scalable **E-commerce Backend** designed with clean architecture, real business logic, and enterprise patterns.

[![NestJS](https://img.shields.io/badge/NestJS-red)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue)](https://www.typescriptlang.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](https://jwt.io/)

</div>

---

## 🌟 Why This Project?

This backend simulates a **real-world e-commerce system**, not a tutorial CRUD app.

It includes:

* Role-based users
* Secure authentication flows
* Cart & order lifecycle
* Discount & coupon logic
* Stock validation
* Clean separation of concerns

Built to be **extendable**, **maintainable**, and **portfolio-ready**.

---

## 🧠 Core Capabilities

<table>
<tr>
<td width="50%">

### 🔐 Authentication

* Email + OTP verification
* JWT-based login
* Password reset
* Google OAuth
* Secure hashing

</td>
<td width="50%">

### 👥 User Roles

* Admin
* Customer
* Seller
* Mongoose discriminators

</td>
</tr>

<tr>
<td>

### 🏷️ Product Management

* Dynamic pricing
* Fixed & percentage discounts
* Stock tracking
* Colors & sizes merging

</td>
<td>

### 🛒 Cart & Orders

* Cart persistence
* Stock validation
* Coupon support
* Order lifecycle

</td>
</tr>
</table>

---

## 🧱 Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Backend      | NestJS                             |
| Database     | MongoDB + Mongoose                 |
| Language     | TypeScript                         |
| Auth         | JWT, Google OAuth                  |
| Architecture | Repository Pattern, Modular Design |

---

## 🏗️ Architecture Overview

```txt
src/
├── common/          # helpers, constants, shared types
├── models/          # schemas & repositories
├── modules/
│   ├── auth
│   ├── user
│   ├── product
│   ├── category
│   ├── brand
│   ├── cart
│   ├── order
│   └── coupon
├── app.module.ts
└── main.ts
```

**Design principles used**

* Abstract Repository Pattern
* DTO-based validation
* Service-layer business rules
* Mongoose Virtuals
* Clear domain separation

---

## 📡 API Overview

### 🔐 Auth

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/auth/register`        |
| POST   | `/auth/login`           |
| POST   | `/auth/confirm-email`   |
| POST   | `/auth/forget-password` |
| POST   | `/auth/reset-password`  |
| POST   | `/auth/google`          |

---

### 🏷️ Products

| Method | Endpoint        |
| ------ | --------------- |
| POST   | `/products`     |
| GET    | `/products/:id` |

---

### 🗂️ Categories

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | `/categories`     |
| PUT    | `/categories/:id` |
| GET    | `/categories/:id` |

---

### 🏭 Brands

| Method | Endpoint      |
| ------ | ------------- |
| POST   | `/brands`     |
| GET    | `/brands/:id` |

---

### 🛒 Cart

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/cart`            |
| PUT    | `/cart`            |
| GET    | `/cart`            |
| DELETE | `/cart/:productId` |
| DELETE | `/cart`            |

---

### 📦 Orders

| Method | Endpoint  |
| ------ | --------- |
| POST   | `/orders` |

---

### 🎟️ Coupons

| Method | Endpoint   |
| ------ | ---------- |
| POST   | `/coupons` |

---

## 🔐 Authentication

All protected routes require a JWT token:

```http
Authorization: Bearer <token>
```

---

## ⚙️ Environment Setup

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

MAIL_HOST=smtp_host
MAIL_USER=email
MAIL_PASS=password
```

---

## 🚀 Running the Project

```bash
npm install
npm run start:dev
```

Server will run at:

```
http://localhost:3000
```

---

## 🧪 Testing

* Tested using **Postman**
* JWT-secured routes
* Realistic business edge cases handled

---

## 🛣️ Roadmap

* Payment gateway integration
* Product reviews & ratings
* Pagination & filtering
* Admin dashboard
* Order tracking history

---

## 👨‍💻 Author

**Abdelrahman Atef Mohamed Nassar**
Computer Science Student | Backend & Flutter Developer

* GitHub: [https://github.com/Abdelrahmannassar10](https://github.com/Abdelrahmannassar10)
* LinkedIn: [https://www.linkedin.com/in/Abdelrahman-Nassar-dev253](https://www.linkedin.com/in/Abdelrahman-Nassar-dev253)

---

<div align="center">

⭐ If you like this project, consider giving it a star
Built with focus, structure, and real-world thinking

</div>

