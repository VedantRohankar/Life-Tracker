import cloudinary from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "profile_pictures",
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed", error });
  }
};
