const express = require("express");
const router = express.Router(); // <- THIS LINE IS REQUIRED
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt"); // or bcryptjs

const otpStore = {}; // temporary in-memory store

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  res.json({ msg: "OTP sent" });
});

// Verify OTP & reset password
router.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore[email];
  if (!record) return res.status(400).json({ msg: "No OTP found for this email" });

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (parseInt(otp) !== record.otp) return res.status(400).json({ msg: "Invalid OTP" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  delete otpStore[email];

  res.json({ msg: "Password reset successful" });
});

module.exports = router;
