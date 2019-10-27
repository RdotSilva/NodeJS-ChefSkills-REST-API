const express = require("express");

const {
	getKitchens,
	getKitchen,
	createKitchen,
	updateKitchen,
	deleteKitchen
} = require("../controllers/kitchens");

const router = express.Router();

module.exports = router;
