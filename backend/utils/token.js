const jwt = require("jsonwebtoken");
const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const createActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}


module.exports = {
  createActivationToken,
  createAccessToken,
}