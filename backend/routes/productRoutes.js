import express from "express";
const router = express.Router();
import productController from "../controllers/productController.js";
import upload from "../middleware/multer";

router.post("/", upload.array("images", 5), productController.createProduct);

router.get("/", productController.getAllProduct);

router.get("/shop/:shopId", productController.getProductByShopId);
router.get("/:productId", productController.getById);
router.put(
  "/:productId",
  upload.array("images", 5),
  productController.productUpdate
);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
