const Bookmark = require("../models/Bookmark");
const Question = require("../models/Question");
const { validateObjectId } = require("../utils/validation");

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate("question");
    res.status(200).json({ bookmarks, msg: "Bookmarks found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.addBookmark = async (req, res) => {
  try {
    const { bookmarkType, questionId } = req.body;
    let bookmark;

    if (!bookmarkType) {
      return res.status(400).json({ msg: "please first tell the bookmark type" });
    }

    if (bookmarkType != "question") {
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
      bookmark = await Bookmark.create({ user: req.user.id, bookmarkType, question: questionId });
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

