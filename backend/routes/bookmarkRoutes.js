const express = require("express");
const { getBookmarks, addBookmark, deleteBookmark } = require("../controllers/bookmarkControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/bookmarks
router.get("/", verifyAccessToken, getBookmarks);
router.post("/", verifyAccessToken, addBookmark);
router.delete("/:bookmarkId", verifyAccessToken, deleteBookmark);


module.exports = router;
