const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookmarkType: {
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


const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark;