const Activity = require("../models/Activity");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const activityEnum = require("../utils/activityEnum");
const { convertTextToSlug } = require("../utils/slug");
const { validateObjectId } = require("../utils/validation");


exports.getQuestions = async (req, res) => {
  try {

    let { answerFilter } = req.query;


    let questions = await Question
      .find()
      .sort("-createdAt")
      .populate("questioner", "name")
      .lean();

    const addExtraInfo = async (question) => {
      const answers = await Answer.find({ question: question._id }).lean();
      const ansCount = answers.length;
      const acceptedAnsCount = answers.filter(answer => answer.isAccepted).length;
      return { ...question, ansCount, acceptedAnsCount };
    }

    questions = await Promise.all(questions.map(question => addExtraInfo(question)));

    if (answerFilter == "noAnswer") {
      questions = questions.filter(question => question.ansCount == 0);
    }
    else if (answerFilter == "hasAnswer") {
      questions = questions.filter(question => question.ansCount > 0);
    }
    else if (answerFilter == "hasAcceptedAnswer") {
      questions = questions.filter(question => question.acceptedAnsCount > 0);
    }

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
    await Activity.create({ user: req.user.id, activityType: activityEnum.CREATED_QUESTION, question: question._id });
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
    await Activity.create({ user: req.user.id, activityType: activityEnum.EDITED_QUESTION, question: question._id });
    res.status(200).json({ question, msg: "Question updated successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getQuestionsOfCurrentUser = async (req, res) => {
  try {
    let questions = await Question.find({ questioner: req.user.id }).sort("-createdAt").lean();

    const addExtraInfo = async (question) => {
      const ansCount = await Answer.countDocuments({ question: question._id });
      return { ...question, ansCount };
    }

    questions = await Promise.all(questions.map(question => addExtraInfo(question)));
    res.status(200).json({ questions, msg: "Questions found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.getAnswersByQuestion = async (req, res) => {
  try {
    const questionId = req.params.qid;

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "Question id not valid" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    const answers = await Answer.find({ question: questionId }).populate("answerer", "-password");
    res.status(200).json({ answers, msg: "Answers found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.postAnswer = async (req, res) => {
  try {
    const questionId = req.params.qid;
    const { text } = req.body;
    const userId = req.user.id;
    if (!text) {
      return res.status(400).json({ msg: "Answer can't be empty" });
    }

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "invalid Question id" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    if (question.questioner == req.user.id) {
      return res.status(400).json({ msg: "You can't post answer to your own question!!" });
    }

    const answer = await Answer.create({ question: questionId, answerer: userId, text });
    await Activity.create({ user: req.user.id, activityType: activityEnum.CREATED_ANSWER, answer: answer._id });

    res.status(200).json({ answer, msg: "Answer posted successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

