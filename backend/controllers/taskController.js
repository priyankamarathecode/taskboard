const Task = require("../models/Task");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// Assign Task
exports.assignTask = async (req, res) => {
  const { title, description, assignedTo, deadline } = req.body;
  try {
    const task = new Task({ title, description, assignedTo, deadline });
    await task.save();

    // Add to user's tasks array
    await User.findByIdAndUpdate(assignedTo, {
      $push: { tasks: task._id },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, assignedTo, deadline },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove task from all users
    await User.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    // Add task to new assigned user
    await User.findByIdAndUpdate(assignedTo, {
      $addToSet: { tasks: taskId },
    });

    res.json({ message: "Task updated", updatedTask });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Remove from user's task list
    await User.findByIdAndUpdate(task.assignedTo, {
      $pull: { tasks: task._id },
    });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).lean();

    // Prepend BACKEND_URL if attachment exists and is not already a full URL
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    tasks.forEach((task) => {
      if (task.attachment && !task.attachment.startsWith("http")) {
        task.attachment = `${backendUrl}${task.attachment}`;
      }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, title, description, deadline } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (status) task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.deadline = deadline;

    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.uploadAttachment = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `${
      process.env.BACKEND_URL || "http://localhost:5000"
    }/uploads/${req.file.filename}`;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { attachment: filePath },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Attachment uploaded", task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAttachment = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.attachment) {
      return res.status(400).json({ message: "No attachment to delete" });
    }

    // Extract local file path from URL
    const fileName = task.attachment.split("/uploads/")[1];
    if (fileName) {
      const filePath = path.join(__dirname, "..", "uploads", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove attachment from DB
    task.attachment = "";
    await task.save();

    res.json({ message: "Attachment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
