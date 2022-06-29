const mongoose = require("mongoose");
const activityEnum = require("../utils/activityEnum");

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  activityType: {
    type: String,
    enum: Object.keys(activityEnum),
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


const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;