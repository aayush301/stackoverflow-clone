const express = require("express");
const { getActivitiesOfCurrentUser } = require("../controllers/activityControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/activities
router.get("/me", verifyAccessToken, getActivitiesOfCurrentUser);

module.exports = router;