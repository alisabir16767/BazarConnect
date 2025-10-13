import express from "express";
const router = express.Router();
import {
  createReview,
  getAllReviews,
  getById,
  reviewUpdate,
  deleteReview,
} from "../controllers/reviewController.js";

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:reviewId", getById);
router.put("/:reviewId", reviewUpdate);
router.delete("/:reviewId", deleteReview);

export default router;
