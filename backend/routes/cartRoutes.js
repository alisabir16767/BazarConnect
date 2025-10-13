import express from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getAllCart,
  addToCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";

router.get("/cart", getAllCart);
router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/remove/:productId", deleteCart);

export default router;
