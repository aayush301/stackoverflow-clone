const Activity = require("../models/Activity");
const Answer = require("../models/Answer");
const Like = require("../models/Like");
const Question = require("../models/Question");
const activityEnum = require("../utils/activityEnum");
const { validateObjectId } = require("../utils/validation");

exports.getLikesOfQuestion = async (req, res) => {
  try {
    const qid = req.params.qid;
    if (!validateObjectId(qid)) {
      return res.status(400).json({ msg: "Invalid question id" });
    }

    if (!(await Question.findOne({ question: qid }))) {
      return res.status(400).json({ msg: "No such question exists" });
    }

    const likesCount = await Like.countDocuments({ question: qid });

    let like = null;
    if (req.user) {
      like = await Like.findOne({ question: qid, user: req.user.id });
    }
    res.status(200).json({ likesCount, like, msg: "Likes found successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getLikesOfAnswer = async (req, res) => {
  try {
    const ansid = req.params.ansid;
    if (!validateObjectId(ansid)) {
      return res.status(400).json({ msg: "Invalid question id" });
    }

    if (!(await Answer.findOne({ answer: ansid }))) {
      return res.status(400).json({ msg: "No such answer exists" });
    }

    const likesCount = await Like.countDocuments({ answer: ansid });

    let like = null;
    if (req.user) {
      like = await Like.findOne({ answer: ansid, user: req.user.id });
    }
    res.status(200).json({ likesCount, like, msg: "Likes found successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}




exports.postLike = async (req, res) => {
  try {
    const { type, questionId, answerId } = req.body;
    let like;

    if (!type) {
      return res.status(400).json({ msg: "please first tell the type" });
    }

    if (type != "question" && type != "answer") {
      return res.status(400).json({ msg: "Invalid type" });
    }

    if (type == "question") {
      if (!questionId) {
        return res.status(400).json({ msg: "Question id not found" });
      }

      if (!validateObjectId(questionId)) {
        return res.status(400).json({ msg: "Invalid question id" });
      }

      if (!(await Question.findById(questionId))) {
        return res.status(400).json({ msg: "Question with given id not found" });
      }

      if (await Like.findOne({ user: req.user.id, question: questionId })) {
        return res.status(400).json({ msg: "You already like this" });
      };

      like = await Like.create({ user: req.user.id, type, question: questionId });
      await Activity.create({ user: req.user.id, activityType: activityEnum.LIKED, question: questionId });

    }
    else if (type == "answer") {
      if (!answerId) {
        return res.status(400).json({ msg: "Answer id not found" });
      }

      if (!validateObjectId(answerId)) {
        return res.status(400).json({ msg: "Invalid answer id" });
      }

      if (!(await Answer.findById(answerId))) {
        return res.status(400).json({ msg: "Answer with given id not found" });
      }

      if (await Like.findOne({ user: req.user.id, answer: answerId })) {
        return res.status(400).json({ msg: "You already like this" });
      };
      like = await Like.create({ user: req.user.id, type, answer: answerId });
      await Activity.create({ user: req.user.id, activityType: activityEnum.LIKED, answer: answerId });
    }

    res.status(200).json({ like, msg: "Liked successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}




exports.deleteLike = async (req, res) => {
  try {
    const likeId = req.params.likeId;

    if (!validateObjectId(likeId)) {
      return res.status(400).json({ msg: "Invalid id" });
    }

    const like = await Like.findById(likeId);
    if (!like) {
      return res.status(400).json({ msg: "Like not found" });
    }

    if (like.user != req.user.id) {
      return res.status(400).json({ msg: "Invalid like" });
    }

    await Like.findByIdAndDelete(likeId);
    res.status(200).json({ msg: "Like removed successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getLikesOfCurrentUser = async (req, res) => {
  try {
    const likes = await Like.find({ user: req.user.id })
      .populate({ path: "question", populate: { path: 'questioner' } })
      .populate({ path: "answer", populate: { path: 'answerer question' } });

    res.status(200).json({ likes, msg: "Likes found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}