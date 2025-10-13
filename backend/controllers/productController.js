import mongoose from "mongoose";
import sharp from "sharp";
import Product from "../models/Product";
import Shop from "../models/Shop";
import { ExpressError, asyncWrap } from "../middleware/errorMiddleware";
import { productSchema } from "../validation/productValidation";
import { uploadBufferToCloudinary } from "../utils/cloudinary/uploadBufferToCloudinary";

// CREATE NEW PRODUCT (with image upload)
exports.createProduct = asyncWrap(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return next(new ExpressError(400, error.details[0].message));

  const { shop_id } = value;
  if (!mongoose.Types.ObjectId.isValid(shop_id)) {
    return next(new ExpressError(400, "Invalid shop_id format"));
  }

  const shop = await Shop.findById(shop_id);
  if (!shop) return next(new ExpressError(404, "Shop not found"));

  let imageUrls = [];

  //  Handle multiple file uploads
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .jpeg({ quality: 80 })
        .toBuffer();

      const result = await uploadBufferToCloudinary(
        compressedBuffer,
        "products"
      );
      return result.secure_url;
    });

    imageUrls = await Promise.all(uploadPromises);
  }

  const newProduct = new Product({
    ...value,
    images: imageUrls,
  });

  await newProduct.save();

  // Add product reference to shop
  shop.products.push(newProduct._id);
  await shop.save();

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
});

//  GET ALL PRODUCTS
exports.getAllProduct = asyncWrap(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//  GET PRODUCT BY ID
exports.getById = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new ExpressError(404, "Product not found"));
  res.status(200).json(product);
});

//  GET PRODUCTS BY SHOP ID
exports.getProductByShopId = asyncWrap(async (req, res, next) => {
  const { shopId } = req.params;
  const shop = await Shop.findById(shopId);
  if (!shop) return res.status(404).json({ message: "Shop not found" });

  const products = await Product.find({ shop_id: shopId });
  if (!products.length)
    return res
      .status(404)
      .json({ message: "No products found for this shop." });

  res.status(200).json(products);
});

//  UPDATE PRODUCT (with optional new image uploads)
exports.productUpdate = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new ExpressError(404, "Product Not Found"));

  let newImageUrls = [];

  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .jpeg({ quality: 80 })
        .toBuffer();

      const result = await uploadBufferToCloudinary(
        compressedBuffer,
        "products"
      );
      return result.secure_url;
    });

    newImageUrls = await Promise.all(uploadPromises);
  }

  // Merge existing + new images
  product.images = [...product.images, ...newImageUrls];

  // Update other fields
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== "_id") {
      product[key] = req.body[key];
    }
  }

  await product.save();
  res.status(200).json({ message: "Product updated successfully", product });
});

//  DELETE PRODUCT
exports.deleteProduct = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new ExpressError(404, "Product Not Found"));

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});
