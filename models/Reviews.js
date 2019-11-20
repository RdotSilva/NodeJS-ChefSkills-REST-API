const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxLength: 100
  },
  text: {
    type: String,
    required: [true, "Please add some text"]
  }
});

module.exports = mongoose.model("Reviews", ReviewSchema);
