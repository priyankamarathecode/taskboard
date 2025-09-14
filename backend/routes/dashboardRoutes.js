// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getUsers,
  getPendingTasks,
  getCompletedTasks,
  getInProgressTasks,
  getTaskDistribution,
  getTopPerformers,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/auth");

// ✅ Admin Dashboard Stats
router.get("/admin-stats", authMiddleware, getAdminStats);

// ✅ Get All Users (for Total Users modal)
router.get("/users", authMiddleware, getUsers);

// ✅ Task Status Lists
router.get("/pending-tasks", authMiddleware, getPendingTasks);
router.get("/completed-tasks", authMiddleware, getCompletedTasks);
router.get("/in-progress-tasks", authMiddleware, getInProgressTasks);

// ✅ Task Distribution (for Pie Chart)
router.get("/task-distribution", authMiddleware, getTaskDistribution);

// ✅ Top Performers (for Leaderboard)
router.get("/top-performers", authMiddleware, getTopPerformers);

module.exports = router;
