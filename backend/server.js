import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/DB/db.js";
import passportConfig from "./config/passport.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// CONNECT TO DB
connectDB();

// PARSE CORS_ORIGIN ENV VAR
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

const allowedOrigins = [
  ...corsOrigins,

  "https://bazzarconnect-frontend.vercel.app",
  "http://localhost:3000",
];

// CORS CONFIG
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.includes(origin);
      if (isAllowed) return callback(null, true);

      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.options("*", cors());

// MIDDLEWARES
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION CONFIG
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:
      Number(process.env.SESSION_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    ttl: 7 * 24 * 60 * 60,
  }),
  name: "connect.sid",
};

// INIT SESSION & PASSPORT
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/carts", cartRoutes);

// TEST ROUTE
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// ERROR MIDDLEWARE
app.use(errorMiddleware);

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// SERVER START
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// HANDLE UNHANDLED PROMISES
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

export default app;
