const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please add some text"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  kitchen: {
    type: mongoose.Schema.ObjectId,
    ref: "Kitchen",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

// Prevent user from submitting more than one review per kitchen
ReviewSchema.index({ kitchen: 1, user: 1 }, { unique: true });

// Static method to get average of rating and save
ReviewSchema.statics.getAverageRating = async function(kitchenId) {
  const obj = await this.aggregate([
    {
      $match: { kitchen: kitchenId }
    },
    {
      $group: {
        _id: "$kitchen",
        averageRating: { $avg: "$rating" }
      }
    }
  ]);

  try {
    await this.model("Kitchen").findByIdAndUpdate(kitchenId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("Review", ReviewSchema);
