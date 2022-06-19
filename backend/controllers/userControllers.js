const User = require("../models/User");

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ msg: "Username to check not found" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User with given username doesn't exist" });
    }
    res.status(200).json({ msg: "User with given username exists" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}