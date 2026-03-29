import User from "../models/User.js";

/**
 * 👤 Get logged-in user profile
 */
export const getProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};



/**
 * ✏️ Update User Profile (phone, address)
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;

    // ✅ Validate input
    if (!phone && !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide phone or address to update",
      });
    }

    // ✅ Optional: simple phone validation
    if (phone && phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be at least 10 digits",
      });
    }

    // ✅ Find user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update fields only if provided
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully ✅",
      user,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};


/**
 * 📊 Dashboard (for admin + customer)
 */
export const dashboard = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Dashboard access granted",
      userRole: req.user.role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accessing dashboard",
      error: error.message,
    });
  }
};