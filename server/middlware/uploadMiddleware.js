import multer from "multer";

// Store in memory first (we'll send to cloud)
const storage = multer.memoryStorage();

export const upload = multer({ storage });