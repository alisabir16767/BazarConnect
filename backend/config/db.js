require("dotenv").config(); // Ensure environment variables are loaded

const mongoose = require("mongoose");
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
