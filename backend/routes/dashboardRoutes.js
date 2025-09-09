// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/auth");

router.get("/admin-stats", authMiddleware, getAdminStats);

module.exports = router;
