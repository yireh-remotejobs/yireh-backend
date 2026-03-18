const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// POST new job
router.post("/", protect, async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

module.exports = router;
router.get("/download-cv/:id", protect, async (req, res) => {
  const app = await InternshipApplication.findById(req.params.id);
  res.download(app.cv);
});
