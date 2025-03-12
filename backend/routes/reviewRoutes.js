const express=require('express');
const router= express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/',reviewController.createReview);
router.get('/',reviewController.getAllReviews);
router.get('/:reviewId',reviewController.getById);
router.put('/:reviewId',reviewController.reviewUpdate);
router.delete('/:reviewId',reviewController.deleteReview);




module.exports = router;