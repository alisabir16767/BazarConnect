import express from "express";
const router = express.Router();
import reviewController from "../controllers/reviewController.js";

router.post("/", reviewController.createReview);
router.get("/", reviewController.getAllReviews);
router.get("/:reviewId", reviewController.getById);
router.put("/:reviewId", reviewController.reviewUpdate);
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;
