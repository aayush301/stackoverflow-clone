const express = require("express");
const { checkUsername } = require("../controllers/userControllers");
const { verifyAccessToken } = require("../middlewares");
const router = express.Router();


// Routes beginning with /api/users
router.head("/username/:username", verifyAccessToken, checkUsername);



module.exports = router;
