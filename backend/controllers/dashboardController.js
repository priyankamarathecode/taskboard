const Task = require("../models/Task");
const User = require("../models/User");

exports.getAdminStats = async (req, res) => {
  try {
    // Count only users with role = "user"
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Complete" });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    // Overdue = deadline < now & not completed
    const now = new Date();
    const overdueTasks = await Task.countDocuments({
      deadline: { $lt: now },
      status: { $ne: "Complete" },
    });

    // Tasks created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tasksToday = await Task.countDocuments({
      createdAt: { $gte: today },
    });

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      tasksToday,
      completionRate,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

//  Get Pending Tasks
exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Pending" })
      .populate("assignedTo", "name email")
      .sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending tasks" });
  }
};

//  Get Completed Tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Complete" })
      .populate("assignedTo", "name email")
      .sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch completed tasks" });
  }
};

//  Get In-Progress Tasks
exports.getInProgressTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "In Progress" })
      .populate("assignedTo", "name email")
      .sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch in-progress tasks" });
  }
};

//  Task Distribution (Pie Chart)
exports.getTaskDistribution = async (req, res) => {
  try {
    const distribution = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task distribution" });
  }
};

// Top Performers (Bar Chart)
exports.getTopPerformers = async (req, res) => {
  try {
    const performers = await Task.aggregate([
      { $match: { status: "Complete" } },
      { $group: { _id: "$assignedTo", completedTasks: { $sum: 1 } } },
      { $sort: { completedTasks: -1 } },
      { $limit: 5 },
    ]);

    // Populate user names
    const populated = await Promise.all(
      performers.map(async (p) => {
        const user = await User.findById(p._id);
        return {
          _id: user?.name || "Unknown",
          completedTasks: p.completedTasks,
        };
      })
    );

    res.json({ performers: populated });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top performers" });
  }
};
