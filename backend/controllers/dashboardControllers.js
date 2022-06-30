const Answer = require("../models/Answer");
const Bookmark = require("../models/Bookmark");
const Question = require("../models/Question");

exports.getDashboardData = async (req, res) => {
  try {
    const getQuestionsCount = async () => await Question.countDocuments({ questioner: req.user.id });
    const getAnswersCount = async () => await Answer.countDocuments({ answerer: req.user.id });
    const getBookmarksCount = async () => Bookmark.countDocuments({ user: req.user.id });
    const getRecentQuestions = async () => await Question.find({ questioner: req.user.id }).limit(5).sort("-createdAt");
    const getRecentAnswers = async () => await Answer.find({ answerer: req.user.id }).populate("question").limit(5).sort("-createdAt");

    const [questionsCount, answersCount, bookmarksCount, recentQuestions, recentAnswers] = await Promise.all([
      getQuestionsCount(), getAnswersCount(), getBookmarksCount(), getRecentQuestions(), getRecentAnswers(),
    ]);

    const data = {
      questionsCount, answersCount, bookmarksCount, recentQuestions, recentAnswers,
    };

    res.status(200).json({ data, msg: "Dashboard data fetched successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
