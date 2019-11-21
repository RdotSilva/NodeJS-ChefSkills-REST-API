const Review = require("../models/Review");
const Kitchen = require("../models/Kitchen");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/kitchens/:kitchenId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.kitchenId) {
    const reviews = await Review.find({ kitchen: req.params.kitchenId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
