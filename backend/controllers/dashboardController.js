// controllers/dashboardController.js
const Task = require("../models/Task");
const User = require("../models/User");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Complete" });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });

    res.json({ totalUsers, totalTasks, completedTasks, pendingTasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getAdminStats };
