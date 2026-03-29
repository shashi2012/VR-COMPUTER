import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middlware/authMiddleware.js";

const router = express.Router();

// Admin Dashboard Route
router.get("/dashboard", protect, authorizeRoles("admin"), getDashboardStats);

export default router;