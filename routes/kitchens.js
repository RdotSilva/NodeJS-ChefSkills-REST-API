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

const router = express.Router();

const { protect } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:kitchenId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getKitchensInRadius);

router.route("/:id/photo").put(protect, kitchenPhotoUpload);

router
  .route("/")
  .get(advancedResults(Kitchen, "courses"), getKitchens)
  .post(protect, createKitchen);

router
  .route("/:id")
  .get(getKitchen)
  .put(protect, updateKitchen)
  .delete(protect, deleteKitchen);

module.exports = router;
