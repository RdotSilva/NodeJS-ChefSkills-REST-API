const express = require("express");

const {
	getKitchens,
	getKitchen,
	createKitchen,
	updateKitchen,
	deleteKitchen,
	getKitchensInRadius,
	kitchenPhotoUpload
} = require("../controllers/kitchens");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:kitchenId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getKitchensInRadius);

router.route("/:id/photo").put(kitchenPhotoUpload);

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
