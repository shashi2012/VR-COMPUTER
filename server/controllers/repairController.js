import Repair from "../models/Repair.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Upload buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, folder = "repairs") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Create repair
 */
export const createRepair = async (req, res) => {
  try {
    const { device, deviceBrand, deviceModel, issue } = req.body;

    //  Validation
    if (!device || !deviceBrand || !deviceModel || !issue) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("CLOUD NAME:", process.env.CLOUDINARY_NAME);
 console.log("API KEY:", process.env.CLOUDINARY_API_KEY); 

    let imageUrls = [];

    //  Upload images (parallel - faster)
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        uploadToCloudinary(file.buffer)
      );

      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(r => r.secure_url);
    }

    // ✅ Create repair
    const repair = await Repair.create({
      customer: req.user._id,
      device,
      deviceBrand,
      deviceModel,
      issue,
      images: imageUrls,
      repairStatus: "pending"
    });

    res.status(201).json({
      message: "Repair request created successfully ✅",
      repair
    });

  } catch (error) {
    console.error("Create Repair Error:", error);
    res.status(500).json({
      message: "Error creating repair",
      error: error.message
    });
  }
};

/**
 * Get single repair
 */
export const getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id).populate(
      "customer",
      "name email"
    );

    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    // ✅ Allow only owner or admin
    if (
      repair.customer._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(repair);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching repair",
      error: error.message
    });
  }
};

/**
 * Get all repairs (admin)
 */
export const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find().populate("customer", "name email");

    res.json({
      count: repairs.length,
      repairs
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching repairs",
      error: error.message
    });
  }
};

/**
 * Get user's repairs
 */
export const getUserRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find({ customer: req.user._id });

    res.json({
      count: repairs.length,
      repairs
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user repairs",
      error: error.message
    });
  }
};

/**
 * Update repair (admin)
 */
export const updateRepairStatus = async (req, res) => {
  try {
    const { repairStatus, price } = req.body;

    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    if (repairStatus) repair.repairStatus = repairStatus;
    if (price !== undefined) repair.price = price;

    await repair.save();

    res.json({
      message: "Repair updated successfully ✅",
      repair
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating repair",
      error: error.message
    });
  }
};

/**
 * Delete repair (admin)
 */
export const deleteRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    await repair.deleteOne();

    res.json({
      message: "Repair deleted successfully 🗑️"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting repair",
      error: error.message
    });
  }
};