const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/kitchens/:kitchenId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.kitchenId) {
		query = Course.find({ kitchen: req.params.kitchenId });
	} else {
		query = Course.find().populate({
			path: "kitchen",
			select: "name description"
		});
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	});
});