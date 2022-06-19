const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isAccepted: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});


const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;