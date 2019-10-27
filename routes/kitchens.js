const express = require("express");

const {
	getKitchens,
	getKitchen,
	createKitchen,
	updateKitchen,
	deleteKitchen
} = require("../controllers/kitchens");

const router = express.Router();

router
	.route("/")
	.get(getKitchens)
	.post(createKitchen);

router
	.route("/:id")
	.get(getKitchen)
	.put(updateKitchen)
	.delete(deleteKitchen);

module.exports = router;
