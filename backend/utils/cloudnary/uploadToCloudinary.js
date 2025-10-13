import crypto from "crypto";
import cloudinary from "../../config/FS/cloudnary.js";

/**
 * Uploads an image buffer to Cloudinary.
 * @param {Buffer} buffer - The image file buffer.
 * @param {string} folderName - The folder name where the image should be uploaded.
 * @returns {Promise<object>} Cloudinary upload result.
 */
export const uploadBufferToCloudinary = (buffer, folderName = "general") => {
  return new Promise((resolve, reject) => {
    if (!buffer || !Buffer.isBuffer(buffer)) {
      reject(new Error("Invalid buffer provided"));
      return;
    }

    if (buffer.length === 0) {
      reject(new Error("Empty buffer provided"));
      return;
    }

    if (!folderName || typeof folderName !== "string") {
      reject(new Error("Invalid folder name provided"));
      return;
    }

    const uniqueId = crypto.randomBytes(3).toString("hex");

    const cloudStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName, // ✅ Dynamic folder name
        public_id: `${folderName}_${uniqueId}`,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );

    cloudStream.on("error", (error) => {
      reject(new Error(`Upload stream error: ${error.message}`));
    });

    try {
      cloudStream.end(buffer);
    } catch (error) {
      reject(new Error(`Failed to write buffer to stream: ${error.message}`));
    }
  });
};
