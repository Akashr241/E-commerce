# 🛒 E-Commerce Web Application

A full-stack E-Commerce application built using **Spring Boot**, **React**, and **PostgreSQL** with **JWT Authentication**, **Role-Based Authorization**, and **Razorpay Payment Integration**.

 Live Demo

### Frontend
https://e-commerce-zeta-sepia-33.vercel.app/

### Backend
https://e-commerce-backend-akash.onrender.com

### Swagger API
https://e-commerce-backend-akash.onrender.com/swagger-ui/index.html

---

# ✨ Features

## User

- User Registration
- User Login
- JWT Authentication
- Browse Products
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Checkout
- Place Orders
- Razorpay Payment
- View My Orders
- Cancel Orders

---

## Admin

- Secure Admin Login
- Add Products
- Update Products
- Delete Products
- View All Orders
- Update Order Status

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Bootstrap
- Context API

## Backend

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

## Database

- PostgreSQL

## Payment Gateway

- Razorpay

## Deployment

- Frontend : Vercel
- Backend : Render
- Database : Render PostgreSQL

---

# 📂 Project Structure

```
Frontend (React)

src/
 ├── components
 ├── pages
 ├── services
 ├── context
 └── App.js

Backend (Spring Boot)

src/main/java
 ├── product
 ├── cart
 ├── order
 ├── payment
 ├── security
 ├── checkout
 └── config
```

---

# 🔐 Authentication

- JWT Token Based Authentication
- Spring Security
- Role Based Authorization
- USER Role
- ADMIN Role

---

# 🗄 Database

PostgreSQL Database

Main Tables

- users
- products
- cart
- cart_item
- orders
- order_items
- payments

---

# 📡 REST APIs

## Authentication

```
POST /auth/register
POST /auth/login
```

## Products

```
GET /products
GET /products/{id}
POST /products
PUT /products/{id}
DELETE /products/{id}
```

## Cart

```
GET /cart
POST /cart/add
PUT /cart/update
DELETE /cart/remove
```

## Checkout

```
POST /api/checkout
```

## Orders

```
GET /orders/my-orders
PUT /orders/{id}/cancel
GET /orders
PUT /orders/{id}/status
```

## Payments

```
POST /api/payments/create
POST /api/payments/verify
GET /api/payments/{id}
```



## Clone Repository

```bash
git clone https://github.com/Akashr241/ecommerce-project.git
```

## Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm start
```

---

# 👨‍💻 Developed By

Akash

GitHub:
https://github.com/Akashr241

LinkedIn:
(https://www.linkedin.com/in/akashr5/)

Email:
(ar4517955@gmail.com)
