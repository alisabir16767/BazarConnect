import express from "express";
const router = express.Router();
import upload from "../config/FS/multer.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
  searchByCity,
  getProductsByShopId,
} from "../controllers/ShopController.js";

router.post("/", upload.array("images", 5), createShop);
router.get("/", getAllShops);
router.get("/search/:shopCity", searchByCity);
router.get("/:shopId", getShopById);
router.put("/:shopId", upload.array("images", 5), updateShop);
router.delete("/:shopId", deleteShop);
router.get("/:shopId/products", getProductsByShopId);

export default router;
