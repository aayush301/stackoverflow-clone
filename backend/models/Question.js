const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  slug: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});


const Question = mongoose.model("Question", questionSchema);
module.exports = Question;