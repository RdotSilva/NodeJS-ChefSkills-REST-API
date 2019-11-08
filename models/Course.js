const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, "Please add a course title"]
	},
	description: {
		type: String,
		required: [true, "Please add a description"]
	},
	weeks: {
		type: String,
		required: [true, "Please add number of weeks"]
	},
	tuition: {
		type: Number,
		required: [true, "Please add a tuition cost"]
	}
});

module.exports = mongoose.model("Course", CourseSchema);
