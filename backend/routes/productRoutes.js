import express from "express";
const router = express.Router();
import upload from "../config/FS/multer.js";
import {
  createProduct,
  getAllProduct,
  getById,
  productUpdate,
  deleteProduct,
  getProductByShopId,
} from "../controllers/productController.js";

// Create product by shopId
router.post("/shop/:shopId", upload.array("images", 5), createProduct);

router.get("/", getAllProduct);

router.get("/shop/:shopId", getProductByShopId);
router.get("/:productId", getById);
router.put("/:productId", upload.array("images", 5), productUpdate);
router.delete("/:productId", deleteProduct);

export default router;
