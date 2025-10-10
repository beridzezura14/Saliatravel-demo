const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // შეცვალე საჭირო გზით
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = "admin";
    const email = "zuraberidze12@gmail.com"; // შენი მეილი
    const password = "pass123";       // შენი პაროლი

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email,
      passwordHash,
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    mongoose.connection.close();
  }
}

createAdmin();
