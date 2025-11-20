require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const forgotRoutes = require("./routes/forgotRoutes"); // make sure path is correct

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forgot", forgotRoutes); // this registers OTP routes

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first
connectDB()
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB ❌", err.message);
    process.exit(1);
  });
