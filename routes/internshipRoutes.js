const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");

// GET all internships
router.get("/", async (req, res) => {
  const internships = await Internship.find().sort({ createdAt: -1 });
  res.json(internships);
});

// POST new internship
router.post("/", async (req, res) => {
  const internship = await Internship.create(req.body);
  res.json(internship);
});

module.exports = router;
