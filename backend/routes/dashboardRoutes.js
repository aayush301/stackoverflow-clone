const express = require("express");
const { getDashboardData } = require("../controllers/dashboardControllers");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");


// Routes beginning with /api/dashboard
router.get("/", verifyAccessToken, getDashboardData);


module.exports = router;
