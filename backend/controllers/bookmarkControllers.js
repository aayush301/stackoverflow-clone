const Activity = require("../models/Activity");
const Answer = require("../models/Answer");
const Bookmark = require("../models/Bookmark");
const Question = require("../models/Question");
const activityEnum = require("../utils/activityEnum");
const { validateObjectId } = require("../utils/validation");

exports.getBookmarksOfCurrentUser = async (req, res) => {
  try {
    if (req.query.qid) {
      if (!validateObjectId(req.query.qid)) {
        return res.status(400).json({ msg: "Invalid question id" });
      }
      const bookmark = await Bookmark.findOne({ user: req.user.id, question: req.query.qid });
      return res.status(200).json({ bookmark, msg: bookmark ? "Bookmark found successfully" : "Question not bookmarked" });
    }

    if (req.query.ansid) {
      if (!validateObjectId(req.query.ansid)) {
        return res.status(400).json({ msg: "Invalid answer id" });
      }
      const bookmark = await Bookmark.findOne({ user: req.user.id, answer: req.query.ansid });
      return res.status(200).json({ bookmark, msg: bookmark ? "Bookmark found successfully" : "Answer not bookmarked" });
    }



    let bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({ path: "question", populate: { path: 'questioner' } })
      .populate({ path: "answer", populate: { path: 'answerer question' } })
      .lean();

    const addExtraInfo = async (bookmark) => {
      if (bookmark.bookmarkType === "answer") return bookmark;
      const answers = await Answer.find({ question: bookmark.question._id }).lean();
      const ansCount = answers.length;
      const acceptedAnsCount = answers.filter(answer => answer.isAccepted).length;
      return { ...bookmark, question: { ...bookmark.question, ansCount, acceptedAnsCount } };
    }

    bookmarks = await Promise.all(bookmarks.map(bookmark => addExtraInfo(bookmark)));
    res.status(200).json({ bookmarks, msg: "Bookmarks found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.addBookmark = async (req, res) => {
  try {
    const { bookmarkType, questionId, answerId } = req.body;
    let bookmark;

    if (!bookmarkType) {
      return res.status(400).json({ msg: "please first tell the bookmark type" });
    }

    if (bookmarkType != "question" && bookmarkType != "answer") {
      return res.status(400).json({ msg: "Invalid bookmark type" });
    }

    if (bookmarkType == "question") {
      if (!questionId) {
        return res.status(400).json({ msg: "Question id not found" });
      }

      if (!validateObjectId(questionId)) {
        return res.status(400).json({ msg: "Invalid question id" });
      }

      if (!(await Question.findById(questionId))) {
        return res.status(400).json({ msg: "Question with given id not found" });
      }
      if (await Bookmark.findOne({ user: req.user.id, bookmarkType, question: questionId })) {
        return res.status(400).json({ msg: "Bookmark already present" });
      };
      bookmark = await Bookmark.create({ user: req.user.id, bookmarkType, question: questionId });
      await Activity.create({ user: req.user.id, activityType: activityEnum.BOOKMARKED, question: questionId });

    }
    else if (bookmarkType == "answer") {
      if (!answerId) {
        return res.status(400).json({ msg: "Answer id not found" });
      }

      if (!validateObjectId(answerId)) {
        return res.status(400).json({ msg: "Invalid answer id" });
      }

      if (!(await Answer.findById(answerId))) {
        return res.status(400).json({ msg: "Answer with given id not found" });
      }
      if (await Bookmark.findOne({ user: req.user.id, bookmarkType, answer: answerId })) {
        return res.status(400).json({ msg: "Bookmark already present" });
      };
      bookmark = await Bookmark.create({ user: req.user.id, bookmarkType, answer: answerId });
      await Activity.create({ user: req.user.id, activityType: activityEnum.BOOKMARKED, answer: answerId });
    }

    res.status(200).json({ bookmark, msg: "Bookmark added successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.deleteBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.bookmarkId;

    if (!validateObjectId(bookmarkId)) {
      return res.status(400).json({ msg: "Invalid bookmark id" });
    }

    const bookmark = await Bookmark.findById(bookmarkId);
    if (!bookmark) {
      return res.status(400).json({ msg: "Bookmark not found" });
    }

    if (bookmark.user != req.user.id) {
      return res.status(400).json({ msg: "Invalid bookmark" });
    }

    await Bookmark.findByIdAndDelete(bookmarkId);
    res.status(200).json({ msg: "Bookmark deleted successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

