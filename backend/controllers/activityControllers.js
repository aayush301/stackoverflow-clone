const Activity = require("../models/Activity");

exports.getActivitiesOfCurrentUser = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .populate({ path: "question" })
      .populate({ path: "answer", populate: { path: 'question' } })
      .sort("-createdAt");

    res.status(200).json({ activities, msg: "Activities found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
