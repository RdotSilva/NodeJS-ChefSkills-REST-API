const express = require("express");
const dotenv = require("dotenv");

// Route files
const kitchens = require("./routes/kitchens");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/v1/kitchens", kitchens);

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
