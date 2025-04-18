const express = require("express");
const cartController = require("../controllers/cartController");
console.log("cartController", cartController);
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/cart", isAuthenticated, cartController.getAllCart);
router.post("/add", isAuthenticated, cartController.addToCart);
router.put("/update", isAuthenticated, cartController.updateCart);
router.delete("/remove/:productId", isAuthenticated, cartController.deleteCart);

module.exports = router;
