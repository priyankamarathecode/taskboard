const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin@123", 10);
    const user = new User({
      name: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin",
    });

    await user.save();
    console.log("✅ Admin user created!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error inserting admin:", err);
    process.exit(1);
  });
