require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo"); // ✅ Fix for session storage
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const passportConfig = require("./config/passport");
const { errorMiddleware } = require("./middleware/errorMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to database
connectDB();

// ✅ Configure session storage with `connect-mongo`
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // ✅ Use your MongoDB URI from .env
    collectionName: "sessions",
  }),
};

// ✅ Middleware
app.use(morgan("dev")); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(session(sessionConfig)); // ✅ Session middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Initialize Passport
passportConfig(passport);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/carts", cartRoutes);

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// ✅ Error handling middleware
app.use(errorMiddleware);

// ✅ Handle 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

module.exports = app; // ✅ Export for testing
