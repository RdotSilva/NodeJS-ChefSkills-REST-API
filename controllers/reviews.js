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

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "kitchen",
    select: "name description"
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc      Add review
// @route     POST /api/v1/kitchens/:kitchenId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.kitchen = req.params.kitchenId;
  req.body.user = req.user.id;

  const kitchen = await Kitchen.findById(req.params.kitchenId);

  if (!kitchen) {
    return next(
      new ErrorResponse(
        `No kitchen with the ID of ${req.params.kitchenId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc      Update review
// @route     POST /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the ID of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update review.`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  });
});
