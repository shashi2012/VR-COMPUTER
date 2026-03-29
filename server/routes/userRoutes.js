import express from "express";

const router = express.Router();

import {
 
  dashboard,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

import { protect, authorizeRoles } from "../middlware/authMiddleware.js";

/**
 * 👤 Get logged-in user profile
 * - Auto user creation handled in protect middleware
 */
router.get("/profile", getProfile);

/**
 * 🔒 Admin only route
 */
router.put("/profile", updateProfile);

/**
 * 📊 Dashboard (admin + customer)
 */
router.get(
  "/dashboard",
  authorizeRoles("admin", "customer"),
  dashboard
);

export default router;