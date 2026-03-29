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

// ----------------------
// Connect to MongoDB
// ----------------------
connectDB().then(() => console.log("MongoDB connected"))
           .catch(err => console.error("Error connecting to MongoDB:", err));

// ----------------------
// Middleware
// ----------------------

// Clerk authentication middleware
app.use(clerkMiddleware());

// Body parser
app.use(express.json());

// ----------------------
// CORS configuration
// ----------------------
const allowedOrigins = [
  "https://vr-computer.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from allowed origins or no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false); // browser will block disallowed origin
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// Handle preflight requests for all routes safely
app.options("/*", cors());

// ----------------------
// Routes
// ----------------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Protected routes
app.use('/api/users', protect, userRoutes);
app.use('/api/repairs', repairRoutes);
app.use("/api/admin", protect, adminRoutes);

// ----------------------
// Error handling (optional but recommended)
// ----------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});