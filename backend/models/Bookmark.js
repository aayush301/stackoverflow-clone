const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookmarkType: {
    type: String,
    enum: ["question"]
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },

}, {
  timestamps: true
});


const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark;