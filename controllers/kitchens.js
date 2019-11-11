const Kitchen = require("../models/Kitchen");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all kitchens
// @route     GET /api/v1/kitchens
// @access    Public
exports.getKitchens = asyncHandler(async (req, res, next) => {
	let query;

	// Copy request query
	const reqQuery = { ...req.query };

	// Fields to exclude
	const removeFields = ["select", "sort", "page", "limit"];

	// Loop over removeFields and delete them from request copy
	removeFields.forEach(param => delete reqQuery[param]);

	// Create query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators ($gt, $gte, etc)
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

	// Finding resource
	query = Kitchen.find(JSON.parse(queryStr)).populate("courses");

	// Select Fields
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		query = query.sort("-createdAt");
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Kitchen.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// Executing query
	const kitchens = await query;

	// Pagination result
	const pagination = {};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	res.status(200).json({
		success: true,
		count: kitchens.length,
		pagination,
		data: kitchens
	});
});

// @desc      Get single kitchen
// @route     GET /api/v1/kitchens/:id
// @access    Public
exports.getKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findById(req.params.id);

	if (!kitchen) {
		return next(
			new ErrorResponse(`Kitchen not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({ success: true, data: kitchen });
});

// @desc      Create new kitchen
// @route     POST /api/v1/kitchens
// @access    Private
exports.createKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.create(req.body);

	res.status(201).json({
		success: true,
		data: kitchen
	});
});

// @desc      Update kitchen
// @route     PUT /api/v1/kitchens/:id
// @access    Private
exports.updateKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!kitchen) {
		return next(
			new ErrorResponse(`Kitchen not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({ success: true, data: kitchen });
});

// @desc      Delete kitchen
// @route     DELETE /api/v1/kitchens/:id
// @access    Private
exports.deleteKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findById(req.params.id);

	if (!kitchen) {
		return next(
			new ErrorResponse(`Kitchen not found with id of ${req.params.id}`, 404)
		);
	}

	kitchen.remove();

	res.status(200).json({ success: true, data: {} });
});

// @desc      Get kitchens within a radius
// @route     GET /api/v1/kitchens/radius/:zipcode/:distance
// @access    Private
exports.getKitchensInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;

	// Get lat/lng from geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	// Calculate radius using radians
	// Divide distance by radius of Earth
	// Earth Radius = 3,963 mi / 6,378 km
	const radius = distance / 3963;

	const kitchens = await Kitchen.find({
		location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
	});

	res.status(200).json({
		success: true,
		count: kitchens.length,
		data: kitchens
	});
});

// @desc      Upload photo for kitchen
// @route     PUT /api/v1/kitchens/:id/photo
// @access    Private
exports.kitchenPhotoUpload = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findById(req.params.id);

	if (!kitchen) {
		return next(
			new ErrorResponse(`Kitchen not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}
});
