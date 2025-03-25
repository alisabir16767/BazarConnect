# BazarConnect

BazarConnect is a full-stack e-commerce platform that allows users to buy and sell products seamlessly. Built using the **MERN (MongoDB, Express, React, Node.js) stack**, it provides a user-friendly interface and secure payment integration using **Razorpay**.

## 🚀 Features

### 🛍️ For Users
- Browse products across multiple categories
- Add products to the cart and checkout securely
- Track orders and view order history
- Leave reviews and ratings on products

### 🛒 For Sellers
- Create and manage product listings
- Track sales and earnings
- Manage inventory and stock levels

### 🔒 Security & Authentication
- User authentication using **JWT** and **Passport.js**
- Role-based access control (Admin, Seller, Buyer)
- Secure payments using **Razorpay**

## 🛠️ Tech Stack

### **Frontend**
- Next.js (React Framework)
- Tailwind CSS (Styling)
- Redux (State Management)
- Axios (API Calls)

### **Backend**
- Node.js & Express.js (Server-side logic)
- MongoDB & Mongoose (Database)
- Razorpay (Payment Gateway Integration)
- JSON Web Token (JWT) for Authentication

## 📦 Installation

### **1. Clone the repository**
```sh
  git clone https://github.com/yourusername/bazarconnect.git
  cd bazarconnect
```

### **2. Setup environment variables**
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### **3. Install dependencies**
```sh
  cd backend
  npm install
  cd ../frontend
  npm install
```

### **4. Run the development server**
#### Backend:
```sh
  cd backend
  npm start
```
#### Frontend:
```sh
  cd frontend
  npm run dev
```

## 🚀 Deployment
### **Frontend Deployment (Vercel)**
```sh
  vercel
```
### **Backend Deployment (Render/Heroku)**
```sh
  git push heroku main  # For Heroku
  # OR
  git push origin main   # If using Render or another platform
```

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|------------|--------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Authenticate user |
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create a new product (Seller only) |
| `POST` | `/api/orders` | Place an order |
| `GET` | `/api/orders/:id` | Get order details |

## 🏆 Contributing
We welcome contributions! Feel free to submit a pull request or open an issue.

## 📝 License
This project is licensed under the **MIT License**.

---
Made with ❤️ by **BazarConnect Team**

