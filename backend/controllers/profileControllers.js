const User = require("../models/User");


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
    const userObj = { name, location };
    const user = await User.findByIdAndUpdate(req.user.id, userObj, { new: true }).select("-password");
    res.status(200).json({ user, msg: "Profile updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}