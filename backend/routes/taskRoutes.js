const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  assignTask,
  getMyTasks,
  updateTask,
  deleteTask,
  uploadAttachment,
  deleteAttachment,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

//  Route for assigning a task
router.post("/assign", authMiddleware, assignTask);

// Route for getting logged-in user's tasks
router.get("/my-tasks", authMiddleware, getMyTasks);

// Route to update task
// router.put("/:id", updateTask);

//  Route to delete task
router.delete("/:taskId", deleteTask);

router.put("/:id", authMiddleware, updateTask);
router.post("/:taskId/upload", upload.single("attachment"), uploadAttachment);
router.delete("/:taskId/attachment", authMiddleware, deleteAttachment);
module.exports = router;
