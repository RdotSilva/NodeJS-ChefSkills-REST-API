const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Show all kitchens" });
});

router.get("/:id", (req, res) => {
	res.status(200).json({ success: true, msg: `Show kitchen ${req.params.id}` });
});

router.post("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Create new kitchen" });
});

router.put("/:id", (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: `Update kitchen ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete kitchen ${req.params.id}` });
});

module.exports = router;
