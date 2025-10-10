const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const Admin = require("../models/Admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// ================= CHANGE PASSWORD =================
router.post("/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findOne({ username: "admin" });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
  if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

  const newHash = await bcrypt.hash(newPassword, 10);
  admin.passwordHash = newHash;
  await admin.save();

  res.json({ message: "Password updated successfully" });
});



// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "User not found" });

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = expiry;
    await admin.save();

    // send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: admin.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const bcrypt = require("bcryptjs");

  try {
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // ჯერ კიდევ ვალიდურია
    });

    if (!admin) return res.status(400).json({ message: "Invalid or expired token" });

    // hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = hashed;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;

    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
