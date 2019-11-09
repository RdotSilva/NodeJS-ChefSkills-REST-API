const Course = require("../models/Course");
const Kitchen = require("../models/Kitchen");
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

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id).populate({
		path: "kitchen",
		select: "name description"
	});

	if (!course) {
		return next(
			new ErrorResponse(`No course with id of ${req.params.id}`),
			404
		);
	}

	res.status(200).json({
		success: true,
		data: course
	});
});

// @desc      Add course
// @route     POST /api/v1/kitchens/:kitchenId/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
	req.body.kitchen = req.params.kitchenId;

	const kitchen = await Kitchen.findById(req.params.kitchenId);

	if (!kitchen) {
		return next(
			new ErrorResponse(`No kitchen with id of ${req.params.kitchenId}`),
			404
		);
	}

	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		data: course
	});
});
