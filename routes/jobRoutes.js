const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const protect = require("../middleware/protect");

// GET ALL
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// POST
router.post("/", protect, async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

module.exports = router;
