import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import repairRoutes from './routes/repairRoutes.js';
import adminRoutes from "./routes/adminRoute.js";

import { clerkMiddleware } from '@clerk/express';
import { protect } from './middlware/authMiddleware.js';

const app = express();

// ----------------------
// Connect to MongoDB
// ----------------------
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------------
// Middleware
// ----------------------

// Clerk middleware
app.use(clerkMiddleware());

// Body parser
app.use(express.json());

// ----------------------
// CORS Configuration
// ----------------------
const allowedOrigins = [
  "https://vr-computer.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow no-origin (Postman, mobile apps) or allowed frontend
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests (IMPORTANT FIX)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ----------------------
// Routes
// ----------------------

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use('/api/users', protect, userRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/admin', protect, adminRoutes);

// ----------------------
// Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});