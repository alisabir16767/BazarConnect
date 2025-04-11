const Order = require("../models/Order");
const Shop = require("../models/Shop");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");

// CREATE A NEW ORDER
exports.createOrder = asyncWrap(async (req, res, next) => {
  const {
    shop_id,
    user_id,
    products,
    shipped_address,
    payment_method,
    total_amount,
  } = req.body;

  const shop = await Shop.findById(shop_id);
  if (!shop) {
    return next(new ExpressError(404, "Shop not found"));
  }

  const newOrder = new Order({
    shop_id,
    user_id,
    products,
    shipped_address,
    payment_method,
    total_amount,
  });
  await newOrder.save();

  res.status(201).json({ message: "New order created", order: newOrder });
});

// GET ALL ORDERS
exports.getAllOrder = asyncWrap(async (req, res) => {
  const orders = await Order.find().populate(
    "user_id shop_id products.product_id"
  );
  res.status(200).json(orders);
});

// GET ORDER BY ID
exports.getById = asyncWrap(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user_id shop_id products.product_id"
  );
  if (!order) {
    return next(new ExpressError(404, "Order not found"));
  }
  res.status(200).json(order);
});

// UPDATE EXISTING ORDER
exports.updateOrder = asyncWrap(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
  });
  if (!order) {
    return next(new ExpressError(404, "Order not found"));
  }
  res.status(200).json({ message: "Order updated successfully", order });
});

// DELETE ORDER
exports.deleteOrder = asyncWrap(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    return next(new ExpressError(404, "Order not found"));
  }
  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
});
