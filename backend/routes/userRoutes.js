const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, createUser);
router.get("/", authMiddleware, getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
