const express = require("express");
// Make sure this path is correct
const cartController = require("../controllers/cartController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

console.log("Controller functions:", Object.keys(cartController));

router.get("/cart", ensureAuthenticated, cartController.getAllCart);
router.post("/add", ensureAuthenticated, cartController.addToCart);
router.put("/update", ensureAuthenticated, cartController.updateCart);
router.delete(
  "/remove/:productId",
  ensureAuthenticated,
  cartController.deleteCart
);

module.exports = router;
