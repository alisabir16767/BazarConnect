import express from "express";
const router = express.Router();
import {
  createTransaction,
  getAllTransaction,
  getById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

router.post("/", createTransaction);
router.get("/", getAllTransaction);
router.get("/:transactionId", getById);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
