const Answer = require("../models/Answer");
const Question = require("../models/Question");
const { convertTextToSlug } = require("../utils/slug");
const { validateObjectId } = require("../utils/validation");


exports.getQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const questions = await
      Question.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort("-createdAt");

    res.status(200).json({ questions, msg: "Questions found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.postQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ msg: "Please fill question title and body" });
    }

    if (title.length < 10) {
      return res.status(400).json({ msg: "Min. 10 chars are required for title" });
    }
    if (body.length < 40) {
      return res.status(400).json({ msg: "Min. 40 chars are required for body (including html)" });
    }

    const slug = convertTextToSlug(title);

    if (await Question.findOne({ slug })) {
      return res.status(400).json({ msg: "This type of question already exists. Please check the question or change the title.." });
    }

    const question = await Question.create({ questioner: userId, title, body, slug });
    res.status(200).json({ question, msg: "Question posted successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.qid;

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "Question id not valid" });
    }

    const question = await Question.findById(questionId).populate("questioner", "-password");
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    const answers = await Answer.find({ question: questionId }).populate("answerer", "-password");
    res.status(200).json({ question, answers, msg: "Question found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getQuestionBySlug = async (req, res) => {
  try {
    const slug = req.params.qslug;

    const question = await Question.findOne({ slug }).populate("questioner", "-password");
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    const answers = await Answer.find({ question: question._id }).populate("answerer", "-password");
    res.status(200).json({ question, answers, msg: "Question found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.updateQuestionById = async (req, res) => {
  try {
    const questionId = req.params.qid;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ msg: "Please fill question title and body" });
    }

    if (title.length < 10) {
      return res.status(400).json({ msg: "Min. 10 chars are required for title" });
    }
    if (body.length < 40) {
      return res.status(400).json({ msg: "Min. 40 chars are required for body (including html)" });
    }

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "Invalid Question id" });
    }

    let question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    if (question.questioner != req.user.id) {
      return res.status(400).json({ msg: "invalid Question id.." });
    }

    const slug = convertTextToSlug(title);
    if (slug !== question.slug && await Question.findOne({ slug })) {
      return res.status(400).json({ msg: "This type of question already exists. Please check the question or change the title.." });
    }

    question = await Question.findByIdAndUpdate(questionId, { title, body, slug }, { new: true });
    res.status(200).json({ question, msg: "Question updated successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getQuestionsOfCurrentUser = async (req, res) => {
  try {
    const questions = await Question.find({ questioner: req.user.id }).sort("-createdAt");
    for (let i = 0; i < questions.length; i++) {
      const ansCount = await Answer.countDocuments({ question: questions[i]._id });
      questions[i] = { ...questions[i].toObject(), ansCount };
    }
    res.status(200).json({ questions, msg: "Questions found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

