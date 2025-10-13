import express from "express";
const router = express.Router();
import shopController from "../controllers/ShopController.js";
import upload from "../config/FS/multer";

router.post("/", upload.array("images", 5), shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/search/:shopCity", shopController.searchByCity);
router.get("/:shopId", shopController.getShopById);
router.put("/:shopId", upload.array("images", 5), shopController.updateShop);
router.delete("/:shopId", shopController.deleteShop);
router.get("/:shopId/products", shopController.getProductsByShopId);

module.exports = router;
