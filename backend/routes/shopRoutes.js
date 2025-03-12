const express = require("express");
const router = express.Router();
const shopController = require("../controllers/ShopController");

// Define routes
router.post("/", shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/search/:shopCity", shopController.searchByCity);
router.get("/:shopId", shopController.getShopById);
router.put("/:shopId", shopController.updateShop);
router.delete("/:shopId", shopController.deleteShop);

module.exports = router;
