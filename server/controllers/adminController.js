import Repair from "../models/Repair.js";

/**
 * @desc Get admin dashboard stats
 * @route GET /api/admin/dashboard
 * @access Admin only
 */
export const getDashboardStats = async (req, res) => {
  try {
    // 1️⃣ Total repairs count
    const totalRepairs = await Repair.countDocuments();

    // 2️⃣ Count by status
    const pending = await Repair.countDocuments({ repairStatus: "pending" });
    const inProgress = await Repair.countDocuments({ repairStatus: "in-progress" });
    const completed = await Repair.countDocuments({ repairStatus: "completed" });

    // 3️⃣ Total revenue (only completed repairs)
    const revenueResult = await Repair.aggregate([
      {
        $match: { repairStatus: "completed" } // only completed jobs
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" }
        }
      }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // 4️⃣ Get recent repairs (latest 5)
    const recentRepairs = await Repair.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "name email");

    // 5️⃣ Final response
    res.status(200).json({
      success: true,
      data: {
        totalRepairs,
        pending,
        inProgress,
        completed,
        totalRevenue,
        recentRepairs
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message
    });
  }
};