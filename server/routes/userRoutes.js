import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
  },
});
const upload = multer({ storage });

// 🔐 Get Logged-in User Data
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AVATAR PROFILE
router.put(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    const user = await User.findById(req.user.id);

    user.avatar = req.file.path;

    await user.save();

    res.json(user);
  }
);

//UPDATE USERNAME/PROFILE
router.put("/update-name", authMiddleware, async (req, res) => {
  const { username } = req.body;

  const user = await User.findById(req.user.id);
  user.username = username;

  await user.save();

  res.json(user);
});


export default router;
