const Kitchen = require("../models/Kitchen");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all kitchens
// @route     GET /api/v1/kitchens
// @access    Public
exports.getKitchens = asyncHandler(async (req, res, next) => {
	const kitchens = await Kitchen.find();

	res
		.status(200)
		.json({ success: true, count: kitchens.length, data: kitchens });
});

// @desc      Get single kitchen
// @route     GET /api/v1/kitchens/:id
// @access    Public
exports.getKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findById(req.params.id);

	if (!kitchen) {
		return new ErrorResponse(
			`Kitchen not found with id of ${req.params.id}`,
			404
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
		return new ErrorResponse(
			`Kitchen not found with id of ${req.params.id}`,
			404
		);
	}

	res.status(200).json({ success: true, data: kitchen });
});

// @desc      Delete kitchen
// @route     DELETE /api/v1/kitchens/:id
// @access    Private
exports.deleteKitchen = asyncHandler(async (req, res, next) => {
	const kitchen = await Kitchen.findByIdAndDelete(req.params.id);

	if (!kitchen) {
		return new ErrorResponse(
			`Kitchen not found with id of ${req.params.id}`,
			404
		);
	}

	res.status(200).json({ success: true, data: {} });
});

// @desc      Get kitchens within a radius
// @route     GET /api/v1/kitchens/radius/:zipcode/:distance
// @access    Private
exports.getKitchensInRadius = asyncHandler(async (req, res, next) => {});
