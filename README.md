# 🐟 Live Fish Center - E-Commerce Platform

A premium, fully functional e-commerce web application built specifically for selling live fish, dried seafood, and fish food. This application was built using the **MERN Stack** (MongoDB, Express, React, Node.js) and features a modern, ocean-inspired glassmorphism design.

---

## ✨ Features

### 🛒 Customer Storefront
*   **Dynamic UI**: Beautiful, fully responsive React interface utilizing custom Vanilla CSS without heavy utility frameworks.
*   **Product Catalogue**: Browse categorized seafood (Live Fish, Dry Fish, Fish Food).
*   **Authentication**: Complete user registration and login system with JWT verification.
*   **Shopping Cart**: Intuitive cart state management using React Context.
*   **Checkout & "My Orders"**: Customers can securely place orders and then track their order statuses from the "My Orders" page.
*   **Printable Receipts**: Generates downloadable receipts for orders marked as "Processing" or "Delivered".

### 👑 Seller / Admin Dashboard
*   **Admin Authentication**: Secure routing that restricts standard users from accessing backend management features.
*   **Live Order Management**: View inbound orders, customer contact info, and delivery addresses in real-time. Change order statuses dynamically (Placed -> Processing -> Delivered).
*   **Inventory Control**: A dedicated product management table allows the admin to edit prices (in ₹) and manage live stock quantities on the fly, or completely discard depleted products directly from the UI.

---

## 💻 Tech Stack Setup

*   **Frontend**: React (Vite), React Router DOM, Axios, Context API
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose ORM)
*   **Security**: bcryptjs (password hashing), jsonwebtoken (JWT auth)

---

## 🚀 How to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your MongoDB connection (defaults to `mongodb://127.0.0.1:27017/fishcenter`).
4. **Seed the Database**: To populate initial data (products and admin account), run:
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Server starts on `http://localhost:5000`)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React app (If Vite asks to clear cache, use `npm run dev -- --force`):
   ```bash
   npm run dev
   ```
   *(Frontend starts on `http://localhost:5173` or `5174`)*

---

## 🔑 Default Seeded Accounts

If you ran `node seed.js`, you can log in to test the application using the following admin credentials:

*   **Email**: `tanayamhatre7@gmail.com`
*   **Password**: `fishadmin2026`

Enjoy your fresh catch! 🌊🍤
"# EfreshFish" 
