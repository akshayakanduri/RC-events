const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/events.js');
const bookingRoutes = require('./routes/booking.js');
const categoryRoutes = require("./routes/categoryRoutes");

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log(dns.getServers());
dotenv.config();

const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // Allow only 10 requests
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.set("trust proxy", 1);
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

//Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/categories", categoryRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
    .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    
    console.log(`Server is running on port ${PORT}`);
})