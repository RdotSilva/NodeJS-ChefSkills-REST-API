const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Show all kitchens" });
});

app.get("/:id", (req, res) => {
	res.status(200).json({ success: true, msg: `Show kitchen ${req.params.id}` });
});

app.post("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Create new kitchen" });
});

app.put("/:id", (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: `Update kitchen ${req.params.id}` });
});

app.delete("/:id", (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete kitchen ${req.params.id}` });
});
