const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const session = require("express-session");
passport = require("passport");
const passportConfig = require("./config/passport");

//setup dotenv
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 day
    sameSite: true,
    secure: false,
    httpOnly: true,
  },
};

// handle validation error

//middleware loger-explore npm package for loger morgan
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

// Middleware
app.use(express.json()); // For parsing application/json
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Use user and shop routes
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/carts", cartRoutes);

// Middleware for handling errors
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
