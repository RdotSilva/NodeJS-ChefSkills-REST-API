const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Show all kitchens" });
});

app.post("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Create new kitchen" });
});
