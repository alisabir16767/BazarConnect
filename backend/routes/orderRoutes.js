import express from "express";
const router = express.Router();
import {
  createOrder,
  getAllOrder,
  getById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

// Routes for order operations
router.post("/", createOrder);
router.get("/", getAllOrder);
router.get("/:orderId", getById);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
