const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Kitchen = require("./models/Kitchen");

// Connect to DB.
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

// Read JSON files
const kitchens = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/kitchens.json`, "utf-8")
);

// Import into DB
const importData = async () => {
	try {
		await Kitchen.create(kitchens);

		console.log("Data Imported...".green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};
