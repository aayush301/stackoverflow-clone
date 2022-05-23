const express = require("express");
const router = express.Router();
const { register, activateAccount, login, forgotPassword, resetPassword } = require("../controllers/authControllers");
const { verifyAccessToken } = require("../middlewares/index");

// Routes beginning with /api/auth
router.post("/register", register);
router.post("/activate-account", activateAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyAccessToken, resetPassword);

module.exports = router;
