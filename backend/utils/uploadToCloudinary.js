import sharp from "sharp";
import cloudinary from "../configs/cloudinary.js";
import { Readable } from "stream";

export const uploadToCloudinary = async (
  buffer,
  folder = "uploads",
  quality = 80
) => {
  try {
    const compressedBuffer = await sharp(buffer)
      .resize({
        width: 1080,
        withoutEnlargement: true,
      })
      .jpeg({ quality })
      .toBuffer();

    const stream = Readable.from(compressedBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });
  } catch (err) {
    console.error("Cloud upload error:", err);
    throw err;
  }
};
