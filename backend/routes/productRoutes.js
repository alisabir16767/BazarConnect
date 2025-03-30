const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getById);
router.get("/shop/:shopId", productController.getProductByShopId);
router.put("/:productId", productController.productUpdate);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
