import express from "express";
import {
  createRepair,
  getRepairById,
  getAllRepairs,
  getUserRepairs,
  updateRepairStatus,
  deleteRepair
} from "../controllers/repairController.js";

import { protect,authorizeRoles } from "../middlware/authMiddleware.js";
import { upload } from "../middlware/uploadMiddleware.js";

const router = express.Router();

// Create repair (user)
router.post("/", protect, upload.array("images",5), createRepair);

// Get user's repairs
router.get("/my", protect, getUserRepairs);

// Get single repair
router.get("/:id", protect, getRepairById);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllRepairs);
router.put("/:id", protect, authorizeRoles("admin"), updateRepairStatus);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRepair);

export default router;