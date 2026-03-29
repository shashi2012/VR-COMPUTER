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

app.use(cors({
  origin: true, // Allow requests from this origin
  credentials: true, // Allow cookies to be sent with requests
  allowedHeaders: ["Content-Type", "Authorization"] // Essential!
}));

// Connect to the database
connectDB();


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
