const User = require("../models/User");
const bcrypt = require("bcrypt");


/**
 * @route /api/profile
 * @description gets the user's data of userid present in req.user object
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, msg: "Profile found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


/**
 * @route /api/profile
 * @description updates the user's data of userid present in req.user object
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const userObj = { name, location };
    const user = await User.findByIdAndUpdate(req.user.id, userObj, { new: true }).select("-password");
    res.status(200).json({ user, msg: "Profile updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ msg: "Username can't be empty" });
    }

    if (username.length < 3) {
      return res.status(400).json({ msg: "Atleast 3 characters must be present in username" });
    }

    const user = await User.findOne({ username });
    if (user && user._id != req.user.id) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    await User.findByIdAndUpdate(req.user.id, { username });
    res.status(200).json({ msg: "Username updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.updatePassword = async (req, res) => {
  try {
    const { existingPassword, newPassword } = req.body;
    if (!existingPassword || !newPassword) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(existingPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Existing password filled incorrect!!" });

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(req.user.id, { password: passwordHash });
    res.status(200).json({ msg: "Password updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
