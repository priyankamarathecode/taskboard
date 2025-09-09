const User = require("../models/User");

// ✅ Create new user
// ✅ Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("User creation error:", err.message, err.errors); // ← ✅ Add this line
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get all users (only with 'user' role)
/* const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}; */

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .populate("tasks"); // ✅ important
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update user
const updateUser = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updateData = { name, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
