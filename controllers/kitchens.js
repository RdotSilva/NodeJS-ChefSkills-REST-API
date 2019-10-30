const Kitchen = require("../models/Kitchen");

// @desc      Get all kitchens
// @route     GET /api/v1/kitchens
// @access    Public
exports.getKitchens = async (req, res, next) => {
	try {
		const kitchens = await Kitchen.find();

		res.status(200).json({ success: true, data: kitchens });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc      Get single kitchen
// @route     GET /api/v1/kitchens/:id
// @access    Public
exports.getKitchen = async (req, res, next) => {
	try {
		const kitchen = await Kitchen.findById(req.params.id);

		if (!kitchen) {
			return res.status(400).json({ success: false });
		}

		res.status(200).json({ success: true, data: kitchen });
	} catch (err) {
		res.status(500).json({ success: false });
	}
};

// @desc      Create new kitchen
// @route     POST /api/v1/kitchens
// @access    Private
exports.createKitchen = async (req, res, next) => {
	try {
		const kitchen = await Kitchen.create(req.body);

		res.status(201).json({
			success: true,
			data: kitchen
		});
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc      Update kitchen
// @route     PUT /api/v1/kitchens/:id
// @access    Private
exports.updateKitchen = async (req, res, next) => {
	const kitchen = await Kitchen.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!kitchen) {
		return res.status(400).json({ success: false });
	}

	res.status(200).json({ success: true, data: kitchen });
};

// @desc      Delete kitchen
// @route     DELETE /api/v1/kitchens/:id
// @access    Private
exports.deleteKitchen = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete kitchen ${req.params.id}` });
};
