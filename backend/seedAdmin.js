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
    process.exit();
  })
  .catch((err) => {
    process.exit(1);
  });
