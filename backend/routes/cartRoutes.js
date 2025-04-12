const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/:userId", cartController.getAllCart);
router.post("/:userId/add", cartController.addToCart);
router.put("/:userId/update", cartController.updateCart);
router.delete("/:userId/remove/:productId", cartController.deleteCart);

module.exports = router;
