const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Route to get user's cart
router.get("/:userId", cartController.getAllCart);

// Route to add a product to user's cart
router.post("/:userId/add", cartController.addToCart);

// Route to update a product's quantity in the cart
router.put("/:userId/update", cartController.updateCart);

// Route to remove a product from user's cart
router.delete("/:userId/remove/:productId", cartController.deleteCart);

module.exports = router;
