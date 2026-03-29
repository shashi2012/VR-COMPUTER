import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import repairRoutes from './routes/repairRoutes.js';
import adminRoutes from "./routes/adminRoute.js";
import { clerkMiddleware } from '@clerk/express';
import { protect } from './middlware/authMiddleware.js';

const app = express();

// Connect database
connectDB();

// Clerk middleware
app.use(clerkMiddleware());

// Body parser
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "https://vr-computer.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false); // allow request but browser will block
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Handle preflight requests for all routes
app.options("*", cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', protect, userRoutes);
app.use('/api/repairs', repairRoutes);
app.use("/api/admin", protect, adminRoutes); // make sure admin routes are protected

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});