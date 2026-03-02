const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Application = require("../models/Application");
const protect = require("../middleware/protect");


// ==========================
// REGISTER ADMIN (Run once)
// ==========================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.json({ message: "Admin created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// LOGIN ADMIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// GET ALL APPLICATIONS (Protected)
// ==========================
router.get("/applications", protect, async (req, res) => {
  try {
    const applications = await Application.find().populate("job");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// DELETE APPLICATION (Protected)
// ==========================
router.delete("/application/:id", protect, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
