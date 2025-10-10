const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

async function initAdmin() {
  const existing = await Admin.findOne({ username: "admin" });
  if (!existing) {
    const hash = await bcrypt.hash("pass123", 10);
    const admin = new Admin({ username: "admin", passwordHash: hash });
    await admin.save();
    console.log("Admin account created: username='admin', password='pass123'");
  } else {
    console.log("Admin already exists");
  }
}

module.exports = initAdmin;
