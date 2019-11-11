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
	},
	minimumSkill: {
		type: String,
		required: [true, "Please add a minimum skill"],
		enum: ["beginner", "intermediate", "advanced"]
	},
	scholarshipsAvailable: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	kitchen: {
		type: mongoose.Schema.ObjectId,
		ref: "Kitchen",
		required: true
	}
});

// Static method to get average of course tuitions
CourseSchema.statics.getAverageCost = async function(kitchenId) {
	const obj = await this.aggregate([
		{
			$match: { kitchen: kitchenId }
		},
		{
			$group: {
				_id: "$kitchen",
				averageCost: { $avg: "$tuition" }
			}
		}
	]);
};

// Call getAverageCost after save
CourseSchema.post("save", function() {
	this.constructor.getAverageCost(this.kitchen);
});

// Call getAverageCost before remove
CourseSchema.pre("remove", function() {
	this.constructor.getAverageCost(this.kitchen);
});

module.exports = mongoose.model("Course", CourseSchema);
