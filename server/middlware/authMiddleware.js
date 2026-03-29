
import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

/**
 * 🔐 Protect Middleware
 * - Verifies user
 * - Auto-creates user if not exists
 */
export const protect = async (req, res, next) => {
  try {
    // Prefer Clerk auth (real way)
    const { userId } = getAuth(req);
    //const userId = req.headers['x-user-id'];

    // Fallback for Postman testing
    const testUserId = req.headers["x-user-id"];

    const finalUserId = userId || testUserId;

    if (!finalUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No user ID provided",
      });
    }

    // Check if user exists in DB
    let user = await User.findOne({ clerkId: finalUserId });

    // 🔥 Auto-create user if not exists
    if (!user) {
      try {
        // Fetch user from Clerk
        const clerkUser = await clerkClient.users.getUser(finalUserId);

        const email =
          clerkUser.emailAddresses?.[0]?.emailAddress || "no-email";

        const name = `${clerkUser.firstName || ""} ${
          clerkUser.lastName || ""
        }`.trim();

        user = await User.create({
          clerkId: finalUserId,
          name: name || "New User",
          email,
          role: "customer",
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to sync user with Clerk",
          error: err.message,
        });
      }
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error);

    res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};

/**
 * 🔒 Role Authorization Middleware
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No user found",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Access denied",
        });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);

      res.status(500).json({
        success: false,
        message: "Role authorization error",
        error: error.message,
      });
    }
  };
};