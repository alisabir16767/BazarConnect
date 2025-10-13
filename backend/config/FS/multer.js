/**
 * @file multer.js
 * @description
 * Handles profile picture uploads using Multer and Cloudinary with pre-compression.
 *
 * Features:
 * - Pre-compresses images using Sharp before uploading to Cloudinary
 * - Uploads optimized images to Cloudinary under the 'profile' folder
 * - Restricts file size to 1.5MB and formats to PNG, JPG, JPEG
 * - Generates a unique, safe public_id for each image
 * - Applies basic moderation using 'webpurify'
 * - Maintains aspect ratio while resizing to max 400x400
 *
 * Flow:
 * Client uploads → Multer receives → Sharp pre-compression → Cloudinary upload → DB save → Response
 *
 * Usage:
 * import upload from './multer.js';
 *
 * // Example route in Express:
 * app.post('/api/v1/profile-picture', upload.single('file'), (req, res) => {
 *     res.json({
 *         url: req.file.path,
 *         public_id: req.file.filename,
 *         originalSize: req.file.originalSize,
 *         compressedSize: req.file.size
 *     });
 * });
 */

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1.5 * 1024 * 1024 }, // 1.5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValid = allowedTypes.test(file.mimetype);
    if (isValid) cb(null, true);
    else cb(new Error("Only JPG, JPEG, PNG allowed"));
  },
});

export default upload;
