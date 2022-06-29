const express = require("express");
const { getBookmarksOfCurrentUser, addBookmark, deleteBookmark } = require("../controllers/bookmarkControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/bookmarks
router.get("/me", verifyAccessToken, getBookmarksOfCurrentUser);   // ?qid={qid}&ansid={ansid}
router.post("/", verifyAccessToken, addBookmark);
router.delete("/:bookmarkId", verifyAccessToken, deleteBookmark);


module.exports = router;
