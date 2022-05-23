const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");
const { getProfile, updateProfile } = require("../controllers/profileControllers");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);
router.put("/", verifyAccessToken, updateProfile);

module.exports = router;
