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
