import Shop from "../models/Shop.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { ExpressError, asyncWrap } from "../middleware/errorMiddleware.js";
import { shopSchema } from "../validation/shopValidation.js";
import sharp from "sharp";
import { uploadBufferToCloudinary } from "../utils/cloudnary/uploadToCloudinary.js";

/**
 * CREATE NEW SHOP (with multiple image upload)
 */
export const createShop = asyncWrap(async (req, res, next) => {
  try {
    const { error, value } = shopSchema.validate(req.body);
    if (error) {
      return next(new ExpressError(400, error.details[0].message));
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: 800, height: 800, fit: "inside" })
          .jpeg({ quality: 80 })
          .toBuffer();

        const result = await uploadBufferToCloudinary(
          compressedBuffer,
          "shops"
        );
        return result.secure_url;
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    const newShop = new Shop({
      ...value,
      images: imageUrls,
    });

    await newShop.save();
    res.status(201).json({
      message: "Shop created successfully",
      shop: newShop,
    });
  } catch (err) {
    next(new ExpressError(500, err.message));
  }
});

/**
 * GET ALL SHOPS
 */
export const getAllShops = asyncWrap(async (req, res, next) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
});

/**
 * GET SHOP BY ID
 */
export const getShopById = asyncWrap(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);
  if (!shop) return next(new ExpressError(404, "Shop not found"));
  res.status(200).json(shop);
});

/**
 * SEARCH SHOP BY CITY
 */
export const searchByCity = asyncWrap(async (req, res, next) => {
  const { shopCity } = req.params;
  const shops = await Shop.find({ city: shopCity });
  if (shops.length === 0) return next(new ExpressError(404, "Shop not found"));
  res.status(200).json(shops);
});

/**
 * GET PRODUCTS BY SHOP ID
 */
export const getProductsByShopId = asyncWrap(async (req, res, next) => {
  const { shopId } = req.params;
  const shop = await Shop.findById(shopId);
  if (!shop) return next(new ExpressError(404, "Shop not found"));

  const products = await Product.find({ _id: { $in: shop.products } });
  if (products.length === 0)
    return res
      .status(404)
      .json({ message: "No products found for this shop." });

  res.status(200).json(products);
});

/**
 * UPDATE SHOP (with optional new image uploads)
 */
export const updateShop = asyncWrap(async (req, res, next) => {
  try {
    const { error, value } = shopSchema.validate(req.body);
    if (error) {
      return next(new ExpressError(400, error.details[0].message));
    }

    const shop = await Shop.findById(req.params.shopId);
    if (!shop) return next(new ExpressError(404, "Shop not found"));

    let newImageUrls = [];

    // ✅ If new images are provided, upload them
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: 800, height: 800, fit: "inside" })
          .jpeg({ quality: 80 })
          .toBuffer();

        const result = await uploadBufferToCloudinary(
          compressedBuffer,
          "shops"
        );
        return result.secure_url;
      });
      newImageUrls = await Promise.all(uploadPromises);
    }

    // ✅ Merge existing + new images
    shop.images = [...shop.images, ...newImageUrls];

    Object.assign(shop, value);
    await shop.save();

    res.status(200).json({
      message: "Shop updated successfully",
      shop,
    });
  } catch (err) {
    next(new ExpressError(500, err.message));
  }
});

/**
 * DELETE SHOP
 */
export const deleteShop = asyncWrap(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);
  if (!shop) return next(new ExpressError(404, "Shop not found"));

  await Shop.deleteOne({ _id: req.params.shopId });
  res.status(200).json({ message: "Shop deleted successfully" });
});
