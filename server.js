const express = require("express");
const dotenv = require("dotenv");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/api/v1/kitchens", (req, res) => {
	res.status(200).json({ success: true, msg: "Show all kitchens" });
});

app.post("/api/v1/kitchens", (req, res) => {
	res.status(200).json({ success: true, msg: "Create new kitchen" });
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
