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

const Kitchen = require("../models/Kitchen");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:kitchenId/courses", courseRouter);
router.use("/:kitchenId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getKitchensInRadius);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), kitchenPhotoUpload);

router
  .route("/")
  .get(advancedResults(Kitchen, "courses"), getKitchens)
  .post(protect, authorize("publisher", "admin"), createKitchen);

router
  .route("/:id")
  .get(getKitchen)
  .put(protect, authorize("publisher", "admin"), updateKitchen)
  .delete(protect, authorize("publisher", "admin"), deleteKitchen);

module.exports = router;
