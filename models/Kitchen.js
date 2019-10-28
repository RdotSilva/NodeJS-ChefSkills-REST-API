const mongoose = require("mongoose");

const KitchenSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name"],
		unique: true,
		trim: true,
		maxLength: [50, "Name can not be more than 50 characters"]
	}
});
