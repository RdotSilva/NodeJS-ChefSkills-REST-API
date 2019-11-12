const path = require("path");
const Kitchen = require("../models/Kitchen");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all kitchens
// @route     GET /api/v1/kitchens
// @access    Public
exports.getKitchens = asyncHandler(async (req, res, next) => {
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

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${kitchen._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Kitchen.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
