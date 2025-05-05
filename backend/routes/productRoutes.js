const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/shop/:shopId", productController.getProductByShopId);
router.get("/:productId", productController.getById);
router.put("/:productId", productController.productUpdate);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
