const Product = require("../models/Product");
const Shop = require("../models/Shop");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");
const { productSchema } = require("../validation/productValidation");

// Create a new product
exports.createProduct = asyncWrap(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(400, error.details[0].message));
  }

  const { shop_id } = req.body;
  const shop = await Shop.findById(shop_id);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }

  const newProduct = new Product(req.body);
  await newProduct.save();
  shop.products.push(newProduct._id);
  await shop.save();

  res.status(201).json({ message: "New Product created" });
});

// Get all products
exports.getAllProduct = asyncWrap(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Get a product by ID
exports.getById = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }
  res.status(200).json(product);
});

// Get products by shop_id
exports.getProductByShop_id = asyncWrap(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);
  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }

  const products = shop.products;
  if (!products || products.length === 0) {
    return next(new ExpressError(404, "Product Not Found"));
  }
  res.status(200).json(products);
});

// Update a product
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

// Delete a product
exports.deleteProduct = asyncWrap(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new ExpressError(404, "Product Not Found"));
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});
