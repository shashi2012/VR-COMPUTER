import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {connectDB} from './config/db.js';   
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import repairRoutes from './routes/repairRoutes.js';
import adminRoutes from "./routes/adminRoute.js";
import { clerkMiddleware } from '@clerk/express';
import { protect } from './middlware/authMiddleware.js';
const app = express();
app.use(clerkMiddleware()); 
connectDB();

const allowedOrigins = [
  
  "https://vr-computer.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to the database



app.use(express.json());
app.use('/api/users',protect, userRoutes);
app.use('/api/repairs',repairRoutes);
app.use("/api/admin",adminRoutes);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
