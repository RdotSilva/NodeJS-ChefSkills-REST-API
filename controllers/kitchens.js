// @desc      Get all kitchens
// @route     GET /api/v1/kitchens
// @access    Public
exports.getKitchens = (req, res, next) => {
	res.status(200).json({ success: true, msg: "Show all kitchens" });
};

// @desc      Get single kitchen
// @route     GET /api/v1/kitchens/:id
// @access    Public
exports.getKitchen = (req, res, next) => {
	res.status(200).json({ success: true, msg: `Show kitchen ${req.params.id}` });
};

// @desc      Create new kitchen
// @route     POST /api/v1/kitchens
// @access    Private
exports.createKitchen = (req, res, next) => {
	res.status(200).json({ success: true, msg: "Create new kitchen" });
};

// @desc      Update kitchen
// @route     PUT /api/v1/kitchens/:id
// @access    Private
exports.updateKitchen = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Update kitchen ${req.params.id}` });
};
