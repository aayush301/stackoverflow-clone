const express = require("express");
const router = express.Router();
const { getQuestions, getQuestionById, postQuestion, updateQuestionById, getQuestionBySlug, getQuestionsOfCurrentUser } = require("../controllers/questionControllers");
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/questions
router.get("/", getQuestions);
router.post("/", verifyAccessToken, postQuestion);
router.get("/me", verifyAccessToken, getQuestionsOfCurrentUser);

router.get("/:qid", getQuestionById);
router.put("/:qid", verifyAccessToken, updateQuestionById);

router.get("/byslug/:qslug", getQuestionBySlug);



module.exports = router;
