const express = require("express");
// Make sure this path is correct
const cartController = require("../controllers/cartController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

console.log("Controller functions:", Object.keys(cartController));

router.get("/cart", isAuthenticated, cartController.getAllCart);
router.post("/add", isAuthenticated, cartController.addToCart);
router.put("/update", isAuthenticated, cartController.updateCart);
router.delete("/remove/:productId", isAuthenticated, cartController.deleteCart);

module.exports = router;
