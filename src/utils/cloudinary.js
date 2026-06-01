import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath,
  options = { resource_type: "auto", folder: "VideoTube/users" }
) => {
  try {
    if (!localFilePath) return null;

    console.log("Uploading to cloudinary...");

    const response = await cloudinary.uploader.upload(localFilePath, options);

    console.log("Uploaded:", response.url);

    // safe delete
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.log("Cloudinary Error:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

const deleteFromCloudinary = async (
  publicId,
  options = { resource_type: "image" }
) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, options);
    return result;
  } catch (error) {
    console.log("Error deleting from cloudinary", error);
    throw new Error("Unable to delete");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
