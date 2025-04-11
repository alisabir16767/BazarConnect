const mongoose = require("mongoose");
const Product = require("../models/Product");
const Shop = require("../models/Shop");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");
const { productSchema } = require("../validation/productValidation");

// CREATE NEW PRODUCT
exports.createProduct = asyncWrap(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error.details[0].message);
    return next(new ExpressError(400, error.details[0].message));
  }

  const { shop_id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(shop_id)) {
    return next(new ExpressError(400, "Invalid shop_id format"));
  }

  const shop = await Shop.findById(shop_id);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  shop.products.push(newProduct._id);
  await shop.save();

  res.status(201).json({ message: "New Product created", product: newProduct });
});

// GET ALL PRODUCTS
exports.getAllProduct = asyncWrap(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// GET PRODUCT BY ID
exports.getById = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }
  res.status(200).json(product);
});

// GET PRODUCT BY SHOP ID
exports.getProductByShopId = asyncWrap(async (req, res, next) => {
  const { shopId } = req.params;
  const shop = await Shop.findById(shopId);
  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }
  const products = await Product.find({ shop_id: shopId });

  if (!products || products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for this shop." });
  }

  res.status(200).json(products);
});

// UPDATE A PRODUCT
exports.productUpdate = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new ExpressError(404, "Product Not Found"));
  }

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== "_id") {
      product[key] = req.body[key];
    }
  }

  await product.save();
  res.status(200).json({ message: "Product updated successfully", product });
});

// DELETE A PRODUCT
exports.deleteProduct = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new ExpressError(404, "Product Not Found"));
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});
