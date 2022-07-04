const express = require("express");
const { updateAnswerById, getAnswersOfCurrentUser, getAnswerById, acceptAnswer } = require("../controllers/answerControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/answers
router.get("/me", verifyAccessToken, getAnswersOfCurrentUser);
router.get("/:ansid", getAnswerById);
router.put("/:ansid", verifyAccessToken, updateAnswerById);
router.put("/:ansid/accept", verifyAccessToken, acceptAnswer);


module.exports = router;
