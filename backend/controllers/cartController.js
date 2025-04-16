const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { asyncWrap, ExpressError } = require("../middleware/errorMiddleware");

exports.getAllCart = asyncWrap(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user_id: userId }).populate(
    "products.product_id"
  );
  if (!cart) {
    return next(new ExpressError(404, "Cart not found"));
  }

  res.status(200).json(cart);
});

exports.addToCart = asyncWrap(async (req, res, next) => {
  const userId = req.user._id;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return next(new ExpressError(400, "Product ID and quantity are required"));
  }

  const product = await Product.findById(product_id);
  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) {
    cart = new Cart({
      user_id: userId,
      products: [{ product_id, quantity, price: product.price }],
    });
  } else {
    const productIndex = cart.products.findIndex(
      (p) => p.product_id.toString() === product_id
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product_id, quantity, price: product.price });
    }
  }

  cart.last_updated = Date.now();
  await cart.save();

  res.status(201).json(cart);
});

exports.updateCart = asyncWrap(async (req, res, next) => {
  const userId = req.user._id;
  const { product_id, quantity } = req.body;

  if (!product_id || quantity == null) {
    return next(new ExpressError(400, "Product ID and quantity are required"));
  }

  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    return next(new ExpressError(404, "Cart not found"));
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product_id.toString() === product_id
  );

  if (productIndex > -1) {
    cart.products[productIndex].quantity = quantity;
    cart.last_updated = Date.now();
    await cart.save();
    res.status(200).json(cart);
  } else {
    return next(new ExpressError(404, "Product not found in cart"));
  }
});

exports.deleteCart = asyncWrap(async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    return next(new ExpressError(404, "Cart not found"));
  }

  const initialLength = cart.products.length;
  cart.products = cart.products.filter(
    (p) => p.product_id.toString() !== productId
  );

  if (cart.products.length === initialLength) {
    return next(new ExpressError(404, "Product not found in cart"));
  }

  cart.last_updated = Date.now();
  await cart.save();
  res.status(200).json(cart);
});
