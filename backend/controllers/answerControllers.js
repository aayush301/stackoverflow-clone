const Activity = require("../models/Activity");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const activityEnum = require("../utils/activityEnum");
const { validateObjectId } = require("../utils/validation");



exports.getAnswerById = async (req, res) => {
  try {
    const answerId = req.params.ansid;

    if (!validateObjectId(answerId)) {
      return res.status(400).json({ msg: "Question id not valid" });
    }

    const answer = await Answer.findById(answerId).populate("question").populate("answerer", "-password");
    if (!answer) {
      return res.status(400).json({ msg: "No answer found.." });
    }
    res.status(200).json({ answer, msg: "Answer found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.updateAnswerById = async (req, res) => {
  try {

    const answerId = req.params.ansid;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ msg: "Answer can't be empty" });
    }

    if (!validateObjectId(answerId)) {
      return res.status(400).json({ msg: "Invalid Answer id" });
    }

    let answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(400).json({ msg: "No answer found.." });
    }

    if (answer.answerer != req.user.id) {
      return res.status(400).json({ msg: "Invalid Answer id.." });
    }

    answer = await Answer.findByIdAndUpdate(answerId, { text }, { new: true });
    res.status(200).json({ answer, msg: "Answer updated successfully" });
    await Activity.create({ user: req.user.id, activityType: activityEnum.EDITED_ANSWER, answer: answer._id });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.acceptAnswer = async (req, res) => {
  try {
    const answerId = req.params.ansid;

    if (!validateObjectId(answerId)) {
      return res.status(400).json({ msg: "Invalid Answer id" });
    }

    let answer = await Answer.findById(answerId).populate("question");
    if (!answer) {
      return res.status(400).json({ msg: "No answer found.." });
    }

    if (answer.question.questioner != req.user.id) {
      return res.status(400).json({ msg: "Not allowed.." });
    }

    answer = await Answer.findByIdAndUpdate(answerId, { isAccepted: true }, { new: true });
    await Activity.create({ user: req.user.id, activityType: activityEnum.ACCEPTED_ANSWER, answer: answer._id });
    res.status(200).json({ answer, msg: "Answer accepted successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getAnswersOfCurrentUser = async (req, res) => {
  try {
    const answers = await Answer.find({ answerer: req.user.id }).populate("question").sort("-createdAt");
    res.status(200).json({ answers, msg: "Answers found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
