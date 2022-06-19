const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");
const { getProfile, updateProfile, updatePassword, updateUsername } = require("../controllers/profileControllers");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);
router.put("/", verifyAccessToken, updateProfile);
router.put("/username", verifyAccessToken, updateUsername);
router.put("/password", verifyAccessToken, updatePassword);

module.exports = router;
