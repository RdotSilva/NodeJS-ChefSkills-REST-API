const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

// Route files
const kitchens = require("./routes/kitchens");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(logger);

// Mount routers
app.use("/api/v1/kitchens", kitchens);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
