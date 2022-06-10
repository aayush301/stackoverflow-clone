const express = require("express");
const { getAnswersByQuestion, postAnswer, updateAnswerById, deleteAnswerById, getAnswersOfCurrentUser, getAnswerById } = require("../controllers/answerControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/answers
router.get("/me", verifyAccessToken, getAnswersOfCurrentUser);
router.get("/byQuestion/:qid", getAnswersByQuestion);
router.get("/:ansid", getAnswerById);
router.post("/:qid", verifyAccessToken, postAnswer);
router.put("/:ansid", verifyAccessToken, updateAnswerById)
router.delete("/:ansid", verifyAccessToken, deleteAnswerById);


module.exports = router;
