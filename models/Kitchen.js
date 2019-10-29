const mongoose = require("mongoose");

const KitchenSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name"],
		unique: true,
		trim: true,
		maxlength: [50, "Name can not be more than 50 characters"]
	},
	Slug: String,
	description: {
		type: String,
		required: [true, "Please add a description"],
		maxlength: [500, "Description can not be more than 500 characters"]
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			"Please use a valid URL with HTTP or HTTPS"
		]
	},
	phone: {
		type: String,
		maxlength: [20, "Phone number can not be longer than 20 characters"]
	}
});
