const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");

// Create a new review
exports.createReview = asyncWrap(async (req, res) => {
  const { product_id, user_id, rating, comment } = req.body;
  const product = await Product.findById(product_id);
  if (!product) {
    return next(new ExpressError(404, "Product Not Found"));
  }
  const user = await User.findById(user_id);
  if (!user) {
    return next(new ExpressError(404, "User Not Found"));
  }
  const newReview = new Review({
    product_id,
    user_id,
    rating,
    comment,
  });

  await newReview.save();
  product.review.push(newReview._id);
  await product.save();
  res.status(201).json({ message: "Successfully created new review" });
});

// Retrieve all reviews
exports.getAllReviews = asyncWrap(async (req, res) => {
  const reviews = await Review.find();
  if (reviews.length === 0) {
    return next(new ExpressError(404, "No Review Found"));
  }
  res.status(200).json(reviews);
});
// Get review by ID
exports.getById = asyncWrap(async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new ExpressError(404, "Review does not exist"));
  }
  res.status(200).json(review);
});
// Update existing review
exports.reviewUpdate = asyncWrap(async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new ExpressError(404, "Review Not found"));
  }
  // Update the review with new data
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== "_id") {
      review[key] = req.body[key];
    }
  }
  // Save the updated review
  await review.save();
  res.status(200).json({ message: "Updated successfully" });
});

// Delete the review id
exports.deleteReview = asyncWrap(async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new ExpressError(404, "Review Not found"));
  }
  await review.deleteOne();
  res.status(200).json({ message: "Deleted successfully" });
});
