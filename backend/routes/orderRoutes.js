const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Routes for order operations
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrder);
router.get("/:orderId", orderController.getById);
router.put("/:orderId", orderController.updateOrder);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
