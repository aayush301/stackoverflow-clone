const express = require("express");
const { getLikesOfQuestion, getLikesOfAnswer, postLike, deleteLike, getLikesOfCurrentUser } = require("../controllers/likeControllers");
const router = express.Router();
const { verifyAccessToken, useAccessTokenIfPresent } = require("../middlewares");


// Routes beginning with /api/likes
router.get("/questions/:qid", useAccessTokenIfPresent, getLikesOfQuestion);
router.get("/answers/:ansid", useAccessTokenIfPresent, getLikesOfAnswer);
router.post("/", verifyAccessToken, postLike);
router.delete("/:likeId", verifyAccessToken, deleteLike);
router.get("/me", verifyAccessToken, getLikesOfCurrentUser);


module.exports = router;
