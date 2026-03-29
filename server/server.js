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

// 1. Database Connection
connectDB();

// ----------------------
// 2. GLOBAL MIDDLEWARE (ORDER IS CRITICAL)
// ----------------------

// FIX 1: CORS MUST be first. If it's after Clerk or Body Parser, 
// browser preflight (OPTIONS) requests might fail before headers are set.
const allowedOrigins = [
  "https://vr-computer.vercel.app",
  "https://vr-computer-a68o7uk3h-shashi2012s-projects.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// FIX 2: Body parser must be before Clerk/Routes
app.use(express.json());

// FIX 3: Clerk Middleware handles the initial token verification.
// It MUST run before your custom 'protect' middleware.
app.use(clerkMiddleware());

// ----------------------
// 3. ROUTES
// ----------------------

app.get("/", (req, res) => res.send("API is running..."));

/** * FIX 4: Remove 'protect' from the .use() mounting.
 * Why? If you put 'protect' here AND inside the route files, 
 * it runs twice. If it runs here, it applies to EVERY sub-route,
 * which can cause issues if some routes (like a public profile) 
 * don't actually need it.
 * * Recommendation: Keep 'protect' INSIDE your router files.
 */
app.use('/api/users', userRoutes); 
app.use('/api/repairs', repairRoutes);
app.use('/api/admin', adminRoutes); 

// ----------------------
// 4. ERROR HANDLING
// ----------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));