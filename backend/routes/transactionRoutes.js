import express from "express";
const router = express.Router();
import transactionController from "../controllers/transactionController.js";

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAllTransaction);
router.get("/:transactionId", transactionController.getById);
router.put("/:transactionId", transactionController.updateTransaction);
router.delete("/:transactionId", transactionController.deleteTransaction);

module.exports = router;
