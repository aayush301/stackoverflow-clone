const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["question", "answer"],
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },

}, {
  timestamps: true
});


const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;